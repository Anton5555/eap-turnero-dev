import { type Professional } from "~/types/professionals";
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
  professionals.map((professional) => {
    const subSpecialtiesNames = professional.subEsp?.split(",").map((id) => {
      const foundSubSpecialty = subSpecialties?.value.find(
        (s) => s.ID === Number(id),
      );
      
      return foundSubSpecialty ? foundSubSpecialty.SUB_ESPECIALIDAD : undefined;
    });

    return {
      id: professional.EmpID,
      name: professional.NAME,
      subSpecialties: subSpecialtiesNames ?? undefined,
    } as Professional;
  });

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

interface SapUserApiData {
  value: {
    USER_CODE: string;
  }[];
}

const getProfessionalSapUser = async (props: {
  employeeId: number;
  accessToken: string;
}) => {
  const { employeeId, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(
    `${API_URL}/misc/getUserCodeByEmpId?empid=${employeeId}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok)
    throw new Error("Error al obtener el usuario SAP del profesional");

  const responseBody = (await response.json()) as SapUserApiData;

  if (responseBody.value.length === 0 || !responseBody.value[0]?.USER_CODE)
    throw new Error("No se encontró el usuario SAP del profesional");

  const sapUser = responseBody.value[0].USER_CODE;

  return sapUser;
};

export { getProfessionals, getProfessionalSapUser };
