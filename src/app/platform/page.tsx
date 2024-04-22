import { getServerSession } from "next-auth";
import AppointmentCreatedDialog from "~/_components/appointments/AppointmentCreatedDialog";
import AppointmentList from "~/_components/appointments/AppointmentList";
import PlatformContainer from "~/_components/common/PlatformContainer";
import { H3, H6 } from "~/_components/common/Typography";
import { getAppointmentsByPatient } from "~/lib/api/appointments";
import authOptions from "~/lib/authOptions";

const Page = async ({
  searchParams,
}: {
  searchParams: { professional: string; dateFrom: string; dateTo: string };
}) => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const {
    user: { accessToken, id },
  } = session;

  const appointments = await getAppointmentsByPatient({
    id,
    accessToken,
    timezone: "Argentina Standard Time",
  });

  const { professional, dateFrom, dateTo } = searchParams;

  return (
    <main>
      <div className="hidden space-y-4 lg:block">
        <H3 className="text-green">Agenda</H3>

        <H6>Revisa tus citas pendientes y agenda nuevas</H6>
      </div>

      <div className="mx-auto mt-0 grid grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mt-4 lg:max-w-none lg:grid-cols-3">
        <AppointmentList appointments={appointments} />

        <PlatformContainer className="hidden lg:col-span-1 lg:row-span-2 lg:grid">
          AGENDAR CITA
        </PlatformContainer>

        <PlatformContainer className="hidden lg:col-span-1 lg:row-span-2 lg:grid">
          Contactanos
        </PlatformContainer>

        {professional && dateFrom && dateTo && (
          <AppointmentCreatedDialog
            professional={professional}
            dateFrom={new Date(dateFrom)}
            dateTo={new Date(dateTo)}
          />
        )}
      </div>
    </main>
  );
};

export default Page;
