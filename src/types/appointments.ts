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

export type Appointment = {
  id: number;
  start: string;
  end: string;
  startDate: Date;
  specialty: string;
  modality: string;
  professional: string;
  professionalId: number;
  state: AppointmentState;
};
