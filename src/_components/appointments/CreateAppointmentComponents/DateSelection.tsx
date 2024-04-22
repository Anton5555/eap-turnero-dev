import PlatformContainer from "~/_components/common/PlatformContainer";
import Calendar from "../Calendar";
import { H6 } from "~/_components/common/Typography";
import { FreeAppointmentsByDay } from "~/types/appointments";

const DateSelection = (props: {
  isLoading: boolean;
  selectedProfessional: boolean;
  freeAppointments: FreeAppointmentsByDay | null;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  error: Error | null;
}) => {
  const {
    isLoading,
    selectedProfessional,
    freeAppointments,
    onDateSelect,
    onMonthChange,
    error,
  } = props;

  return (
    <PlatformContainer className="w-full lg:min-h-0">
      {isLoading && <H6 className="text-center">Cargando...</H6>}

      <Calendar
        availableDays={
          selectedProfessional && freeAppointments
            ? Object.keys(freeAppointments)
            : []
        }
        onDayClick={(day) => onDateSelect(day)}
        onMonthChange={onMonthChange}
      />

      {selectedProfessional &&
        !isLoading &&
        (!freeAppointments ||
          Object.values(freeAppointments).every(
            (appointments) => appointments.length === 0,
          )) && (
          <H6 className="px-1 py-2 text-center lg:p-0">
            {error
              ? error.message
              : "No hay horarios disponibles para este profesional"}
          </H6>
        )}
    </PlatformContainer>
  );
};

export default DateSelection;
