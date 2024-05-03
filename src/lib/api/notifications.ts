import { env } from "~/env";
import { AppointmentNotification } from "~/types/notifications";

const API_URL = `${env.NEXT_PUBLIC_API_URL}/notification`;

const CreateNotificationAdapter = (props: {
  patientId: number;
  professionalId: number;
  title: string;
  description: string;
}) => {
  const { patientId, professionalId, title, description } = props;

  return {
    patient_id: patientId,
    prof_id: professionalId,
    title,
    descrp: description,
  };
};

const createNotification = async (props: {
  patientId: number;
  professionalId: number;
  title: string;
  description: string;
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

  if (!response.ok) throw new Error("Error al crear la notificación");

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
}

const parseNotificationsApiData = (
  notificationsApiData: NotificationsApiData[],
): AppointmentNotification[] =>
  notificationsApiData.map((notification) => ({
    title: notification.title,
    description: notification.descrp,
    dateCreated: new Date(notification.create_date),
  }));

const getNotifications = async (
  accessToken: string,
): Promise<AppointmentNotification[]> => {
  const headers = new Headers();
  headers.append("Authorization", accessToken);

  // TODO: change the endpoint to get all notifications when it's available and remove extra code
  const response = await fetch(
    `${API_URL}/getNotificationByID?notificationId=2`,
    {
      method: "GET",
      headers,
    },
  );

  // if (!response.ok) return [];

  const response2 = await fetch(
    `${API_URL}/getNotificationByID?notificationId=3`,
    {
      method: "GET",
      headers,
    },
  );

  const notificationsApiData = await response.json();
  const notificationsApiData2 = await response2.json();

  // temporal code to transform individual notifications into array
  return parseNotificationsApiData([
    notificationsApiData,
    notificationsApiData2,
  ]);
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

  if (!response.ok)
    throw new Error("Error al marcar todas las notificaciones como leídas");

  return response;
};

export { createNotification, getNotifications, markAllAsRead };
