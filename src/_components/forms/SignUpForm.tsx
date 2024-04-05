"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../common/Input";
import Link from "next/link";
import { Button } from "../common/Button";
import H4 from "../common/titles/H4";
import { useRouter } from "next/navigation";

const signupFormSchema = z.object({
  name: z.string().min(1, { message: "Ingresa tu nombre completo" }),
  country: z.string().min(1, { message: "Ingresa tu país" }),
  email: z.string().email({ message: "Ingresa un email válido" }),
  password: z.string().min(8, { message: "Ingresa una contraseña válida" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Ingresa una contraseña válida" }),
});

type Inputs = z.infer<typeof signupFormSchema>;

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit = async (data: Inputs) => {
    /*
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
    */
  };

  return (
    <form
      className="w-full justify-center space-y-5 lg:max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        id="name"
        {...register("name")}
        placeholder="Ingresa tu nombre completo"
        label="Nombre completo"
        errorText={errors.name?.message}
      />

      <Input
        type="text"
        id="country"
        {...register("country")}
        placeholder="Ingresa tu país"
        label="País"
        errorText={errors.country?.message}
      />

      <Input
        type="email"
        id="email"
        {...register("email")}
        placeholder="Ingresa tu nombre de usuario"
        label="Email"
        errorText={errors.email?.message}
      />

      <Input
        type="password"
        id="password"
        {...register("password")}
        placeholder="********"
        label="Contraseña"
        errorText={errors.password?.message}
      />

      <Input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
        placeholder="********"
        label="Repetir contraseña"
        errorText={errors.confirmPassword?.message}
      />

      <Button size="full" type="submit" disabled={isSubmitting}>
        Registrarse
      </Button>

      <div className="flex justify-center">
        <H4 className="text-base font-semibold text-black">
          ¿Ya tienes usuario?{" "}
          <Link href={""} className="text-green">
            Ingresar
          </Link>
        </H4>
      </div>
    </form>
  );
};

export default SignUpForm;
