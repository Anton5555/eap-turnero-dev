import { AppointmentModality } from "~/types/appointments";

const locations = [
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

const modalities = [
  // For now, we only support videocalls and phone calls
  // {
  //   value: 1,
  //   label: "Presencial",
  // },
  {
    value: 2,
    label: AppointmentModality.VIDEOCALL,
    durations: [30, 45, 60],
  },
  {
    value: 3,
    label: AppointmentModality.PHONECALL,
    durations: [30],
  },
];

const timeRanges = [
  {
    value: 1,
    label: "Mañana",
    times: { start: 8, end: 12 },
  },
  {
    value: 2,
    label: "Tarde",
    times: { start: 12, end: 18 },
  },
  {
    value: 3,
    label: "Noche",
    times: { start: 18, end: 22 },
  },
];

const appointmentDuration = [
  {
    value: 30,
    label: "30 minutos",
  },
  {
    value: 45,
    label: "45 minutos",
  },
  {
    value: 60,
    label: "1 hora",
  },
];

export { locations, modalities, timeRanges, appointmentDuration };
