enum SPECIALTY {
  PSICOLOGY = "Psicología",
  NUTRITION = "Nutrición",
  LEGAL = "Legal",
  INFORMATIVE = "Informativa",
  FINANCE = "Finanzas",
}

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

export { SPECIALTY, type ContractService };
