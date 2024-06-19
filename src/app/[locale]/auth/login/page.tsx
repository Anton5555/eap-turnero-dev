import LoginForm from "~/_components/forms/LoginForm";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "~/navigation";
import { H4, H6 } from "~/_components/common/Typography";
import Logo from "~/_components/shared/Logo";
import { getTranslations } from "next-intl/server";
import PasswordChangedDialog from "~/_components/common/PasswordChangedDialog";

const Page = async ({
  searchParams,
}: {
  searchParams: { uuid: string; resetPassword: boolean };
}) => {
  const session = await getServerSession();
  if (session?.user) redirect("/platform");

  const { uuid, resetPassword } = searchParams;

  const t = await getTranslations();

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="relative flex h-52 items-start overflow-hidden lg:h-full lg:flex-col lg:rounded-2xl">
        <Image
          className="object-cover"
          src="/assets/login.webp"
          alt="login image"
          width={642}
          height={628}
        />

        <a className="z-1 absolute h-full w-full bg-gradient-linear"></a>
      </div>

      <div className="mx-4 mt-4 flex flex-1 flex-col items-center justify-center lg:mx-6 lg:mt-0">
        <div className="mx-auto w-full max-w-lg space-y-6">
          <div className="flex flex-col items-center space-y-6">
            <Logo width={107} height={51} />

            <div className="flex w-full max-w-sm flex-row justify-center gap-6">
              <div className="flex w-full flex-col rounded-full border-b-[3px] border-green"></div>

              <div className="border-gray/10 flex w-full flex-col rounded-full border-b-[3px]"></div>
            </div>

            <H4 className="hidden text-center lg:flex">{t("login.title")}</H4>

            <H4 className="lg:hidden">{t("login.subtitle")}!</H4>

            <H6 className="hidden text-black lg:flex">{t("login.subtitle")}</H6>
          </div>

          <div className="flex items-center justify-center">
            <LoginForm accountActivationUUID={uuid} />
          </div>
        </div>
      </div>

      {resetPassword && <PasswordChangedDialog />}
    </div>
  );
};

export default Page;
