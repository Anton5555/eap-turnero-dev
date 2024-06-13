"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "../common/Button";
import { H3, H6 } from "../common/Typography";
import Stepper from "../common/Stepper";
import React, { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import Link from "next/link";
import ArrowIcon from "../icons/Arrow";
import { toast } from "sonner";
import ConfirmationDialog from "./ConfirmationDialog";
import { useRouter } from "next/navigation";
import Filters from "./CreateAppointmentComponents/Filters";
import ServiceSelector from "./CreateAppointmentComponents/ServiceSelector";
import DateSelector from "./CreateAppointmentComponents/DateSelector";
import TimeSelector from "./CreateAppointmentComponents/TimeSelector";
import ProfessionalSelector from "./CreateAppointmentComponents/ProfessionalSelector";
import PdpConfirmationDialog from "./PdpConfirmationDialog";
import { timeRanges } from "~/lib/constants";
import { updateUserPdp } from "~/lib/api/users";
import { useSession } from "next-auth/react";
import useCreateAppointment from "~/lib/hooks/useCreateAppointment";
import { type ContractService } from "~/types/services";
import { type User } from "~/types/users";
import { useTranslations } from "next-intl";

const CreateAppointment: React.FC<{
  services: ContractService[];
  user: User;
}> = ({ services, user }) => {
  const {
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
  } = useCreateAppointment(user);

  const router = useRouter();

  const { update } = useSession();

  const t = useTranslations("createAppointment");

  const [isPdpConfirmationDialogOpen, setIsPdpConfirmationDialogOpen] =
    useState(false);

  useEffect(() => {
    const pdpExpirationDate = new Date(user.pdpDate);
    pdpExpirationDate.setFullYear(pdpExpirationDate.getFullYear() + 1);

    if (!user.pdp || pdpExpirationDate < new Date())
      setIsPdpConfirmationDialogOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutateAsync: mutateUpdateUser } = useMutation({
    mutationFn: updateUserPdp,
    onSuccess: async () => {
      setIsPdpConfirmationDialogOpen(false);

      await update();

      router.refresh();
    },
  });

  const handlePdpConfirmation = () =>
    toast.promise(
      mutateUpdateUser({
        updatePdpData: { ...user },
        accessToken: user.accessToken,
      }),
      {
        loading: t("updatingData"),
        success: t("dataUpdatedSuccessfully"),
        error: t("errorUpdatingData"),
      },
    );

  return (
    <>
      <div className="m-4 space-y-4 lg:m-0">
        <Stepper steps={4} currentStep={currentStep} />

        <div className="block space-y-4">
          <H3 className="text-green">
            {currentStep === 1
              ? t("areaOfAttention")
              : t("scheduleYourNextAppointment")}
          </H3>

          <H6>
            {currentStep === 1
              ? t("selectAssistanceType")
              : t("selectDateAndTime")}
          </H6>
        </div>

        {currentStep > 1 && (
          <Filters
            defaultLocation={user.location}
            defaultModality={modalityFilter}
            onApply={(
              location: number | undefined,
              modality: number | undefined,
              timeRangeValue: number | undefined,
            ) => {
              if (location) setLocationFilter(location);
              if (modality) setModalityFilter(modality);

              if (timeRangeValue) {
                setTimeRangeFilter(
                  timeRanges.find(
                    (timeRange) => timeRange.value == timeRangeValue,
                  )?.times ?? undefined,
                );
              }

              if (selectedDate) setSelectedDate(undefined);
              if (selectedTime) setSelectedTime(undefined);
            }}
          />
        )}

        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          {currentStep === 1 && services && (
            <ServiceSelector
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
                    currentStep === 2 && "flex flex-col",
                    currentStep > 2 && "hidden lg:flex",
                  )}
                >
                  <DateSelector
                    isLoading={isLoadingFreeAppointments}
                    error={errorFreeAppointments}
                    freeAppointments={freeAppointments}
                    displayedMonth={displayedMonth}
                    selectedDate={selectedDate}
                    onDayClick={handleDateSelect}
                    onMonthChange={handleMonthChange}
                  />
                </div>

                <div
                  className={cn(
                    "w-full lg:flex lg:flex-row",
                    currentStep === 3 && "flex flex-col",
                    (currentStep === 2 || currentStep === 4) &&
                      "hidden lg:flex",
                  )}
                >
                  <TimeSelector
                    step={currentStep}
                    error={errorFreeAppointments}
                    isDateSelected={!!selectedDate}
                    hasFreeAppointments={
                      !!freeAppointments &&
                      Object.values(freeAppointments).some(
                        (appointments) => appointments.length > 0,
                      )
                    }
                    freeAppointmentsTimes={freeAppointmentsTimes}
                    selectedTime={selectedTime}
                    onTimeSelect={handleTimeSelect}
                  />
                </div>
              </div>

              <div
                className={cn(
                  "lg:h-[calc(60dvh)] lg:w-2/5 lg:overflow-y-auto",
                  currentStep === 4 && "w-full",
                  (currentStep === 2 || currentStep === 3) && "hidden lg:flex",
                )}
              >
                <ProfessionalSelector
                  professionals={professionals}
                  isLoading={isLoadingProfessionals}
                  error={errorProfessionals}
                  isTimeSelected={!!selectedTime}
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
            {t("next")}
          </Button>

          <Button
            className="h-12 w-full"
            variant="outline"
            disabled={currentStep === 1}
            onClick={() => currentStep !== 1 && setCurrentStep(currentStep - 1)}
          >
            {t("back")}
          </Button>
        </div>
      </div>

      {isConfirmationDialogOpen && selectedProfessional && selectedTime && (
        <ConfirmationDialog
          open={isConfirmationDialogOpen}
          onClose={() => setIsConfirmationDialogOpen(false)}
          onConfirm={() => handleSubmit()}
          professional={selectedProfessional?.name ?? ""}
          date={selectedTime.dateFrom}
          modality={modalityFilter}
        />
      )}

      {isPdpConfirmationDialogOpen && (
        <PdpConfirmationDialog
          open={isPdpConfirmationDialogOpen}
          onClose={() => router.push("/platform")}
          onConfirm={() => handlePdpConfirmation()}
        />
      )}
    </>
  );
};

export default CreateAppointment;
