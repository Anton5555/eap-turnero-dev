import React from "react";
import Image from "next/image";
import H4 from "~/_components/common/titles/H4";
import H6 from "~/_components/common/titles/H6";
import { Button } from "~/_components/common/Button";

const Page = () => (
  <div className="flex flex-col lg:flex-row lg:justify-between">
    <div className="relative flex h-3/4 overflow-hidden lg:flex-col">
      <Image
        className="w-full lg:rounded-2xl lg:object-cover"
        src="/welcome.png"
        alt="welcome page image"
        width={642}
        height={628}
      />

      <div className="z-1 absolute h-full w-full bg-gradient-linear"></div>
    </div>
    <div className="mt-4 flex flex-1 flex-col lg:mt-0">
      <div className="mx-auto w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center space-y-6">
          <Image
            className="h-10 w-auto"
            src="/logo.png"
            alt="eap latina logo"
            width={107}
            height={51}
          />

          <div className="flex w-10/12 flex-row justify-center gap-6">
            <div className="border-gray10 flex w-full flex-col rounded-full border-b-[3px]"></div>

            <div className="flex w-full flex-col rounded-full border-b-[3px] border-green"></div>
          </div>

          <div className="justify-center space-y-6 lg:justify-start">
            <H4>¡Te damos la bienvenida!</H4>

            <H6>
              En esta plataforma encontrarás una amplia selección de
              profesionales que te ayudarán a potenciar tu bienestar integral.
              <br />
              <br />
              Agenda 100% online tus citas con profesionales de salud mental,
              física, legal y financiera.
              <br />
              <br />
              <span className="text-bold">¿Comenzamos?</span>
            </H6>
          </div>
        </div>

        <div className="flex flex-col justify-center lg:justify-end">
          <Button variant="ghost" className="w-full">
            Omitir
          </Button>

          <Button variant="default" className="mt-2 w-full">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Page;
