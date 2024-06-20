"use client";

import React from "react";
import HomeIcon from "../icons/Home";
import UserIcon from "../icons/User";
import { cn } from "~/lib/utils";
import BarsIcon from "../icons/Bars";
import CloseIcon from "../icons/Close";
import { signOut } from "next-auth/react";
import ExitIcon from "../icons/Exit";
import Profile from "./Profile";
import NotificationsMenu from "./NotificationsMenu";
import { H6 } from "../common/Typography";
import Logo from "./Logo";
import Help from "../common/Help";
import { type AppointmentNotification } from "~/types/notifications";
import { type User } from "~/types/users";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import LocaleSwitcherMobile from "./LocaleSwitcherMobile";
import { Link, usePathname } from "~/navigation";

const navigation = [
  { href: "/platform", icon: HomeIcon, path: "platform" },
  { href: "/profile", icon: UserIcon, path: "profile" },
];

type SidebarProps = {
  children: React.ReactNode;
  user: User;
  notifications?: AppointmentNotification[];
};

const Sidebar: React.FC<SidebarProps> = ({ children, user, notifications }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const pathname = usePathname();
  const currentPathRoot = pathname.split("/")[1];

  const t = useTranslations("sidebar");

  const Menu: React.FC = () => (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li className="flex items-center justify-between gap-x-4 lg:hidden">
          <Logo width={82} height={39} />

          <button onClick={() => setSidebarOpen(false)}>
            <CloseIcon />

            <span className="sr-only">{t("closeSidebar")}</span>
          </button>
        </li>

        <li className="lg:hidden">
          <H6 className="text-left">
            {t("welcome")}, {user.name}!
          </H6>
        </li>

        <li>
          <ul role="list" className="space-y-4 lg:mt-8">
            {navigation.map((navigationItem) => (
              <li key={navigationItem.path}>
                <Link
                  href={navigationItem.href}
                  onClick={() => {
                    if (sidebarOpen) setSidebarOpen(false);
                  }}
                  className={cn(
                    navigationItem.path === currentPathRoot
                      ? "text-green"
                      : "text-black hover:text-green",
                    "group flex flex-row items-center gap-x-3 p-2 font-bold leading-5 lg:flex-col lg:gap-x-0 lg:gap-y-1",
                  )}
                >
                  <navigationItem.icon
                    active={navigationItem.path === currentPathRoot}
                    aria-hidden="true"
                  />

                  <span>{t(`navigation.${navigationItem.path}`)}</span>
                </Link>
              </li>
            ))}

            <li className="block lg:hidden">
              <LocaleSwitcherMobile />
            </li>
          </ul>
        </li>

        <li className="mt-auto space-y-4 lg:hidden">
          <div>
            <Help />
          </div>

          <div className="flex flex-row justify-between">
            <a
              href="#"
              onClick={() => signOut()}
              className="group -mx-2 flex items-center gap-x-2 p-2 text-very-dark-blue"
            >
              <ExitIcon />

              <H6>{t("exit")}</H6>
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      {sidebarOpen && (
        <div className="w96 absolute left-0 top-0 z-20 flex h-screen flex-col gap-y-5 overflow-y-auto bg-white px-4 py-4 duration-200">
          <Menu />
        </div>
      )}

      <div>
        <div className="sticky top-0 z-10 flex h-16 w-screen shrink-0 items-center justify-between gap-x-4 border-b border-gray-200 bg-green px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:bg-white lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">{t("openSidebar")}</span>

            <BarsIcon aria-hidden="true" />
          </button>

          <div className="hidden lg:flex">
            <Logo />
          </div>

          <div className="flex items-center lg:gap-x-6">
            <div className="hidden lg:flex">
              <LocaleSwitcher />
            </div>

            <div className="hidden lg:flex">
              <Profile {...user} />
            </div>

            <div className="flex items-center">
              <NotificationsMenu notifications={notifications} user={user} />
            </div>
          </div>
        </div>

        <div className="hidden bg-white lg:fixed lg:top-16 lg:z-50 lg:flex lg:h-screen lg:w-20 lg:flex-col lg:border-r lg:border-gray-200 lg:shadow-sm">
          <Menu />
        </div>

        <main className={cn("lg:pl-20", sidebarOpen && "fixed")}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Sidebar;
