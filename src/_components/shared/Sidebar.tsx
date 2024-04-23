"use client";

import React from "react";
import HomeIcon from "../icons/Home";
import UserIcon from "../icons/User";
import cn from "~/lib/utils";
import Image from "next/image";
import BarsIcon from "../icons/Bars";
import CloseIcon from "../icons/Close";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import ExitIcon from "../icons/Exit";
import Profile from "./Profile";
import NotificationsMenu from "./NotificationsMenu";
import { H6 } from "../common/Typography";
import Logo from "./Logo";

// TODO: change the current nav item to the one that is active in the app
const navigation = [
  { name: "Inicio", href: "#", icon: HomeIcon, current: true },
  { name: "Perfil", href: "#", icon: UserIcon, current: false },
];

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { data: session } = useSession();

  const Menu: React.FC = () => (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li className="flex items-center justify-between gap-x-4 lg:hidden">
          <Logo width={82} height={39} />

          <button onClick={() => setSidebarOpen(false)}>
            <CloseIcon />

            <span className="sr-only">Close sidebar</span>
          </button>
        </li>

        <li className="lg:hidden">
          <H6 className="text-left">Bienvenido, {session?.user?.name}!</H6>
        </li>

        <li>
          <ul role="list" className=" space-y-4 lg:mt-8">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    item.current ? "text-green" : "text-black hover:text-green",
                    "group flex flex-row items-center gap-x-3 p-2 font-bold leading-5 lg:flex-col lg:gap-x-0 lg:gap-y-1",
                  )}
                >
                  <item.icon active={item.current} aria-hidden="true" />

                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="mt-auto lg:hidden">
          <div>
            {/* TODO: insert Contact info component when done */}
            Help info
          </div>

          <Link
            href="#"
            onClick={() => signOut()}
            className="text-veryDarkBlue group -mx-2 flex items-center gap-x-2 p-2"
          >
            <ExitIcon />

            <H6>Salir</H6>
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      {sidebarOpen && (
        <div className="absolute left-0 top-0 z-20 flex h-screen w-80 flex-col gap-y-5 overflow-y-auto bg-white px-2 py-4 duration-200">
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
            <span className="sr-only">Open sidebar</span>

            <BarsIcon aria-hidden="true" />
          </button>

          <div className="hidden lg:flex">
            <Logo />
          </div>

          <div className="flex items-center lg:gap-x-6">
            <div className="hidden lg:flex">
              <Profile />
            </div>

            <div className="flex items-center">
              <NotificationsMenu />
            </div>
          </div>
        </div>

        <div className="hidden bg-white lg:fixed lg:top-16 lg:z-50 lg:flex lg:h-screen lg:w-20 lg:flex-col lg:border-r lg:border-gray-200 lg:shadow-sm">
          <Menu />
        </div>

        <main className="lg:pl-20">{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
