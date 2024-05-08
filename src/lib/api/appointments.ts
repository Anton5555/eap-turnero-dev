import type { Appointment, FreeAppointmentsByDay } from "~/types/appointments";
import { createCase, getActiveCaseId } from "./cases";
import { getProfessionalSapUser } from "./professionals";
import { env } from "~/env";
import { createNotification } from "./notifications";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface FreeAppointmentsApiData {
  id: number;
  fechadesde: string;
  fechahasta: string;
}

const parseFreeAppointmentsData = async (
  freeAppointments: FreeAppointmentsApiData[],
): Promise<FreeAppointmentsByDay> =>
  freeAppointments.reduce(
    (freeAppointmentsByDay, originalFreeAppointmentsByDay) => {
      const dateFrom = new Date(originalFreeAppointmentsByDay.fechadesde);
      const dateTo = new Date(originalFreeAppointmentsByDay.fechahasta);

      const dayOfMonth = dateFrom.getDate();

      if (!freeAppointmentsByDay[dayOfMonth])
        freeAppointmentsByDay[dayOfMonth] = [];

      freeAppointmentsByDay[dayOfMonth]?.push({
        start: dateFrom,
        end: dateTo,
      });

      return freeAppointmentsByDay;
    },
    [] as FreeAppointmentsByDay,
  );

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

interface AgendaApiData {
  value: {
    DocEntry: number;
  }[];
}

interface AppointmentsApiData {
  UNIQUEID: number;
  FS_FECHAINICIO: string;
  FS_FECHAFIN: string;
  ESPECIALIDAD: string;
  MODALIDAD: string;
  NOMBRE: string;
  EMPID: number;
}

const parseAppointmentsApiData = (
  appointments: AppointmentsApiData[],
): Appointment[] =>
  appointments.map((appointment) => ({
    id: appointment.UNIQUEID,
    start: new Date(appointment.FS_FECHAINICIO),
    end: new Date(appointment.FS_FECHAFIN),
    specialty: appointment.ESPECIALIDAD,
    modality: appointment.MODALIDAD,
    professional: appointment.NOMBRE,
    professionalId: appointment.EMPID,
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

  const getAgendasReqUrl = `${API_URL}/misc/getActiveAgendasByEmpId?empId=${employeeId}&esp=${specialtyId}&servicio=${serviceId}&aten=3`;

  const responseAgendas = await fetch(getAgendasReqUrl, {
    method: "GET",
    headers,
  });

  if (!responseAgendas.ok)
    throw new Error("Error al obtener la agenda del profesional");

  const dataAgenda = (await responseAgendas.json()) as AgendaApiData;

  if (dataAgenda.value.length === 0 || !dataAgenda.value[0]?.DocEntry)
    throw new Error("No hay agendas activas para el profesional");

  const agendaId = dataAgenda.value[0].DocEntry;

  const getAppointmentsReqUrl = `${API_URL}/appointments/getFreeAppointmentsByAgenda?fechadesde=${dateFrom}&fechahasta=${dateTo}&idagenda=${agendaId}&modalidad=${modalityId}&zonahoraria=${timezone}`;

  const response = await fetch(getAppointmentsReqUrl, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!response.ok)
    throw new Error(
      "Error al obtener las citas libres de la agenda del profesional",
    );

  const freeAppointmentsApiData =
    (await response.json()) as FreeAppointmentsApiData[];

  const freeAppointments = await parseFreeAppointmentsData(
    freeAppointmentsApiData,
  );

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
  employeeId: number;
  notificationTitle: string;
  notificationDescription: string;
  notificationSpecialty: string;
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
    employeeId,
    notificationTitle,
    notificationDescription,
    notificationSpecialty,
  } = props;

  let caseId = await getActiveCaseId({
    areaId,
    serviceId,
    specialtyId,
    patientId,
    accessToken,
  });

  const professionalSapUser = await getProfessionalSapUser({
    employeeId,
    accessToken,
  });

  if (!caseId)
    caseId = await createCase({
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

  const headers = new Headers();
  headers.append("Authorization", accessToken);
  headers.append("Content-Type", "application/json");

  const createAppointmentResponse = await fetch(
    `${API_URL}/appointments/CreateAppointment`,
    {
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
    },
  );

  if (!createAppointmentResponse.ok) throw new Error("Error al crear la cita");

  try {
    await createNotification({
      patientId,
      professionalId: employeeId,
      title: notificationTitle,
      description: notificationDescription,
      speciality: notificationSpecialty,
      accessToken,
    });
  } catch (error) {
    console.error("Error al crear la notificación", error);
  }

  return createAppointmentResponse;
};

const getAppointmentsByPatient = async (props: {
  id: string;
  timezone: string;
  accessToken: string;
}): Promise<Appointment[]> => {
  const { id, timezone, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const requestUrl = `${API_URL}/Patient/getAppointmentsByPatient?patientId=${id}&zonahoraria=${timezone}`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Error al obtener las citas del paciente");

  const appointmentsApiData = (await response.json()) as AppointmentsApiData[];

  return parseAppointmentsApiData(appointmentsApiData);
};

const deleteAppointment = async (props: {
  accessToken: string;
  appointmentId: number;
  employeeId: number;
  patientId: number;
  notificationTitle: string;
  notificationDescription: string;
  notificationSpecialty: string;
}) => {
  const {
    accessToken,
    appointmentId,
    employeeId,
    patientId,
    notificationTitle,
    notificationDescription,
    notificationSpecialty,
  } = props;

  const sapUser = await getProfessionalSapUser({
    employeeId,
    accessToken,
  });

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const requestUrl = `${API_URL}/appointments/deleteAppointment?idappointment=${appointmentId}&sapuser=${sapUser}&deletereasonid=-1&deleteprocessifempty=false`;

  const response = await fetch(requestUrl, {
    method: "POST",
    headers,
  });

  if (!response.ok) throw new Error("Error al eliminar la cita");

  try {
    await createNotification({
      patientId,
      professionalId: employeeId,
      title: notificationTitle,
      description: notificationDescription,
      speciality: notificationSpecialty,
      accessToken,
    });
  } catch (error) {
    console.error("Error al crear la notificación", error);
  }

  return response;
};

export {
  getFreeAppointments,
  createAppointment,
  getAppointmentsByPatient,
  deleteAppointment,
};
