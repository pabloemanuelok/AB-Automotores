export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);

const authHeaders = (token: string) => ({ Authorization: `Bearer ${token}` });

/** Callers treat this as the signal to send the user back to the login screen. */
const UNAUTHORIZED = "UNAUTHORIZED";

async function request<T>(
  path: string,
  { token, ...init }: RequestInit & { token?: string | null } = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      ...(token ? authHeaders(token) : {}),
    },
  });

  if (response.status === 401) throw new Error(UNAUTHORIZED);

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Error ${response.status} en ${path}`);
  }

  return response.status === 204
    ? (undefined as T)
    : ((await response.json()) as T);
}

export { request, UNAUTHORIZED };
