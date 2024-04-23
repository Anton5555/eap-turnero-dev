import { Inputs } from "~/_components/forms/EditProfileForm";
import { env } from "~/env";
import { FamilyRelative, Gender } from "~/types/users";

const API_URL = env.API_URL;

type FamilyRelativeApiData = {
  IDPaciente: number;
  Line: number;
  IdPacienteFam: number;
  Nombre: string;
  Apellidos: string;
  Parentesco: number;
  Convive: string;
};

const mapApiDataToFamilyRelatives = (
  data: FamilyRelativeApiData[],
): FamilyRelative[] =>
  data.map((familyRelative) => ({
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

  const data = await response.json();

  return mapApiDataToFamilyRelatives(data);
};

type GenderApiData = {
  fs_id: number;
  fs_descripcion: string;
};

const parseGendersData = (data: GenderApiData[]): Gender[] =>
  data.map((gender) => ({
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

  const data = await response.json();

  return parseGendersData(data);
};

const UpdateUserAdapter = (data: Inputs) => ({
  nombre: data.name,
  apellido1: data.lastName,
  mail: data.email,
  pais: data.location,
  sexo: data.gender,
  fecha_nacimiento: data.birthdate,
});

const updateUser = async (props: { data: Inputs; accessToken: string }) => {
  const { data, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(`${API_URL}/Account/updateuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UpdateUserAdapter(data)),
  });

  if (!response.ok)
    throw new Error("Error al actualizar los datos del usuario");

  return response;
};

const getUserImage = async (imageId: string) => {
  const response = await fetch(
    `${API_URL}/Patient/getUserImage?imgName=${imageId}`,
    { method: "GET" },
  );

  if (!response.ok) throw new Error("Error al recuperar la imagen del usuario");

  return response;
};

const updateUserImage = async (props: { image: File; patientId: string }) => {
  const { image, patientId } = props;

  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(
    `${API_URL}/api/Patient/updatePatientImg?consultantId=${patientId}`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok)
    throw new Error("Error al actualizar la imagen del usuario");

  return response;
};

export {
  getFamilyRelatives,
  updateUser,
  getGenders,
  getUserImage,
  updateUserImage,
};
