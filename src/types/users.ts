export type User = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  imageName: string;
  company: number;
  location: number;
  userType: "employee" | "family";
  userTypeId: number;
  services: string[];
  position?: number;
  timezone: string;
  birthdate?: Date;
  gender?: number;
  accessToken: string;
  pdp: boolean;
  pdpDate: Date;
};

export type FamilyRelative = {
  id: number;
  patientId: number;
  line: number;
  familyRelativeId: number;
  name: string;
  lastName: string;
  relationship: number;
  livesWith: string;
  phone: string;
  email: string;
};

export type FamilyRelashionships = {
  value: number;
  label: string;
};

export enum GENDER {
  MALE = "male",
  FEMALE = "female",
  LGBTQ = "lgbtq",
  NON_BINARY = "non_binary",
  NO_ANSWER = "no_answer",
  UNKNOWN = "unknown",
}

export const GENDER_MAPPING: Record<string, GENDER> = {
  Masculino: GENDER.MALE,
  Femenino: GENDER.FEMALE,
  "Comunidad LGBTQ+": GENDER.LGBTQ,
  "No binario": GENDER.NON_BINARY,
  "Prefiero no responder": GENDER.NO_ANSWER,
};

export type Gender = {
  id: number;
  name: GENDER;
};

type EAPUser = {
  mail: string;
  idpaciente: number;
  sede: number;
  pdp: string;
  pdp_date: string;
  fecha_nacimiento: string;
  sexo: number | null;
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

export type AuthenticatedUserApiData = {
  user: EAPUser;
  token: string;
};

export type DecodedApiToken = {
  idpaciente: string;
  mail: string;
  tipo: string;
  empresa: string[];
  sede: string;
  nombre: string;
  dni: string;
  huso: string;
  apellido1: string;
  apellido2: string;
  telefono: string;
  movil: string;
  tipousuarioportal: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
};
