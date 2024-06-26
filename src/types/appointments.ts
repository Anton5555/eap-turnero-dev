export type FreeAppointment = {
  start: Date;
  end: Date;
};

export type FreeAppointmentsByDay = {
  [dayOfMonth: number]: FreeAppointment[];
};

export type Appointment = {
  id: number;
  start: Date;
  end: Date;
  specialty: string;
  modality: string;
  professional: string;
  professionalId: number;
};
