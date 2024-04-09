import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export interface ContractService {
  id: number;
  companyId: number;
  serviceId: number;
  areaId: number;
  area: string;
  serviceName: string;
  specialtyId: number;
  specialty: string;
  locationId: number;
  locationName: string;
  processType: number;
  position: number;
  positionName: string;
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

const GET = async (req: NextRequest) => {
  const token = await getToken({ req });
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  const headers = new Headers();
  headers.append("Authorization", token?.user.accessToken!);

  const response = await fetch(
    `${API_URL}/Patient/getContractServices?empresa=1032&sede=642&puesto=-1`,
    {
      method: "GET",
      headers: headers,
    },
  );

  if (!response.ok)
    throw new Error("Error al obtener los servicios de contrato");

  const data = await response.json();

  const parsedData: ContractService[] = parseData(data);

  return Response.json(parsedData);
};

export { GET };
