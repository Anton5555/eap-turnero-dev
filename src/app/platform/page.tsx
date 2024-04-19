import { getServerSession } from "next-auth";
import AppointmentList from "~/_components/appointments/AppointmentList";
import { Calendar } from "~/_components/common/Calendar";
import PlatformContainer from "~/_components/common/PlatformContainer";
import { H3, H6 } from "~/_components/common/Typography";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { getPatientAppointments } from "~/lib/api/appointments";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const {
    user: { accessToken, id },
  } = session;

  const appointments = await getPatientAppointments({
    patientId: id,
    accessToken,
    timezone: "Argentina Standard Time",
  });

  return (
    <main>
      <div className="mx-auto lg:max-w-7xl lg:space-y-4 lg:px-8 lg:py-4">
        <div className="hidden space-y-4 lg:block">
          <H3 className="text-green">Agenda</H3>

          <H6>Revisa tus citas pendientes y agenda nuevas</H6>
        </div>

        <div className="mx-auto mt-0 grid grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
          <AppointmentList appointments={[]} />

          <PlatformContainer className="hidden gap-5 lg:col-span-1 lg:row-span-2 lg:flex lg:flex-col">
            <h1 className="text-2xl font-semibold text-green">
              Próximas citas
            </h1>
            <Calendar
              daysWithEvents={appointments.map(
                ({ startDate }) => new Date(startDate),
              )}
              showOutsideDays={false}
              className="self-center p-0"
            />
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
