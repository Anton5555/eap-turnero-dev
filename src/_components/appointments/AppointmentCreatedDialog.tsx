"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { H5 } from "../common/Typography";
import { Button } from "../common/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SPECIALTY } from "~/types/services";
import { modalities } from "~/lib/constants";
import { MODALITY } from "~/types/appointments";
import { useFormatter, useTranslations } from "next-intl";

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

  const t = useTranslations("createAppointment.appointmentCreatedDialog");
  const format = useFormatter();

  const handleClose = () => {
    router.replace("/platform", undefined);

    setOpen(false);
  };

  const TermsAndConditions = () => {
    if (modalities[Number(modality)]?.label === MODALITY.PHONECALL)
      return <p className="text-sm lg:text-base">{t("phonecall.terms")}</p>;

    return (
      <>
        <p className="text-sm lg:text-base">{t("videocall.terms1stPart")}</p>

        <Link
          href={
            specialty === SPECIALTY.PSICOLOGY
              ? "https://drive.google.com/drive/u/0/folders/1y9V5JEHQpQnfkH2tZAG_WPo4Or-gsPzb"
              : "https://drive.google.com/drive/u/0/folders/1y9V5JEHQpQnfkH2tZAG_WPo4Or-gsPzb"
          }
          className="text-sm text-blue-500 underline"
          target="_blank"
        >
          {t("videocall.termsLink")}
        </Link>

        <p className="text-sm lg:text-base">{t("videocall.terms2ndPart")}</p>

        <p className="text-sm lg:text-base">
          {t.rich("videocall.knowMore", {
            privacyNotice: (children) => (
              <Link
                href="https://www.eaplatina.com/pdf/aviso_privacidad_nov_2023.pdf"
                className="text-blue-500 underline"
                target="_blank"
              >
                {children}
              </Link>
            ),
          })}
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
                  <H5>{t("title")}</H5>

                  <p className="text-sm lg:text-base">
                    {t("description", {
                      date: format.dateTime(dateFrom, {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }),
                      timeFrom: format.dateTime(dateFrom, {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                      }),
                      timeTo: format.dateTime(dateTo, {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                      }),
                      professionalName: professional,
                    })}
                  </p>

                  <p className="text-sm lg:text-base">
                    {t("emailConfirmation")}
                  </p>

                  <TermsAndConditions />
                </div>

                <div className="mt-5 flex justify-center lg:flex-row">
                  <Button className="font-lato" onClick={handleClose}>
                    {t("close")}
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
