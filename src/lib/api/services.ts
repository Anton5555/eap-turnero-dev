import { ContractService } from "~/types/services";
import { env } from "~/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface OriginalData {
  ID: number;
  ID_EMPRESA: number;
  IDSERVICIO: number;
  IDAREA: number;
  AREA: string;
  NOMBRESERVICIO: string;
  IDESPECIALIDAD: number;
  ESPECIALIDAD: string;
  IDSEDE: number;
  NOMBRESEDE: string;
  TIPOPROC: number;
  PUESTO: number;
  NOMBREPUESTO: string;
  rn: number;
}

const parseData = (data: OriginalData[]) => {
  return data.map((item) => ({
    id: item.ID,
    companyId: item.ID_EMPRESA,
    serviceId: item.IDSERVICIO,
    areaId: item.IDAREA,
    area: item.AREA,
    serviceName: item.NOMBRESERVICIO,
    specialtyId: item.IDESPECIALIDAD,
    specialty: item.ESPECIALIDAD,
    locationId: item.IDSEDE,
    locationName: item.NOMBRESEDE,
    processType: item.TIPOPROC,
    position: item.PUESTO,
    positionName: item.NOMBREPUESTO,
    rn: item.rn,
  }));
};

const getContractServices = async (props: {
  companyId: number;
  locationId: number;
  positionId: number;
  accessToken: string;
}) => {
  const { companyId, locationId, positionId, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(
    `${API_URL}/Patient/getContractServices?empresa=${companyId}&sede=${locationId}&puesto=${positionId}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) throw new Error("Error al obtener los servicios");

  const data = await response.json();

  return parseData(data) as ContractService[];
};

export { getContractServices };
