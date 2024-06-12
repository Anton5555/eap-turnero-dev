"use client";

import React, { Fragment, type ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import LocaleIcon from "../icons/Locale";
import { useTranslations } from "next-intl";

type Props = {
  children: ReactNode;
  currentLocale: string;
};

const LocaleSwitcherSelect: React.FC<Props> = ({ children, currentLocale }) => {
  const t = useTranslations("localeSwitcher");

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-x-4 rounded-lg border border-very-dark-blue bg-white px-4 py-1.5">
        <span className="sr-only">{t("openLocaleMenu")}</span>

        <span className="font-inter text-sm text-very-dark-blue">
          {`${t("locale", { locale: currentLocale })}`}
        </span>

        <LocaleIcon />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2.5 origin-top-right space-y-2 rounded-md bg-white p-4 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LocaleSwitcherSelect;
