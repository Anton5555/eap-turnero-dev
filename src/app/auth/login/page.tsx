import LoginForm from "~/_components/forms/LoginForm";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { H4, H6 } from "~/_components/common/Typography";
import Logo from "~/_components/shared/Logo";

const Page = async () => {
  //  TODO: remove redirection when fixed in the middleware
  const session = await getServerSession();
  if (session?.user) redirect("/platform");

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="relative flex h-56 items-start overflow-hidden lg:h-full lg:flex-col lg:rounded-2xl">
        <Image
          className="w-full object-cover"
          src="/login.webp"
          alt="login image"
          width={642}
          height={628}
        />

        <a className="z-1 absolute h-full w-full bg-gradient-linear"></a>
      </div>

      <div className="mt-4 flex flex-1 flex-col items-center justify-center lg:mt-0">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="flex flex-col items-center space-y-6">
            <Logo width={107} height={51} />

            <div className="flex w-full max-w-sm flex-row justify-center gap-6">
              <div className="flex w-full flex-col rounded-full border-b-[3px] border-green"></div>

              <div className="border-gray/10 flex w-full flex-col rounded-full border-b-[3px]"></div>
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

          <div className="flex items-center justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
