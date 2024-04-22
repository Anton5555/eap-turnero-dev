export type User = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  image: string;
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
