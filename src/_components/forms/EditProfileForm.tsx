"use client";
import { z } from "zod";
import { useToast } from "../shared/toaster/useToast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Button } from "../common/Button";

const signupFormSchema = z.object({
  name: z.string().min(1, { message: "Ingresa tu nombre" }),
  lastName: z.string().min(1, { message: "Ingresa tu apellido" }),
  email: z.string().email({ message: "Ingresa un email válido" }),
  location: z.string(),
  gender: z.number(),
  birthdate: z.string(),
});

export type Inputs = z.infer<typeof signupFormSchema>;

const EditProfileForm = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nombre"
        type="text"
        placeholder="Nombre"
        {...register("name")}
      />
      <Input
        label="Apellido"
        type="text"
        placeholder="Apellido"
        {...register("lastName")}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        {...register("email")}
      />
      <Input
        label="Ubicación"
        type="text"
        placeholder="Ubicación"
        {...register("location")}
      />
      <Select
        label="Género"
        {...register}
        options={[
          { value: 1, label: "Hombre" },
          { value: 2, label: "Mujer" },
        ]}
      />
      <Input
        label="Fecha de nacimiento"
        type="date"
        {...register("birthdate")}
      />
      <Button type="submit">{isSubmitting ? "Guardando..." : "Guardar"}</Button>
    </form>
  );
};

export default EditProfileForm;
