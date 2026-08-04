# Sprint 1 · Infraestructura SEO técnica — Reporte de implementación
### AB Automotores · automotoresab.com.ar

> **Para:** Jonathan Zuk
> **De:** Pablo Fernandez
> **Fecha:** 04/08/2026
> **Sobre:** Implementación de las 12 tareas del documento "Sprint 1 · Infraestructura SEO técnica"

---

## Resumen

Se implementaron **11 de las 12 tareas** del sprint. La única pendiente es la tarea 1 (redirect www → sin-www), que se configura desde el panel de Vercel y no es un cambio de código.

Antes de implementar detectamos que el código tenía el dominio mal cargado: `metadataBase` apuntaba a `abautomotores.com.ar` (palabras invertidas) en vez de `automotoresab.com.ar`. Lo corregimos como parte de la tarea 2, ya que todo lo demás (canonicals, robots, sitemap, schema) depende de ese valor.

Todo lo de abajo está verificado localmente (build de producción limpio + inspección de HTML servido). Lo que requiere el dominio real en producción (redirects, Search Console, GA4 Realtime) queda para verificar después del deploy.

---

## Detalle por tarea

### 1 · Redirect www → sin-www
**Pendiente**, es un cambio de configuración en Vercel (Settings → Domains), no de código.

### 2 · `metadataBase` + metadata global
Hecho en `src/app/layout.tsx`. Se corrigió el dominio (ver nota arriba), se armó `title.default` + `title.template`, `alternates.canonical`, `openGraph` completo y el bloque `robots`. Se mantuvo intacto el `verification.google` que ya existía. De paso se actualizó `<html lang="es">` a `lang="es-AR"`.

### 3 · Metadata por página
Hecho en catálogo, financiación, consignaciones y contacto. Cada una tiene su propio `title`, `description`, `alternates.canonical` y un bloque `openGraph` completo (repitiendo `type`/`locale`/`siteName`/`images`, tal como marcaba el doc, para que Next no pierda esos campos al no mergear el objeto del layout).

Las 4 páginas ya eran Server Components, así que no hizo falta el plan B de separar Server/Client que mencionaba el documento.

### 4 · Fichas de vehículo en `noindex`
Hecho. `noindex, follow` en `src/app/views/details/[productId]/page.tsx`.

### 5 · Fix del error 500 en autos borrados
Hecho, pero la causa real resultó **distinta** a la que se describía en el documento. No es que el backend tire un error al buscar un ID inexistente: **devuelve HTTP 200** en los dos casos problemáticos:
- ID con formato válido pero inexistente → `200` con body `{}`
- ID con formato inválido → `200` con el objeto de error crudo de Mongoose (`CastError`)

Como nunca hay un `!res.ok` que disparar, el fix de "try/catch + notFound()" no alcanzaba solo. Se agregó además una validación de que la respuesta tenga forma de producto real (`_id` y `name` presentes) antes de darla por válida; si no, se trata como no encontrado y se llama a `notFound()`. Verificado con curl contra ambos casos, y contra el ID de ejemplo del documento (`000000000000000000000000`): ahora responde **404** en los tres casos.

Puede ser útil pasarle este dato al equipo de backend — no es algo que se pueda arreglar completamente del lado del front, es una coincidencia contenida pero no resuelve que el backend en sí no distingue "no encontrado" de "encontrado vacío".

### 6 · `robots.ts`
Hecho, en `src/app/robots.ts`. Único cambio respecto al doc: el `disallow` no incluye `/api/` porque el proyecto no tiene rutas API propias (el backend es 100% externo). En su lugar se bloquean `/views/admin` y `/views/login`, que son las rutas reales que no conviene indexar.

### 7 · `sitemap.ts`
Hecho, en `src/app/sitemap.ts`, con las 5 URLs indicadas.

### 8 · Schema AutoDealer (JSON-LD)
Hecho, en `src/app/layout.tsx`, con `<script>` crudo (no `next/script`). Los horarios de atención se tomaron de los que ya están publicados en la página de Contacto (Lun a Vie 9 a 13 y 15 a 19, Sáb 9 a 13) en vez de los 9 a 19 corridos que traía el ejemplo del documento, para que el schema no contradiga lo que el sitio ya le muestra al usuario.

`logo` e `image` apuntan por ahora al logo existente (`LogoRojo.png`) como placeholder — falta que nos pasen el `/og-default.jpg` (ver pendientes).

### 9 · NAP del footer
Hecho. Dice ahora "Avenida Amadeo Sabattini 4260, Empalme, X5006KQT Córdoba", igual a la ficha de Google.

### 10 · Teléfonos como `tel:`
Hecho, en el footer y en la página de Contacto.

### 11 · Año del footer + contador de trayectoria
Hecho. El copyright ya calcula el año actual. El contador de "+23 años" ahora se sirve con el valor final en el HTML crudo del servidor (verificado con curl, sin JavaScript) y la animación de conteo se sigue viendo igual al hacer scroll.

### 12 · Eventos de contacto en GA4
Hecho, usando `sendGAEvent` (el proyecto ya tenía `@next/third-parties/google` integrado). Eventos agregados:
- `click_whatsapp` con `origen`: `flotante`, `footer`, `ficha_vehiculo`
- `click_telefono` con `origen`: `footer`, `contacto`
- `envio_formulario` con `origen`: `contacto`

El proyecto ya tenía un sistema propio de contadores en `localStorage` para un dashboard interno del admin (no relacionado a GA4) — se dejó intacto, los eventos de GA4 se agregaron al lado.

---

## Pendientes que no dependen del desarrollo

- **`/og-default.jpg`**: falta la imagen de 1200×630px con el logo sobre fondo de marca. Mientras tanto el layout usa el logo actual como reemplazo temporal.
- **Redirect www → sin-www**: configuración manual en Vercel.

## Verificación

Se corrió `npm run build` limpio (sin errores de tipos ni de compilación) y se inspeccionó el HTML servido localmente para confirmar: títulos y OG distintos por página, canonical correcto, schema presente en el HTML crudo, `/robots.txt` y `/sitemap.xml` generados, `noindex` en fichas de vehículo, 404 real en IDs inexistentes/inválidos, y el contador de trayectoria con el valor final en el SSR.

Los checks que dependen del dominio real (redirect 308, Search Console, GA4 Realtime) quedan para correr una vez deployado.
