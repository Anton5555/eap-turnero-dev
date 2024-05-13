import PlatformContainer from "~/_components/common/PlatformContainer";
import Calendar from "../Calendar";
import { H6 } from "~/_components/common/Typography";
import { type FreeAppointmentsByDay } from "~/types/appointments";
import { type DayClickEventHandler } from "react-day-picker";

const DateSelection = (props: {
  isLoading: boolean;
  selectedProfessional: boolean;
  freeAppointments: FreeAppointmentsByDay | null;
  selectedDate?: Date;
  onDayClick: DayClickEventHandler;
  onMonthChange: (date: Date) => void;
  error: Error | null;
}) => {
  const {
    isLoading,
    selectedProfessional,
    freeAppointments,
    selectedDate,
    onDayClick,
    onMonthChange,
    error,
  } = props;

  return (
    <PlatformContainer className="w-full lg:min-h-0">
      <Calendar
        mode="single"
        availableDays={
          selectedProfessional && freeAppointments
            ? Object.keys(freeAppointments)
            : []
        }
        selected={selectedDate}
        onDayClick={onDayClick}
        onMonthChange={onMonthChange}
      />

      <H6 className="flex px-1 py-2 text-center lg:hidden ">
        {(selectedProfessional &&
          !isLoading &&
          (!freeAppointments ||
            Object.values(freeAppointments).every(
              (appointments) => appointments.length === 0,
            )) &&
          error?.message) ??
          "No hay horarios disponibles para este profesional"}
      </H6>
    </PlatformContainer>
  );
};

export default DateSelection;
