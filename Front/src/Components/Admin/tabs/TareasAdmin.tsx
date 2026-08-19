"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import Swal from "sweetalert2";
import {
  fetchGetAllTasks,
  fetchCreateTask,
  fetchUpdateTask,
  fetchDeleteTask,
} from "@/utils/FetchTasks/FetchTasks";
import { fetchGetEmployees } from "@/utils/FetchEmployees/FetchEmployees";
import { getAuthToken } from "@/utils/Auth/Auth";
import { IEmployee, ITask, TaskType } from "@/Interfaces/Interface";
import { UserContext } from "@/Context/contextUser";
import { useRealtimeRefetch } from "@/utils/useRealtimeRefetch";
import {
  TASK_STATUS_LABELS,
  TASK_STATUS_STYLES,
  DAYS_OF_WEEK,
  formatDaysOfWeek,
} from "@/utils/taskStatus";

const emptyForm = {
  title: "",
  description: "",
  assignedTo: "",
  type: "puntual" as TaskType,
  daysOfWeek: [] as number[],
  scheduledTime: "",
};

const TareasAdmin: React.FC = () => {
  const { handleSessionExpired } = useContext(UserContext);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [filterEmployee, setFilterEmployee] = useState("todos");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Token no encontrado");
      const [tasksData, employeesData] = await Promise.all([
        fetchGetAllTasks(token),
        fetchGetEmployees(token),
      ]);
      setTasks(tasksData);
      setEmployees(employeesData);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        handleSessionExpired();
        return;
      }
      setError("Error al obtener las tareas.");
    } finally {
      setLoading(false);
    }
  }, [handleSessionExpired]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useRealtimeRefetch(
    ["task:created", "task:updated", "task:deleted", "employee:created", "employee:removed", "routines:reset"],
    loadData,
  );

  const employeeName = (id: string) =>
    employees.find((emp) => emp.id === id)?.name ?? "—";

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setFormError(null);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const toggleForm = () => {
    if (showForm) {
      setShowForm(false);
      resetForm();
    } else {
      openCreateForm();
    }
  };

  const openEditForm = (task: ITask) => {
    setForm({
      title: task.title,
      description: task.description ?? "",
      assignedTo: task.assignedTo,
      type: task.type,
      daysOfWeek: task.daysOfWeek ?? [],
      scheduledTime: task.scheduledTime ?? "",
    });
    setEditingId(task.id);
    setFormError(null);
    setShowForm(true);
  };

  const toggleDay = (day: number) => {
    setForm((prev) => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter((d) => d !== day)
        : [...prev.daysOfWeek, day],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!form.assignedTo) {
      setFormError("Elegí a qué empleado se le asigna.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setFormError("Token no encontrado.");
      return;
    }

    const payload = {
      title: form.title,
      description: form.description || undefined,
      assignedTo: form.assignedTo,
      type: form.type,
      daysOfWeek: form.type === "rutina" && form.daysOfWeek.length > 0 ? form.daysOfWeek : undefined,
      scheduledTime: form.type === "rutina" && form.scheduledTime ? form.scheduledTime : undefined,
    };

    setSubmitting(true);
    try {
      if (editingId) {
        const updated = await fetchUpdateTask(editingId, payload, token);
        setTasks((prev) => prev.map((t) => (t.id === editingId ? updated : t)));
      } else {
        const created = await fetchCreateTask(payload, token);
        setTasks((prev) => [created, ...prev]);
      }
      resetForm();
      setShowForm(false);
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        handleSessionExpired();
        return;
      }
      setFormError("No se pudo guardar la tarea.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (task: ITask) => {
    const result = await Swal.fire({
      title: "¿Eliminar tarea?",
      text: `"${task.title}" será eliminada permanentemente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B62E30",
      cancelButtonColor: "#505050",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#1a1a1a",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    const token = getAuthToken();
    if (!token) return;

    setDeleting(task.id);
    try {
      await fetchDeleteTask(task.id, token);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        handleSessionExpired();
        return;
      }
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la tarea.",
        confirmButtonColor: "#B62E30",
        background: "#1a1a1a",
        color: "#fff",
      });
    } finally {
      setDeleting(null);
    }
  };

  const filteredTasks =
    filterEmployee === "todos" ? tasks : tasks.filter((t) => t.assignedTo === filterEmployee);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-0.5">Tareas</h2>
          <p className="text-gray-400 text-sm">
            {filteredTasks.length} tarea{filteredTasks.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
            className="px-3 py-2 bg-[#2a2a2a] border border-[#505050] text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition"
          >
            <option value="todos">Todos los empleados</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
          <button
            onClick={toggleForm}
            className="px-4 py-2 bg-[#B62E30] hover:bg-[#9c2729] text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
          >
            {showForm ? "Cancelar" : "+ Nueva tarea"}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-[#1a1a1a] border border-[#505050]/40 rounded-xl p-5 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1.5">Título</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                required
                className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition"
                placeholder="ej: Publicar autos en Facebook"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1.5">Asignar a</label>
              <select
                value={form.assignedTo}
                onChange={(e) => setForm((prev) => ({ ...prev, assignedTo: e.target.value }))}
                required
                className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#505050] text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition"
              >
                <option value="">Elegir empleado...</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Descripción (opcional)</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition resize-none"
              placeholder="Detalles adicionales..."
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Tipo</label>
            <div className="flex gap-2">
              {(["puntual", "rutina"] as TaskType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, type }))}
                  className={`px-4 py-1.5 text-sm rounded-lg border transition-colors ${
                    form.type === type
                      ? "bg-[#B62E30]/15 border-[#B62E30] text-white"
                      : "border-[#505050] text-gray-400 hover:text-white"
                  }`}
                >
                  {type === "puntual" ? "Puntual" : "Rutina diaria"}
                </button>
              ))}
            </div>
          </div>

          {form.type === "rutina" && (
            <div className="grid sm:grid-cols-2 gap-4 bg-[#111] border border-[#505050]/30 rounded-lg p-4">
              <div>
                <label className="block text-gray-400 text-xs mb-1.5">Días (vacío = todos los días)</label>
                <div className="flex flex-wrap gap-1.5">
                  {DAYS_OF_WEEK.map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => toggleDay(index)}
                      className={`w-10 h-8 text-xs rounded-md border transition-colors ${
                        form.daysOfWeek.includes(index)
                          ? "bg-[#B62E30]/20 border-[#B62E30] text-white"
                          : "border-[#505050] text-gray-400 hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-1.5">Horario de referencia</label>
                <input
                  type="time"
                  value={form.scheduledTime}
                  onChange={(e) => setForm((prev) => ({ ...prev, scheduledTime: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#505050] text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition"
                />
              </div>
            </div>
          )}

          {formError && <p className="text-red-400 text-sm">{formError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-5 py-2 bg-[#B62E30] hover:bg-[#9c2729] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {submitting ? "Guardando..." : editingId ? "Guardar cambios" : "Crear tarea"}
          </button>
        </form>
      )}

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
          <button onClick={loadData} className="mt-3 text-xs text-gray-400 hover:text-white transition-colors underline">
            Reintentar
          </button>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-sm">
          {employees.length === 0
            ? "Primero agregá empleados en la pestaña Equipo."
            : "No hay tareas cargadas."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-[#1a1a1a] border border-[#505050]/40 rounded-xl p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white text-sm font-semibold">{task.title}</p>
                <span
                  className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border ${TASK_STATUS_STYLES[task.status]}`}
                >
                  {TASK_STATUS_LABELS[task.status]}
                </span>
              </div>
              <p className="text-gray-400 text-xs mb-1">{employeeName(task.assignedTo)}</p>
              {task.type === "rutina" && (
                <p className="text-gray-600 text-xs mb-2">
                  Rutina · {formatDaysOfWeek(task.daysOfWeek)}
                  {task.scheduledTime ? ` · ${task.scheduledTime}` : ""}
                </p>
              )}
              {task.description && (
                <p className="text-gray-500 text-xs mb-2 line-clamp-2">{task.description}</p>
              )}
              {task.status === "no_completada" && task.failureReason && (
                <p className="text-red-400/80 text-xs mb-2 italic">&quot;{task.failureReason}&quot;</p>
              )}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => openEditForm(task)}
                  className="py-1.5 text-xs font-medium text-blue-300 border border-blue-900/40 rounded-lg hover:bg-blue-900/20 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(task)}
                  disabled={deleting === task.id}
                  className="py-1.5 text-xs font-medium text-red-400 border border-red-900/40 rounded-lg hover:bg-red-900/20 transition-colors disabled:opacity-50"
                >
                  {deleting === task.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TareasAdmin;
