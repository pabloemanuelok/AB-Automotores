import { TaskStatus } from "@/Interfaces/Interface";

export const TASK_STATUS_ORDER: TaskStatus[] = [
  "no_iniciada",
  "en_proceso",
  "terminada",
  "no_completada",
];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  no_iniciada: "No iniciada",
  en_proceso: "En proceso",
  terminada: "Terminada",
  no_completada: "No se pudo completar",
};

export const TASK_STATUS_STYLES: Record<TaskStatus, string> = {
  no_iniciada: "bg-gray-500/15 text-gray-300 border-gray-500/30",
  en_proceso: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  terminada: "bg-green-500/15 text-green-300 border-green-500/30",
  no_completada: "bg-red-500/15 text-red-400 border-red-500/30",
};

export const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export const formatDaysOfWeek = (days?: number[] | null) => {
  if (!days || days.length === 0) return "Todos los días";
  return days
    .slice()
    .sort((a, b) => a - b)
    .map((d) => DAYS_OF_WEEK[d])
    .join(", ");
};
