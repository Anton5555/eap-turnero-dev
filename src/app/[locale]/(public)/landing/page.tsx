import Image from "next/image";
import { H4, H6 } from "~/_components/common/Typography";
import Logo from "~/_components/shared/Logo";
import { getTranslations } from "next-intl/server";
import ContactForm from "~/_components/forms/LandingForm";

const Page = async () => {
  const t = await getTranslations();

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="relative flex h-52 items-start overflow-hidden lg:h-full lg:flex-col lg:rounded-2xl">
        <Image
          className="object-cover"
          src="/assets/signup.webp"
          alt="landing image"
          width={642}
          height={628}
        />

        <a className="z-1 absolute h-full w-full bg-gradient-linear"></a>
      </div>

      <div className="mx-4 mt-4 flex flex-1 flex-col items-center justify-center lg:mt-0">
        <div className="mx-auto w-full max-w-lg space-y-6">
          <div className="flex flex-col items-center space-y-6">
            <Logo width={107} height={51} />

            <div className="flex w-full flex-row justify-center">
              <div className="flex w-full flex-col rounded-full border-b-[3px] border-green"></div>
            </div>

            <H4 className="text-center">{t("landing.welcome")}</H4>

            <H6 className="text-center text-black">{t("landing.message")}</H6>
          </div>

          <div className="flex items-center justify-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
