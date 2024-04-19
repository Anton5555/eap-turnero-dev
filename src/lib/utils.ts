import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default cn;

export const locations = [
  {
    value: 438,
    label: "Argentina",
    country: "AR",
  },
  {
    value: 440,
    label: "Chile",
    country: "CL",
  },
  {
    value: 441,
    label: "Colombia",
    country: "CO",
  },
  {
    value: 443,
    label: "Mexico",
    country: "MX",
  },
  {
    value: 444,
    label: "Peru",
    country: "PE",
  },
  {
    value: 446,
    label: "Uruguay",
    country: "UY",
  },
];
