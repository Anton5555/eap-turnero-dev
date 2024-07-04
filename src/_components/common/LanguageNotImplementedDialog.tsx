"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { H3 } from "../common/Typography";
import { Button } from "../common/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "~/navigation";
import { useLocaleSwitcher } from "~/lib/hooks/useLocaleSwitcher";

const LanguageNotImplementedDialog = () => {
  const [open, setOpen] = useState(true);

  const { onSelectChange } = useLocaleSwitcher();

  const t = useTranslations();
  const handleClose = () => {
    onSelectChange("en");

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
                  <H3>{t("languageNotImplementedDialog.title")}</H3>

                  <p className="text-base font-medium leading-5 text-dark-gray">
                    {t("languageNotImplementedDialog.message")}
                  </p>
                </div>

                <div className="mt-5 flex flex-row justify-center">
                  <Button
                    className="font-lato w-full lg:w-auto"
                    onClick={handleClose}
                  >
                    {t("languageNotImplementedDialog.button")}
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

export default LanguageNotImplementedDialog;
