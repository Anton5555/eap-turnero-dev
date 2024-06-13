"use client";

import { MODALITY, type Appointment } from "~/types/appointments";
import PlatformContainer from "../common/PlatformContainer";
import Image from "next/image";
import { Button } from "../common/Button";
import PhoneIcon from "../icons/Phone";
import VideoIcon from "../icons/Video";
import { useFormatter, useTranslations } from "next-intl";

interface AppointmentCardProps {
  appointment: Appointment;
  onSelect: (appointment: Appointment) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onSelect,
}) => {
  const t = useTranslations();
  const format = useFormatter();

  const getDisplayableDateAndTime = (
    dateFrom: Date,
    dateTo: Date,
    mobile = false,
  ) => {
    const dateFromString = format.dateTime(dateFrom, {
      weekday: mobile ? undefined : "long",
      day: "numeric",
      month: mobile ? "short" : "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const dateToString = format.dateTime(dateTo, {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    return `${dateFromString} ${t("platform.appointmentList.to")} ${dateToString}`;
  };

  return (
    <PlatformContainer className="w-full rounded-2xl lg:min-h-0 lg:px-6 lg:py-4">
      <div className="flex items-center space-x-4 px-6 py-4 lg:space-x-8 lg:p-0">
        <div className="flex items-center">
          <Image
            className="h-18 rounded-2xl object-cover lg:h-20"
            src={`/assets/default-avatar.webp`}
            width={80}
            height={80}
            alt={appointment.professional}
          />
        </div>

        <div className="flex w-full flex-col space-y-2 lg:flex-row lg:justify-between lg:space-y-0">
          <div className="flex flex-row lg:flex-col">
            <div className="flex flex-col space-y-1">
              <h3>{t(`specialties.${appointment.specialty}`)}</h3>

              <p className="font-lato leading-4 text-dark-gray">
                {appointment.professional}
              </p>

              <div className="flex flex-row">
                <div className="mr-2 flex flex-col justify-center">
                  {appointment.modality === MODALITY.PHONECALL ? (
                    <PhoneIcon
                      width={16}
                      height={16}
                      color="#1C1C1C"
                      strokeWidth={1}
                    />
                  ) : (
                    <VideoIcon size={16} color="#1C1C1C" />
                  )}
                </div>

                <h3 className="hidden lg:flex lg:flex-col">
                  <span className="first-letter:capitalize">
                    {getDisplayableDateAndTime(
                      new Date(appointment.start),
                      new Date(appointment.end),
                    )}
                  </span>
                </h3>

                <h3 className="flex-col first-letter:capitalize lg:hidden">
                  {getDisplayableDateAndTime(
                    new Date(appointment.start),
                    new Date(appointment.end),
                    true,
                  )}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-row lg:flex-col lg:justify-center">
            <Button
              variant={"destructive"}
              className="font-lato h-8 flex-col text-sm font-normal"
              onClick={() => onSelect(appointment)}
            >
              {t("platform.appointmentList.cancel")}
            </Button>

            {/* NOTE: to be determined by client, there isn't much detail to show for now */}
            {/*<Button
                variant={"outline"}
                className="font-lato h-8 text-sm font-normal"
              >
                Ver detalles
              </Button>
            */}
          </div>
        </div>
      </div>
    </PlatformContainer>
  );
};

export default AppointmentCard;
