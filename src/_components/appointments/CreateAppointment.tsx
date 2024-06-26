"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../common/Button";
import { H3, H6 } from "../common/Typography";
import Stepper from "../common/Stepper";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getProfessionals } from "~/lib/api/professionals";
import { ContractService } from "~/types/services";
import { Professional } from "~/types/professionals";
import cn from "~/lib/utils";
import {
  differenceInMinutes,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns";
import { createAppointment, getFreeAppointments } from "~/lib/api/appointments";
import Link from "next/link";
import ArrowIcon from "../icons/Arrow";
import { toast } from "sonner";
import ConfirmationDialog from "./ConfirmationDialog";
import { useRouter } from "next/navigation";
import Filters from "./CreateAppointmentComponents/Filters";
import ServiceSelection from "./CreateAppointmentComponents/ServiceSelection";
import DateSelection from "./CreateAppointmentComponents/DateSelection";
import TimeSelection from "./CreateAppointmentComponents/TimeSelection";
import ProfessionalSelection from "./CreateAppointmentComponents/ProfessionalSelection";
import { timeRanges } from "~/lib/constants";
import { FreeAppointment, FreeAppointmentsByDay } from "~/types/appointments";

const filterAppointmentsByDuration = (
  appointments: FreeAppointment[],
  durationFilter: number,
  timeRangeFilter: { start: number; end: number } | null,
): FreeAppointment[] => {
  const blocksNeeded = durationFilter / 15;

  return appointments
    .map((appointment, index) => {
      if (timeRangeFilter) {
        const appointmentStartHour = new Date(appointment.start).getHours();
        const appointmentEndHour = new Date(appointment.end).getHours();

        if (
          appointmentStartHour < timeRangeFilter.start ||
          appointmentEndHour > timeRangeFilter.end
        )
          return undefined;
      }

      const futureAppointments = appointments.slice(
        index + 1,
        index + blocksNeeded,
      );

      if (futureAppointments.length < blocksNeeded - 1) return undefined;

      const lastAppointment = futureAppointments[futureAppointments.length - 1];

      if (!lastAppointment) return undefined;

      if (timeRangeFilter) {
        const lastAppointmentEndHour = new Date(lastAppointment.end).getHours();

        if (lastAppointmentEndHour > timeRangeFilter.end) return undefined;
      }

      const duration = differenceInMinutes(
        new Date(lastAppointment.end),
        new Date(appointment.start),
      );

      if (duration === durationFilter)
        return { start: appointment.start, end: lastAppointment.end };

      return undefined;
    })
    .filter(Boolean) as FreeAppointment[];
};

const CreateAppointment: React.FC<{
  services: ContractService[];
}> = ({ services }) => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) return;

  const { user } = session;

  const [currentStep, setCurrentStep] = useState(1);

  const [selectedService, setSelectedService] =
    useState<ContractService | null>(null);

  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);

  const [freeAppointmentsTimes, setFreeAppointmentsTimes] = useState<
    { dateFrom: Date; dateTo: Date }[]
  >([]);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();

  const [selectedTime, setSelectedTime] = useState<{
    dateFrom: Date;
    dateTo: Date;
  } | null>(null);

  const [locationFilter, setLocationFilter] = useState<number>(user.location);

  const [modalityFilter, setModalityFilter] = useState<number>(3);

  const [durationFilter, setDurationFilter] = useState<number>(45);

  const [timeRangeFilter, setTimeRangeFilter] = useState<{
    start: number;
    end: number;
  } | null>(null);

  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const {
    data: professionals,
    isLoading: isLoadingProfessionals,
    error: errorProfessionals,
  } = useQuery({
    queryKey: [
      "professionals",
      locationFilter,
      selectedService?.specialtyId,
      modalityFilter,
    ],
    queryFn: () =>
      getProfessionals({
        locationId: locationFilter ?? user.location!,
        serviceId: selectedService!.serviceId,
        specialtyId: selectedService?.specialtyId!,
        accessToken: user.accessToken,
        modalityId: modalityFilter,
      }),
    enabled: !!selectedService && (!!locationFilter || !!user.location),
  });

  const {
    data: { freeAppointments, agendaId } = {
      freeAppointments: null,
      agendaId: null,
    },
    isLoading: isLoadingFreeAppointments,
    error: errorFreeAppointments,
  } = useQuery({
    queryKey: [
      "freeAppointments",
      selectedProfessional,
      modalityFilter,
      timeRangeFilter,
      currentMonth,
      durationFilter,
    ],
    queryFn: async () => {
      const freeAppointmentsResponse = await getFreeAppointments({
        dateFrom:
          currentMonth.getMonth() === new Date().getMonth()
            ? format(new Date(), "yyyy-MM-dd")
            : format(startOfMonth(currentMonth), "yyyy-MM-dd"),
        dateTo: format(endOfMonth(currentMonth), "yyyy-MM-dd"),
        timezone: user.timezone,
        accessToken: user.accessToken,
        employeeId: selectedProfessional!.id,
        specialtyId: selectedService?.specialtyId!,
        serviceId: selectedService!.serviceId,
        modalityId: modalityFilter,
      });

      const filteredFreeAppointments: FreeAppointmentsByDay = {};

      for (const day in freeAppointmentsResponse.freeAppointments) {
        const appointments = freeAppointmentsResponse.freeAppointments[day];

        const appointmentsByDay =
          appointments &&
          filterAppointmentsByDuration(
            appointments,
            durationFilter,
            timeRangeFilter,
          );

        if (appointmentsByDay && appointmentsByDay.length > 0)
          filteredFreeAppointments[day] = appointmentsByDay;
      }

      if (selectedDate && !filteredFreeAppointments[selectedDate.getDate()])
        setFreeAppointmentsTimes([]);

      if (selectedDate && filteredFreeAppointments[selectedDate.getDate()])
        setFreeAppointmentsTimes(
          filteredFreeAppointments[selectedDate.getDate()]!.map(
            (freeAppointment) => ({
              dateFrom: freeAppointment.start,
              dateTo: freeAppointment.end,
            }),
          ),
        );

      if (selectedTime) setSelectedTime(null);

      return {
        freeAppointments: filteredFreeAppointments,
        agendaId: freeAppointmentsResponse.agendaId,
      };
    },

    enabled: !!selectedProfessional && !!selectedService,
  });

  useEffect(() => {
    let toastId: string | number | undefined;

    if (isLoadingFreeAppointments)
      toastId = toast.loading("Cargando horarios disponibles");
    else toast.dismiss(toastId);

    return () => {
      toast.dismiss(toastId);
    };
  }, [isLoadingFreeAppointments]);

  const { mutateAsync } = useMutation({
    mutationFn: createAppointment,
    onError: ({ message }) => toast.error(message),
    onSuccess: () => {
      router.push(
        `/platform?professional=${selectedProfessional?.name}&dateFrom=${selectedTime?.dateFrom}&dateTo=${selectedTime?.dateTo}`,
      );

      router.refresh();
    },
  });

  const handleServiceSelect = (service: ContractService) => {
    setSelectedService(service);

    if (selectedProfessional) setSelectedProfessional(null);
    if (selectedDate) setSelectedDate(undefined);
    if (selectedTime) setSelectedTime(null);

    setCurrentStep(2);
  };

  const handleProfessionalSelect = async (professional: Professional) => {
    setSelectedProfessional(professional);

    if (selectedDate) setSelectedDate(undefined);
    if (selectedTime) setSelectedTime(null);

    if (currentStep === 2) setCurrentStep(3);
  };

  const handleMonthChange = (month: Date) => {
    setSelectedDate(undefined);

    setCurrentMonth(month);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);

    if (selectedTime) setSelectedTime(null);

    setFreeAppointmentsTimes(
      freeAppointments![date.getDate()]!.map((freeAppointment) => ({
        dateFrom: freeAppointment.start,
        dateTo: freeAppointment.end,
      })),
    );

    if (currentStep === 3) setCurrentStep(4);
  };

  const handleSubmit = () =>
    toast.promise(
      mutateAsync({
        patientId: Number(user.id),
        agendaId: agendaId!,
        processType: selectedService?.processType!,
        dateFrom: `${format(selectedTime!.dateFrom, "yyyy-MM-dd")} ${format(selectedTime!.dateFrom, "HH:mm")}`,
        dateTo: `${format(selectedTime!.dateTo, "yyyy-MM-dd")} ${format(selectedTime!.dateTo, "HH:mm")}`,
        timezone: user.timezone,
        modalityId: modalityFilter,
        accessToken: user.accessToken!,
        areaId: selectedService?.areaId!,
        serviceId: selectedService?.serviceId!,
        specialtyId: selectedService?.specialtyId!,
        companyId: user.company!,
        locationId: user.location!,
        positionId: user.position!,
        employeeId: selectedProfessional?.id!,
      }),
      {
        loading: "Creando cita",
      },
    );

  const nextStep = () => {
    if (currentStep === 1 && !selectedService) {
      toast.error("Debes seleccionar un tipo de asistencia");

      return;
    }

    if (currentStep === 2 && !selectedProfessional) {
      toast.error("Debes seleccionar un profesional");

      return;
    }

    if (currentStep === 3 && !selectedDate) {
      toast.error("Debes seleccionar una fecha");

      return;
    }

    if (currentStep === 4) {
      if (!selectedTime) {
        toast.error("Debes seleccionar un horario");

        return;
      }

      setIsConfirmationDialogOpen(true);

      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handleTimeSelect = (times: { dateFrom: Date; dateTo: Date }) => {
    setSelectedTime(times);
    setIsConfirmationDialogOpen(true);
  };

  return (
    <>
      <div className="m-4 space-y-4 lg:m-0">
        <Stepper steps={4} currentStep={currentStep} />

        <div className="block space-y-4">
          <H3 className="text-green">
            {currentStep === 1 ? "Área de atención" : "Agenda tu próxima cita"}
          </H3>

          <H6>
            {currentStep === 1
              ? "Selecciona un tipo de asistencia"
              : "Selecciona un profesional, fecha y hora para tu cita"}
          </H6>
        </div>

        {currentStep > 1 && (
          <Filters
            defaultLocation={user.location}
            defaultModality={modalityFilter}
            onApply={(
              location: number | null,
              modality: number | null,
              timeRangeValue: number | null,
            ) => {
              if (location) setLocationFilter(location);
              if (modality) setModalityFilter(modality);

              if (timeRangeValue) {
                setTimeRangeFilter(
                  timeRanges.find(
                    (timeRange) => timeRange.value == timeRangeValue,
                  )?.times ?? null,
                );
              }
            }}
          />
        )}

        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          {currentStep === 1 && services && (
            <ServiceSelection
              services={services}
              selectedService={selectedService}
              handleServiceSelect={handleServiceSelect}
            />
          )}

          {currentStep > 1 && (
            <>
              <div className="space-y-6 lg:flex lg:w-3/5 lg:flex-col">
                <div
                  className={cn(
                    "lg:flex lg:flex-row",
                    currentStep === 3 && "flex flex-col",
                    (currentStep === 2 || currentStep === 4) &&
                      "hidden lg:flex",
                  )}
                >
                  <DateSelection
                    selectedProfessional={!!selectedProfessional}
                    isLoading={isLoadingFreeAppointments}
                    freeAppointments={freeAppointments}
                    selectedDate={selectedDate}
                    onDayClick={handleDateSelect}
                    onMonthChange={handleMonthChange}
                    error={errorFreeAppointments}
                  />
                </div>

                <div
                  className={cn(
                    "w-full lg:flex lg:flex-row",
                    currentStep === 4 && "flex flex-col",
                    (currentStep === 2 || currentStep === 3) &&
                      "hidden lg:flex",
                  )}
                >
                  <TimeSelection
                    selectedDate={!!selectedDate}
                    freeAppointments={!!freeAppointments}
                    freeAppointmentsTimes={freeAppointmentsTimes}
                    selectedTime={selectedTime}
                    onTimeSelect={handleTimeSelect}
                  />
                </div>
              </div>

              <div
                className={cn(
                  "lg:h-[calc(60dvh)] lg:w-2/5 lg:overflow-y-auto",
                  currentStep === 2 && "w-full",
                  currentStep > 2 && "hidden lg:block",
                )}
              >
                <ProfessionalSelection
                  professionals={professionals}
                  isLoading={isLoadingProfessionals}
                  error={errorProfessionals}
                  selectedProfessional={selectedProfessional}
                  handleProfessionalSelect={handleProfessionalSelect}
                />
              </div>
            </>
          )}
        </div>

        <div className="hidden justify-end gap-8 pt-4 lg:flex">
          <Link
            href="#"
            className={`${currentStep === 1 && "pointer-events-none"}`}
            aria-disabled={currentStep === 1}
            tabIndex={currentStep === 1 ? -1 : undefined}
            onClick={() => currentStep !== 1 && setCurrentStep(currentStep - 1)}
          >
            <ArrowIcon direction="left" disabled={currentStep === 1} />
          </Link>

          <Link href="#" onClick={nextStep}>
            <ArrowIcon direction="right" />
          </Link>
        </div>

        <div className="flex w-full flex-col space-y-2 lg:hidden">
          <Button className="h-12 w-full" onClick={nextStep}>
            Siguiente
          </Button>

          <Button
            className="h-12 w-full"
            variant="outline"
            disabled={currentStep === 1}
            onClick={() => currentStep !== 1 && setCurrentStep(currentStep - 1)}
          >
            Atrás
          </Button>
        </div>
      </div>

      {isConfirmationDialogOpen && selectedProfessional && selectedTime && (
        <ConfirmationDialog
          open={isConfirmationDialogOpen}
          onClose={() => setIsConfirmationDialogOpen(false)}
          onConfirm={() => handleSubmit()}
          professional={selectedProfessional?.name ?? ""}
          date={selectedTime!.dateFrom}
        />
      )}
    </>
  );
};

export default CreateAppointment;
