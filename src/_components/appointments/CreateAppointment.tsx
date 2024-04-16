"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import PlatformContainer from "../common/PlatformContainer";
import { Button } from "../common/Button";
import { H3, H6 } from "../common/Typography";
import Stepper from "../common/Stepper";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { getContractServices } from "~/lib/api/services";
import { getProfessionals } from "~/lib/api/professionals";
import { ContractService } from "~/types/services";
import { Professional } from "~/types/professionals";
import Calendar from "./Calendar";
import cn from "~/lib/utils";
import {
  add,
  endOfMonth,
  format,
  isEqual,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { getFreeAppointments } from "~/lib/api/appointments";

const ProfessionalInfo = (professional: Professional) => (
  <div className="flex-col">
    <H6 className="text-sm font-bold uppercase leading-4 lg:text-lg lg:leading-5">
      {professional.name}
    </H6>

    <p className="font-lato leading-5 text-gray40">
      {professional.subSpecialty ?? "Subespecialidad"}
    </p>

    <Button className="pl-0" variant={"link"}>
      Ver ficha del profesional
    </Button>
  </div>
);

const CreateAppointment = () => {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(
    null,
  );

  const [selectedService, setSelectedService] = useState<number | null>(null);

  const [selectedProfessional, setSelectedProfessional] = useState<
    number | null
  >(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

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
        serviceId: selectedService!,
        specialtyId: selectedSpecialty!,
        accessToken: session?.user.accessToken!,
      }),
    enabled: !!selectedService && !!selectedSpecialty,
  });

  const {
    data: freeAppointments,
    isLoading: isLoadingFreeAppointments,
    error: errorFreeAppointments,
  } = useQuery({
    queryKey: ["freeAppointments"],
    queryFn: () =>
      getFreeAppointments({
        dateFrom:
          currentMonth.getMonth() === new Date().getMonth()
            ? format(new Date(), "yyyy-MM-dd")
            : format(startOfMonth(currentMonth), "yyyy-MM-dd"),
        dateTo: format(endOfMonth(currentMonth), "yyyy-MM-dd"),
        // TODO: replace hardcoded timezone with info from backend when done
        timezone: "Argentina Standard Time",
        accessToken: session?.user.accessToken!,
        employeeId: selectedProfessional!,
        specialtyId: selectedSpecialty!,
        serviceId: selectedService!,
      }),
    enabled: !!selectedProfessional && !!selectedSpecialty && !!selectedService,
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
    setSelectedService(
      services?.find((service) => service.specialtyId === specialty)
        ?.serviceId!,
    );

    if (selectedProfessional) setSelectedProfessional(null);
    if (selectedDate) setSelectedDate(null);
    if (selectedTime) setSelectedTime(null);

    setCurrentStep(2);
  };

  const handleProfessionalSelect = async (professional: number) => {
    setSelectedProfessional(professional);
    if (selectedDate) setSelectedDate(null);
    if (selectedTime) setSelectedTime(null);

    if (currentStep === 2) setCurrentStep(3);
  };

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);

    if (currentStep === 3) setCurrentStep(4);
  };

  return (
    <div className="m-4 space-y-4 lg:m-0">
      <Stepper steps={4} currentStep={currentStep} />

      <div className="block space-y-2">
        <H3 className="text-green">
          {currentStep === 1 ? "Área de atención" : "Agenda tu próxima cita"}
        </H3>

        <H6>
          {currentStep === 1
            ? "Selecciona un tipo de asistencia"
            : "Selecciona un profesional, fecha y hora para tu cita"}
        </H6>
      </div>

      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
        {currentStep === 1 && (
          <ul className="space-y-6 lg:w-full">
            {services?.map((service) => (
              <li key={service.specialtyId}>
                <PlatformContainer
                  className="rounded-2xl lg:min-h-0"
                  selected={service.specialtyId === selectedSpecialty}
                >
                  <div className="flex items-center justify-between px-6 py-4 lg:p-0">
                    <div className="flex items-center space-x-4 lg:space-x-8">
                      <Image
                        className="h-18 rounded-2xl object-cover lg:h-20"
                        src={`/${service.specialty}.webp`}
                        width={80}
                        height={80}
                        alt={service.specialty}
                      />

                      <H6 className="text-sm font-bold uppercase leading-4 lg:text-lg lg:leading-5">
                        {service.specialty}
                      </H6>
                    </div>

                    <Button
                      className="font-lato text-sm font-normal"
                      variant={
                        service.specialtyId === selectedSpecialty
                          ? "default"
                          : "outline"
                      }
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

        {currentStep > 1 && (
          <>
            <div className="space-y-6 lg:flex lg:w-3/5 lg:flex-col">
              <div
                className={cn(
                  "lg:flex lg:flex-row",
                  currentStep === 3 && "flex flex-col",
                  (currentStep === 2 || currentStep === 4) && "hidden lg:flex",
                )}
              >
                <PlatformContainer className="w-full lg:min-h-0">
                  <Calendar
                    availableDays={
                      currentStep > 2 &&
                      selectedProfessional &&
                      freeAppointments
                        ? Object.keys(freeAppointments)
                        : []
                    }
                    onDayClick={(day) => handleDateSelect(day)}
                    onMonthChange={handleMonthChange}
                  />
                </PlatformContainer>
              </div>

              <div
                className={cn(
                  "w-full lg:flex lg:flex-row",
                  currentStep === 4 && "flex flex-col",
                  (currentStep === 2 || currentStep === 3) && "hidden lg:flex",
                )}
              >
                <PlatformContainer className="w-full lg:min-h-0">
                  {!selectedDate && (
                    <H6 className="text-center">
                      Selecciona una fecha para ver los horarios disponibles
                    </H6>
                  )}

                  {freeAppointments &&
                    selectedDate &&
                    freeAppointments[selectedDate.getDate()]!.length > 0 && (
                      <div className="grid grid-cols-1 justify-between gap-x-0 gap-y-6 p-6 lg:grid-cols-4 lg:gap-x-8 lg:p-0 xl:grid-cols-5">
                        {freeAppointments[selectedDate?.getDate()]?.map(
                          (time, index) => (
                            <Button
                              key={index}
                              className="h-10 w-full font-['Open_Sans'] text-base font-normal lg:h-12"
                              variant={
                                time.start === selectedTime
                                  ? "default"
                                  : "secondary"
                              }
                              onClick={() => setSelectedTime(time.start)}
                            >
                              {time.start.getHours()}:
                              {time.start.getMinutes() === 0
                                ? time.start.getMinutes() + "0"
                                : time.start.getMinutes()}
                            </Button>
                          ),
                        )}
                      </div>
                    )}
                </PlatformContainer>
              </div>
            </div>

            <div
              className={cn(
                "lg:h-[calc(60dvh)] lg:w-2/5 lg:overflow-y-auto",
                currentStep === 2 && "w-full",
                currentStep > 2 && "hidden lg:block",
              )}
            >
              {!professionals?.length ? (
                <div>No se encontraron profesionales</div>
              ) : (
                <ul className="space-y-6">
                  {professionals?.map((professional) => (
                    <li key={professional.id}>
                      <PlatformContainer
                        className="rounded-2xl lg:min-h-0 lg:py-6"
                        selected={professional.id === selectedProfessional}
                      >
                        <div className="flex items-center justify-between px-6 py-4 lg:p-0">
                          <div className="flex items-center">
                            {/* TODO: Change professional images for the real ones */}
                            <Image
                              className="h-18 rounded-2xl object-cover lg:h-20"
                              src={`/default-avatar.webp`}
                              width={80}
                              height={80}
                              alt={professional.name}
                            />
                          </div>

                          <div className="hidden lg:flex">
                            <ProfessionalInfo {...professional} />
                          </div>

                          <div className="flex flex-col">
                            <div className="flex lg:hidden">
                              <ProfessionalInfo {...professional} />
                            </div>

                            <Button
                              className="font-lato text-sm font-normal lg:flex-row"
                              variant={
                                professional.id === selectedProfessional
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() =>
                                handleProfessionalSelect(professional.id)
                              }
                            >
                              Seleccionar
                            </Button>
                          </div>
                        </div>
                      </PlatformContainer>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateAppointment;
