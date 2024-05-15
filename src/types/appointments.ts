export type FreeAppointment = {
  start: Date;
  end: Date;
};

export type FreeAppointmentsByDay = Record<number, FreeAppointment[]>;

export enum AppointmentState {
  PRESENT = "Presente",
  ABSENT = "Ausente",
  UNDEFINED = "No definido",
}

export type Appointment = {
  id: number;
  start: Date;
  end: Date;
  specialty: string;
  modality: string;
  professional: string;
  professionalId: number;
  state: AppointmentState;
};
