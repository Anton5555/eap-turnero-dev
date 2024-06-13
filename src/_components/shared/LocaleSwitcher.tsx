import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { locales } from "~/config";
import { Menu } from "@headlessui/react";
import { Button } from "../common/Button";
import { useLocaleSwitcher } from "~/lib/hooks/useLocaleSwitcher";

const LocaleSwitcher = () => {
  const { onSelectChange, locale, t } = useLocaleSwitcher();

  return (
    <LocaleSwitcherSelect currentLocale={locale}>
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
