import { env } from "~/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

const requestPasswordRecovery = async (email: string) => {
  const response = await fetch(
    `${API_URL}/Account/ask4resetpwd?mail=${email}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) throw new Error();

  return true;
};

type userTokenAPIData = {
  token: string;
  user: {
    create_date: string;
    id: number;
    isdirty: boolean;
    mail_user: string;
    sel: null;
    uuid: string;
  };
};

const resetPassword = async (props: {
  uuid: string;
  email: string;
  password: string;
}) => {
  const { uuid, email, password } = props;

  const validUUIDResponse = await fetch(
    `${API_URL}/UUID_EXT/existUUIDReset?UUID=${uuid}&mail=${email}`,
  );

  if (!validUUIDResponse.ok) throw new Error();

  const isUUIDValid: boolean = (await validUUIDResponse.json()) as boolean;

  if (!isUUIDValid) throw new Error("tokenInvalid");

  const userTokenResponse = await fetch(
    `${API_URL}/UUID_EXT/getDataUUIDReset?UUID=${uuid}&mail=${email}`,
  );

  if (!userTokenResponse.ok) throw new Error("errorGettingToken");

  const userTokenAPIData = (await userTokenResponse.json()) as userTokenAPIData;

  if (!userTokenAPIData.user) throw new Error("tokenInvalid");

  const headers = new Headers();

  headers.append("Authorization", userTokenAPIData.token);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${API_URL}/Account/resetpwd`, {
    method: "POST",
    headers,
    body: JSON.stringify({ Username: email, Password: password }),
  });

  if (!response.ok) throw new Error("errorResettingPassword");

  return true;
};

export { requestPasswordRecovery, resetPassword };
