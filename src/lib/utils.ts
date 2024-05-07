import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type DecodedApiToken } from "~/types/users";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default cn;

export const parseJwt = (token: string) => {
  try {
    const tokenPayload = token.split(".")[1];

    if (!tokenPayload) throw new Error("Invalid token");

    return JSON.parse(atob(tokenPayload)) as DecodedApiToken;
  } catch (e) {
    return null;
  }
};
