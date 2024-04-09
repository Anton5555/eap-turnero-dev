export type User = {
  id: number;
  email: string;
  name: string;
  lastName: string;
  image: string;
  company: number;
  location: number;
  userType: "employee" | "family";
  services: string[];
  puesto?: number;
  accessToken: string;
};
