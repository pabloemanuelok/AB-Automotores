import { IUser } from "@/Interfaces/Interface";

export function getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

/**
 * El payload firmado hoy es { username, sub, role? } — ver docs/backend-specs/01-roles-auth.md.
 * Mientras el backend real todavía no mande `role` (no migrado), tratamos esa cuenta como
 * admin: hoy el único usuario que existe es Fabrizio, así que es la lectura retrocompatible
 * correcta y evita que su login real pierda el link "Admin" del navbar.
 */
export function getUserFromToken(token: string): Partial<IUser> | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub,
      name: payload.username,
      role: payload.role ?? "admin",
    };
  } catch {
    return null;
  }
}