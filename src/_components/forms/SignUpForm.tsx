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
import { Select } from "../common/Select";
import signup from "~/app/api/signup";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../shared/toaster/useToast";

const signupFormSchema = z
  .object({
    name: z.string().min(1, { message: "Ingresa tu nombre" }),
    lastName: z.string().min(1, { message: "Ingresa tu apellido" }),
    country: z.string().min(1, { message: "Selecciona tu país" }),
    office: z.string().min(1, { message: "Selecciona tu sede" }),
    email: z.string().email({ message: "Ingresa un email válido" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type Inputs = z.infer<typeof signupFormSchema>;

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(signupFormSchema),
  });

  const mutation = useMutation({
    mutationFn: signup,
    onError: (error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });

      /*
      TODO: When an error that implies the user already exists gets implemented in the backend we should do this:
      if (error.message === "Usuario ya registrado") {
        setError("email", { message: error.message });
      };
      */
    },
    onSuccess: () => {
      router.push("/auth/welcome");
      router.refresh();
    },
  });

  const onSubmit = async (data: Inputs) => {
    mutation.mutate(data);
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
        placeholder="Ingresa tu nombre"
        label="Nombre"
        errorText={errors.name?.message}
      />

      <Input
        type="text"
        id="lastName"
        {...register("lastName")}
        placeholder="Ingresa tu apellido"
        label="Apellido"
        errorText={errors.lastName?.message}
      />

      <Input
        type="email"
        id="email"
        {...register("email")}
        placeholder="Ingresa tu nombre de usuario"
        label="Email"
        errorText={errors.email?.message}
      />

      <Select
        id="country"
        {...register("country")}
        options={[
          { value: "AR", label: "Argentina" },
          { value: "UY", label: "Uruguay" },
        ]}
        label="País"
        placeholder="Selecciona tu país"
        errorText={errors.country?.message}
      />

      <Select
        id="office"
        {...register("office")}
        options={[
          { value: 1, label: "Buenos Aires" },
          { value: 2, label: "Rosario" },
        ]}
        label="Sede"
        placeholder="Selecciona tu sede"
        errorText={errors.office?.message}
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
          <Link href={"/auth/login"} className="text-green">
            Ingresar
          </Link>
        </H4>
      </div>
    </form>
  );
};

export default SignUpForm;
