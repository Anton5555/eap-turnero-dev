import { Button } from "~/_components/common/Button";
import PlatformContainer from "~/_components/common/PlatformContainer";
import { H6 } from "~/_components/common/Typography";

const TimeSelection = (props: {
  selectedDate: boolean;
  freeAppointments: boolean;
  freeAppointmentsTimes: { dateFrom: Date; dateTo: Date }[];
  selectedTime: { dateFrom: Date; dateTo: Date } | null;
  onTimeSelect: (times: { dateFrom: Date; dateTo: Date }) => void;
}) => {
  const {
    selectedDate,
    freeAppointments,
    freeAppointmentsTimes,
    selectedTime,
    onTimeSelect,
  } = props;

  return (
    <PlatformContainer className="w-full lg:min-h-0">
      {!selectedDate && (
        <H6 className="text-center">
          Selecciona una fecha para ver los horarios disponibles
        </H6>
      )}

      {freeAppointments && selectedDate && freeAppointmentsTimes.length > 0 && (
        <div className="grid grid-cols-1 justify-between gap-x-0 gap-y-6 p-6 lg:grid-cols-4 lg:gap-x-8 lg:p-0 xl:grid-cols-5">
          {freeAppointmentsTimes.map((times, index) => (
            <Button
              key={index}
              className="font-openSans h-10 w-full text-base font-normal lg:h-12"
              variant={times === selectedTime ? "default" : "secondary"}
              onClick={() => onTimeSelect(times)}
            >
              {times.dateFrom.getHours()}:
              {times.dateFrom.getMinutes() === 0
                ? times.dateFrom.getMinutes() + "0"
                : times.dateFrom.getMinutes()}
            </Button>
          ))}
        </div>
      )}
    </PlatformContainer>
  );
};

export default TimeSelection;
