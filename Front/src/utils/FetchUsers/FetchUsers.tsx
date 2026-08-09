import { ILogin } from "@/Interfaces/Interface";
import { request } from "@/utils/apiClient";

export const postLogin = (credentials: ILogin): Promise<{ access_token: string }> =>
  request<{ access_token: string }>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
