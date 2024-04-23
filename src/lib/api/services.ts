import { ContractService } from "~/types/services";
import { env } from "~/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface OriginalServiceData {
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

const parseData = (originalServices: OriginalServiceData[]) => {
  return originalServices.map((service) => ({
    id: service.ID,
    companyId: service.ID_EMPRESA,
    serviceId: service.IDSERVICIO,
    areaId: service.IDAREA,
    area: service.AREA,
    serviceName: service.NOMBRESERVICIO,
    specialtyId: service.IDESPECIALIDAD,
    specialty: service.ESPECIALIDAD,
    locationId: service.IDSEDE,
    locationName: service.NOMBRESEDE,
    processType: service.TIPOPROC,
    position: service.PUESTO,
    positionName: service.NOMBREPUESTO,
    rn: service.rn,
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

  const requestUrl = `${API_URL}/Patient/getContractServices?empresa=${companyId}&sede=${locationId}&puesto=${positionId}`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers,
  });

  if (!response.ok) throw new Error("Error al obtener los servicios");

  const data = await response.json();

  return parseData(data) as ContractService[];
};

export { getContractServices };
