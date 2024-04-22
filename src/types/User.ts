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

export type FamilyRelative = {
  id: number;
  patientId: number;
  line: number;
  familyRelativeId: number;
  name: string;
  lastName: string;
  relationship: number;
  livesWith: string;
};
