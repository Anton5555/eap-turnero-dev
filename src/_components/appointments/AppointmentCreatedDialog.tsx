"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { H5 } from "../common/Typography";
import { Button } from "../common/Button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SPECIALTY } from "~/types/services";

interface AppointmentCreatedDialogProps {
  professional: string;
  dateFrom: Date;
  dateTo: Date;
  modality: string;
  specialty: SPECIALTY;
}

const AppointmentCreatedDialog: React.FC<AppointmentCreatedDialogProps> = ({
  professional,
  dateFrom,
  dateTo,
  modality,
  specialty,
}) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    router.replace("/platform", undefined);

    setOpen(false);
  };

  console.log({ modality, specialty });

  const TermsAndConditions = () => {
    if (modality === "3")
      return (
        <p className="text-sm lg:text-base">
          El profesional estará llamando al número que nos ha indicado en el
          horario pautado. Recuerda que la llamada puede provenir de un número
          privado. Si han pasado +10 min de la hora pautada o tiene llamadas
          perdidas registradas, por favor, contáctate con nosotros para que te
          pongamos en contacto con el profesional asignado.
        </p>
      );
    else
      return (
        <>
          <p className="text-sm lg:text-base">
            Será necesario que puedas leer atentamente nuestro consentimiento
            informado con toda la información sobre los términos y condiciones
            asociados al tipo de consulta y modalidad:
          </p>

          <Link
            href={
              specialty === SPECIALTY.PSICOLOGY
                ? "https://drive.google.com/drive/u/0/folders/1y9V5JEHQpQnfkH2tZAG_WPo4Or-gsPzb"
                : "https://drive.google.com/drive/u/0/folders/1y9V5JEHQpQnfkH2tZAG_WPo4Or-gsPzb"
            }
            className="text-sm text-blue-500 underline"
          >
            Hacer clic aquí para conocer términos y condiciones
          </Link>

          <p className="text-sm lg:text-base">
            Entendemos que al conectarte a la próxima cita aceptas
            voluntariamente los términos y condiciones de nuestros documentos.
            Es importante que al momento de la consulta puedas encontrarte en un
            lugar privado, cómodo y con buena conexión para garantizar la
            orientación profesional.
          </p>

          <p className="text-sm lg:text-base">
            Si quieres conocer más acerca de nuestra Política de privacidad y
            tratamiento de datos puedes hacer clic aquí: &nbsp;
            <a href="https://www.eaplatina.com/pdf/aviso_privacidad_nov_2023.pdf">
              Aviso de Privacidad
            </a>
          </p>
        </>
      );
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
                    los detalles necesarios.
                  </p>

                  <TermsAndConditions />
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
