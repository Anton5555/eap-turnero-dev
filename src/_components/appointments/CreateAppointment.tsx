"use client";

import { useQuery } from "@tanstack/react-query";
import { ContractService } from "~/app/api/services/route";
import PlatformContainer from "../common/PlatformContainer";
import { Button } from "../common/Button";
import { H3, H6 } from "../common/Typography";
import Stepper from "../common/Stepper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// I'm not sure of validating date and time with zod
const createAppointmentFormSchema = z
  .object({
    specialty: z.number(),
    professional: z.number(),
    date: z.date(),
    time: z.string(),
  })
  .refine((data) => data.date > new Date(), {
    message: "La fecha debe ser mayor a la actual",
  });

export type Inputs = z.infer<typeof createAppointmentFormSchema>;

const CreateAppointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const selectedSpecialty = watch();

  const {
    data: specialties,
    isLoading: isLoadingSpecialties,
    error: errorSpecialties,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: async () => {
      const data = (await fetch("/api/services")).json();
      return data;
    },
  });

  const {
    data: professionals,
    isLoading: isLoadingProfessionals,
    error: errorProfessionals,
  } = useQuery({
    queryKey: ["professionals"],
    queryFn: async () => {
      const data = (await fetch("/api/services")).json();
      return data;
    },
  });

  if (isLoadingSpecialties || isLoadingProfessionals) {
    return <div>Loading...</div>;
  }

  if (errorSpecialties || errorProfessionals) {
    return (
      <div>
        Error: {errorSpecialties?.message || errorProfessionals?.message}
      </div>
    );
  }

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  const handleNextStep = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Stepper steps={4} currentStep={currentStep} />

        <div className="hidden space-y-4 lg:block">
          <H3 className="text-green">Área de atención</H3>

          <H6>Selecciona un tipo de asistencia</H6>
        </div>

        {currentStep === 1 && (
          <ul className="space-y-6">
            {specialties?.map((service: ContractService) => (
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
        )}

        {currentStep === 2 && (
          <ul className="space-y-6">
            {professionals?.map((service: ContractService) => (
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
        )}

        {/* Step 3: ... */}
        {/* Step 4: ... */}
      </div>
    </form>
  );
};

export default CreateAppointment;
