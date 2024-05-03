import { getServerSession } from "next-auth";
import { H3, H6 } from "~/_components/common/Typography";
import AddRelativeForm from "~/_components/forms/AddRelativeForm";
import EditProfileForm from "~/_components/forms/EditProfileForm";
import FamilyRelatives from "~/_components/profile/FamilyRelatives";
import { getFamilyRelashionships, getGenders } from "~/lib/api/users";
import authOptions from "~/lib/authOptions";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const { user } = session;

  const [genders, familyRelationships] = await Promise.all([
    getGenders(user.accessToken),
    getFamilyRelashionships(user.accessToken),
  ]);

  return (
    <main>
      <div className="mx-auto space-y-6 p-4 lg:max-w-7xl lg:space-y-12 lg:px-8 lg:py-4">
        <div className="space-y-4">
          <H3 className="text-green">Agregar un familiar</H3>

          <H6>Por favor completa su perfil</H6>
        </div>

        <AddRelativeForm
          genders={genders}
          relationships={familyRelationships}
          user={user}
        />
      </div>
    </main>
  );
};

export default Page;
