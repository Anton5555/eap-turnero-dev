import { format } from "date-fns";
import { type AddRelativeInputs } from "~/_components/forms/AddRelativeForm";
import { type EditProfileInputs } from "~/_components/forms/EditProfileForm";
import { env } from "~/env";
import type {
  FamilyRelashionships,
  FamilyRelative,
  Gender,
} from "~/types/users";

const API_URL = env.NEXT_PUBLIC_API_URL;

type FamilyRelashionshipsApiData = {
  ID: number;
  NAME: string;
};

const parseFamilyRelashionshipsApiData = (
  familyRelationships: FamilyRelashionshipsApiData[],
): FamilyRelashionships[] =>
  familyRelationships.map((familyRelationship) => ({
    value: familyRelationship.ID,
    label: familyRelationship.NAME,
  }));

const getFamilyRelashionships = async (accessToken: string) => {
  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(`${API_URL}/Patient/getFamilyRelationships`, {
    method: "GET",
    headers,
  });

  if (!response.ok)
    throw new Error("Error al recuperar las relaciones familiares");

  const familyRelashionshipsApiData =
    (await response.json()) as FamilyRelashionshipsApiData[];

  return parseFamilyRelashionshipsApiData(familyRelashionshipsApiData);
};

type FamilyRelativeApiData = {
  IDPaciente: number;
  Line: number;
  IdPacienteFam: number;
  Name: string;
  Apellidos: string;
  Parentesco: number;
  Convive: string;
  Telefono: string;
  Mail: string;
};

const parseFamilyRelativesApiData = (
  familyRelatives: FamilyRelativeApiData[],
): FamilyRelative[] =>
  familyRelatives.map((familyRelative) => ({
    id: familyRelative.IdPacienteFam,
    patientId: familyRelative.IDPaciente,
    line: familyRelative.Line,
    familyRelativeId: familyRelative.IdPacienteFam,
    name: familyRelative.Name,
    lastName: familyRelative.Apellidos,
    relationship: familyRelative.Parentesco,
    livesWith: familyRelative.Convive,
    phone: familyRelative.Telefono,
    email: familyRelative.Mail,
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

  const familyRelativesApiData =
    (await response.json()) as FamilyRelativeApiData[];

  return parseFamilyRelativesApiData(familyRelativesApiData);
};

const DeleteFamilyRelativeAdapter = (props: {
  patientId: number;
  line: number;
}) => {
  const { patientId, line } = props;

  return {
    IDPaciente: patientId,
    Line: line,
  };
};

const deleteFamilyRelative = async (props: {
  patientId: number;
  line: number;
  accessToken: string;
}) => {
  const { accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${API_URL}/Patient/deleteFamilyRelative`, {
    method: "DELETE",
    headers,
    body: JSON.stringify(DeleteFamilyRelativeAdapter(props)),
  });

  if (!response.ok) throw new Error("Error al eliminar el familiar");

  return response;
};

type AddFamilyRelativeRequest = {
  IDPaciente: number;
  Name: string;
  Apellidos: string;
  Mail: string;
  Parentesco?: number;
  sexo?: number;
};

const AddFamilyRelativeAdapter = (props: {
  addFamilyRelativeData: AddRelativeInputs;
  patientId: number;
}) => {
  const { addFamilyRelativeData, patientId } = props;

  const familyRelative: AddFamilyRelativeRequest = {
    IDPaciente: patientId,
    Name: addFamilyRelativeData.name,
    Apellidos: addFamilyRelativeData.lastName,
    Mail: addFamilyRelativeData.email,
  };

  if (addFamilyRelativeData.relationship !== "0")
    familyRelative.Parentesco = Number(addFamilyRelativeData.relationship);

  if (addFamilyRelativeData.gender !== "0")
    familyRelative.sexo = Number(addFamilyRelativeData.gender);

  return familyRelative;
};

const addFamilyRelative = async (props: {
  addFamilyRelativeData: AddRelativeInputs;
  patientId: string;
  accessToken: string;
}) => {
  const { addFamilyRelativeData, patientId, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);
  headers.append("Content-Type", "application/json");

  const addFamilyRelativeResponse = await fetch(
    `${API_URL}/Patient/AddFamilyRelative`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(
        AddFamilyRelativeAdapter({
          addFamilyRelativeData,
          patientId: Number(patientId),
        }),
      ),
    },
  );

  if (!addFamilyRelativeResponse.ok)
    throw new Error("Error al añadir el familiar");

  return addFamilyRelativeResponse;
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

  const gendersApiData = (await response.json()) as GenderApiData[];

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
    pdp: "Y",
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
  addFamilyRelative,
  getFamilyRelashionships,
  getFamilyRelatives,
  deleteFamilyRelative,
  updateUser,
  getGenders,
  updateUserImage,
  getUserImage,
  activateAccount,
};
