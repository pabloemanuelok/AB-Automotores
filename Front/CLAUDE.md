# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS, deployed on Netlify.

**Path alias:** `@/*` maps to `./src/*`.

### Routing

All routes live under `src/app/`:
- `/` — Landing page with dynamic-imported section components (`Section0`–`Section5`)
- `/views/catalogo` — Product catalog (server-side fetch, client pagination/sorting)
- `/views/details/[productId]` — Dynamic product detail route
- `/views/admin` — Admin panel, wrapped with `ProtectedPage` HOC
- `/views/login` — Authentication
- `/views/contacto`, `/views/consignaciones`, `/views/financiacion` — Contact/inquiry forms

The root layout (`src/app/layout.tsx`) wraps the entire app with `UserProvider`, `Navbar`, `Footer`, and `FloatingWhatsApp`.

### Authentication & State

`src/Context/contextUser.tsx` is the single source of auth state (`user`, `isLogged`, `token`). The token comes from the login response and is persisted to `localStorage`. On mount, the context re-hydrates from `localStorage`.

Protected routes use the `ProtectedPage` HOC (`src/Components/ProtectedPage/`), which redirects unauthenticated users to `/views/login`.

There is no Redux or Zustand — only React Context + local `useState`.

### API Layer

Backend: `https://ab-backend-iznbqeqe7a-uc.a.run.app`

All API calls go through custom fetch utilities in `src/utils/`:
- `FetchCars/FetchCars.tsx` — product CRUD (`GET /products`, `POST /products`, `DELETE /products/{id}`)
- `FetchUsers/FetchUsers.tsx` — auth (`POST /auth/login`)
- `FetchCon/FetchCon.tsx` — inquiries (`GET/POST/DELETE /consultas`)
- `Auth/Auth.tsx` — helper to retrieve the token from `localStorage` client-side

Protected endpoints use `Authorization: Bearer {token}` headers. Product creation uses `FormData` (file upload).

### Images

Images are served from Cloudinary (`res.cloudinary.com`) via `next-cloudinary`. The `next.config.mjs` also allowlists several other external domains. Add new image domains there if needed.

### Key Libraries

| Library | Purpose |
|---|---|
| `framer-motion` | Page/section animations |
| `swiper` + `react-swipeable` | Image carousels |
| `sweetalert2` | User notifications/alerts |
| `@nextui-org/react` | UI input components |
| `next-cloudinary` | Cloudinary image component |
