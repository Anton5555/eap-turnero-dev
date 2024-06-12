"use client";

import { Fragment, useState } from "react";
import MailIcon from "../icons/Mail";
import PhoneIcon from "../icons/Phone";
import WhatsappIcon from "../icons/Whatsapp";
import { Button } from "./Button";
import { H6 } from "./Typography";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "../icons/Close";
import { useTranslations } from "next-intl";

const QRCodeDialog: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={onClose}>
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

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-2 pt-4 shadow-xl transition-all">
              <div className="absolute right-0 top-0 pr-4 pt-4 ">
                <button type="button" onClick={onClose}>
                  <span className="sr-only">Cerrar</span>

                  <CloseIcon aria-hidden="true" />
                </button>
              </div>

              <Image
                src="/whatsapp-qr.webp"
                width={300}
                height={300}
                alt="https://wa.me/+5491149378911"
              />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);

const Help = () => {
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const t = useTranslations("help");

  return (
    <>
      <div className="flex flex-col space-y-4">
        <H6 className="flex flex-row font-medium text-green lg:text-2xl lg:font-semibold lg:leading-7">
          {t("anyDoubts")}
        </H6>

        <a
          href="tel:08007778327"
          target="_blank"
          className="flex flex-row space-x-4 rounded-2xl bg-green/5 p-4"
        >
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-green">
            <PhoneIcon />
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <H6 className="text-green">{t("call")}</H6>

            <H6>0800 777 8327</H6>
          </div>
        </a>

        <a
          className="flex flex-row space-x-4 rounded-2xl bg-green/5 p-4 lg:hidden"
          href="https://wa.me/+5491149378911"
          target="_blank"
        >
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-green">
            <WhatsappIcon />
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <H6 className="text-green">{t("write")}</H6>

            <H6>+5491149378911</H6>
          </div>
        </a>

        <div className="hidden space-x-4 rounded-2xl bg-green/5 p-4 lg:flex lg:flex-row">
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-green">
            <WhatsappIcon />
          </div>

          <div className="flex w-full flex-col justify-center space-y-2">
            <H6 className="text-green">{t("write")}</H6>

            <H6>+5491149378911</H6>

            <div className="flex flex-col gap-2">
              <a href="https://wa.me/+5491149378911" target="_blank">
                <Button className="mt-2 w-full" variant="outline">
                  WhatsApp web
                </Button>
              </a>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => setIsQRCodeOpen(true)}
              >
                {t("qrCode")}
              </Button>
            </div>
          </div>
        </div>

        <a
          href="mailto:eapconsultas@eaplatina.com"
          target="_blank"
          className="flex flex-row space-x-4 rounded-2xl bg-green/5 p-4"
        >
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-green">
            <MailIcon />
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <H6 className="text-green">{t("email")}</H6>

            <H6>eapconsultas@eaplatina.com</H6>
          </div>
        </a>
      </div>

      {isQRCodeOpen && (
        <QRCodeDialog
          open={isQRCodeOpen}
          onClose={() => setIsQRCodeOpen(false)}
        />
      )}
    </>
  );
};

export default Help;
