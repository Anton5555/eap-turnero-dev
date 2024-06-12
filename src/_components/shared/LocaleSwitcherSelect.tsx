"use client";

import React, { Fragment, type ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import LocaleIcon from "../icons/Locale";
import { useTranslations } from "next-intl";
import { cn } from "~/lib/utils";

type Props = {
  children: ReactNode;
  currentLocale: string;
  mobile: boolean;
};

const LocaleSwitcherSelect: React.FC<Props> = ({
  children,
  currentLocale,
  mobile,
}) => {
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
        <Menu.Items
          className={cn(
            "absolute z-10 space-y-2 rounded-md bg-white p-4 shadow-lg ring-1 ring-gray-900/5 focus:outline-none",
            mobile ? "bottom-10 mb-2.5" : "right-0 mt-2.5 origin-top-right",
          )}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LocaleSwitcherSelect;
