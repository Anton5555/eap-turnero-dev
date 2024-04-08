import Image from "next/image";
import H4 from "~/_components/common/titles/H4";
import SignUpForm from "~/_components/forms/SignUpForm";

const Page = async () => {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-between">
      <div className="relative flex h-56 items-center overflow-hidden lg:h-full lg:flex-col lg:rounded-2xl">
        <Image
          className="w-full object-cover"
          src="/signup.webp"
          alt="signup image"
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

            <div className="flex w-full flex-row justify-center gap-6 lg:max-w-sm">
              <div className="flex w-full flex-col rounded-full border-b-[3px] border-green"></div>

              <div className="flex w-full flex-col rounded-full border-b-[3px] border-gray10"></div>
            </div>

            <H4 className="text-left">Crea tu cuenta ahora</H4>
          </div>

          <div className="flex items-center justify-center">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
