"use client";

import { signOut } from "next-auth/react";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import ChevronIcon from "../icons/Chevron";
import { Button } from "../common/Button";
import UserIcon from "../icons/User";
import useUserImage from "~/lib/hooks/useUserImage";
import { useTranslations } from "next-intl";

type ProfileProps = {
  name: string;
  lastName: string;
  accessToken: string;
  imageName?: string;
};

const Profile: React.FC<ProfileProps> = ({
  name,
  lastName,
  accessToken,
  imageName,
}) => {
  const imageUrl = useUserImage({ accessToken, imageName });

  const t = useTranslations("sidebar.profile");

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center gap-x-4 p-1.5">
        <span className="sr-only">{t("openUserMenu")}</span>

        <Image
          src={imageUrl ?? "/default-avatar.webp"}
          alt="User profile"
          width={32}
          height={32}
          className="rounded-full"
        />

        <span className="font-inter text-sm text-very-dark-blue">
          {`${name} ${lastName}`}
        </span>

        <ChevronIcon />
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
        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-72 origin-top-right rounded-md bg-white p-4 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <Menu.Item>
            <Button
              className="h-7 w-full justify-start gap-x-2 rounded bg-green/10 text-black"
              variant={"ghost"}
              onClick={() => signOut()}
            >
              <UserIcon fill={false} size={16} />

              <span className="font-inter text-sm font-medium leading-4 text-black">
                {t("logout")}
              </span>
            </Button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Profile;
