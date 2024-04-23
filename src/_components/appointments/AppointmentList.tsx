"use client";

import { useSession } from "next-auth/react";
import PlatformContainer from "../common/PlatformContainer";
import AppointmentsEmpty from "./AppointmentsEmpty";
import { Appointment } from "~/types/appointments";
import { deleteAppointment } from "~/lib/api/appointments";
import { useMutation } from "@tanstack/react-query";
import AppointmentCard from "./AppointmentCard";
import { H1, H6 } from "../common/Typography";
import Link from "next/link";
import { Button } from "../common/Button";
import { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { useToast } from "../shared/toaster/useToast";
import { useRouter } from "next/navigation";

const AppointmentList: React.FC<{
  appointments: Appointment[];
}> = ({ appointments }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const { mutate, error } = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      router.refresh();

      toast({
        title: "Cita eliminada con éxito",
      });
    },
    onError: (error) =>
      toast({
        title: error.message,
        variant: "destructive",
      }),
  });

  const handleSubmit = () => {
    mutate({
      accessToken: session?.user.accessToken!,
      appointmentId: selectedAppointment!.id,
      professionalId: selectedAppointment?.professionalId!,
    });

    setIsOpen(false);
  };

  const selectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsOpen(true);
  };

  const cancel = () => {
    setIsOpen(false);
    setSelectedAppointment(null);
  };

  if (!appointments?.length)
    return (
      <>
        <div className="flex h-[calc(90dvh)] justify-center lg:hidden">
          {error ? <H6>{error.message}</H6> : <AppointmentsEmpty />}
        </div>

        <PlatformContainer className="hidden justify-center rounded-none lg:col-span-2 lg:row-span-4 lg:row-end-1 lg:grid">
          {error ? (
            <H6 className="text-center">{error.message}</H6>
          ) : (
            <AppointmentsEmpty />
          )}
        </PlatformContainer>
      </>
    );

  return (
    <>
      <div className="flex flex-col justify-between lg:col-span-2 lg:row-span-4 lg:row-end-1 lg:grid lg:justify-normal lg:space-y-8">
        <div className="m-4 space-y-4 lg:m-0 lg:space-y-0">
          <div className="block space-y-2 lg:hidden">
            <H1>Agenda</H1>

            <H6 className="font-medium">
              Revisa tus citas pendientes y agenda nuevas
            </H6>
          </div>

          <div className="justify-center lg:h-[calc(60dvh)] lg:justify-normal lg:overflow-y-auto">
            <ul className="space-y-6">
              {appointments?.map((appointment) => (
                <li key={appointment.id}>
                  <AppointmentCard
                    appointment={appointment}
                    onSelect={selectAppointment}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-2 mb-2 lg:m-0 lg:justify-start">
          <Link href="/platform/appointment/create">
            <Button className="w-full font-normal lg:w-auto" variant="default">
              + Agendar tu cita online
            </Button>
          </Link>
        </div>
      </div>

      {isOpen && selectedAppointment && (
        <DeleteConfirmationDialog
          open={isOpen}
          onClose={cancel}
          onConfirm={handleSubmit}
          professional={selectedAppointment?.professional}
          date={selectedAppointment?.start}
        />
      )}
    </>
  );
};

export default AppointmentList;
