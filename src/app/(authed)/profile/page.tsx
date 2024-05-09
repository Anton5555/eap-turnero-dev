import { getServerSession } from "next-auth";
import { H3, H6 } from "~/_components/common/Typography";
import EditProfileForm from "~/_components/forms/EditProfileForm";
import FamilyRelatives from "~/_components/profile/FamilyRelatives";
import {
  getFamilyRelashionships,
  getFamilyRelatives,
  getGenders,
} from "~/lib/api/users";
import authOptions from "~/lib/authOptions";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const { user } = session;

  const [genders, familyRelationships, familyRelatives] = await Promise.all([
    getGenders(user.accessToken),
    getFamilyRelashionships(user.accessToken),
    getFamilyRelatives({
      patientId: Number(user.id),
      accessToken: user.accessToken,
    }),
  ]);

  return (
    <main>
      <div className="mx-auto space-y-6 p-4 lg:max-w-7xl lg:space-y-12 lg:px-8 lg:py-4">
        <div className="space-y-4">
          <H3 className="text-green">Información personal</H3>

          <H6>Por favor completa tu perfil</H6>
        </div>

        <div className="space-y-6">
          <p className="font-ultra-dark-gray font-semibold leading-4">
            Editá tu perfil aquí
          </p>

          <EditProfileForm genders={genders} user={user} />

          <div className="my-2 w-full border-b border-black/10"></div>

          <p className="font-ultra-dark-gray font-semibold leading-4">
            Modificá o agrega integrantes de tu familia
          </p>

          <p className="font-ultra-dark-gray font-inter text-sm font-normal leading-3">
            Agregar o elimina cualquier miembro familiar
          </p>

          <FamilyRelatives
            relatives={familyRelatives}
            relationships={familyRelationships}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
