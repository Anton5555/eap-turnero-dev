import { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createAppointment,
  getAvailableProfessionalsByDateAndTime,
  getFreeAppointments,
} from "~/lib/api/appointments";
import { type ContractService } from "~/types/services";
import { type User } from "~/types/users";
import { type Professional } from "~/types/professionals";
import type {
  FreeAppointment,
  FreeAppointmentsByDay,
} from "~/types/appointments";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { toast } from "sonner";
import { getActiveCase } from "../api/cases";
import { useTranslations } from "next-intl";

const filterAppointmentsByTimeRange = (
  appointments: FreeAppointment[],
  timeRangeFilter: { start: number; end: number },
): FreeAppointment[] => {
  return appointments
    .map((appointment) => {
      const appointmentStartHour = new Date(appointment.start).getHours();
      const appointmentEndHour = new Date(appointment.end).getHours();

      if (
        appointmentStartHour < timeRangeFilter.start ||
        appointmentEndHour > timeRangeFilter.end
      )
        return undefined;

      const appointmentEnd = new Date(appointment.end);
      const lastAppointmentEndHour = appointmentEnd.getHours();

      if (lastAppointmentEndHour > timeRangeFilter.end) return undefined;

      return appointment;
    })
    .filter(Boolean) as FreeAppointment[];
};

