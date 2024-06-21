import React from "react";
import Image from "next/image";
import { Button } from "~/_components/common/Button";
import { H4, H6 } from "~/_components/common/Typography";
import Logo from "~/_components/shared/Logo";
import { getServerSession } from "next-auth";
import ValidateAccountDialog from "~/_components/common/ValidateAccountDialog";
import { getTranslations } from "next-intl/server";
import { Link } from "~/navigation";

const Page = async () => {
  const session = await getServerSession();

  const t = await getTranslations();

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="relative flex h-56 items-start overflow-hidden lg:h-full lg:flex-col lg:rounded-2xl">
          <Image
            className="object-cover"
            src="/assets/welcome.webp"
            alt="welcome page image"
            width={642}
            height={628}
          />

          <a className="z-1 absolute h-full w-full bg-gradient-linear"></a>
        </div>

        <div className="mx-6 mt-4 flex flex-1 flex-col items-center justify-center lg:mx-0 lg:mt-0 lg:h-[628px] lg:items-stretch">
          <div className="mx-auto flex max-w-lg flex-grow flex-col justify-between">
            <div className="flex flex-col items-center space-y-6">
              <Logo width={107} height={51} />

              <div className="flex w-full max-w-sm flex-row justify-center gap-6">
                <div className="border-gray/10 flex w-full flex-col rounded-full border-b-[3px]"></div>

                <div className="flex w-full flex-col rounded-full border-b-[3px] border-green"></div>
              </div>

              <div className="max-w-sm justify-center space-y-6">
                <H4 className="text-center">{t("welcome.title")}</H4>

                <H6 className="text-center font-normal lg:text-start">
                  {t.rich("welcome.text", {
                    br: () => <br />,
                  })}
                </H6>

                <H6 className="text-center font-bold">{t("welcome.start")}</H6>
              </div>
            </div>

            <div className="flex flex-col pt-6 lg:items-end lg:justify-end lg:pt-0">
              <Link href={session?.user ? "/platform" : "/auth/login"}>
                <Button
                  variant="default"
                  className="mt-2 w-full font-normal lg:w-auto"
                >
                  {t("welcome.next")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {!session?.user && <ValidateAccountDialog />}
    </>
  );
};

export default Page;
