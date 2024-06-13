import { useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "~/navigation";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const useLocaleSwitcher = () => {
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

  return { onSelectChange, locale, t };
};
