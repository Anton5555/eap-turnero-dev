import { Professional } from "~/types/professionals";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface OriginalData {
  EmpID: number;
  NAME: string;
  PAIS: string;
  subEsp: string | null;
  paises: string | null;
}

const parseData = (data: OriginalData[]): Professional[] => {
  return data.map((item) => ({
    id: item.EmpID,
    name: item.NAME,
    subSpecialty: item.subEsp,
  }));
};

const getProfessionals = async (props: {
  locationId: number;
  serviceId: number;
  specialtyId: number;
  accessToken: string;
}) => {
  const { locationId, serviceId, specialtyId, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);
  headers.append("Content-Type", "application/json");

  const response = await fetch(
    `${API_URL}/profesional/getProfesionalesByModalidadesServicio?sede=${locationId}&servicio=${serviceId}&especialidad=${specialtyId}`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify([3]),
    },
  );

  if (!response.ok) throw new Error("Error al obtener los profesionales");

  const data = await response.json();

  return parseData(data) as Professional[];
};

export { getProfessionals };
