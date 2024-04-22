import { getServerSession } from "next-auth";
import { H3, H6 } from "~/_components/common/Typography";

const Page = async () => {
  const session = await getServerSession();

  return (
    <main>
      <div className="mx-auto lg:max-w-7xl lg:space-y-4 lg:px-8 lg:py-4">
        <div className="hidden space-y-4 lg:block">
          <H3 className="text-green">Información personal</H3>

          <H6>Por favor completa tu perfil</H6>
        </div>
      </div>
    </main>
  );
};

export default Page;
