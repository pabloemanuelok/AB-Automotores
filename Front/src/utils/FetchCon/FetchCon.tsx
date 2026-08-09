import { IConsulta, IConsultaInput } from "@/Interfaces/Interface";
import { request } from "@/utils/apiClient";

export const fetchGetConsultas = (token: string): Promise<IConsulta[]> =>
  request<IConsulta[]>("/leads", { token });

export const fetchPostConsulta = (
  consulta: IConsultaInput,
): Promise<IConsulta> =>
  request<IConsulta>("/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(consulta),
  });

export const fetchDeleteConsulta = (
  id: string,
  token: string,
): Promise<void> =>
  request<void>(`/leads/${id}`, { method: "DELETE", token });
