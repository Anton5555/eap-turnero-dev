import { env } from "~/env";

type AppointmentApiData = {
  EMPID: number;
  VIRTUALLINK: string | null;
  SERVICIO: string;
  ESPECIALIDAD: string;
  MODALIDAD: string;
  UNIQUEID: number;
  FS_FECHAINICIO: string;
  FS_FECHAFIN: string;
  NOMBRE: string;
  ID_PROCESO: number;
  DESCPROCESO: string;
  ASISTENCIA: string;
  ESTADO: string;
};

type Appointment = {
  employeeId: number;
  virtualLink: string | null;
  service: string;
  specialty: string;
  modality: string;
  id: number;
  startDate: string;
  endDate: string;
  name: string;
  processId: number;
  processDescription: string;
  assistance: string;
  status: string;
};

const parseAppointmentData = ({
  EMPID,
  VIRTUALLINK,
  SERVICIO,
  ESPECIALIDAD,
  MODALIDAD,
  UNIQUEID,
  FS_FECHAINICIO,
  FS_FECHAFIN,
  NOMBRE,
  ID_PROCESO,
  DESCPROCESO,
  ASISTENCIA,
  ESTADO,
}: AppointmentApiData): Appointment => ({
  employeeId: EMPID,
  virtualLink: VIRTUALLINK,
  service: SERVICIO,
  specialty: ESPECIALIDAD,
  modality: MODALIDAD,
  id: UNIQUEID,
  startDate: FS_FECHAINICIO,
  endDate: FS_FECHAFIN,
  name: NOMBRE,
  processId: ID_PROCESO,
  processDescription: DESCPROCESO,
  assistance: ASISTENCIA,
  status: ESTADO,
});

export type GetPatientAppointmentsProps = {
  patientId: string;
  accessToken: string;
  timezone: string;
};

export const getPatientAppointments = async ({
  patientId,
  accessToken,
  timezone,
}: GetPatientAppointmentsProps) => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/Patient/getAppointmentsByPatient?patientId=${patientId}&zonahoraria=${timezone}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const appointmentsData = (await response.json()) as AppointmentApiData[];

  return appointmentsData.map(parseAppointmentData);
};
