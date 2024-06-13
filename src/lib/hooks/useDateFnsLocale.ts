import { useLocale } from "next-intl";
import { useMemo } from "react";
import { es, enUS } from "date-fns/locale";

const useDateFnsLocale = () => {
  const locale = useLocale();

  return useMemo(() => (locale === "es" ? es : enUS), [locale]);
};

export default useDateFnsLocale;
