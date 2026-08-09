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

interface IUser {
  id: string;
  name: string;
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

interface IUserContextType {
  user: Partial<IUser> | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUser> | null>>;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  login: (credential: ILogin) => Promise<boolean>;
  logout: () => void;
  token: string | null;
  sessionExpired: boolean;
  handleSessionExpired: () => void;
  authReady: boolean;
}

export type {
  ICardsListProps,
  IConsulta,
  IConsultaInput,
  IDetailsProps,
  ILogin,
  IProduct,
  IProductCardProps,
  IProductUpdate,
  IUser,
  IUserContextType,
  IVehicleImage,
};
