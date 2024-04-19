import { Appointment, FreeAppointmentsByDay } from "~/types/appointments";
import { createCase, getActiveCase } from "./cases";
import { getProfessionalSapUser } from "./professionals";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface OriginalFreeAppointmentsData {
  id: number;
  fechadesde: string;
  fechahasta: string;
}

const parseFreeAppointmentsData = async (
  data: OriginalFreeAppointmentsData[],
): Promise<FreeAppointmentsByDay> =>
  data.reduce((freeAppointmentsByDay, item) => {
    const dateFrom = new Date(item.fechadesde);
    const dateTo = new Date(item.fechahasta);

    const dayOfMonth = dateFrom.getDate();

    if (!freeAppointmentsByDay[dayOfMonth]) {
      freeAppointmentsByDay[dayOfMonth] = [];
    }

    freeAppointmentsByDay[dayOfMonth]?.push({
      start: dateFrom,
      end: dateTo,
    });

    return freeAppointmentsByDay;
  }, [] as FreeAppointmentsByDay);

const CreateAppointmentAdapter = (props: {
  professionalSapUser: string;
  patientId: number;
  agendaId: number;
  processType: number;
  processId: number;
  dateFrom: string;
  dateTo: string;
  timezone: string;
  modalityId: number;
}) => ({
  usuariosap: props.professionalSapUser,
  origencita: 3,
  idpaciente: props.patientId,
  idagenda: props.agendaId,
  tipoproceso: props.processType,
  idproceso: props.processId,
  fechainicio: props.dateFrom,
  fechafin: props.dateTo,
  zonahoraria: props.timezone,
  modalidadcita: props.modalityId,
});

interface OriginalAppointmentsData {
  UNIQUEID: number;
  FS_FECHAINICIO: string;
  FS_FECHAFIN: string;
  ESPECIALIDAD: string;
  MODALIDAD: string;
  NOMBRE: string;
  EMPID: number;
}

const parseAppointmentsData = (
  data: OriginalAppointmentsData[],
): Appointment[] =>
  data.map((item) => ({
    id: item.UNIQUEID,
    start: new Date(item.FS_FECHAINICIO),
    end: new Date(item.FS_FECHAFIN),
    specialty: item.ESPECIALIDAD,
    modality: item.MODALIDAD,
    professional: item.NOMBRE,
    professionalId: item.EMPID,
  }));

const getFreeAppointments = async (props: {
  dateFrom: string;
  dateTo: string;
  timezone: string;
  accessToken: string;
  employeeId: number;
  specialtyId: number;
  serviceId: number;
  modalityId: number;
}): Promise<{ freeAppointments: FreeAppointmentsByDay; agendaId: number }> => {
  const {
    dateFrom,
    dateTo,
    timezone,
    accessToken,
    employeeId,
    specialtyId,
    serviceId,
    modalityId,
  } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const responseAgendas = await fetch(
    `${API_URL}/misc/getActiveAgendasByEmpId?empId=${employeeId}&esp=${specialtyId}&servicio=${serviceId}&aten=3`,
    {
      method: "GET",
      headers,
    },
  );

  if (!responseAgendas.ok)
    throw new Error("Error al obtener la agenda del profesional");

  const dataAgenda = await responseAgendas.json();

  if (dataAgenda.length === 0)
    throw new Error("No hay agendas activas para el profesional");

  const agendaId = dataAgenda.value[0].DocEntry;

  const response = await fetch(
    `${API_URL}/appointments/getFreeAppointmentsByAgenda?fechadesde=${dateFrom}&fechahasta=${dateTo}&idagenda=${agendaId}&modalidad=${modalityId}&zonahoraria=${timezone}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok)
    throw new Error(
      "Error al obtener las citas libres de la agenda del profesional",
    );

  const data = await response.json();

  const freeAppointments = await parseFreeAppointmentsData(data);

  return { freeAppointments, agendaId };
};

const createAppointment = async (props: {
  accessToken: string;
  patientId: number;
  agendaId: number;
  processType: number;
  dateFrom: string;
  dateTo: string;
  timezone: string;
  modalityId: number;
  areaId: number;
  serviceId: number;
  specialtyId: number;
  companyId: number;
  locationId: number;
  positionId: number;
  professionalSapUser: string;
}) => {
  const {
    accessToken,
    patientId,
    agendaId,
    processType,
    dateFrom,
    dateTo,
    timezone,
    modalityId,
    areaId,
    serviceId,
    specialtyId,
    companyId,
    locationId,
    positionId,
    professionalSapUser,
  } = props;

  const caseResponse = await getActiveCase({
    areaId,
    serviceId,
    specialtyId,
    patientId,
    accessToken,
  });

  let caseId = caseResponse;

  if (!caseId) {
    const caseResponse = await createCase({
      areaId,
      serviceId,
      specialtyId,
      patientId,
      professionalSapUser,
      isFamilyMember: false,
      familyMemberName: "",
      companyId,
      locationId,
      positionId,
      modalityId,
      processType,
      accessToken,
    });

    caseId = await caseResponse.json();
  }

  const headers = new Headers();
  headers.append("Authorization", accessToken);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${API_URL}/appointments/CreateAppointment`, {
    method: "POST",
    headers,
    body: JSON.stringify(
      CreateAppointmentAdapter({
        patientId,
        agendaId,
        processType,
        processId: caseId,
        dateFrom,
        dateTo,
        timezone,
        modalityId,
        professionalSapUser,
      }),
    ),
  });

  if (!response.ok) throw new Error("Error al crear la cita");

  return response;
};

const getAppointmentsByPatient = async (props: {
  id: string;
  timezone: string;
  accessToken: string;
}): Promise<Appointment[]> => {
  const { id, timezone, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(
    `${API_URL}/Patient/getAppointmentsByPatient?patientId=${id}&zonahoraria=${timezone}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) throw new Error("Error al obtener las citas del paciente");

  const data = await response.json();

  return parseAppointmentsData(data);
};

const deleteAppointment = async (props: {
  accessToken: string;
  appointmentId: number;
  professionalId: number;
}) => {
  const { accessToken, appointmentId, professionalId } = props;

  // FIXME: replace hardcoded professionalSapUser with the real one (waiting for backend to provide it)
  const sapUser = "mcattaneo";

  // const sapUser = await getProfessionalSapUser({
  //   professionalId,
  //   accessToken,
  // });

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(
    `${API_URL}/appointments/deleteAppointment?idappointment=${appointmentId}&sapuser=${sapUser}&deletereasonid=-1&deleteprocessifempty=true`,
    {
      method: "POST",
      headers,
    },
  );

  if (!response.ok) throw new Error("Error al eliminar la cita");

  return response;
};

export {
  getFreeAppointments,
  createAppointment,
  getAppointmentsByPatient,
  deleteAppointment,
};
