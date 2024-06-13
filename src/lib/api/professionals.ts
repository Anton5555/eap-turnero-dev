import { env } from "~/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface SapUserApiData {
  value: {
    USER_CODE: string;
  }[];
}

const getProfessionalSapUser = async (props: {
  employeeId: number;
  accessToken: string;
}) => {
  const { employeeId, accessToken } = props;

  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const response = await fetch(
    `${API_URL}/misc/getUserCodeByEmpId?empid=${employeeId}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) throw new Error("errorGettingSAPUser");

  const responseBody = (await response.json()) as SapUserApiData;

  if (responseBody.value.length === 0 || !responseBody.value[0]?.USER_CODE)
    throw new Error("SAPUserNotFound");

  const sapUser = responseBody.value[0].USER_CODE;

  return sapUser;
};

export { getProfessionalSapUser };
