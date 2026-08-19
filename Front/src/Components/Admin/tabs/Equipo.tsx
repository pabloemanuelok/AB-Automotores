"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import Swal from "sweetalert2";
import {
  fetchGetEmployees,
  fetchCreateEmployee,
  fetchDeleteEmployee,
} from "@/utils/FetchEmployees/FetchEmployees";
import { getAuthToken } from "@/utils/Auth/Auth";
import { IEmployee } from "@/Interfaces/Interface";
import { UserContext } from "@/Context/contextUser";
import { useRealtimeRefetch } from "@/utils/useRealtimeRefetch";

const generatePassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });

const Equipo: React.FC = () => {
  const { handleSessionExpired } = useContext(UserContext);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Token no encontrado");
      const data = await fetchGetEmployees(token);
      setEmployees(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        handleSessionExpired();
        return;
      }
      setError("Error al obtener el equipo.");
    } finally {
      setLoading(false);
    }
  }, [handleSessionExpired]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  useRealtimeRefetch(["employee:created", "employee:removed"], loadEmployees);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setFormError(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (password.length < 8) {
      setFormError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setFormError("Token no encontrado.");
      return;
    }

    setSubmitting(true);
    try {
      const created = await fetchCreateEmployee({ name, email, password }, token);
      setEmployees((prev) => [...prev, created]);
      resetForm();
      setShowForm(false);
      Swal.fire({
        icon: "success",
        title: "Empleado creado",
        text: `${created.name} ya puede iniciar sesión con la contraseña asignada.`,
        confirmButtonColor: "#B62E30",
        background: "#1a1a1a",
        color: "#fff",
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        handleSessionExpired();
        return;
      }
      setFormError(
        err instanceof Error && err.message
          ? err.message
          : "No se pudo crear el empleado."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (employee: IEmployee) => {
    const result = await Swal.fire({
      title: `¿Eliminar a ${employee.name}?`,
      text: "Se eliminará su cuenta y todas las tareas que tenga asignadas. Esta acción no se puede deshacer.",
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

    setDeleting(employee.id);
    try {
      await fetchDeleteEmployee(employee.id, token);
      setEmployees((prev) => prev.filter((emp) => emp.id !== employee.id));
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "El empleado fue eliminado correctamente.",
        confirmButtonColor: "#B62E30",
        background: "#1a1a1a",
        color: "#fff",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        handleSessionExpired();
        return;
      }
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar al empleado.",
        confirmButtonColor: "#B62E30",
        background: "#1a1a1a",
        color: "#fff",
      });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-0.5">Equipo</h2>
          <p className="text-gray-400 text-sm">
            {employees.length} empleado{employees.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm((prev) => !prev);
            if (showForm) resetForm();
          }}
          className="px-4 py-2 bg-[#B62E30] hover:bg-[#9c2729] text-white text-sm font-medium rounded-lg transition-colors"
        >
          {showForm ? "Cancelar" : "+ Agregar empleado"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="mb-6 bg-[#1a1a1a] border border-[#505050]/40 rounded-xl p-5 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1.5">Nombre de usuario</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition"
                placeholder="ej: juanperez"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition"
                placeholder="empleado@abautomotores.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Contraseña</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  maxLength={20}
                  className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition"
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
                >
                  {showPassword ? "Ocultar" : "Ver"}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPassword(generatePassword());
                  setShowPassword(true);
                }}
                className="px-3 py-2 text-xs font-medium text-gray-300 border border-[#505050] rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                Generar
              </button>
            </div>
          </div>

          {formError && <p className="text-red-400 text-sm">{formError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-5 py-2 bg-[#B62E30] hover:bg-[#9c2729] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {submitting ? "Creando..." : "Crear empleado"}
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
          <button onClick={loadEmployees} className="mt-3 text-xs text-gray-400 hover:text-white transition-colors underline">
            Reintentar
          </button>
        </div>
      ) : employees.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-sm">
          Todavía no hay empleados cargados.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="bg-[#1a1a1a] border border-[#505050]/40 rounded-xl p-4 flex flex-col gap-1"
            >
              <p className="text-white text-sm font-semibold truncate">{employee.name}</p>
              <p className="text-gray-400 text-xs truncate">{employee.email}</p>
              <p className="text-gray-600 text-xs">Desde {formatDate(employee.createdAt)}</p>
              <button
                onClick={() => handleDelete(employee)}
                disabled={deleting === employee.id}
                className="mt-3 py-1.5 text-xs font-medium text-red-400 border border-red-900/40 rounded-lg hover:bg-red-900/20 transition-colors disabled:opacity-50"
              >
                {deleting === employee.id ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Equipo;
