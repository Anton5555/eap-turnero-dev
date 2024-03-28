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
        src="/login.png"
        alt="login image"
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

          <H4 className="justify-center lg:justify-start">
            ¡Te damos la bienvenida!
          </H4>

          <H6 className="justify-center lg:justify-start">
            En esta plataforma encontrarás una amplia selección de profesionales
            que te ayudarán a potenciar tu bienestar integral.
            <br />
            Agenda 100% online tus citas con profesionales de salud mental,
            física, legal y financiera.
            <br />
            <span className="text-bold">¿Comenzamos?</span>
          </H6>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Button variant="ghost">Omitir</Button>
          <Button variant="default">Continuar</Button>
        </div>
      </div>
    </div>
  </div>
);

export default Page;
