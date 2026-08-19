import { IEmployee, IEmployeeInput } from "@/Interfaces/Interface";
import { request } from "@/utils/apiClient";
import { mockEmployees, mockTasks, nextMockEmployeeId } from "@/utils/mockData";

// El backend real todavía no tiene /users con rol ni /tasks (ver docs/backend-specs/).
// En desarrollo local no hay forma de probar estas vistas contra el backend, así que
// operamos sobre datos en memoria. Se elimina solo en build de producción (dead code).
const IS_MOCK = process.env.NODE_ENV === "development";
const mockDelay = () => new Promise((resolve) => setTimeout(resolve, 300));

export const fetchGetEmployees = async (token: string): Promise<IEmployee[]> => {
  if (IS_MOCK) {
    await mockDelay();
    return [...mockEmployees];
  }
  return request<IEmployee[]>("/users?role=empleado", { token });
};

export const fetchCreateEmployee = async (
  employee: IEmployeeInput,
  token: string,
): Promise<IEmployee> => {
  if (IS_MOCK) {
    await mockDelay();
    const created: IEmployee = {
      id: nextMockEmployeeId(),
      name: employee.name,
      email: employee.email,
      role: "empleado",
      createdAt: new Date().toISOString(),
    };
    mockEmployees.push(created);
    return created;
  }
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
  if (IS_MOCK) {
    await mockDelay();
    const index = mockEmployees.findIndex((emp) => emp.id === id);
    if (index !== -1) mockEmployees.splice(index, 1);
    const tasksBefore = mockTasks.length;
    for (let i = mockTasks.length - 1; i >= 0; i--) {
      if (mockTasks[i].assignedTo === id) mockTasks.splice(i, 1);
    }
    return { deletedTasksCount: tasksBefore - mockTasks.length };
  }
  return request<{ deletedTasksCount: number }>(`/users/${id}`, {
    method: "DELETE",
    token,
  });
};
