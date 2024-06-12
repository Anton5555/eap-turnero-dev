import { useTranslations } from "next-intl";
import { Button } from "~/_components/common/Button";
import PlatformContainer from "~/_components/common/PlatformContainer";
import { H6 } from "~/_components/common/Typography";

const TimeSelector = (props: {
  step: number;
  error: Error | null;
  isDateSelected: boolean;
  hasFreeAppointments: boolean;
  freeAppointmentsTimes: { dateFrom: Date; dateTo: Date }[];
  selectedTime?: { dateFrom: Date; dateTo: Date };
  onTimeSelect: (times: { dateFrom: Date; dateTo: Date }) => void;
}) => {
  const {
    step,
    error,
    isDateSelected,
    hasFreeAppointments,
    freeAppointmentsTimes,
    selectedTime,
    onTimeSelect,
  } = props;

  const t = useTranslations("createAppointment");

  return (
    <PlatformContainer className="w-full lg:min-h-0">
      <H6 className="text-center">
        {(error && t("errorGettingFreeAppointments")) ??
          (step === 2 && !isDateSelected && hasFreeAppointments
            ? t("selectADate")
            : !hasFreeAppointments && t("noAvailableAppointments"))}
      </H6>

      {isDateSelected && freeAppointmentsTimes.length > 0 && (
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
