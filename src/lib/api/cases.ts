const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    close_date: new Date().toISOString(),
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

  if (!response.ok) throw new Error("Error al obtener el caso activo");

  const data = await response.json();

  return data.idproceso;
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

  if (!response.ok) throw new Error("Error al crear el caso");

  const data = await response.json();

  return data.caso.idproceso;
};

export { getActiveCase, createCase };
