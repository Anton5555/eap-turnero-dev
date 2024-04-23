import { getServerSession } from "next-auth";
import { H3, H6 } from "~/_components/common/Typography";
import EditProfileForm from "~/_components/forms/EditProfileForm";
import { getGenders } from "~/lib/api/users";
import authOptions from "~/lib/authOptions";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const {
    user: { accessToken },
  } = session;

  const genders = await getGenders(accessToken);

  return (
    <main>
      <div className="mx-auto lg:max-w-7xl lg:space-y-12 lg:px-8 lg:py-4">
        <div className="space-y-4">
          <H3 className="text-green">Información personal</H3>

          <H6>Por favor completa tu perfil</H6>
        </div>

        <div className="space-y-6">
          <p className="font-ultra-dark-gray font-inter text-sm leading-4">
            Editá tu perfil aquí
          </p>

          <EditProfileForm genders={genders} />
        </div>
      </div>
    </main>
  );
};

export default Page;
