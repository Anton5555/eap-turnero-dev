import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default cn;

export const locations = [
  {
    value: 438,
    label: "Argentina",
  },
  {
    value: 440,
    label: "Chile",
  },
  {
    value: 441,
    label: "Colombia",
  },
  {
    value: 443,
    label: "Mexico",
  },
  {
    value: 444,
    label: "Peru",
  },
  {
    value: 446,
    label: "Uruguay",
  },
];

export const modalities = [
  {
    value: 1,
    label: "Presencial",
  },
  {
    value: 2,
    label: "Videollamada",
  },
  {
    value: 3,
    label: "Telefónica",
  },
];

export const timeRanges = [
  {
    value: 1,
    label: "Mañana",
    times: { start: "08:00:00", end: "12:00:00" },
  },
  {
    value: 2,
    label: "Tarde",
    times: { start: "12:00:00", end: "18:00:00" },
  },
  {
    value: 3,
    label: "Noche",
    times: { start: "18:00:00", end: "22:00:00" },
  },
];
