export type User = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  image: string;
  company: number;
  location: number;
  userType: "employee" | "family";
  services: string[];
  position?: number;
  accessToken: string;
};
