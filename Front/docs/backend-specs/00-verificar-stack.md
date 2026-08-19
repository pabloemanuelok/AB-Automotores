# 00 — Verificar el stack real antes de implementar nada

**Este es el primer paso obligatorio.** Los documentos `01` a `05` de esta carpeta están escritos usando como referencia una copia local del backend en `_backend/ab-backend-main/` (NestJS + Mongoose/MongoDB), que vive en este repo de frontend pero está en `.gitignore` (no se versiona, es solo una copia de trabajo).

## Por qué hay que desconfiar de esa copia

1. Fabrizio mencionó que la base de datos real podría estar hecha en **Supabase** (Postgres), no Mongo.
2. Se encontró una discrepancia concreta: el frontend (`src/utils/FetchCon/FetchCon.tsx`) llama a `GET/POST/DELETE /leads`, pero la copia local define `@Controller('consultas')` en `src/modules/consultas/consultas.controller.ts`. No existe ningún endpoint `/leads` en toda la copia local.

Esto es evidencia directa de que **la copia local no coincide con lo que hay deployado en `https://ab-backend-iznbqeqe7a-uc.a.run.app`** (la URL real de producción según `CLAUDE.md` del frontend). Puede ser una versión vieja, una rama abandonada, o simplemente quedó desactualizada tras cambios hechos directo en el repo real.

## Qué hacer antes de tocar código de backend

1. Conseguir acceso al repositorio real que efectivamente se despliega en Cloud Run (no asumir que es este `_backend/ab-backend-main/`).
2. Confirmar en ese repo real:
   - ¿Motor de base de datos? (Mongo con Mongoose, o Postgres, posiblemente vía Supabase/Prisma/TypeORM)
   - ¿Existe ya algún concepto de rol de usuario, aunque sea parcial?
   - ¿Cómo se llama efectivamente el endpoint de consultas/leads? (para saber si el resto de los endpoints documentados acá también cambiaron de nombre)
   - ¿Dónde vive el secreto de JWT? (la copia local lo lee de un `config.json` local, fuera de `.env` — si eso sigue así en real, es un riesgo de seguridad a señalar aparte)

## Cómo usar el resto de estos documentos según lo que encuentres

- **Si el backend real es NestJS + Mongoose (coincide con la copia local)**: los documentos `01`-`05` aplican tal cual, con código Mongoose/NestJS listo para adaptar.
- **Si el backend real es Supabase/Postgres**: el **modelo de datos y las reglas de negocio** de estos documentos siguen siendo válidos (son agnósticos de motor: qué campos, qué relaciones, qué lógica), pero la implementación cambia:
  - Los `@Schema()`/`@Prop()` de Mongoose se traducen a tablas SQL + Row Level Security (RLS) de Postgres.
  - El Gateway de WebSockets a mano (documento `03`) probablemente **no hace falta escribirlo**: Supabase tiene **Realtime** nativo (suscripción a cambios de tabla vía `supabase-js`), que cubre el mismo requerimiento con mucho menos código propio.
  - La autenticación podría migrar a Supabase Auth en vez de JWT propio con Passport — a evaluar caso por caso, no es parte obligatoria de esta feature.

No implementar nada de `01`-`05` sin haber cerrado este paso primero.
