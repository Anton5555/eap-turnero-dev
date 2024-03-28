const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Adapter to take the email and password and change them to Username and Password
const LoginAdapter = (credentials: { email: string; password: string }) => {
  return {
    Username: credentials.email,
    Password: credentials.password,
  };
}

const login = async (data: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/login/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(LoginAdapter(data)),
  });

  if (!response.ok) {
    if (response.status === 401)
      throw new Error("Contraseña incorrecta");
    else if (response.status === 404)
      throw new Error("Usuario no encontrado");
    else
      throw new Error("Error al iniciar sesión");
  }

  return response.json();
}

export default login;