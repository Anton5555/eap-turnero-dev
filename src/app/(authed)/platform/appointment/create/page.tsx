import { getServerSession } from "next-auth";
import CreateAppointment from "~/_components/appointments/CreateAppointment";
import { getContractServices } from "~/lib/api/services";
import authOptions from "~/lib/authOptions";
import { SPECIALTY } from "~/types/services";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const { user } = session;

  const { accessToken, company, location, position } = user;

  const services = (
    await getContractServices({
      companyId: company,
      locationId: location,
      positionId: position ?? -1,
      accessToken: accessToken,
    })
  ).filter(
    (service) =>
      service.specialty === SPECIALTY.PSICOLOGY ||
      service.specialty === SPECIALTY.NUTRITION,
  );

  return <CreateAppointment services={services} user={user} />;
};

export default Page;
