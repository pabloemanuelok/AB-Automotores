# 02 — Módulo de tareas (`Task`)

> Ver `00-verificar-stack.md` primero. Este documento asume NestJS + Mongoose como la copia local; el modelo de datos y las reglas de negocio aplican igual sobre Postgres.

## 1. Schema

Nuevo `src/modules/schemas/task.schema.ts`, siguiendo el mismo patrón que `user.schema.ts`/`product.schema.ts`:

```ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type TaskDocument = Task & Document;
export type TaskStatus = 'no_iniciada' | 'en_proceso' | 'terminada' | 'no_completada';
export type TaskType = 'puntual' | 'rutina';

@Schema({ timestamps: true, versionKey: false })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  assignedTo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: String, enum: ['puntual', 'rutina'], default: 'puntual', required: true })
  type: TaskType;

  @Prop({ type: String, enum: ['no_iniciada', 'en_proceso', 'terminada', 'no_completada'], default: 'no_iniciada', required: true })
  status: TaskStatus;

  @Prop()
  failureReason?: string;

  @Prop({ type: [Number] })
  daysOfWeek?: number[]; // 0=domingo..6=sábado; vacío/undefined = todos los días. Solo aplica si type === 'rutina'

  @Prop()
  scheduledTime?: string; // "09:00" — referencia visual para el empleado, no dispara nada por sí solo

  @Prop()
  lastCompletedAt?: Date;

  @Prop()
  statusUpdatedAt?: Date; // clave del reset diario de rutinas, ver sección 3

  @Prop({ default: true })
  active: boolean; // permite pausar una rutina sin borrar histórico
}

export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({ assignedTo: 1, status: 1 });
```

## 2. DTOs

`src/modules/tasks/dto/create-task.dto.ts`:
```ts
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsMongoId, IsArray, IsInt, Min, Max } from 'class-validator';

export class CreateTaskDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsString() @IsOptional()
  description?: string;

  @IsMongoId()
  assignedTo: string;

  @IsEnum(['puntual', 'rutina'])
  type: 'puntual' | 'rutina';

  @IsArray() @IsInt({ each: true }) @Min(0, { each: true }) @Max(6, { each: true }) @IsOptional()
  daysOfWeek?: number[];

  @IsString() @IsOptional()
  scheduledTime?: string;
}
```

`src/modules/tasks/dto/update-task-status.dto.ts`:
```ts
import { IsEnum, IsString, IsOptional, ValidateIf, IsNotEmpty } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsEnum(['no_iniciada', 'en_proceso', 'terminada', 'no_completada'])
  status: 'no_iniciada' | 'en_proceso' | 'terminada' | 'no_completada';

  @ValidateIf((o) => o.status === 'no_completada')
  @IsString() @IsNotEmpty({ message: 'El motivo es obligatorio cuando la tarea no se pudo completar' })
  failureReason?: string;
}
```

**Importante**: la validación condicional de `failureReason` tiene que estar en el backend (como arriba, con `@ValidateIf`), no solo en el frontend. El frontend también la va a validar, pero no hay que confiar únicamente en eso.

## 3. Reset diario de rutinas — diseño híbrido

Un cron puro que resetea `status` a medianoche es frágil: si el proceso está caído justo a esa hora (deploy, reinicio en Cloud Run), el reset no corre, y una rutina de ayer queda mostrada como "Terminada" hoy sin que nadie lo note.

**Paso 1 — Derivación en el read-path** (fuente de verdad real). En `tasks.service.ts`, al armar cualquier respuesta que incluya tareas, aplicar esta transformación antes de devolver:

```ts
function getEffectiveStatus(task: TaskDocument): TaskStatus {
  if (task.type !== 'rutina') return task.status;

  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date());
  const updatedDay = task.statusUpdatedAt
    ? new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' }).format(task.statusUpdatedAt)
    : null;

  return updatedDay === today ? task.status : 'no_iniciada';
}
```

(`Intl.DateTimeFormat('en-CA', ...)` devuelve `YYYY-MM-DD`, cómodo para comparar como string. Argentina no tiene horario de verano desde 2009, así que no hace falta ninguna librería de fechas nueva para esto.)

Esto autocorrige el estado mostrado aunque el cron de abajo no haya corrido — el primer request del día siguiente ya ve el estado correcto, sin depender de nada más.

**Paso 2 — Cron de medianoche** (housekeeping, no la fuente de verdad): materializa el reset físico en la base y dispara el evento de tiempo real, para que alguien con la pantalla abierta pasada la medianoche vea el cambio sin recargar.

Requiere agregar `@nestjs/schedule` como dependencia nueva (no está instalada hoy).

```ts
import { Cron } from '@nestjs/schedule';

@Cron('0 0 * * *', { timeZone: 'America/Argentina/Buenos_Aires' })
async resetDailyRoutines() {
  const yesterdayOrEarlier = /* construir el corte de "antes de hoy" en zona AR */;
  const affected = await this.taskModel.find({
    type: 'rutina',
    active: true,
    statusUpdatedAt: { $lt: yesterdayOrEarlier },
  });
  await this.taskModel.updateMany(
    { _id: { $in: affected.map(t => t._id) } },
    { $set: { status: 'no_iniciada', failureReason: undefined } },
  );
  // emitir evento 'routines:reset' por WebSocket, ver 03-realtime.md
}
```

**Fuera de alcance del MVP, anotado para más adelante**: si Fabrizio quiere ver "cuántos días cumplió esta rutina en la semana", hay que loguear el resultado en una colección aparte (`RoutineLog`) antes de cada reset — hoy el reset descarta ese histórico diario.

## 4. Endpoints

`src/modules/tasks/tasks.controller.ts`:

| Método | Ruta | Guard | Quién |
|---|---|---|---|
| `POST /tasks` | Crear tarea | `JwtAuthGuard, RolesGuard` + `@Roles('admin')` | admin |
| `GET /tasks` | Todas las tareas (con filtro opcional `?assignedTo=`) | `JwtAuthGuard, RolesGuard` + `@Roles('admin')` | admin |
| `GET /tasks/mine` | Tareas del usuario autenticado | `JwtAuthGuard` | empleado (y admin, si alguna vez tiene tareas propias) |
| `PATCH /tasks/:id` | Editar título/descripción/asignación/horario | `JwtAuthGuard, RolesGuard` + `@Roles('admin')` | admin |
| `PATCH /tasks/:id/status` | Cambiar estado (con validación de pertenencia, ver `01-roles-auth.md` sección 5) | `JwtAuthGuard` | admin o el empleado asignado |
| `DELETE /tasks/:id` | Eliminar tarea | `JwtAuthGuard, RolesGuard` + `@Roles('admin')` | admin |

Todas las respuestas de listado/detalle deben pasar por `getEffectiveStatus()` antes de serializar.

## 5. Reasignar una rutina

Si el admin cambia el `assignedTo` de una tarea tipo `rutina` (de un empleado a otro), resetear `status` a `no_iniciada` y limpiar `statusUpdatedAt`/`failureReason` en la misma operación — para que el nuevo empleado no herede un estado que no le corresponde.

## 6. Borrado de empleado (cascada)

Cuando se borra un `User` con `role: 'empleado'` (ver `04-users-module-fixes.md`), borrar en cascada todas sus `Task` (`deleteMany({ assignedTo: userId })`) dentro de la misma operación. El frontend va a mostrar antes un conteo de cuántas tareas se van a perder, así que el endpoint de borrado debería poder informar ese número también (ej. devolver `{ deletedTasksCount }` en la respuesta, o exponer un `GET /users/:id/tasks-count` que el frontend consulte antes de confirmar).
