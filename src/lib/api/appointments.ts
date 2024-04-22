import { FreeAppointmentsByDay } from "~/types/appointments";
import { createCase, getActiveCase } from "./cases";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface OriginalData {
  id: number;
  fechadesde: string;
  fechahasta: string;
}

const parseData = async (
  data: OriginalData[],
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

  const freeAppointments = await parseData(data);

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

export { getFreeAppointments, createAppointment };
