"use client";

import { useQuery } from "@tanstack/react-query";
import { ContractService } from "~/app/api/services/route";
import PlatformContainer from "../common/PlatformContainer";
import { Button } from "../common/Button";
import { H3, H6 } from "../common/Typography";
import Stepper from "../common/Stepper";
import { useState } from "react";

const CreateAppointment = () => {
  const [currentStep, setCurrentStep] = useState(2);

  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const data = (await fetch("/api/services")).json();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <Stepper steps={4} currentStep={currentStep} />

      <div className="hidden space-y-4 lg:block">
        <H3 className="text-green">Área de atención</H3>

        <H6>Selecciona un tipo de asistencia</H6>
      </div>

      <ul className="space-y-6">
        {services?.map((service: ContractService) => (
          <li key={service.id}>
            <PlatformContainer className="lg:min-h-0">
              <div className="flex justify-between">
                <div>
                  <span>Imagen</span>

                  <span>{service.specialty}</span>
                </div>

                <Button>Seleccionar</Button>
              </div>
            </PlatformContainer>
          </li>
        ))}
      </ul>

      {/* Step 2: ... */}
      {/* Step 3: ... */}
      {/* Step 4: ... */}
    </div>
  );
};

export default CreateAppointment;
