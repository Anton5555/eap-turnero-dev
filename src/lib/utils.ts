import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type DecodedApiToken } from "~/types/users";
import { toZonedTime } from "date-fns-tz";

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
  // Specify the time zone you want to parse the date in
  const timeZone = "UTC";

  // Parse the date string into a Date object in UTC
  const dateObj = new Date(dateString + "Z");

  // Convert the date to the specified time zone
  const zonedDate = toZonedTime(dateObj, timeZone);

  return zonedDate;
};

const isOver18 = (date: Date) => {
  const ageDiff = Date.now() - date.getTime();
  const ageDate = new Date(ageDiff);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  return age >= 18;
};

export {
  cn,
  parseJwt,
  parseDateWithPreservedTimezone,
  parseDateWithoutTimezone,
  isOver18,
};
