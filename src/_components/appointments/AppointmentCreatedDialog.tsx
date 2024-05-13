"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { H5 } from "../common/Typography";
import { Button } from "../common/Button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";

interface AppointmentCreatedDialogProps {
  professional: string;
  dateFrom: Date;
  dateTo: Date;
}

const AppointmentCreatedDialog: React.FC<AppointmentCreatedDialogProps> = ({
  professional,
  dateFrom,
  dateTo,
}) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    router.replace("/platform", undefined);

    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="mt-2 flex flex-col space-y-4 ">
                  <H5>Cita generada con éxito.</H5>

                  <p className="text-sm lg:text-base">
                    Tienes una cita programada para el{" "}
                    {`${format(
                      dateFrom,
                      "EEEE d 'de' LLLL 'de' yyyy', de' H:mm",
                      { locale: es },
                    )} a ${format(dateTo, "H:mm")}hs, con ${professional}`}
                  </p>

                  <p className="text-sm lg:text-base">
                    Recibirás una confirmación por correo electrónico con todos
                    los detalles necesarios. Desde la sección{" "}
                    <span className="text-green">&apos;Inicio&apos;</span>,
                    podrás gestionar tus citas, incluyendo la posibilidad de
                    cancelarla o modificarla si es necesario.
                  </p>

                  <p className="text-sm italic leading-4">
                    ¡Aprovecha al máximo tu sesión!
                    <br />
                    Antes de comenzar, te recomendamos encontrar un lugar
                    tranquilo, que te permita concentrarte y tener una cita
                    adecuada
                  </p>
                </div>

                <div className="mt-5 flex justify-center lg:flex-row">
                  <Button className="font-lato" onClick={handleClose}>
                    Finalizar
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AppointmentCreatedDialog;
