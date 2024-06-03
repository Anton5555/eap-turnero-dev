"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../common/Input";
import Link from "next/link";
import { Button } from "../common/Button";
import { useRouter } from "next/navigation";
import { Select } from "../common/Select";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { H4 } from "../common/Typography";
import { locations } from "~/lib/constants";
import { createUser } from "~/lib/api/users";
import { Checkbox } from "../common/Checkbox";
import DatePicker from "../profile/DatePicker";

const signupFormSchema = z
  .object({
    name: z.string().min(1, { message: "Ingresa tu nombre" }),
    lastName: z.string().min(1, { message: "Ingresa tu apellido" }),
    location: z.string().min(1, { message: "Selecciona tu sede" }),
    email: z.string().email({ message: "Ingresa un email válido" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    pdp: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones",
    }),
    birthdate: z
      .date({
        required_error: "Ingresa una fecha válida",
      })
      .refine(
        (date) => {
          const ageDiff = Date.now() - date.getTime();
          const ageDate = new Date(ageDiff);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);

          console.log({ ageDiff, ageDate, age });

          return age >= 18;
        },
        { message: "Debes ser mayor de 18 años" },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type SignupFormInputs = z.infer<typeof signupFormSchema>;

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupFormSchema),
  });

  const location = watch("location");

  const mutation = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      if (error.message === "Ya existe un usuario con este mail") {
        setError("email", { message: error.message });

        return;
      }

      toast.error(error.message);
    },
    onSuccess: () => {
      router.push("/auth/welcome");
      router.refresh();
    },
  });

  const onSubmit = async (data: SignupFormInputs) => mutation.mutate(data);

  return (
    <form
      className="w-80 justify-center space-y-5"
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
        id="location"
        {...register("location")}
        options={locations}
        value={location}
        label="Sede"
        placeholder="Selecciona tu sede"
        errorText={errors.location?.message}
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

      <Controller
        control={control}
        name="birthdate"
        render={({ field: { value, onChange } }) => (
          <DatePicker
            label="Fecha de nacimiento"
            name="birthdate"
            className="ring-black"
            value={value}
            onChange={onChange}
            errorText={errors.birthdate?.message}
          />
        )}
      />

      <Checkbox
        label="Confirmo estar de acuerdo con compartir mis datos para esta y futuras comunicaciones del programa de asistencia. Es importante que revises la información detallada en nuestra política de protección de datos en www.eaplatina.comn.  Tu conformidad es necesaria para recibir nuestros servicios. Si decides proporcionar los datos mencionados, estarás dando tu consentimiento informado para que EAP Latina Corporation S.A. los trate y registre. Para solicitar cambios en tus datos o revocar tu consentimiento, contáctanos a protecciondedatospersonales@eaplatina.com. 
        "
        {...register("pdp")}
        errorText={errors.pdp?.message}
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
