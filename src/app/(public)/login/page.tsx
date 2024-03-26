import LoginForm from "~/_components/forms/LoginForm";
import Image from "next/image";

const Page = () => (
  <div className="flex min-h-full flex-1">
    <div className="relative hidden w-0 flex-1 lg:block">
      <Image
        className="absolute inset-0 h-full w-full object-cover"
        src="/login.png"
        alt="login image"
        width={200}
        height={200}
      />
    </div>

    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <Image
            className="h-10 w-auto"
            src="/logo.png"
            alt="eap latina logo"
            width={50}
            height={20}
          />

          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-green">
            ¡Agenda citas online con profesionales de tu programa de asistencia
            al empleado!{" "}
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Inicia sesión para comenzar
          </p>
        </div>

        <div className="mt-10">
          <div>
            <LoginForm />
          </div>

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

export default Page;
