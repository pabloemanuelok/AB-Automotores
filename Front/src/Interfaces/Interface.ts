interface IProduct {
    _id: string;
    name: string;
    version: string;
    year: number;
    description: string;
    mainImgUrl: string;
    images: string[];
  }

interface IUser {
    _id: string;
    name: string;
    password: string;
}

interface ILogin {
    name: string;
    password: string;
}

interface IProductCardProps {
    product: IProduct,
    remove?: () => void
  }

  interface IDetailsProps {
    product: IProduct;
  }

// Consulta

export enum Banco {
  SANTANDER = "Santander",
  HSBC = "HSBC",
  SUPERVIELLE = "Supervielle",
  BANCOR = "Bancor"
}

interface IConsulta {
  _id: string;
  nombre: string;
  email: string;
  telefono: string;
  banco: Banco;
  mensaje?: string;
}


interface ICardsListProps {
  products: IProduct[];
}

// CreateUserDto

interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

interface IUserContextType {
  user: Partial<IUser> | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUser> | null>>;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  login: (credential: ILogin) => Promise<boolean>;
  logout: () => void; // Agregar la función logout
  token: string | null; // Mantener la propiedad token
}


  export type {
    ICardsListProps,
    IUserContextType,
    IUser,
    IDetailsProps,
    IProductCardProps,
    IProduct,
    ILogin,
    IConsulta,
    ICreateUser
  } 