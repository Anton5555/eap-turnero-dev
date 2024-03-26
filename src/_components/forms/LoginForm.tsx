"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../common/Input";
import Link from "next/link";
import { Button } from "../common/Button";
import login from "~/app/api/auth";

const loginFormSchema = z.object({
  email: z.string().trim().email({ message: "Ingresa un email válido" }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  }),
});

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const response = await login(data);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type="email"
          id="email"
          {...register("email")}
          placeholder="Ingresa tu nombre de usuario"
          label="Nombre de usuario"
          errorText={errors.email?.message}
        />

        <span>
          *Recuerda que tu email debe ser <span>corporativo</span>
        </span>
      </div>

      <div>
        <Input
          type="password"
          id="password"
          {...register("password")}
          placeholder="********"
          label="Contraseña"
          errorText={errors.email?.message}
        />

        <div className="flex items-center justify-between">
          <span>¿Olvidaste tu contraseña?</span>

          <Link href={""}>Recuperar</Link>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Iniciar sesión
      </Button>
    </form>
  );
};

export default LoginForm;
