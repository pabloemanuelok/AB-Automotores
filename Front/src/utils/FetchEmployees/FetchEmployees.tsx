import { IEmployee, IEmployeeInput } from "@/Interfaces/Interface";
import { request } from "@/utils/apiClient";

export const fetchGetEmployees = async (token: string): Promise<IEmployee[]> => {
  return request<IEmployee[]>("/users?role=empleado", { token });
};

export const fetchCreateEmployee = async (
  employee: IEmployeeInput,
  token: string,
): Promise<IEmployee> => {
  return request<IEmployee>("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...employee, role: "empleado" }),
    token,
  });
};

export const fetchDeleteEmployee = async (
  id: string,
  token: string,
): Promise<{ deletedTasksCount: number }> => {
  return request<{ deletedTasksCount: number }>(`/users/${id}`, {
    method: "DELETE",
    token,
  });
};
