import { ITask, ITaskInput, ITaskStatusInput } from "@/Interfaces/Interface";
import { request } from "@/utils/apiClient";
import { getUserFromToken } from "@/utils/Auth/Auth";
import { mockTasks, nextMockTaskId } from "@/utils/mockData";
import { MOCK_ADMIN_ID } from "@/utils/mockAuth";

// El backend real todavía no tiene /tasks (ver docs/backend-specs/02-tasks-module.md).
// En desarrollo local no hay forma de probar estas vistas contra el backend, así que
// operamos sobre datos en memoria. Se elimina solo en build de producción (dead code).
const IS_MOCK = process.env.NODE_ENV === "development";
const mockDelay = () => new Promise((resolve) => setTimeout(resolve, 300));

export const fetchGetAllTasks = async (token: string): Promise<ITask[]> => {
  if (IS_MOCK) {
    await mockDelay();
    return [...mockTasks];
  }
  return request<ITask[]>("/tasks", { token });
};

export const fetchGetMyTasks = async (token: string): Promise<ITask[]> => {
  if (IS_MOCK) {
    await mockDelay();
    const me = getUserFromToken(token);
    return mockTasks.filter((t) => t.assignedTo === me?.id);
  }
  return request<ITask[]>("/tasks/mine", { token });
};

export const fetchCreateTask = async (task: ITaskInput, token: string): Promise<ITask> => {
  if (IS_MOCK) {
    await mockDelay();
    const nowIso = new Date().toISOString();
    const created: ITask = {
      id: nextMockTaskId(),
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      createdBy: MOCK_ADMIN_ID,
      type: task.type,
      status: "no_iniciada",
      daysOfWeek: task.daysOfWeek,
      scheduledTime: task.scheduledTime,
      active: true,
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    mockTasks.unshift(created);
    return created;
  }
  return request<ITask>("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
    token,
  });
};

export const fetchUpdateTask = async (
  id: string,
  task: Partial<ITaskInput>,
  token: string,
): Promise<ITask> => {
  if (IS_MOCK) {
    await mockDelay();
    const existing = mockTasks.find((t) => t.id === id);
    if (!existing) throw new Error("Tarea no encontrada");
    Object.assign(existing, task, { updatedAt: new Date().toISOString() });
    return existing;
  }
  return request<ITask>(`/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
    token,
  });
};

export const fetchUpdateTaskStatus = async (
  id: string,
  status: ITaskStatusInput,
  token: string,
): Promise<ITask> => {
  if (IS_MOCK) {
    await mockDelay();
    const existing = mockTasks.find((t) => t.id === id);
    if (!existing) throw new Error("Tarea no encontrada");
    existing.status = status.status;
    existing.failureReason = status.status === "no_completada" ? status.failureReason : undefined;
    if (status.status === "terminada") existing.lastCompletedAt = new Date().toISOString();
    existing.updatedAt = new Date().toISOString();
    return existing;
  }
  return request<ITask>(`/tasks/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(status),
    token,
  });
};

export const fetchDeleteTask = async (id: string, token: string): Promise<void> => {
  if (IS_MOCK) {
    await mockDelay();
    const index = mockTasks.findIndex((t) => t.id === id);
    if (index !== -1) mockTasks.splice(index, 1);
    return;
  }
  return request<void>(`/tasks/${id}`, { method: "DELETE", token });
};
