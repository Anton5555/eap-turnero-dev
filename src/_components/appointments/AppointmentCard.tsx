import { Appointment } from "~/types/appointments";
import PlatformContainer from "../common/PlatformContainer";
import Image from "next/image";
import { Button } from "../common/Button";

interface AppointmentCardProps {
  appointment: Appointment;
  onSelect: (appointment: Appointment) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onSelect,
}) => (
  <>
    <PlatformContainer className="w-full rounded-2xl lg:min-h-0 lg:px-6 lg:py-4">
      <div className="flex items-center space-x-4 px-6 py-4 lg:space-x-8 lg:p-0">
        <div className="flex items-center">
          <Image
            className="h-18 rounded-2xl object-cover lg:h-20"
            src={`/default-avatar.webp`}
            width={80}
            height={80}
            alt={appointment.professional}
          />
        </div>

        <div className="flex w-full flex-col space-y-2 lg:flex-row lg:justify-between lg:space-y-0">
          <div className="flex flex-row lg:flex-col">
            <div className="flex flex-col space-y-1">
              <h3>{appointment.specialty}</h3>

              <p className="font-lato leading-4 text-gray40">
                {appointment.professional}
              </p>

              <h3 className="hidden lg:flex">
                <span className="first-letter:capitalize">
                  {appointment.start.toLocaleDateString("es-AR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                , de{" "}
                {appointment.start.toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                a{" "}
                {appointment.end.toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                hs
              </h3>

              <h3 className="first-letter:capitalize lg:hidden">
                {appointment.start.toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                ,{""}
                {appointment.start.toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                a{" "}
                {appointment.end.toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h3>
            </div>
          </div>

          <div className="flex flex-row lg:flex-col lg:justify-center">
            <Button
              variant={"destructive"}
              className="font-lato h-8 text-sm font-normal"
              onClick={() => onSelect(appointment)}
            >
              Cancelar
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
  </>
);

export default AppointmentCard;
