"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import { fetchGetMyTasks, fetchUpdateTaskStatus } from "@/utils/FetchTasks/FetchTasks";
import { getAuthToken } from "@/utils/Auth/Auth";
import { ITask, TaskStatus } from "@/Interfaces/Interface";
import { UserContext } from "@/Context/contextUser";
import { useRealtimeRefetch } from "@/utils/useRealtimeRefetch";
import {
  TASK_STATUS_ORDER,
  TASK_STATUS_LABELS,
  TASK_STATUS_STYLES,
  formatDaysOfWeek,
} from "@/utils/taskStatus";

const MisTareas: React.FC = () => {
  const { handleSessionExpired } = useContext(UserContext);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [reasonEditingId, setReasonEditingId] = useState<string | null>(null);
  const [reasonDrafts, setReasonDrafts] = useState<Record<string, string>>({});

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Token no encontrado");
      const data = await fetchGetMyTasks(token);
      setTasks(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        handleSessionExpired();
        return;
      }
      setError("Error al obtener tus tareas.");
    } finally {
      setLoading(false);
    }
  }, [handleSessionExpired]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useRealtimeRefetch(["task:created", "task:updated", "task:deleted", "routines:reset"], loadTasks);

  const applyStatus = async (task: ITask, status: TaskStatus, failureReason?: string) => {
    const token = getAuthToken();
    if (!token) return;

    setUpdating(task.id);
    try {
      const updated = await fetchUpdateTaskStatus(task.id, { status, failureReason }, token);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
      setReasonEditingId(null);
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        handleSessionExpired();
        return;
      }
      setError("No se pudo actualizar el estado. Probá de nuevo.");
    } finally {
      setUpdating(null);
    }
  };

  const handleStatusChange = (task: ITask, status: TaskStatus) => {
    if (status === "no_completada") {
      setReasonEditingId(task.id);
      setReasonDrafts((prev) => ({ ...prev, [task.id]: prev[task.id] ?? "" }));
      return;
    }
    applyStatus(task, status);
  };

  const confirmFailureReason = (task: ITask) => {
    const reason = (reasonDrafts[task.id] ?? "").trim();
    if (!reason) return;
    applyStatus(task, "no_completada", reason);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-6 py-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white mb-0.5">Mis tareas</h1>
          <p className="text-gray-400 text-sm">
            {tasks.length} tarea{tasks.length !== 1 ? "s" : ""} asignada{tasks.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={loadTasks}
          title="Actualizar"
          className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <svg className="animate-spin w-8 h-8 text-[#B62E30]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400 text-sm">{error}</p>
          <button onClick={loadTasks} className="mt-3 text-xs text-gray-400 hover:text-white transition-colors underline">
            Reintentar
          </button>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-sm">
          No tenés tareas asignadas por ahora.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-[#1a1a1a] border border-[#505050]/40 rounded-xl p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white text-sm font-semibold">{task.title}</p>
                <span
                  className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border ${TASK_STATUS_STYLES[task.status]}`}
                >
                  {TASK_STATUS_LABELS[task.status]}
                </span>
              </div>

              {task.type === "rutina" && (
                <p className="text-gray-500 text-xs mb-2">
                  Rutina diaria · {formatDaysOfWeek(task.daysOfWeek)}
                  {task.scheduledTime ? ` · ${task.scheduledTime}` : ""}
                </p>
              )}

              {task.description && (
                <p className="text-gray-400 text-sm mb-3">{task.description}</p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {TASK_STATUS_ORDER.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(task, status)}
                    disabled={updating === task.id}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors disabled:opacity-50 ${
                      task.status === status
                        ? "bg-[#B62E30]/15 border-[#B62E30] text-white"
                        : "border-[#505050] text-gray-400 hover:text-white hover:border-gray-400"
                    }`}
                  >
                    {TASK_STATUS_LABELS[status]}
                  </button>
                ))}
              </div>

              {reasonEditingId === task.id && (
                <div className="mt-3">
                  <textarea
                    value={reasonDrafts[task.id] ?? ""}
                    onChange={(e) =>
                      setReasonDrafts((prev) => ({ ...prev, [task.id]: e.target.value }))
                    }
                    rows={2}
                    required
                    placeholder="Contanos por qué no se pudo completar..."
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition resize-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => confirmFailureReason(task)}
                      disabled={!(reasonDrafts[task.id] ?? "").trim() || updating === task.id}
                      className="px-4 py-1.5 bg-[#B62E30] hover:bg-[#9c2729] disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setReasonEditingId(null)}
                      className="px-4 py-1.5 text-xs font-medium text-gray-400 border border-[#505050] rounded-lg hover:bg-white/5 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {task.status === "no_completada" && task.failureReason && reasonEditingId !== task.id && (
                <p className="text-red-400/80 text-xs mt-3 italic">&quot;{task.failureReason}&quot;</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisTareas;
