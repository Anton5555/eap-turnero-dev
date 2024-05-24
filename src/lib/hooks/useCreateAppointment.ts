import { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getProfessionals } from "~/lib/api/professionals";
import { createAppointment, getFreeAppointments } from "~/lib/api/appointments";
import { type ContractService } from "~/types/services";
import { type User } from "~/types/users";
import { type Professional } from "~/types/professionals";
import { type FreeAppointmentsByDay } from "~/types/appointments";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { toast } from "sonner";

const useCreateAppointment = ({
  services,
  user,
}: {
  services: ContractService[];
  user: User;
}) => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);

  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const [selectedService, setSelectedService] = useState<ContractService>();

  const [freeAppointmentsTimes, setFreeAppointmentsTimes] = useState<
    { dateFrom: Date; dateTo: Date }[]
  >([]);

  const [currentMonth, setCurrentMonth] = useState(new Date());
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
      modalityFilter,
      timeRangeFilter,
      currentMonth,
      durationFilter,
    ],
    queryFn: async () => {
      if (!selectedService) return;

      const freeAppointmentsResponse = await getFreeAppointments({
        dateFrom:
          currentMonth.getMonth() === new Date().getMonth()
            ? format(new Date(), "yyyy-MM-dd")
            : format(startOfMonth(currentMonth), "yyyy-MM-dd"),
        dateTo: format(endOfMonth(currentMonth), "yyyy-MM-dd"),
        timezone: user.timezone,
        accessToken: user.accessToken,
        specialtyId: selectedService.specialtyId,
        serviceId: selectedService.serviceId,
        modalityId: modalityFilter,
        companyId: user.company,
        locationId: locationFilter ?? user.location,
      });

      const filteredFreeAppointments: FreeAppointmentsByDay = {};

      for (const day in freeAppointmentsResponse) {
        let appointments = freeAppointmentsResponse[day];

        const currentDay = new Date();
        const appointmentDay = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          Number(day),
        );

        if (currentDay.toDateString() === appointmentDay.toDateString()) {
          appointments = appointments?.filter((appointment) => {
            const appointmentTime = new Date(appointment.start);
            return appointmentTime.getTime() >= currentDay.getTime();
          });
        }

        if (appointments && appointments.length > 0)
          filteredFreeAppointments[day] = appointments;
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

      if (selectedTime) setSelectedTime(undefined);

      return filteredFreeAppointments;
    },

    enabled: !!selectedService,
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
    queryFn: () => {
      if (!selectedService) return;

      return getProfessionals({
        locationId: locationFilter ?? user.location,
        serviceId: selectedService.serviceId,
        specialtyId: selectedService.specialtyId,
        accessToken: user.accessToken,
        modalityId: modalityFilter,
      });
    },
    enabled: !!selectedService && (!!locationFilter || !!user.location),
  });

  const { mutateAsync } = useMutation({
    mutationFn: createAppointment,
    onError: ({ message }) => toast.error(message),
    onSuccess: () => {
      if (selectedProfessional && selectedTime) {
        const dateFrom = selectedTime.dateFrom.toISOString();
        const dateTo = selectedTime.dateTo.toISOString();

        router.push(
          `/platform?professional=${selectedProfessional?.name}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
        );
      } else router.push("/platform");

      router.refresh();
    },
  });

  const handleServiceSelect = useCallback(
    (service: ContractService) => {
      setSelectedService(service);

      if (selectedProfessional) setSelectedProfessional(undefined);
      if (selectedDate) setSelectedDate(undefined);
      if (selectedTime) setSelectedTime(undefined);

      setCurrentStep(2);
    },
    [selectedProfessional, selectedDate, selectedTime],
  );

  const handleMonthChange = useCallback((month: Date) => {
    setSelectedDate(undefined);

    setCurrentMonth(month);
  }, []);

  const handleDateSelect = useCallback(
    (date: Date) => {
      setSelectedDate(date);

      if (selectedTime) setSelectedTime(undefined);
      if (selectedProfessional) setSelectedProfessional(undefined);

      setFreeAppointmentsTimes(
        freeAppointments![date.getDate()]!.map((freeAppointment) => ({
          dateFrom: freeAppointment.start,
          dateTo: freeAppointment.end,
        })),
      );

      setCurrentStep(3);
    },
    [selectedTime, selectedProfessional, freeAppointments],
  );

  const handleProfessionalSelect = useCallback(
    async (professional: Professional) => {
      setSelectedProfessional(professional);

      setCurrentStep(3);
    },
    [],
  );

  const nextStep = useCallback(() => {
    if (currentStep === 1 && !selectedService) {
      toast.error("Debes seleccionar un tipo de asistencia");

      return;
    }

    if (currentStep === 2 && !selectedProfessional) {
      toast.error("Debes seleccionar una fecha");

      return;
    }

    if (currentStep === 3 && !selectedDate) {
      toast.error("Debes seleccionar un horario");

      return;
    }

    if (currentStep === 4) {
      if (!selectedTime) {
        toast.error("Debes seleccionar un profesional");

        return;
      }

      setIsConfirmationDialogOpen(true);

      return;
    }

    setCurrentStep(currentStep + 1);
  }, [
    currentStep,
    selectedService,
    selectedProfessional,
    selectedDate,
    selectedTime,
  ]);

  const handleTimeSelect = useCallback(
    (times: { dateFrom: Date; dateTo: Date }) => {
      setSelectedTime(times);
      setIsConfirmationDialogOpen(true);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    if (!selectedService || !selectedTime || !selectedProfessional) {
      toast.error(
        "Error al crear la cita, selecciona todos los datos necesarios",
      );

      return;
    }

    toast.promise(
      mutateAsync({
        patientId: Number(user.id),
        agendaId: agendaId,
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
        notificationTitle: `Tu cita con ${selectedProfessional.name} ha sido agendada correctamente!`,
        notificationDescription: `Tu cita ha sido agendada para el día ${format(selectedTime.dateFrom, "dd/MM/yyyy")} a las ${format(selectedTime.dateFrom, "HH:mm")}hs`,
        notificationSpecialty: selectedService.specialty,
      }),
      {
        loading: "Creando cita",
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedService,
    selectedTime,
    selectedProfessional,
    user,
    modalityFilter,
  ]);

  return {
    currentStep,
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
