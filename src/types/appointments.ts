import { type SPECIALTY } from "./services";

export type FreeAppointment = {
  start: Date;
  end: Date;
};

export type FreeAppointmentsByDay = Record<number, FreeAppointment[]>;

export enum AppointmentState {
  PRESENT = "Presente",
  ABSENT = "Ausente",
  NOT_DEFINED = "No definido",
}

export enum MODALITY {
  VIDEOCALL = "videocall",
  PHONECALL = "phonecall",
}

export type Appointment = {
  id: number;
  start: string;
  end: string;
  specialty: SPECIALTY;
  modality: MODALITY;
  professional: string;
  professionalId: number;
  state: AppointmentState;
};
