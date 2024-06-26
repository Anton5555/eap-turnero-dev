import React from "react";
import Image from "next/image";
import { Button } from "~/_components/common/Button";
import Link from "next/link";
import { H4, H6 } from "~/_components/common/Typography";
import Logo from "~/_components/shared/Logo";
import { getServerSession } from "next-auth";
import ValidateAccountDialog from "~/_components/common/ValidateAccountDialog";

// TODO: Add message to validate account if coming from SignUp page

const Page = async () => {
  const session = await getServerSession();

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="relative flex h-56 items-start overflow-hidden lg:h-full lg:flex-col lg:rounded-2xl">
          <Image
            className="object-cover"
            src="/welcome.webp"
            alt="welcome page image"
            width={642}
            height={628}
          />

          <a className="z-1 absolute h-full w-full bg-gradient-linear"></a>
        </div>

        <div className="mx-6 mt-4 flex flex-1 flex-col items-center justify-center lg:mx-0 lg:mt-0 lg:h-[628px] lg:items-stretch">
          <div className="mx-auto flex max-w-lg flex-grow flex-col justify-between">
            <div className="flex flex-col items-center space-y-6">
              <Logo width={107} height={51} />

              <div className="flex w-full max-w-sm flex-row justify-center gap-6">
                <div className="border-gray/10 flex w-full flex-col rounded-full border-b-[3px]"></div>

                <div className="flex w-full flex-col rounded-full border-b-[3px] border-green"></div>
              </div>

              <div className="max-w-sm justify-center space-y-6">
                <H4 className="text-center">¡Te damos la bienvenida!</H4>

                <H6 className="text-center font-normal lg:text-start">
                  En esta plataforma encontrarás una amplia selección de
                  profesionales que te ayudarán a potenciar tu bienestar
                  integral.
                  <br />
                  <br />
                  Agenda 100% online tus citas con profesionales de salud
                  mental, física, legal y financiera.
                </H6>

                <H6 className="text-center font-bold">¿Comenzamos?</H6>
              </div>
            </div>

            <div className="flex flex-col pt-6 lg:items-end lg:justify-end lg:pt-0">
              <Link href={session?.user ? "/platform" : "/auth/login"}>
                <Button
                  variant="default"
                  className="mt-2 w-full font-normal lg:w-auto"
                >
                  Siguiente
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {!session?.user && <ValidateAccountDialog />}
    </>
  );
};

export default Page;
