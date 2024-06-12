import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import AppointmentCreatedDialog from "~/_components/appointments/AppointmentCreatedDialog";
import AppointmentList from "~/_components/appointments/AppointmentList";
import Help from "~/_components/common/Help";
import NextAppointmentsCalendar from "~/_components/common/NextAppointmentsCalendar";
import PlatformContainer from "~/_components/common/PlatformContainer";
import { H3, H5, H6 } from "~/_components/common/Typography";
import { getAppointmentsByPatient } from "~/lib/api/appointments";
import authOptions from "~/lib/authOptions";
import { AppointmentState } from "~/types/appointments";
import { type SPECIALTY } from "~/types/services";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    professional: string;
    dateFrom: string;
    dateTo: string;
    modality: string;
    specialty: string;
  };
}) => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const t = await getTranslations("platform");

  const {
    user: { accessToken, id, timezone },
  } = session;

  const dayToday = new Date(new Date().setHours(0, 0, 0, 0));

  const appointments = (
    await getAppointmentsByPatient({
      id,
      accessToken,
      timezone,
    })
  )
    .filter((appointment) => {
      const appointmentDay = new Date(
        new Date(appointment.start).setHours(0, 0, 0, 0),
      );

      return (
        appointment.state === AppointmentState.NOT_DEFINED &&
        appointmentDay >= dayToday
      );
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const { professional, dateFrom, dateTo, modality, specialty } = searchParams;

  return (
    <main>
      <div className="hidden space-y-4 lg:block">
        <H3 className="text-green">{t("agenda")}</H3>

        <H6>{t("title")}</H6>
      </div>

      <div className="mx-auto mt-0 flex flex-col items-start gap-x-8 gap-y-8 lg:mt-4 lg:flex-row">
        <AppointmentList
          className="w-full flex-col lg:w-2/3"
          appointments={appointments}
          user={session.user}
        />

        <div className="hidden w-1/3 space-y-6 lg:flex lg:max-h-[calc(80dvh)] lg:flex-col lg:overflow-y-scroll">
          <PlatformContainer className="gap-5 lg:flex lg:flex-col">
            <H5>{t("upcomingAppointments")}</H5>

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
            modality={modality}
            specialty={specialty as SPECIALTY}
          />
        )}
      </div>
    </main>
  );
};

export default Page;
