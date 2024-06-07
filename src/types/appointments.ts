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

export enum AppointmentModality {
  VIDEOCALL = "Videollamada",
  PHONECALL = "Telefónica",
}

export type Appointment = {
  id: number;
  start: string;
  end: string;
  specialty: string;
  modality: AppointmentModality;
  professional: string;
  professionalId: number;
  state: AppointmentState;
};
