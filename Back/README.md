# AB Automotores — Backend

API propia de AB Automotores. Reemplaza el backend anterior (`ab-backend`, Cloud Run),
del cual no existía código fuente y que quedó caído.

**Stack:** NestJS 11 · Prisma 7 · PostgreSQL (Neon) · Cloudinary · JWT

## Puesta en marcha

```bash
npm install
cp .env.example .env   # completar los valores
npx prisma migrate dev
ADMIN_NAME=tu-usuario ADMIN_PASSWORD=tu-clave npm run seed:admin
npm run start:dev
```

Para desarrollo sin una base remota, Prisma levanta un Postgres local:

```bash
npx prisma dev -n ab-dev -d
```

Copiar la URL `TCP` que imprime a `DATABASE_URL` en `.env`.

## Endpoints

| Método | Ruta | Auth |
|---|---|---|
| GET | `/health` | público |
| POST | `/auth/login` | público (5 req/min) |
| GET | `/vehicles` | público — filtros `?status=&featured=&brand=` |
| GET | `/vehicles/:id` | público |
| POST | `/vehicles` | admin — multipart, imágenes en el campo `files` |
| PATCH | `/vehicles/:id` | admin — JSON, campos de texto |
| PATCH | `/vehicles/:id/images` | admin — multipart: `keepImageIds` + `files` |
| PATCH | `/vehicles/featured` | admin — `{ids: []}` en orden de aparición |
| DELETE | `/vehicles/:id` | admin |
| GET | `/leads` | admin |
| POST | `/leads` | público (3 req/min) |
| DELETE | `/leads/:id` | admin |
| GET | `/site-config/:key` | público |
| PUT | `/site-config/:key` | admin |

Las rutas de admin esperan `Authorization: Bearer <token>`.

## Notas

- El `DATABASE_URL` de Neon necesita `channel_binding=require` además de
  `sslmode=require`, o el motor de migraciones falla con `P1001`.
- Neon suspende el endpoint por inactividad. Si `prisma migrate` da `P1001`,
  despertarlo primero con cualquier query (`npm run start:dev` o un `select 1`)
  y reintentar.
- `prisma migrate dev` no regenera el cliente acá: después de cambiar el schema
  hay que correr `npx prisma generate` a mano, o los campos nuevos fallan con
  `Unknown argument`.
- Los valores del `.env` no llevan comillas de sobra: `CLAVE="valor"`. Una
  comilla de más entra como parte del valor y Cloudinary responde
  `Invalid api_key`.

- `price` se guarda como `Decimal` y se expone como número en JSON.
- Las imágenes viven en Cloudinary (`ab-automotores/vehicles`); la base guarda
  `publicId` y `url` para poder borrarlas del CDN al quitarlas del catálogo.
- El campo `_honeyPot` del formulario de contacto se acepta pero nunca se guarda:
  si viene con contenido, la consulta se descarta y se responde igual que a un
  envío válido.
