import { getServerSession } from "next-auth";
import AppointmentList from "~/_components/appointments/AppointmentList";
import PlatformContainer from "~/_components/common/PlatformContainer";
import { H3, H6 } from "~/_components/common/Typography";
import { headers } from "next/headers";

const Page = async () => {
  const appointments: Array<string> = [];

  const session = await getServerSession();

  const token = await fetch("http://localhost:3000/api/proxy", {
    method: "PATCH",
    headers: headers(),
  });

  console.log(await token.json());

  return (
    <main>
      <div className="mx-auto lg:max-w-7xl lg:space-y-4 lg:px-8 lg:py-4">
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
      </div>
    </main>
  );
};

export default Page;
