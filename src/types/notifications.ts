import { type SPECIALTY } from "./services";

export type AppointmentNotification = {
  title: string;
  description: string;
  dateCreated: Date;
  specialty: SPECIALTY;
  professionalImage?: string;
};
