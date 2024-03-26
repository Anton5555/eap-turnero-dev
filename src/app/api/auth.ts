const login = async (data: { email: string; password: string }) => {
  const response = await fetch("/api/login/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al iniciar sesión");
  }

  return response.json();
}

export default login;