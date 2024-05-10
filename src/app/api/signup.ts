import { type Inputs } from "~/_components/forms/SignUpForm";
import { env } from "~/env";
import { locations } from "~/lib/constants";

const API_URL = env.NEXT_PUBLIC_API_URL;
const CREATE_USER_TOKEN = env.NEXT_PUBLIC_CREATE_USER_TOKEN;

const SignUpAdapter = (data: Inputs) => ({
  nombre: data.name,
  apellido1: data.lastName,
  mail: data.email,
  password: data.password,
  sede: data.location,
  empresa: 898,
  pdp: "Y",
  pais: locations.find(
    (location) => location.value.toString() === data.location,
  )?.country,
});

const signup = async (data: Inputs) => {
  const response = await fetch(
    `${API_URL}/Account/createUser?token=${CREATE_USER_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SignUpAdapter(data)),
    },
  );

  if (!response.ok) {
    if (response.status === 403)
      throw new Error("Ya existe un usuario con este mail");

    throw new Error("Error al registrarte");
  }

  return response;
};

export default signup;
