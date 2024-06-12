import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { H4 } from "~/_components/common/Typography";
import SignUpForm from "~/_components/forms/SignUpForm";
import Logo from "~/_components/shared/Logo";

const Page = async () => {
  const session = await getServerSession();
  if (session?.user) redirect("/platform");

  const t = await getTranslations();

  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-between">
      <div className="relative flex h-56 items-center overflow-hidden lg:h-full lg:flex-col lg:rounded-2xl">
        <Image
          className="object-cover"
          src="/assets/signup.webp"
          alt="signup image"
          width={642}
          height={628}
        />

        <a className="z-1 absolute h-full w-full bg-gradient-linear"></a>
      </div>

      <div className="mt-4 flex flex-1 flex-col items-center justify-center lg:mx-6 lg:mt-0">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="flex flex-col items-center space-y-6">
            <Logo width={107} height={51} />

            <div className="flex w-full flex-row justify-center gap-6 lg:max-w-sm">
              <div className="flex w-full flex-col rounded-full border-b-[3px] border-green"></div>

              <div className="border-gray/10 flex w-full flex-col rounded-full border-b-[3px]"></div>
            </div>

            <H4 className="text-left">{t("signUp.title")}</H4>
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
