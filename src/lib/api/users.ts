import { format } from "date-fns";
import { EditProfileInputs } from "~/_components/forms/EditProfileForm";
import { env } from "~/env";
import { FamilyRelative, Gender } from "~/types/users";

const API_URL = env.NEXT_PUBLIC_API_URL;

type FamilyRelativeApiData = {
  IDPaciente: number;
  Line: number;
  IdPacienteFam: number;
  Nombre: string;
  Apellidos: string;
  Parentesco: number;
  Convive: string;
};

const parseFamilyRelativesApiData = (
  familyRelatives: FamilyRelativeApiData[],
): FamilyRelative[] =>
  familyRelatives.map((familyRelative) => ({
    id: familyRelative.IdPacienteFam,
    patientId: familyRelative.IDPaciente,
    line: familyRelative.Line,
    familyRelativeId: familyRelative.IdPacienteFam,
    name: familyRelative.Nombre,
    lastName: familyRelative.Apellidos,
    relationship: familyRelative.Parentesco,
    livesWith: familyRelative.Convive,
  }));

const getFamilyRelatives = async (props: {
  patientId: number;
  accessToken: string;
}): Promise<FamilyRelative[]> => {
  const { patientId, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(
    `${API_URL}/Patient/getFamilyRelatives?idpaciente=${patientId}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok)
    throw new Error("Error recuperando los datos de los familiares");

  const familyRelativesApiData = await response.json();

  return parseFamilyRelativesApiData(familyRelativesApiData);
};

type GenderApiData = {
  fs_id: number;
  fs_descripcion: string;
};

const parseGendersApiData = (genders: GenderApiData[]): Gender[] =>
  genders.map((gender) => ({
    id: gender.fs_id,
    name: gender.fs_descripcion,
  }));

const getGenders = async (accessToken: string) => {
  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(`${API_URL}/Patient/getSexoList`, {
    method: "GET",
    headers,
  });

  if (!response.ok) throw new Error("Error al recuperar los géneros");

  const gendersApiData = await response.json();

  return parseGendersApiData(gendersApiData);
};

const getUserImage = async (props: {
  accessToken: string;
  imageName: string;
}) => {
  const { accessToken, imageName } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(
    `${API_URL}/Patient/getUserImage?imgName=${imageName}`,
    { method: "GET", headers },
  );

  if (!response.ok) throw new Error("Error al recuperar la imagen del usuario");

  const imageData = await response.blob();

  const imageUrl = URL.createObjectURL(imageData);

  return imageUrl;
};

type UpdateUserRequest = {
  nombre: string;
  apellido1: string;
  mail: string;
  sede: number;
  empresa: number;
  fecha_nacimiento?: string;
  sexo?: number;
  tipo: number;
  pdp: string;
};

const UpdateUserAdapter = (props: {
  editProfileData: EditProfileInputs;
  userTypeId: number;
}) => {
  const { editProfileData, userTypeId } = props;

  const userData: UpdateUserRequest = {
    nombre: editProfileData.name,
    apellido1: editProfileData.lastName,
    mail: editProfileData.email,
    sede: Number(editProfileData.location),
    empresa: 898,
    tipo: userTypeId,
    pdp: "N",
  };

  if (editProfileData.birthdate)
    userData.fecha_nacimiento = format(editProfileData.birthdate, "yyyy-MM-dd");

  if (editProfileData.gender !== "0")
    userData.sexo = Number(editProfileData.gender);

  return userData;
};

const updateUser = async (props: {
  editProfileData: EditProfileInputs;
  accessToken: string;
  image: File | undefined;
  patientId: string;
  userTypeId: number;
}) => {
  const { editProfileData, accessToken, image, patientId, userTypeId } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);
  headers.append("Content-Type", "application/json");

  if (image)
    await updateUserImage({
      image,
      patientId: patientId,
      accessToken,
    });

  const updateUserRequestData: UpdateUserRequest = UpdateUserAdapter({
    editProfileData,
    userTypeId,
  });

  const response = await fetch(`${API_URL}/Account/updateuser`, {
    method: "POST",
    headers,
    body: JSON.stringify(updateUserRequestData),
  });

  if (!response.ok) throw new Error();

  return response;
};

const updateUserImage = async (props: {
  image: File;
  patientId: string;
  accessToken: string;
}) => {
  const { image, patientId, accessToken } = props;

  const formData = new FormData();
  formData.append("file", image);

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const requestUrl = `${API_URL}/Patient/updatePatientImg?consultantId=${patientId}`;

  const response = await fetch(requestUrl, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok)
    throw new Error("Error al actualizar la imagen del usuario");

  return response;
};

const activateAccount = async (uuid: string) => {
  const response = await fetch(`${API_URL}/Account/ActivateUser?uuid=${uuid}`, {
    method: "POST",
  });

  if (!response.ok) throw new Error();

  return response;
};

export {
  getFamilyRelatives,
  updateUser,
  getGenders,
  updateUserImage,
  getUserImage,
  activateAccount,
};
