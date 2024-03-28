"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../common/Input";
import Link from "next/link";
import { Button } from "../common/Button";
import login from "~/app/api/auth";
import H4 from "../common/titles/H4";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

  const mutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      if (error.message === "Usuario no encontrado")
        setError("email", { message: error.message });
      else if (error.message === "Contraseña incorrecta")
        setError("password", { message: error.message });
      else console.error(error);
    },
    onSuccess: () => router.push("/welcome"),
  });

  return (
    <form
      className="w-11/12 space-y-5"
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <Input
        type="email"
        id="email"
        {...register("email")}
        placeholder="Ingresa tu nombre de usuario"
        label="Nombre de usuario"
        errorText={errors.email?.message}
      />

      <H4 className="hidden text-base font-semibold text-black lg:flex">
        *Recuerda que tu email debe ser{" "}
        <span className="text-green"> corporativo</span>
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
