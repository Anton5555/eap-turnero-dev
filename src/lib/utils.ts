import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default cn;

export const parseJwt = (token: string) => {
  try {
    const tokenPayload = token.split(".")[1];

    if (!tokenPayload) throw new Error("Invalid token");

    return JSON.parse(atob(tokenPayload));
  } catch (e) {
    return null;
  }
};
