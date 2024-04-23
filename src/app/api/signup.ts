import { type Inputs } from "~/_components/forms/SignUpForm";
import { env } from "~/env";

const API_URL = env.NEXT_PUBLIC_API_URL;
const CREATE_USER_TOKEN = env.CREATE_USER_TOKEN;

const SignUpAdapter = (data: Inputs) => ({
  nombre: data.name,
  apellido1: data.lastName,
  mail: data.email,
  password: data.password,
  pais: data.country,
  sede: data.location,
  empresa: 28,
  tipo: 1,
  pdp: "N",
});

const signup = async (data: Inputs) => {
  const response = await fetch(
    `${API_URL}/Account/updateuser?token=${CREATE_USER_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SignUpAdapter(data)),
    },
  );

  if (!response.ok) throw new Error("Error al registrarte");

  return response;
};

export default signup;
