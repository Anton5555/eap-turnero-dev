import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Button } from "../common/Button";
import CloseIcon from "../icons/Close";
import { H5 } from "../common/Typography";
import { useTranslations } from "next-intl";

interface PdpConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PdpConfirmationDialog: React.FC<PdpConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const t = useTranslations("createAppointment.pdpConfirmationDialog");

  return (
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:max-w-2xl">
                <div className="absolute right-0 top-0 pr-4 pt-4 ">
                  <button type="button" onClick={onClose}>
                    <span className="sr-only">{t("close")}</span>

                    <CloseIcon aria-hidden="true" />
                  </button>
                </div>

                <div className="py-6 lg:px-8">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                    <div className="mt-2 flex flex-col items-center space-y-4">
                      <H5>{t("dataProtectionPolicy")}</H5>

                      <p className="text-left font-semibold leading-5">
                        {t("notSignedOrExpired")}
                      </p>

                      <p className="text-left text-sm sm:text-base">
                        {t("importantReview")}
                      </p>

                      <p className="text-left text-base font-bold leading-5 sm:text-lg">
                        {t("confirmAgreement")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button className="font-lato" onClick={onConfirm}>
                    {t("confirm")}
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

export default PdpConfirmationDialog;
