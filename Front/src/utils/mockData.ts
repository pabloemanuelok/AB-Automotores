import { IEmployee, ITask } from "@/Interfaces/Interface";
import { MOCK_EMPLEADO_ID } from "@/utils/mockAuth";

/**
 * Store en memoria usado SOLO en desarrollo (ver el gate NODE_ENV === "development"
 * en FetchEmployees.tsx / FetchTasks.tsx) para poder ver el panel de admin y la vista
 * de empleado con datos de ejemplo mientras el backend real todavía no tiene los
 * endpoints de /users con rol ni de /tasks. Se reinicia en cada recarga de página.
 */

const now = new Date().toISOString();

export const mockEmployees: IEmployee[] = [
  {
    id: MOCK_EMPLEADO_ID,
    name: "empleado.mock",
    email: "empleado.demo@abautomotores.com",
    role: "empleado",
    createdAt: now,
  },
  {
    id: "mock-empleado-2",
    name: "martina.mock",
    email: "martina.demo@abautomotores.com",
    role: "empleado",
    createdAt: now,
  },
];

export const mockTasks: ITask[] = [
  {
    id: "mock-task-1",
    title: "Publicar autos en Facebook",
    description: "Subir las 3 unidades destacadas de la semana al muro.",
    assignedTo: MOCK_EMPLEADO_ID,
    createdBy: "mock-admin-id",
    type: "rutina",
    status: "no_iniciada",
    daysOfWeek: [1, 2, 3, 4, 5],
    scheduledTime: "09:00",
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-task-2",
    title: "Revisar consultas del formulario",
    description: "Responder a los clientes que dejaron sus datos ayer.",
    assignedTo: MOCK_EMPLEADO_ID,
    createdBy: "mock-admin-id",
    type: "puntual",
    status: "en_proceso",
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-task-3",
    title: "Actualizar fotos del Corolla 2021",
    assignedTo: MOCK_EMPLEADO_ID,
    createdBy: "mock-admin-id",
    type: "puntual",
    status: "no_completada",
    failureReason: "Faltan las llaves del auto para moverlo a la zona de fotos.",
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-task-4",
    title: "Limpieza del salón",
    assignedTo: "mock-empleado-2",
    createdBy: "mock-admin-id",
    type: "rutina",
    status: "terminada",
    scheduledTime: "08:30",
    active: true,
    createdAt: now,
    updatedAt: now,
  },
];

let taskIdCounter = mockTasks.length + 1;
let employeeIdCounter = mockEmployees.length + 1;

export const nextMockTaskId = () => `mock-task-${taskIdCounter++}`;
export const nextMockEmployeeId = () => `mock-empleado-${employeeIdCounter++}`;
