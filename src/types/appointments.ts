export type FreeAppointment = {
  start: Date;
  end: Date;
};

export type FreeAppointmentsByDay = {
  [dayOfMonth: number]: FreeAppointment[];
};
