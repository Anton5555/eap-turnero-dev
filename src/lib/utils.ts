import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type DecodedApiToken } from "~/types/users";
import { toZonedTime } from "date-fns-tz";
import { type Locale, format } from "date-fns";
import type { Formats, TranslationValues } from "next-intl";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const parseJwt = (token: string) => {
  try {
    const tokenPayload = token.split(".")[1];

    if (!tokenPayload) throw new Error("Invalid token");

    return JSON.parse(atob(tokenPayload)) as DecodedApiToken;
  } catch (e) {
    return null;
  }
};

const parseDateWithPreservedTimezone = (dateString: string): Date => {
  const [date, time] = dateString.split("T");
  const [year, month, day] = date?.split("-").map(Number) ?? [];
  const [hour, minute, second] = time?.split(":").map(Number) ?? [];

  const utcDate = new Date(
    Date.UTC(year!, month! - 1, day, hour, minute, second),
  );

  return utcDate;
};

const parseDateWithoutTimezone = (dateString: string): Date => {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  return new Date(year, month, day);
};

const isOver18 = (date: Date) => {
  const ageDiff = Date.now() - date.getTime();
  const ageDate = new Date(ageDiff);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  return age >= 18;
};

const getDisplayableDateAndTime = (
  t: <TargetKey>(
    key: TargetKey,
    values?: TranslationValues | undefined,
    formats?: Partial<Formats>,
  ) => string,
  locale: Pick<Locale, "options" | "localize" | "formatLong">,
  dateFrom: string | Date,
  dateTo?: string | Date,
  mobile?: boolean,
) => {
  const weekday = format(dateFrom, "EEEE", { locale });
  const day = format(dateFrom, "d");
  const month = format(dateFrom, mobile ? "LLL" : "LLLL", { locale });
  const year = format(dateFrom, "yyyy");
  const timeFrom = format(dateFrom, "H:mm");

  if (!dateTo) {
    return t("dateTimeStrings.longDateTime", {
      weekday,
      day,
      month,
      year,
      time: timeFrom,
    });
  }

  const timeTo = format(dateTo, "H:mm");
  if (mobile)
    return t("dateTimeStrings.shortDateTimeRange", {
      day,
      month,
      year,
      timeFrom,
      timeTo,
    });

  return t("dateTimeStrings.longDateTimeRange", {
    weekday,
    day,
    month,
    year,
    timeFrom,
    timeTo,
  });
};

export {
  cn,
  parseJwt,
  parseDateWithPreservedTimezone,
  parseDateWithoutTimezone,
  isOver18,
  getDisplayableDateAndTime,
};
