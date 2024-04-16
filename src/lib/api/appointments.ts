import { FreeAppointment, FreeAppointmentsByDay } from "~/types/appointments";

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

const getFreeAppointments = async (props: {
  dateFrom: string;
  dateTo: string;
  timezone: string;
  accessToken: string;
  employeeId: number;
  specialtyId: number;
  serviceId: number;
}) => {
  const {
    dateFrom,
    dateTo,
    timezone,
    accessToken,
    employeeId,
    specialtyId,
    serviceId,
  } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const responseAgendas = await fetch(
    `${API_URL}/misc/getActiveAgendasByEmpId?empId=${employeeId}&esp=${specialtyId}&servicio=${serviceId}&aten=3`,
    {
      method: "GET",
      headers: headers,
    },
  );

  if (!responseAgendas.ok)
    throw new Error("Error al obtener la agenda del profesional");

  const dataAgenda = await responseAgendas.json();

  if (dataAgenda.length === 0)
    throw new Error("No hay agendas activas para el profesional");

  const agendaId = dataAgenda.value[0].DocEntry;

  const response = await fetch(
    `${API_URL}/appointments/getFreeAppointmentsByAgenda?fechadesde=${dateFrom}&fechahasta=${dateTo}&idagenda=${agendaId}&modalidad=3&zonahoraria=${timezone}`,
    {
      method: "GET",
      headers: headers,
    },
  );

  if (!response.ok)
    throw new Error(
      "Error al obtener las citas libres de la agenda del profesional",
    );

  const data = await response.json();

  const freeAppointments = await parseData(data);

  return freeAppointments as FreeAppointmentsByDay;
};

export { getFreeAppointments };
