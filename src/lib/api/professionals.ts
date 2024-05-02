import { Professional } from "~/types/professionals";
import { env } from "~/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface ProfessionalApiData {
  EmpID: number;
  NAME: string;
  PAIS: string;
  subEsp: string | null;
  paises: string | null;
}

interface SubSpecialtiesApiData {
  value: {
    ID: number;
    ESPECIALIDAD: number;
    SUB_ESPECIALIDAD: string;
  }[];
}

const parseData = (
  professionals: ProfessionalApiData[],
  subSpecialties: SubSpecialtiesApiData | null,
): Professional[] =>
  professionals.map((professional) => ({
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

  const professionals = (await response.json()) as ProfessionalApiData[];

  let subSpecialties;

  const professionalHasSubSpecialties = professionals.some(
    (professional) => professional.subEsp,
  );

  if (professionalHasSubSpecialties) {
    const subSpecialtiesResponse = await fetch(
      `${API_URL}/misc/getParamDepartamentoSub`,
      {
        method: "GET",
        headers,
      },
    );

    if (!subSpecialtiesResponse.ok)
      throw new Error("Error al obtener las subespecialidades");

    subSpecialties =
      (await subSpecialtiesResponse.json()) as SubSpecialtiesApiData;
  }

  const professionalsWithSubspecialties = parseData(
    professionals,
    subSpecialties ?? null,
  );

  return professionalsWithSubspecialties;
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

  const responseBody = await response.json();

  return responseBody;
};

export { getProfessionals, getProfessionalSapUser };
