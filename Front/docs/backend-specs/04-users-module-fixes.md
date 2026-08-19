# 04 — Arreglos necesarios en el módulo de usuarios existente

> Ver `00-verificar-stack.md` primero. Estos son bugs/huecos reales encontrados en la copia local (`_backend/ab-backend-main/src/modules/users/`), independientes de la feature de empleados/tareas pero que esta feature necesita resueltos para funcionar.

## 1. `POST /users` no tiene ningún guard — bug de seguridad activo

Hoy, `users.controller.ts`:

```ts
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

**Cualquiera sin autenticar puede crear usuarios hoy**, incluyendo (una vez agregado el campo `role`) crearse a sí mismo un usuario con `role: 'admin'`. Esto hay que arreglarlo ya, esté o no lista el resto de la feature.

Cambiar a:
```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

(Requiere primero haber creado `RolesGuard`/`@Roles()`, ver `01-roles-auth.md`.)

## 2. `findAll`, `findOne`, `remove` son placeholders — no consultan la base

Hoy, `users.service.ts`:

```ts
findAll() {
  return `This action returns all users`;
}

findOne(id: string) {
  return `This action returns a #${id} user`;
}

remove(id: string) {
  return `This action removes a #${id} user`;
}
```

Estos tres métodos literalmente devuelven strings hardcodeados — no tocan Mongo/la base en absoluto. Hay que implementarlos de verdad:

```ts
async findAll(role?: UserRole): Promise<User[]> {
  const filter = role ? { role } : {};
  return this.userModel.find(filter).select('-password').exec();
}

async findOne(id: string): Promise<User> {
  const user = await this.userModel.findById(id).select('-password').exec();
  if (!user) throw new NotFoundException('Usuario no encontrado');
  return user;
}

async remove(id: string): Promise<{ deletedTasksCount: number }> {
  const user = await this.userModel.findById(id);
  if (!user) throw new NotFoundException('Usuario no encontrado');
  const { deletedCount } = await this.taskModel.deleteMany({ assignedTo: id }); // cascada, ver 02-tasks-module.md sección 6
  await this.userModel.deleteOne({ _id: id });
  return { deletedTasksCount: deletedCount };
}
```

`findAll` con filtro por `role` sirve para que el panel de admin pida específicamente `role=empleado` al listar el equipo, sin traer también al propio admin.

**Importante**: `select('-password')` (o el equivalente si no es Mongo) para no filtrar el hash de contraseña en las respuestas — hoy `create()` sí devuelve el objeto completo con `password` hasheado incluido en la respuesta del `POST`, sería bueno corregirlo de paso aunque no sea estrictamente parte de esta feature.

## 3. `create()` valida duplicados por nombre O email — repasar mensaje de error

`create()` ya está bien implementado (valida duplicados, hashea con bcrypt), no requiere cambios funcionales. Solo señalar: al crear un empleado desde el panel de Fabrizio, si el `name` o `email` ya existen, el backend tira `ConflictException` — el frontend debe mostrar ese mensaje de forma clara en el formulario de alta (`Equipo.tsx`), no solo un error genérico.

## 4. JWT secret fuera de `.env`

`jwt.strategy.ts` lee el secreto desde un `config.json` local (`import * as config from "../../../config.json"`), no desde una variable de entorno. Esto es un riesgo si ese archivo llegó a commitearse alguna vez en el repo real, o si distintos entornos (dev/prod) terminan compartiendo el mismo secreto sin querer. No es parte obligatoria de esta feature, pero vale la pena migrarlo a `.env` + `ConfigModule` de Nest cuando se toque este módulo igual.
