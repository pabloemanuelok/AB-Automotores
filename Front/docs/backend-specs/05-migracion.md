# 05 — Migración del usuario admin existente

> Ver `00-verificar-stack.md` primero. Ejemplo en sintaxis Mongo; si el backend real es Postgres, es el mismo `UPDATE` conceptual sobre la tabla `users`.

## Orden de ejecución (importante)

No hay ninguna herramienta de migraciones en el proyecto hoy, así que esto se ejecuta a mano contra la base de datos, **antes** de deployar el cambio de `01-roles-auth.md` que empieza a incluir `role` en el JWT.

```js
// 1. Primero, fijar el admin explícito por su name real de login
db.users.updateOne(
  { name: "<nombre de usuario real de Fabrizio>" },
  { $set: { role: "admin" } }
);

// 2. Recién después, default masivo para cualquier otro usuario existente sin role
db.users.updateMany(
  { role: { $exists: false } },
  { $set: { role: "empleado" } }
);
```

El orden importa: si se corre primero el `updateMany` con un default de `"empleado"` para todos, y después se intenta fijar a Fabrizio como admin, no pasa nada grave — pero invertir la lógica (poner primero un default global de `"admin"` para todos y depender de una segunda pasada para "degradar" al resto) es más fácil de hacer mal y dejar a alguien con permisos que no debería tener. Mejor fijar el caso especial primero, siempre.

## Por qué el orden con el deploy de `01-roles-auth.md` importa

Si el JWT empieza a incluir `role` **antes** de correr esta migración, el próximo login de Fabrizio va a generar un token con `role: undefined` (porque su usuario en la base todavía no tiene el campo seteado), y el `RolesGuard`/`allowedRoles` del frontend lo van a rechazar de su propio panel. Secuencia correcta:

1. Correr esta migración.
2. Recién ahí, deployar el backend con los cambios de `01-roles-auth.md`.
3. Recién ahí, el frontend (que ya puede estar deployado antes, ver nota abajo) empieza a recibir tokens con `role` real y a gatear las rutas por rol de forma efectiva.

## Nota sobre el frontend

Los cambios de frontend (Fase 1 del plan) están diseñados para ser retrocompatibles: si el JWT todavía no trae `role` (porque el backend no se actualizó o la migración no corrió), el usuario simplemente no matchea ningún `allowedRoles` y el comportamiento degrada de forma segura (no rompe el login existente de Fabrizio, que sigue entrando con el flujo actual hasta que el backend esté listo). Así que el frontend se puede deployar antes que el backend sin bloquear nada.
