import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { locales } from "~/config";
import { Menu } from "@headlessui/react";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../common/Button";
import { usePathname, useRouter } from "~/navigation";
import { useParams } from "next/navigation";

const LocaleSwitcher = ({ mobile = false }: { mobile?: boolean }) => {
  const t = useTranslations("localeSwitcher");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const locale = useLocale();

  const onSelectChange = (selectedLocale: string) => {
    const nextLocale = selectedLocale;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  useEffect(() => {
    let toastId: string | number | undefined;

    if (isPending) toastId = toast.loading(t("changingLocale"));
    else toast.dismiss(toastId);

    return () => {
      toast.dismiss(toastId);
    };
  }, [isPending, t]);

  return (
    <LocaleSwitcherSelect currentLocale={locale} mobile={mobile}>
      {locales.map((cur) => (
        <Menu.Item key={cur}>
          <Button
            className="h-7 w-full justify-start gap-x-2 rounded bg-green/10 text-black"
            variant={"ghost"}
            disabled={cur === locale}
            onClick={() => onSelectChange(cur)}
          >
            <span className="flex flex-row">
              {t("locale", { locale: cur })}
            </span>
          </Button>
        </Menu.Item>
      ))}
    </LocaleSwitcherSelect>
  );
};

export default LocaleSwitcher;
