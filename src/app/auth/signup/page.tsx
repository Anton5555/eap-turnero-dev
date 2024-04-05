import Image from "next/image";
import H4 from "~/_components/common/titles/H4";
import SignUpForm from "~/_components/forms/SignUpForm";

const Page = async () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="relative flex h-56 items-start overflow-hidden lg:h-full lg:flex-col lg:rounded-2xl">
        <Image
          className="w-full object-cover"
          src="/login.png"
          alt="login image"
          width={642}
          height={628}
        />

        <a className="z-1 absolute h-full w-full bg-gradient-linear"></a>
      </div>

      <div className="mt-4 flex flex-1 flex-col items-center justify-center lg:mt-0">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="flex flex-col items-center space-y-6">
            <Image
              className="h-10 w-auto"
              src="/logo.png"
              alt="eap latina logo"
              width={107}
              height={51}
            />

            <div className="flex w-full max-w-sm flex-row justify-center gap-6">
              <div className="flex w-full flex-col rounded-full border-b-[3px] border-green"></div>

              <div className="flex w-full flex-col rounded-full border-b-[3px] border-gray10"></div>
            </div>

            <H4 className="hidden lg:flex">Crea tu cuenta ahora</H4>
          </div>

          <div className="flex items-center justify-center">
            <SignUpForm />

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
