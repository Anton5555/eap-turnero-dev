import { Professional } from "~/types/professionals";
import { env } from "~/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface OriginalProfessionalData {
  EmpID: number;
  NAME: string;
  PAIS: string;
  subEsp: string | null;
  paises: string | null;
}

interface SubSpecialtyData {
  value: {
    ID: number;
    ESPECIALIDAD: number;
    SUB_ESPECIALIDAD: string;
  }[];
}

const parseData = (
  originalProfessionalsData: OriginalProfessionalData[],
  subSpecialties: SubSpecialtyData | null,
): Professional[] =>
  originalProfessionalsData.map((professional) => ({
    id: professional.EmpID,
    name: professional.NAME,
    subSpecialties:
      professional.subEsp
        ?.split(",")
        .map(
          (id) =>
            subSpecialties?.value.find((s) => s.ID === Number(id))
              ?.SUB_ESPECIALIDAD as string,
        ) ?? undefined,
  }));

const getProfessionals = async (props: {
  locationId: number;
  serviceId: number;
  specialtyId: number;
  accessToken: string;
  modalityId: number;
}) => {
  const { locationId, serviceId, specialtyId, accessToken, modalityId } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);
  headers.append("Content-Type", "application/json");

  const requestUrl = `${API_URL}/profesional/getProfesionalesByModalidadesServicio?sede=${locationId}&servicio=${serviceId}&especialidad=${specialtyId}`;

  const response = await fetch(requestUrl, {
    method: "POST",
    headers,
    body: JSON.stringify([modalityId]),
  });

  if (!response.ok) throw new Error("Error al obtener los profesionales");

  const data = await response.json();

  let subSpecialties;
  if (
    data.some((professional: OriginalProfessionalData) => professional.subEsp)
  ) {
    const subEspecialtiesResponse = await fetch(
      `${API_URL}/misc/getParamDepartamentoSub`,
      {
        method: "GET",
        headers,
      },
    );

    if (!subEspecialtiesResponse.ok)
      throw new Error("Error al obtener las subespecialidades");

    subSpecialties = (await subEspecialtiesResponse.json()) as SubSpecialtyData;
  }

  const professionals = parseData(data, subSpecialties ?? null);

  return professionals;
};

const getProfessionalSapUser = async (props: {
  professionalId: number;
  accessToken: string;
}) => {
  const { professionalId, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  // FIXME: Change the endpoint to the real one when backend provides it
  const response = await fetch(
    `${API_URL}/profesional/getSapUserByProfesional?profesional=${professionalId}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok)
    throw new Error("Error al obtener el usuario SAP del profesional");

  const data = await response.json();

  return data;
};

export { getProfessionals, getProfessionalSapUser };
