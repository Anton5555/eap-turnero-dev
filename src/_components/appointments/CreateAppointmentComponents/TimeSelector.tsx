import { Button } from "~/_components/common/Button";
import PlatformContainer from "~/_components/common/PlatformContainer";
import { H6 } from "~/_components/common/Typography";

const TimeSelector = (props: {
  step: number;
  isLoading: boolean;
  error: Error | null;
  isDateSelected: boolean;
  hasProfessionals: boolean;
  hasFreeAppointments: boolean;
  freeAppointmentsTimes: { dateFrom: Date; dateTo: Date }[];
  selectedTime?: { dateFrom: Date; dateTo: Date };
  onTimeSelect: (times: { dateFrom: Date; dateTo: Date }) => void;
}) => {
  const {
    step,
    isLoading,
    error,
    isDateSelected,
    hasProfessionals,
    hasFreeAppointments,
    freeAppointmentsTimes,
    selectedTime,
    onTimeSelect,
  } = props;

  return (
    <PlatformContainer className="w-full lg:min-h-0">
      {!isDateSelected && hasProfessionals && !isLoading ? (
        step === 2 ? (
          <H6 className="text-center">Selecciona un profesional</H6>
        ) : (
          step === 3 &&
          (!hasFreeAppointments ? (
            <H6 className="text-center">
              {error
                ? error.message
                : "No hay fechas disponibles para este profesional"}{" "}
            </H6>
          ) : (
            <H6 className="text-center">
              Selecciona una fecha para ver los horarios disponibles
            </H6>
          ))
        )
      ) : (
        freeAppointmentsTimes.length === 0 && (
          <H6 className="text-center">
            {error
              ? error.message
              : "No hay horarios disponibles para este profesional"}
          </H6>
        )
      )}

      {hasFreeAppointments &&
        isDateSelected &&
        freeAppointmentsTimes.length > 0 && (
          <div className="grid grid-cols-1 justify-between gap-x-0 gap-y-6 p-6 lg:grid-cols-4 lg:gap-x-8 lg:p-0 xl:grid-cols-5">
            {freeAppointmentsTimes.map((times, index) => (
              <Button
                key={index}
                className="h-10 w-full font-openSans text-base font-normal lg:h-12"
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

export default TimeSelector;
