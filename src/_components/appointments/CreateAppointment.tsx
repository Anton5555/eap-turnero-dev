"use client";

import { useQuery } from "@tanstack/react-query";
import { ContractService } from "~/app/api/services/route";
import PlatformContainer from "../common/PlatformContainer";
import { Button } from "../common/Button";
import { H3, H6 } from "../common/Typography";
import Stepper from "../common/Stepper";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { getContractServices } from "~/lib/api/services";
import { getProfessionals } from "~/lib/api/professionals";

const CreateAppointment = () => {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(
    null,
  );
  const [selectedProfessional, setSelectedProfessional] = useState<
    number | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const {
    data: services,
    isLoading: isLoadingServices,
    error: errorServices,
  } = useQuery<ContractService[], Error>({
    queryKey: ["services"],
    queryFn: () =>
      getContractServices({
        companyId: session?.user.company!,
        locationId: session?.user.location!,
        positionId: session?.user.position!,
        accessToken: session?.user.accessToken!,
      }),
    enabled:
      !!session?.user.company &&
      !!session?.user.location &&
      !!session?.user.position &&
      !!session?.user.accessToken,
  });

  const {
    data: professionals,
    isLoading: isLoadingProfessionals,
    error: errorProfessionals,
  } = useQuery({
    queryKey: ["professionals"],
    queryFn: () =>
      getProfessionals({
        locationId: session?.user.location!,
        serviceId: services?.find(
          (service) => service.specialtyId === selectedSpecialty,
        )?.serviceId!,
        specialtyId: selectedSpecialty!,
        accessToken: session?.user.accessToken!,
      }),
    enabled: !!selectedSpecialty && !!services,
  });

  if (isLoadingServices || isLoadingProfessionals) {
    return <div>Loading...</div>;
  }

  if (errorServices || errorProfessionals) {
    return (
      <div>Error: {errorServices?.message || errorProfessionals?.message}</div>
    );
  }

  const handleSpecialtySelect = (specialty: number) => {
    setSelectedSpecialty(specialty);
    if (selectedProfessional) setSelectedProfessional(null);
    if (selectedDate) setSelectedDate(null);
    if (selectedTime) setSelectedTime(null);
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="space-y-4">
      <Stepper steps={4} currentStep={currentStep} />

      <div className="hidden space-y-4 lg:block">
        <H3 className="text-green">Área de atención</H3>

        <H6>Selecciona un tipo de asistencia</H6>
      </div>

      {currentStep === 1 && (
        <ul className="space-y-6">
          {services?.map((service) => (
            <li key={service.specialtyId}>
              <PlatformContainer className="lg:min-h-0">
                <div className="flex justify-between">
                  <div className="space-x-4">
                    <span>Imagen</span>

                    <span>{service.specialty}</span>
                  </div>

                  <Button
                    onClick={() => handleSpecialtySelect(service.specialtyId)}
                  >
                    Seleccionar
                  </Button>
                </div>
              </PlatformContainer>
            </li>
          ))}
        </ul>
      )}

      {currentStep === 2 && (
        <ul className="space-y-6">
          {professionals?.map((professional) => (
            <li key={professional.id}>
              <PlatformContainer className="lg:min-h-0">
                <div className="flex justify-between">
                  <div className="space-x-4">
                    <span>Imagen</span>

                    <span>{professional.name}</span>
                  </div>

                  <Button>Seleccionar</Button>
                </div>
              </PlatformContainer>
            </li>
          ))}
        </ul>
      )}

      {/* Step 3: ... */}
      {/* Step 4: ... */}
    </div>
  );
};

export default CreateAppointment;
