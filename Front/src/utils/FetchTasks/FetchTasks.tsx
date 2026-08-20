import { ITask, ITaskInput, ITaskStatusInput } from "@/Interfaces/Interface";
import { request } from "@/utils/apiClient";

export const fetchGetAllTasks = async (token: string): Promise<ITask[]> => {
  return request<ITask[]>("/tasks", { token });
};

export const fetchGetMyTasks = async (token: string): Promise<ITask[]> => {
  return request<ITask[]>("/tasks/mine", { token });
};

export const fetchCreateTask = async (task: ITaskInput, token: string): Promise<ITask> => {
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
  return request<ITask>(`/tasks/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(status),
    token,
  });
};

export const fetchDeleteTask = async (id: string, token: string): Promise<void> => {
  return request<void>(`/tasks/${id}`, { method: "DELETE", token });
};
