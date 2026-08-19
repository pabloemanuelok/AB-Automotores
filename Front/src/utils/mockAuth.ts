import { UserRole } from "@/Interfaces/Interface";

export const MOCK_ADMIN_ID = "mock-admin-id";
export const MOCK_EMPLEADO_ID = "mock-empleado-id";

const base64UrlEncode = (obj: object) => btoa(JSON.stringify(obj));

/**
 * Genera un JWT con forma válida pero sin firma real. Solo sirve para pruebas
 * locales: el front nunca verifica la firma, solo decodifica el payload
 * (ver isTokenExpired/getUserFromToken en Auth.tsx), así que alcanza para
 * simular una sesión de admin o empleado sin backend.
 */
export function createMockToken(role: UserRole): string {
  const header = { alg: "none", typ: "JWT" };
  const payload = {
    sub: role === "admin" ? MOCK_ADMIN_ID : MOCK_EMPLEADO_ID,
    username: role === "admin" ? "fabrizio.mock" : "empleado.mock",
    role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
  };
  return `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.mock-signature`;
}
