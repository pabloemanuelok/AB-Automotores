export type FuelType = "NAFTA" | "DIESEL" | "GNC" | "HIBRIDO" | "ELECTRICO";
export type VehicleCondition = "NUEVO" | "USADO";
export type VehicleStatus = "DISPONIBLE" | "RESERVADO" | "VENDIDO";

interface IVehicleImage {
  id: string;
  url: string;
  position: number;
}

interface IProduct {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version?: string | null;
  year: number;
  price: number;
  km?: number | null;
  fuelType?: FuelType | null;
  transmission?: string | null;
  color?: string | null;
  condition: VehicleCondition;
  status: VehicleStatus;
  description: string;
  featured: boolean;
  featuredRank?: number | null;
  motor?: string | null;
  potencia?: string | null;
  traccion?: string | null;
  autonomia?: string | null;
  velocidadMax?: string | null;
  largo?: string | null;
  ancho?: string | null;
  alto?: string | null;
  tanque?: string | null;
  baul?: string | null;
  images: IVehicleImage[];
  createdAt: string;
  updatedAt: string;
}

interface IProductUpdate {
  brand?: string;
  model?: string;
  version?: string;
  year?: number;
  price?: number;
  km?: number;
  fuelType?: FuelType;
  transmission?: string;
  color?: string;
  condition?: VehicleCondition;
  status?: VehicleStatus;
  description?: string;
  featured?: boolean;
  motor?: string;
  potencia?: string;
  traccion?: string;
  autonomia?: string;
  velocidadMax?: string;
  largo?: string;
  ancho?: string;
  alto?: string;
  tanque?: string;
  baul?: string;
}

type UserRole = "admin" | "empleado";

interface IUser {
  id: string;
  name: string;
  role: UserRole;
}

interface ILogin {
  name: string;
  password: string;
}

interface IProductCardProps {
  product: IProduct;
  remove?: () => void;
}

interface IDetailsProps {
  product: IProduct;
}

interface ICardsListProps {
  products: IProduct[];
}

interface IConsulta {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  mensaje?: string | null;
  createdAt: string;
}

interface IConsultaInput {
  nombre: string;
  email: string;
  telefono: string;
  mensaje?: string;
  _honeyPot?: string;
}

interface IEmployee {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

interface IEmployeeInput {
  name: string;
  email: string;
  password: string;
}

type TaskType = "puntual" | "rutina";
type TaskStatus = "no_iniciada" | "en_proceso" | "terminada" | "no_completada";

interface ITask {
  id: string;
  title: string;
  description?: string | null;
  assignedTo: string;
  assignedToName?: string;
  createdBy: string;
  type: TaskType;
  status: TaskStatus;
  failureReason?: string | null;
  daysOfWeek?: number[] | null;
  scheduledTime?: string | null;
  lastCompletedAt?: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ITaskInput {
  title: string;
  description?: string;
  assignedTo: string;
  type: TaskType;
  daysOfWeek?: number[];
  scheduledTime?: string;
}

interface ITaskStatusInput {
  status: TaskStatus;
  failureReason?: string;
}

interface IUserContextType {
  user: Partial<IUser> | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUser> | null>>;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  login: (credential: ILogin) => Promise<boolean>;
  logout: () => void;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  sessionExpired: boolean;
  handleSessionExpired: () => void;
  authReady: boolean;
  /** Socket del namespace /tasks, ver docs/backend-specs/03-realtime.md. Nulo mientras no haya sesión. */
  socket: import("socket.io-client").Socket | null;
}

export type {
  ICardsListProps,
  IConsulta,
  IConsultaInput,
  IDetailsProps,
  IEmployee,
  IEmployeeInput,
  ILogin,
  IProduct,
  IProductCardProps,
  IProductUpdate,
  ITask,
  ITaskInput,
  ITaskStatusInput,
  IUser,
  IUserContextType,
  IVehicleImage,
  TaskStatus,
  TaskType,
  UserRole,
};
