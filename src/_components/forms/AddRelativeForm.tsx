"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import ProfileImageInput from "../profile/ProfileImageInput";
import { FamilyRelashionships, Gender, User } from "~/types/users";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addFamilyRelative, updateUser } from "~/lib/api/users";
import { useRouter } from "next/navigation";

const addRelativeSchema = z.object({
  name: z.string().min(1, { message: "Ingresa tu nombre" }),
  lastName: z.string().min(1, { message: "Ingresa tu apellido" }),
  email: z.string().email({ message: "Ingresa un email válido" }),
  relationship: z.string().min(1, { message: "Selecciona una relación" }),
  gender: z.string().optional(),
});

export type AddRelativeInputs = z.infer<typeof addRelativeSchema>;

const AddRelativeForm: React.FC<{
  genders: Gender[];
  relationships: FamilyRelashionships[];
  user: User;
}> = ({ genders, relationships, user }) => {
  const { accessToken, id } = user;

  const router = useRouter();

  const [newUserImage, setNewUserImage] = useState<File | undefined>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddRelativeInputs>({
    resolver: zodResolver(addRelativeSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      relationship: "",
      gender: "",
    },
  });

  const [selectedRelationship, selectedGender] = watch([
    "relationship",
    "gender",
  ]);

  const { mutateAsync } = useMutation({
    mutationFn: addFamilyRelative,
    onSuccess: async () => {
      router.push("/profile");

      router.refresh();
    },
  });

  const onSubmit = (formData: AddRelativeInputs) =>
    toast.promise(
      mutateAsync({
        addFamilyRelativeData: formData,
        patientId: id,
        accessToken,
      }),
      {
        loading: "Agregando familiar",
        success: "Familiar agregado con éxito",
        error: "Error al agregar familiar",
      },
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-inter">
      <ProfileImageInput
        imageUrl={newUserImage && URL.createObjectURL(newUserImage as File)}
        onImageChange={setNewUserImage}
      />

      <div className="items-center space-y-4 lg:grid lg:grid-rows-2">
        <div className="space-y-4 lg:grid lg:grid-cols-3 lg:space-x-4 lg:space-y-0">
          <Input
            label="Nombre"
            type="text"
            id="name"
            placeholder="Nombre"
            className="text-sm leading-4 ring-light-grayish-blue"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("name")}
            errorText={errors.name?.message}
          />

          <Input
            label="Apellido"
            type="text"
            id="lastName"
            placeholder="Apellido"
            className="text-sm leading-4 ring-light-grayish-blue"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("lastName")}
            errorText={errors.lastName?.message}
          />

          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            className="text-sm leading-4 ring-light-grayish-blue"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("email")}
            errorText={errors.email?.message}
          />
        </div>

        <div className="space-y-4 lg:grid lg:grid-cols-3 lg:space-x-4 lg:space-y-0">
          <Select
            label="Relación"
            id="relationship"
            {...register("relationship")}
            options={relationships}
            value={selectedRelationship}
            className="text-sm leading-4 ring-light-grayish-blue"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            errorText={errors.relationship?.message}
          />

          <Select
            label="Género"
            id="gender"
            {...register("gender")}
            options={genders.map((gender) => ({
              value: gender.id,
              label: gender.name,
            }))}
            value={selectedGender}
            className="text-sm leading-4 ring-light-grayish-blue"
            placeholder="No aplica"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
          />
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <Button
          type="submit"
          className="font-lato w-full font-normal lg:w-auto"
        >
          Guardar
        </Button>
      </div>
    </form>
  );
};

export default AddRelativeForm;
