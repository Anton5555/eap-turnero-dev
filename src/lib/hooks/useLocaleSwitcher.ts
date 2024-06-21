import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "~/navigation";

export const useLocaleSwitcher = () => {
  const t = useTranslations("localeSwitcher");

  const router = useRouter();
  const pathname = usePathname();

  const locale = useLocale();

  const onSelectChange = (selectedLocale: string) => {
    router.push(pathname, { locale: selectedLocale });
    router.refresh();
  };

  return { onSelectChange, locale, t };
};
