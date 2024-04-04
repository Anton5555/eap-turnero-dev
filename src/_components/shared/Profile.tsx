"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../common/Popover";
import Image from "next/image";
import ChevronIcon from "../icons/Chevron";
import Link from "next/link";
import { Button } from "../common/Button";
import UserIcon from "../icons/User";

const Profile = () => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const { data: session } = useSession();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-4">
          <span className="sr-only">Open user menu</span>

          <Image
            src={session?.user?.image ?? ""}
            alt="User profile"
            width={32}
            height={32}
            className="rounded-full"
          />

          <span className="font-sm font-inter text-[#1F384C]">
            {session?.user?.name}
          </span>

          {popoverOpen ? (
            <ChevronIcon direction="down" />
          ) : (
            <ChevronIcon direction="up" />
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent align="end">
        <Button
          className="bg-green10 h-7 w-full justify-start gap-x-2 rounded text-black"
          variant={"ghost"}
          onClick={() => signOut()}
        >
          <UserIcon fill={false} size={16} />

          <span className="font-inter text-sm font-medium leading-4 text-black">
            Cerrar sesión
          </span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