const useCreateAppointment = (user: User) => {
  const router = useRouter();

  const t = useTranslations("createAppointment");

  const [currentStep, setCurrentStep] = useState(1);

  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const [selectedService, setSelectedService] = useState<ContractService>();

  const [freeAppointmentsTimes, setFreeAppointmentsTimes] = useState<
    { dateFrom: Date; dateTo: Date }[]
  >([]);

  const [displayedMonth, setDisplayedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();

  const [selectedTime, setSelectedTime] = useState<{
    dateFrom: Date;
    dateTo: Date;
  }>();

  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional>();

  const [modalityFilter, setModalityFilter] = useState<number>(3);

  // setDurationFilter to be used when implementing the duration filter
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [durationFilter, setDurationFilter] = useState<number>(45);

  const [timeRangeFilter, setTimeRangeFilter] = useState<{
    start: number;
    end: number;
  }>();

  const [locationFilter, setLocationFilter] = useState<number>();

  useEffect(() => {
    if (user.location) {
      setLocationFilter(user.location);
    }
  }, [user]);

  const {
    data: freeAppointments = null,
    isLoading: isLoadingFreeAppointments,
    error: errorFreeAppointments,
  } = useQuery({
    queryKey: [
      "freeAppointments",
      locationFilter,
      modalityFilter,
      timeRangeFilter,
      displayedMonth,
      durationFilter,
      selectedService,
    ],
    queryFn: async () => {
      if (!selectedService) return;

      const freeAppointmentsResponse = await getFreeAppointments({
        dateFrom:
          displayedMonth.getMonth() === new Date().getMonth()
            ? format(new Date(), "yyyy-MM-dd")
            : format(startOfMonth(displayedMonth), "yyyy-MM-dd"),
        dateTo: format(endOfMonth(displayedMonth), "yyyy-MM-dd"),
        timezone: user.timezone,
        accessToken: user.accessToken,
        specialtyId: selectedService.specialtyId,
        serviceId: selectedService.serviceId,
        modalityId: modalityFilter,
        companyId: user.company,
        locationId: locationFilter ?? user.location,
        english: false,
      });

      const filteredFreeAppointments: FreeAppointmentsByDay = {};

      const currentDay = new Date();

      for (const day in freeAppointmentsResponse) {
        let appointments = freeAppointmentsResponse[day];

        const appointmentDay = new Date(
          displayedMonth.getFullYear(),
          displayedMonth.getMonth(),
          Number(day),
        );

        if (currentDay.toDateString() === appointmentDay.toDateString()) {
          appointments = appointments?.filter(({ start }) => {
            const appointmentTime = new Date(start);
            return appointmentTime.getTime() >= currentDay.getTime();
          });
        }

        if (appointments && appointments.length > 0) {
          const filteredAppointments = timeRangeFilter
            ? filterAppointmentsByTimeRange(appointments, timeRangeFilter)
            : appointments;

          if (filteredAppointments.length > 0)
            filteredFreeAppointments[day] = filteredAppointments;
        }
      }

      if (selectedTime) setSelectedTime(undefined);

      return filteredFreeAppointments;
    },
    enabled: !!selectedService && (!!locationFilter || !!user.location),
    staleTime: 0,
  });

  useEffect(() => {
    let toastId: string | number | undefined;

    if (isLoadingFreeAppointments)
      toastId = toast.loading(t("loadingAppointments"));
    else toast.dismiss(toastId);

    return void toast.dismiss(toastId);
  }, [isLoadingFreeAppointments, t]);

  useEffect(() => {
    if (
      !freeAppointments ||
      !selectedDate ||
      (selectedDate && !freeAppointments[selectedDate.getDate()])
    ) {
      setFreeAppointmentsTimes([]);
      return;
    }

    if (selectedDate && freeAppointments[selectedDate.getDate()])
      setFreeAppointmentsTimes(
        freeAppointments[selectedDate.getDate()]!.map((freeAppointment) => ({
          dateFrom: freeAppointment.start,
          dateTo: freeAppointment.end,
        })),
      );
  }, [selectedDate, freeAppointments]);

  const {
    data: professionals,
    isLoading: isLoadingProfessionals,
    error: errorProfessionals,
  } = useQuery({
    queryKey: [
      "availableProfessionals",
      locationFilter,
      selectedService?.specialtyId,
      modalityFilter,
      selectedTime,
    ],
    queryFn: () => {
      if (!selectedService || !selectedTime) return;

      return getAvailableProfessionalsByDateAndTime({
        date: selectedTime.dateFrom?.toISOString(),
        timezone: user.timezone,
        specialtyId: selectedService.specialtyId,
        serviceId: selectedService.serviceId,
        modalityId: modalityFilter,
        companyId: user.company,
        locationId: locationFilter ?? user.location,
        accessToken: user.accessToken,
        english: false,
      });
    },
    enabled:
      !!selectedService &&
      (!!locationFilter || !!user.location) &&
      !!selectedTime,
  });

  const { mutateAsync } = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      if (selectedProfessional && selectedTime) {
        const dateFrom = selectedTime.dateFrom.toISOString();
        const dateTo = selectedTime.dateTo.toISOString();

        router.push(
          `/platform?professional=${selectedProfessional?.name}&dateFrom=${dateFrom}&dateTo=${dateTo}&modality=${modalityFilter}`,
        );
      } else router.push("/platform");

      router.refresh();
    },
  });

  const handleServiceSelect = useCallback(
    async (service: ContractService) => {
      try {
        const activeCase = await getActiveCase({
          areaId: service.areaId,
          serviceId: service.serviceId,
          specialtyId: service.specialtyId,
          patientId: Number(user.id),
          accessToken: user.accessToken,
        });

        if (activeCase) {
          toast.error(t("activeCaseError"));

          return;
        }
      } catch (error) {
        toast.error(t("errorGettingActiveCase"));

        return;
      }

      setSelectedService(service);

      if (selectedProfessional) setSelectedProfessional(undefined);
      if (selectedDate) setSelectedDate(undefined);
      if (selectedTime) setSelectedTime(undefined);

      setCurrentStep(2);
    },
    [
      user.id,
      user.accessToken,
      selectedProfessional,
      selectedDate,
      selectedTime,
      t,
    ],
  );

  const handleMonthChange = useCallback(
    (month: Date) => {
      if (selectedDate) setSelectedDate(undefined);

      setDisplayedMonth(month);
    },
    [selectedDate],
  );

  const handleDateSelect = useCallback(
    (date: Date) => {
      setSelectedDate(date);

      if (selectedTime) setSelectedTime(undefined);
      if (selectedProfessional) setSelectedProfessional(undefined);

      setFreeAppointmentsTimes(
        freeAppointments![date.getDate()]!.map(({ start, end }) => ({
          dateFrom: start,
          dateTo: end,
        })),
      );

      setCurrentStep(3);
    },
    [freeAppointments, selectedTime, selectedProfessional],
  );

  const handleTimeSelect = useCallback(
    (times: { dateFrom: Date; dateTo: Date }) => {
      setSelectedTime(times);

      if (selectedProfessional) setSelectedProfessional(undefined);

      setCurrentStep(4);
    },
    [selectedProfessional],
  );

  const handleProfessionalSelect = useCallback(
    async (professional: Professional) => {
      setSelectedProfessional(professional);

      setIsConfirmationDialogOpen(true);
    },
    [],
  );

  const nextStep = useCallback(() => {
    if (currentStep === 1 && !selectedService) {
      toast.error(t("mustSelectAssistanceType"));

      return;
    }

    if (currentStep === 2 && !selectedDate) {
      toast.error(t("selectDate"));

      return;
    }

    if (currentStep === 3 && !selectedTime) {
      toast.error(t("selectTime"));

      return;
    }

    if (currentStep === 4) {
      if (!selectedProfessional) {
        toast.error(t("selectProfessional"));

        return;
      }

      setIsConfirmationDialogOpen(true);

      return;
    }

    setCurrentStep(currentStep + 1);
  }, [
    currentStep,
    selectedService,
    selectedDate,
    selectedTime,
    t,
    selectedProfessional,
  ]);

  const handleSubmit = useCallback(() => {
    if (!selectedService || !selectedTime || !selectedProfessional) {
      toast.error(t("appointmentCreationError"));

      return;
    }

    toast.promise(
      mutateAsync({
        patientId: Number(user.id),
        agendaId: selectedProfessional.agendaId,
        processType: selectedService.processType,
        dateFrom: `${format(selectedTime.dateFrom, "yyyy-MM-dd")} ${format(selectedTime.dateFrom, "HH:mm")}`,
        dateTo: `${format(selectedTime.dateTo, "yyyy-MM-dd")} ${format(selectedTime.dateTo, "HH:mm")}`,
        timezone: user.timezone,
        modalityId: modalityFilter,
        accessToken: user.accessToken,
        areaId: selectedService.areaId,
        serviceId: selectedService.serviceId,
        specialtyId: selectedService.specialtyId,
        companyId: user.company,
        locationId: user.location,
        positionId: user.position ?? -1,
        employeeId: selectedProfessional.id,
        notificationTitle: t("appointmentNotificationTitle", {
          professionalName: selectedProfessional.name,
        }),
        notificationDescription: t("appointmentNotificationDescription", {
          date: format(selectedTime.dateFrom, "dd/MM/yyyy"),
          time: format(selectedTime.dateFrom, "HH:mm"),
        }),
        notificationSpecialty: selectedService.specialty,
      }),
      {
        loading: t("creatingAppointment"),
        error: ({ message }) => t(message),
        success: t("appointmentCreated"),
      },
    );
  }, [
    selectedService,
    selectedTime,
    selectedProfessional,
    mutateAsync,
    user.id,
    user.timezone,
    user.accessToken,
    user.company,
    user.location,
    user.position,
    modalityFilter,
    t,
  ]);

  return {
    currentStep,
    displayedMonth,
    isConfirmationDialogOpen,
    isLoadingFreeAppointments,
    errorFreeAppointments,
    freeAppointments,
    freeAppointmentsTimes,
    selectedService,
    selectedProfessional,
    selectedDate,
    selectedTime,
    professionals,
    isLoadingProfessionals,
    errorProfessionals,
    modalityFilter,
    setCurrentStep,
    setSelectedDate,
    setSelectedTime,
    setModalityFilter,
    setTimeRangeFilter,
    setLocationFilter,
    handleServiceSelect,
    handleMonthChange,
    handleDateSelect,
    handleProfessionalSelect,
    setIsConfirmationDialogOpen,
    nextStep,
    handleTimeSelect,
    handleSubmit,
  };
};

export default useCreateAppointment;
