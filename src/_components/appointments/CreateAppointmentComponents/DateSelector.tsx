import PlatformContainer from "~/_components/common/PlatformContainer";
import Calendar from "../Calendar";
import { H6 } from "~/_components/common/Typography";
import { type FreeAppointmentsByDay } from "~/types/appointments";
import { type DayClickEventHandler } from "react-day-picker";
import { useTranslations } from "next-intl";

const DateSelector = (props: {
  isLoading: boolean;
  freeAppointments: FreeAppointmentsByDay | null;
  selectedDate?: Date;
  displayedMonth: Date;
  onDayClick: DayClickEventHandler;
  onMonthChange: (date: Date) => void;
  error: Error | null;
}) => {
  const {
    isLoading,
    freeAppointments,
    selectedDate,
    displayedMonth,
    onDayClick,
    onMonthChange,
    error,
  } = props;

  const t = useTranslations("createAppointment");

  return (
    <PlatformContainer className="w-full lg:min-h-0">
      <Calendar
        mode="single"
        availableDays={freeAppointments ? Object.keys(freeAppointments) : []}
        selected={selectedDate}
        displayedMonth={displayedMonth}
        onDayClick={onDayClick}
        onMonthChange={onMonthChange}
      />

      <H6 className="flex px-1 py-2 text-center lg:hidden ">
        {(!isLoading &&
          (!freeAppointments ||
            Object.values(freeAppointments).every(
              (appointments) => appointments.length === 0,
            )) &&
          error &&
          t("errorGettingFreeAppointments")) ??
          t("noAvailableAppointments")}
      </H6>
    </PlatformContainer>
  );
};

export default DateSelector;
