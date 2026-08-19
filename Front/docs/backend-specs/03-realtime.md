# 03 — Tiempo real

> Ver `00-verificar-stack.md` primero. **Si el backend real es Supabase**, no construir nada de lo que sigue: usar **Supabase Realtime** (suscripción a cambios de las tablas `tasks`/`users` vía `supabase-js`), que resuelve el mismo requerimiento con mucho menos código propio. Lo de abajo aplica solo si el backend real sigue siendo NestJS con Mongo/Postgres sin Supabase.

## Decisión de diseño (confirmada con el usuario)

El evento de WebSocket es **un disparador, nunca el payload completo**. Cuando algo cambia en el backend, se emite un evento vacío (o con `{ taskId }` a lo sumo) y el frontend, al recibirlo, vuelve a pedir los datos con el mismo fetch REST que ya usa en su carga inicial. Esto evita duplicar la lógica de mapeo DTO→estado entre "carga inicial" y "actualización por socket" — un solo camino de datos.

## Backend — Gateway

Requiere agregar `@nestjs/websockets` y `socket.io` como dependencias nuevas (no están instaladas hoy).

`src/modules/tasks/tasks.gateway.ts` (nuevo):

```ts
@WebSocketGateway({ namespace: '/tasks', cors: { origin: [/* orígenes del frontend permitidos */] } })
export class TasksGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token;
    const payload = /* verificar el JWT a mano con jwtService.verify(), NO se puede reusar el JwtAuthGuard de Passport tal cual porque está pensado para HTTP */;
    if (!payload) { client.disconnect(); return; }

    client.join(`user:${payload.sub}`);
    if (payload.role === 'admin') client.join('admins');
  }

  emitTaskChanged(taskId: string, assignedTo: string) {
    this.server.to(`user:${assignedTo}`).to('admins').emit('task:updated', { taskId });
  }
}
```

**Nota importante sobre CORS**: `main.ts` hoy usa `app.enableCors()` sin opciones para el servidor HTTP normal. Esa configuración **no la hereda** el Gateway de Socket.IO — necesita su propio bloque `cors` en el decorator `@WebSocketGateway(...)`, o las conexiones desde el frontend van a fallar en producción aunque el resto de la API funcione bien.

## Eventos a emitir

| Evento | A quién | Cuándo |
|---|---|---|
| `task:created` | `user:{assignedTo}` + `admins` | Al crear una tarea |
| `task:updated` | `user:{assignedTo}` + `admins` | Al editar o cambiar de estado una tarea |
| `task:deleted` | `user:{assignedTo}` + `admins` | Al eliminar una tarea |
| `employee:created` | `admins` | Al dar de alta un empleado |
| `employee:removed` | `admins` | Al eliminar un empleado |
| `routines:reset` | `admins` (+ opcionalmente cada `user:{userId}` afectado) | Cuando corre el cron de medianoche (ver `02-tasks-module.md`) |

Todos con payload mínimo (`{}` o `{ taskId }`), nunca el objeto completo — el consumidor decide qué refetchear.

## Frontend (ya contemplado en el plan de implementación)

- Conexión centralizada en `contextUser.tsx`, se abre cuando `isLogged && token` están listos, autenticando con el JWT en `socket.handshake.auth.token` (no en query string, para no filtrarlo en logs de proxy/CDN).
- Se desconecta explícitamente en `logout()`.
- **Red de seguridad**: además del socket, un refetch de respaldo cada 60-90s en las vistas de tareas — mitigación acordada para el riesgo conocido de Cloud Run cortando conexiones WebSocket long-lived sin que el cliente se entere (Cloud Run necesita afinidad de sesión / execution environment gen2 para sostenerlas de forma confiable).

## Riesgo de infraestructura a validar antes de comprometerse del todo

Confirmar que el backend deployado en Cloud Run (`ab-backend-iznbqeqe7a-uc.a.run.app` según `CLAUDE.md` del frontend, sujeto a lo que arroje `00-verificar-stack.md`) soporta conexiones WebSocket long-lived en su configuración actual. Si no, evaluar: habilitar afinidad de sesión / gen2 en Cloud Run, o mover el Gateway a un servicio aparte más apto para conexiones persistentes. Mientras tanto, la red de seguridad de polling cada 60-90s ya cubre el caso de que el socket se corte silenciosamente.
