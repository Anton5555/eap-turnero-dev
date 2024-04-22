export type User = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  image: string;
  company: number;
  location: number;
  userType: "employee" | "family";
  services: string[];
  position?: number;
  timezone: string;
  accessToken: string;
};

type EAPUser = {
  mail: string;
  idpaciente: number;
  sede: number;
  pdp: string;
  pdp_date: string;
  fecha_nacimiento: string;
  empresa: string;
  empresaname: null | string;
  telefono: null | string;
  movil: null | string;
  tipo: string;
  img: null | string;
  dni: null | string;
  nombre: string;
  apellido1: string;
  apellido2: null | string;
  huso: string;
  tipousuarioportal: string;
  a_b: string;
  puesto: null | string;
  turnoonline: string;
  password: null | string;
  paises: null | string;
  services: Array<{ code: string; name: string }>;
};

export type AuthenticatedUser = {
  user: EAPUser;
  token: string;
};
