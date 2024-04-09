import AppointmentList from "~/_components/appointments/AppointmentList";
import PlatformContainer from "~/_components/common/PlatformContainer";
import { H3, H6 } from "~/_components/common/Typography";

const Page = async () => {
  const appointments: Array<string> = [];

  return (
    <main>
      <div className="hidden space-y-4 lg:block">
        <H3 className="text-green">Agenda</H3>

        <H6>Revisa tus citas pendientes y agenda nuevas</H6>
      </div>

      <div className="mx-auto mt-0 grid grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
        <AppointmentList appointments={appointments} />

        <PlatformContainer className="hidden lg:col-span-1 lg:row-span-2 lg:grid">
          AGENDAR CITA
        </PlatformContainer>

        <PlatformContainer className="hidden lg:col-span-1 lg:row-span-2 lg:grid">
          Contactanos
        </PlatformContainer>
      </div>
    </main>
  );
};

export default Page;
