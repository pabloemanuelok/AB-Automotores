# 01 — Roles y autorización

> Antes de leer esto: ver `00-verificar-stack.md`. Lo que sigue está escrito contra la copia local NestJS + Mongoose. Si el backend real es Postgres/Supabase, el modelo de datos y las reglas de negocio siguen aplicando; la sintaxis de esquema/guard hay que adaptarla.

## 1. Agregar `role` al schema de usuario

Hoy, `src/modules/schemas/user.schema.ts`:

```ts
@Schema({ timestamps: true, versionKey: false })
export class User {
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
};
```

Cambiar a:

```ts
export type UserRole = 'admin' | 'empleado';

@Schema({ timestamps: true, versionKey: false })
export class User {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop({ type: String, enum: ['admin', 'empleado'], default: 'empleado', required: true })
    role: UserRole;
};
```

(De paso: los tres campos originales no tenían `required: true` — vale la pena agregarlo ya que están, aunque no es indispensable para esta feature.)

## 2. Incluir `role` en el JWT

Hoy, `src/modules/auth/auth.service.ts`:

```ts
async login(user: any) {
    const payload = { username: user.name, sub: user._id }
    return { access_token: this.jwtService.sign(payload) }
}
```

Cambiar a:

```ts
async login(user: any) {
    const payload = { username: user.name, sub: user._id, role: user.role }
    return { access_token: this.jwtService.sign(payload) }
}
```

Y en `src/modules/auth/jwt.strategy.ts`, hoy:

```ts
async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
}
```

Cambiar a:

```ts
async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, role: payload.role };
}
```

Esto hace que `req.user.role` quede disponible en cualquier controller protegido por `JwtAuthGuard`.

## 3. Decorator `@Roles()` + `RolesGuard`

No existe ningún mecanismo de roles hoy (`grep` sobre todo `src/` no encontró `Roles`, `RolesGuard` ni nada similar). Crear:

**`src/modules/auth/decorators/roles.decorator.ts`** (nuevo):
```ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

**`src/modules/auth/guards/roles.guard.ts`** (nuevo):
```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user?.role);
  }
}
```

**Uso** (siempre después de `JwtAuthGuard`, porque `RolesGuard` depende de que `req.user` ya esté poblado):
```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Post()
create(@Body() dto: CreateUserDto) { ... }
```

Este mismo patrón (`@UseGuards(JwtAuthGuard)` en create/update/delete, sin guard en GETs públicos) ya existe en `products.controller.ts` — seguirlo, solo sumando `RolesGuard` + `@Roles('admin')` donde corresponda.

## 4. Dónde aplicar `@Roles('admin')`

- `users.controller.ts`: `POST /users` (crear empleado), `DELETE /users/:id`. Ver también `04-users-module-fixes.md` — hoy `POST /users` no tiene NINGÚN guard, es un bug de seguridad activo independiente de esta feature.
- `tasks.controller.ts` (nuevo, ver `02-tasks-module.md`): create/update/delete de tareas, y los endpoints de gestión (ver todas las tareas de todos).

## 5. Autorización a nivel de recurso (no solo de rol)

`@Roles()` alcanza para diferenciar admin de empleado, pero **no alcanza** para los endpoints que un empleado sí puede usar (ej. `PATCH /tasks/:id/status`, `GET /tasks/mine`). Ahí el service debe validar además que el recurso le pertenece:

```ts
async updateStatus(taskId: string, userId: string, userRole: string, dto: UpdateTaskStatusDto) {
  const task = await this.taskModel.findById(taskId);
  if (!task) throw new NotFoundException();
  if (userRole !== 'admin' && task.assignedTo.toString() !== userId) {
    throw new ForbiddenException('No podés modificar una tarea que no es tuya');
  }
  // ... aplicar el update
}
```

Sin esto, un empleado autenticado podría cambiar el estado de la tarea de un compañero simplemente adivinando/probando IDs.

## 6. Secuenciación con la migración

El JWT solo va a incluir `role` para logins que ocurran **después** de este cambio. Si el usuario de Fabrizio en la base no tiene `role` seteado todavía cuando se despliega este cambio, su próximo login le va a generar un token con `role: undefined`, y quedaría bloqueado de su propio panel admin (porque `RolesGuard`/`allowedRoles` del frontend van a rechazarlo).

**Por eso, correr la migración (`05-migracion.md`) ANTES de deployar este cambio de auth**, no después.
