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

const timeRanges = [
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

export { locations, modalities, timeRanges };
