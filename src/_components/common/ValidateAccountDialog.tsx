"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { H3 } from "../common/Typography";
import { Button } from "../common/Button";
import { useTranslations } from "next-intl";

const ValidateAccountDialog: React.FC = ({}) => {
  const [open, setOpen] = React.useState(true);

  const t = useTranslations("welcome.validateAccount");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all sm:w-full sm:max-w-2xl">
                <div className="mt-2 flex flex-col space-y-4 ">
                  <H3>{t("title")}</H3>

                  <p className="text-base font-medium leading-5">
                    {t("message")}
                  </p>
                </div>

                <div className="mt-5 flex justify-center lg:flex-row lg:justify-end">
                  <Button
                    className="font-lato w-full lg:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    {t("button")}
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

export default ValidateAccountDialog;
