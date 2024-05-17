import { getServerSession } from "next-auth";
import AppointmentCreatedDialog from "~/_components/appointments/AppointmentCreatedDialog";
import AppointmentList from "~/_components/appointments/AppointmentList";
import Help from "~/_components/common/Help";
import NextAppointmentsCalendar from "~/_components/common/NextAppointmentsCalendar";
import PlatformContainer from "~/_components/common/PlatformContainer";
import { H3, H5, H6 } from "~/_components/common/Typography";
import { getAppointmentsByPatient } from "~/lib/api/appointments";
import authOptions from "~/lib/authOptions";
import { AppointmentState } from "~/types/appointments";

const Page = async ({
  searchParams,
}: {
  searchParams: { professional: string; dateFrom: string; dateTo: string };
}) => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const {
    user: { accessToken, id, timezone },
  } = session;

  const appointments = (
    await getAppointmentsByPatient({
      id,
      accessToken,
      timezone,
    })
  )
    .filter((appointment) => appointment.state === AppointmentState.NOT_DEFINED)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const { professional, dateFrom, dateTo } = searchParams;

  return (
    <main>
      <div className="hidden space-y-4 lg:block">
        <H3 className="text-green">Agenda</H3>

        <H6>Revisa tus citas pendientes y agenda nuevas</H6>
      </div>

      <div className="mx-auto mt-0 flex flex-col items-start gap-x-8 gap-y-8 lg:mt-4 lg:flex-row">
        <AppointmentList
          className="w-full flex-col lg:w-2/3"
          appointments={appointments}
          user={session.user}
        />

        <div className="hidden w-1/3 space-y-6 lg:flex lg:flex-col">
          <PlatformContainer className="gap-5 lg:flex lg:flex-col">
            <H5>Próximas citas</H5>

            <NextAppointmentsCalendar
              daysWithEvents={appointments.map(({ start }) => start)}
              showOutsideDays={false}
              className="self-center p-0"
            />
          </PlatformContainer>

          <PlatformContainer>
            <Help />
          </PlatformContainer>
        </div>

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
