import { env } from "~/env";
import { type AppointmentNotification } from "~/types/notifications";
import { type SPECIALTY } from "~/types/services";

const API_URL = `${env.NEXT_PUBLIC_API_URL}/notification`;

const CreateNotificationAdapter = (props: {
  patientId: number;
  professionalId: number;
  title: string;
  description: string;
  speciality: SPECIALTY;
}) => {
  const { patientId, professionalId, title, description, speciality } = props;

  return {
    patient_id: patientId,
    prof_id: professionalId,
    title,
    descrp: description,
    especialidad: speciality,
  };
};

const createNotification = async (props: {
  patientId: number;
  professionalId: number;
  title: string;
  description: string;
  speciality: SPECIALTY;
  accessToken: string;
}) => {
  const { accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${API_URL}/addNotification`, {
    method: "POST",
    headers,
    body: JSON.stringify(CreateNotificationAdapter(props)),
  });

  if (!response.ok) throw new Error();

  return response;
};

interface NotificationsApiData {
  id: number;
  patient_id: number;
  prof_id: number;
  is_read: string;
  create_date: string;
  read_date: string;
  sel: number;
  isdirty: boolean;
  title: string;
  descrp: string;
  especialidad: SPECIALTY;
}

const filterAndMapNotificationsApiData = (
  notificationsApiData: NotificationsApiData[],
): AppointmentNotification[] =>
  notificationsApiData
    .filter((notification) => notification.is_read === "N")
    .map((notification) => ({
      title: notification.title,
      description: notification.descrp,
      dateCreated: new Date(notification.create_date),
      specialty: notification.especialidad,
    }));

const getUnreadNotifications = async (props: {
  patientId: number;
  accessToken: string;
}): Promise<AppointmentNotification[]> => {
  const { patientId, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(
    `${API_URL}/getNoReadNotificationByPatientId?patientId=${patientId}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) return [];

  const notificationsApiData =
    (await response.json()) as NotificationsApiData[];

  if (!notificationsApiData) return [];

  return filterAndMapNotificationsApiData(notificationsApiData);
};

const markAllAsRead = async (props: {
  accessToken: string;
  patientId: number;
}) => {
  const { accessToken, patientId } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(
    `${API_URL}/updateNotification?idPaciente=${patientId}`,
    {
      method: "POST",
      headers,
    },
  );

  if (!response.ok) throw new Error("Error marking all notifications as read.");

  return response;
};

export {
  createNotification,
  getUnreadNotifications as getNotifications,
  markAllAsRead,
};
