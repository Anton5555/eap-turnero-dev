enum SPECIALTY {
  PSICOLOGY = "psychology",
  NUTRITION = "nutrition",
  LEGAL = "legal",
  INFORMATION = "information",
  FINANCE = "finance",
  UNKNOWN = "unknown",
}

const SPECIALTY_MAPPING: Record<string, SPECIALTY> = {
  Psicología: SPECIALTY.PSICOLOGY,
  Nutrición: SPECIALTY.NUTRITION,
  Legal: SPECIALTY.LEGAL,
  Informativa: SPECIALTY.INFORMATION,
  Finanzas: SPECIALTY.FINANCE,
};

type ContractService = {
  id: number;
  companyId: number;
  serviceId: number;
  areaId: number;
  area: string;
  serviceName: string;
  specialtyId: number;
  specialty: SPECIALTY;
  locationId: number;
  locationName: string;
  processType: number;
  position: number;
  positionName: string;
  rn: number;
};

export { SPECIALTY_MAPPING, SPECIALTY, type ContractService };
