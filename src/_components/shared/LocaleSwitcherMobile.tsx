import { locales } from "~/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Button } from "../common/Button";
import LocaleFilledIcon from "../icons/LocaleFilled";
import { cn } from "~/lib/utils";
import ChevronIcon from "../icons/Chevron";
import { useLocaleSwitcher } from "~/lib/hooks/useLocaleSwitcher";

const LocaleSwitcherMobile = () => {
  const { onSelectChange, locale, t } = useLocaleSwitcher();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="language">
        <AccordionTrigger className="group flex w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-x-3 p-2 font-bold leading-5">
            <LocaleFilledIcon />

            <span>{t("language")}</span>
          </div>

          <ChevronIcon />
        </AccordionTrigger>
        <AccordionContent className="gap-y-2 pl-8">
          {locales.map((cur) => (
            <Button
              key={cur}
              className={cn(
                "h-10 w-full justify-start gap-x-2 rounded text-black",
                cur === locale ? "bg-green/10" : "bg-white",
              )}
              variant={"ghost"}
              disabled={cur === locale}
              onClick={() => onSelectChange(cur)}
            >
              <span className="flex flex-row">
                {t("localeFull", { locale: cur })}
              </span>
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LocaleSwitcherMobile;
