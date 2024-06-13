import { env } from "~/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ActiveCaseApiData {
  id: number;
  area: number;
  servicio: number;
  especialidad: number;
  idpaciente: number;
  idpaceap: number;
  autpadron: string | null;
  estado: string;
  user_owner: string;
  pool_owner: number;
  prev_owner: string;
  prev_pool: number;
  numactosperm: number;
  nombrefam: string | null;
  parentesco: string | null;
  edadfam: number;
  relconvfam: string | null;
  motivo: string | null;
  comentariosupervisor: string | null;
  tipoatencion: number;
  create_date: string;
  caso_apertura: string | null;
  caso_cierre: string | null;
  idproceso: number;
  close_date: string;
  maxcitas_telefonicas: number;
  maxcitas_presenciales: number;
  maxcitas_videollamada: number;
  derivado_fuente_externa: string | null;
  comentario_fuente_externa: string | null;
  empresa: number;
  sede: number;
  puesto: number;
  modalidad: number;
  maxcitas_globales: number;
  critico: string | null;
  motivo_consulta: number;
  monitor: string | null;
  etapa_monitoreo: number;
  leido: string | null;
  aceptado: string | null;
  motivo_caso_cierre: number;
  preclasificacion: number;
  relacionado_dei: string | null;
  relacionado_laboral: number;
  idcasoseapol: number;
  sel: string | null;
  isdirty: boolean;
  lineascaso1: never[];
  lineascaso2: never[];
  lineascaso3: never[];
}

const GetActiveCaseAdapter = (props: {
  areaId: number;
  serviceId: number;
  specialtyId: number;
  patientId: number;
}) => ({
  caso: {
    area: props.areaId,
    servicio: props.serviceId,
    especialidad: props.specialtyId,
    idpaciente: props.patientId,
  },
});

const CreateCaseAdapter = (props: {
  areaId: number;
  serviceId: number;
  specialtyId: number;
  patientId: number;
  professionalSapUser: string;
  isFamilyMember: boolean;
  familyMemberName: string;
  companyId: number;
  locationId: number;
  positionId: number;
  modalityId: number;
  processType: number;
}) => ({
  caso: {
    id: -1,
    area: props.areaId,
    servicio: props.serviceId,
    especialidad: props.specialtyId,
    idpaciente: props.patientId,
    idpaceap: -1,
    autpadron: "",
    estado: "A",
    user_owner: props.professionalSapUser,
    pool_owner: -1,
    prev_owner: "online",
    prev_pool: -1,
    esfamiliar: props.isFamilyMember ? "S" : "N",
    numactosperm: -1,
    idhuso: -1,
    nombrefam: props.familyMemberName,
    parentesco: "",
    edadfam: -1,
    relconvfam: "",
    motivo: "",
    create_date: new Date().toISOString(),
    close_date: "",
    caso_apertura: "",
    caso_cierre: "",
    comentariosupervisor: "",
    tipoatencion: -1,
    idproceso: -1,
    maxcitas_presenciales: -1,
    maxcitas_telefonicas: -1,
    maxcitas_videollamada: -1,
    derivado_fuente_externa: "",
    comentario_fuente_externa: "",
    empresa: props.companyId,
    sede: props.locationId,
    puesto: props.positionId,
    modalidad: props.modalityId,
    lineascaso1TS: {
      list: [],
      deleteds: [],
    },
    lineascaso2TS: {
      list: [],
      deleteds: [],
    },
    sel: "",
  },
  tipoproc: props.processType,
  sede: props.locationId,
});

const getActiveCase = async (props: {
  areaId: number;
  serviceId: number;
  specialtyId: number;
  patientId: number;
  accessToken: string;
}) => {
  const { areaId, serviceId, specialtyId, patientId, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${API_URL}/Patient/getCasoActivo`, {
    method: "POST",
    headers,
    body: JSON.stringify(
      GetActiveCaseAdapter({ areaId, serviceId, specialtyId, patientId }),
    ),
  });

  if (!response.ok) throw new Error("errorGettingActiveCase");

  const responseBody = await response.text();
  if (!responseBody) return undefined;

  const activeCaseApiData = JSON.parse(responseBody) as ActiveCaseApiData;

  return activeCaseApiData;
};

const createCase = async (props: {
  areaId: number;
  serviceId: number;
  specialtyId: number;
  patientId: number;
  professionalSapUser: string;
  isFamilyMember: boolean;
  familyMemberName: string;
  companyId: number;
  locationId: number;
  positionId: number;
  modalityId: number;
  processType: number;
  accessToken: string;
}) => {
  const {
    areaId,
    serviceId,
    specialtyId,
    patientId,
    professionalSapUser,
    isFamilyMember,
    familyMemberName,
    companyId,
    locationId,
    positionId,
    modalityId,
    processType,
    accessToken,
  } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${API_URL}/Patient/creaCaso`, {
    method: "POST",
    headers,
    body: JSON.stringify(
      CreateCaseAdapter({
        areaId,
        serviceId,
        specialtyId,
        patientId,
        professionalSapUser,
        isFamilyMember,
        familyMemberName,
        companyId,
        locationId,
        positionId,
        modalityId,
        processType,
      }),
    ),
  });

  if (!response.ok) throw new Error("errorCreatingCase");

  const responseBody = (await response.json()) as ActiveCaseApiData;

  return responseBody;
};

const updateCase = async (props: {
  activeCase: ActiveCaseApiData;
  accessToken: string;
}) => {
  const { activeCase, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${API_URL}/Patient/updateCaso`, {
    method: "POST",
    headers,
    body: JSON.stringify(activeCase),
  });

  if (!response.ok) throw new Error("errorUpdatingCase");

  const activeCaseApiData = (await response.json()) as ActiveCaseApiData;

  return activeCaseApiData;
};

export { getActiveCase, createCase, updateCase };
