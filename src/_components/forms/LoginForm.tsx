"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../common/Input";
import Link from "next/link";
import { Button } from "../common/Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { H4 } from "../common/Typography";

const loginFormSchema = z.object({
  email: z.string().trim().email({ message: "Ingresa un email válido" }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  }),
});

type Inputs = z.infer<typeof loginFormSchema>;

const LoginForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: Inputs) => {
    const { email, password } = data;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response?.error) {
      router.push("/auth/welcome");
      router.refresh();
    }

    if (response?.error === "Contraseña incorrecta")
      setError("password", { message: response.error });
    if (response?.error === "Usuario no encontrado")
      setError("email", { message: response.error });
    // TODO: Handle other errors
    else console.error(response?.error);
  };

  return (
    <form
      className="w-full justify-center space-y-5 lg:max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="email"
        id="email"
        {...register("email")}
        placeholder="Ingresa tu nombre de usuario"
        label="Nombre de usuario"
        errorText={errors.email?.message}
      />

      <H4 className="hidden text-base font-semibold text-black lg:block">
        *Recuerda que tu email debe ser{" "}
        <span className="text-green">corporativo</span>
      </H4>

      <Input
        type="password"
        id="password"
        {...register("password")}
        placeholder="********"
        label="Contraseña"
        errorText={errors.password?.message}
      />

      <div className="flex justify-end lg:justify-center">
        <H4 className="text-base font-semibold text-black">
          ¿Olvidaste tu contraseña?{" "}
          <Link href={""} className="text-green">
            Recuperar
          </Link>
        </H4>
      </div>

      <Button size="full" type="submit" disabled={isSubmitting}>
        Iniciar sesión
      </Button>

      <div className="flex justify-center">
        <H4 className="text-base font-semibold text-black">
          ¿No tienes usuario?{" "}
          <Link href={""} className="text-green">
            Registrarte
          </Link>
        </H4>
      </div>
    </form>
  );
};

export default LoginForm;
