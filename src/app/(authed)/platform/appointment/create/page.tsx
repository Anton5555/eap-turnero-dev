import { getServerSession } from "next-auth";
import CreateAppointment from "~/_components/appointments/CreateAppointment";
import authOptions from "~/lib/authOptions";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  return <CreateAppointment />;
};

export default Page;
