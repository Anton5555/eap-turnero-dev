import LoginForm from "~/_components/forms/LoginForm";
import Image from "next/image";
import H4 from "~/_components/common/titles/H4";
import H6 from "~/_components/common/titles/H6";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="relative flex h-3/4 overflow-hidden lg:flex-col">
        <Image
          className="w-full lg:rounded-2xl lg:object-cover"
          src="/login.png"
          alt="login image"
          width={642}
          height={628}
        />

        <a className="z-1 absolute h-full w-full bg-gradient-linear"></a>
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
              <div className="flex w-full flex-col rounded-full border-b-[3px] border-green"></div>
              <div className="flex w-full flex-col rounded-full border-b-[3px] border-gray10"></div>
            </div>

            <H4 className="hidden lg:flex">
              ¡Agenda citas online con profesionales de tu programa de
              asistencia al empleado!{" "}
            </H4>

            <H4 className="lg:hidden">Inicia sesión para comenzar!</H4>

            <H6 className="hidden text-blackAlt lg:flex">
              Inicia sesión para comenzar
            </H6>
          </div>

          <div className="flex justify-center">
            <LoginForm />

            <div className="mt-10">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
