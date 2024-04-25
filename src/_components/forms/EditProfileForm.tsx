"use client";

import { z } from "zod";
import { useToast } from "../shared/toaster/useToast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import ProfileImageInput from "../common/ProfileImageInput";
import { Gender, User } from "~/types/users";
import useUserImage from "~/lib/useUserImage";
import { locations } from "~/lib/constants";
import { useState } from "react";
import DatePicker from "../common/DatePicker";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "~/lib/api/users";
import { useSession } from "next-auth/react";

const editProfileSchema = z.object({
  name: z.string().min(1, { message: "Ingresa tu nombre" }),
  lastName: z.string().min(1, { message: "Ingresa tu apellido" }),
  email: z.string().email({ message: "Ingresa un email válido" }),
  location: z.string(),
  gender: z.string().optional(),
  birthdate: z.date().optional(),
});

export type EditProfileInputs = z.infer<typeof editProfileSchema>;

const EditProfileForm: React.FC<{ genders: Gender[]; user: User }> = ({
  genders,
  user,
}) => {
  const {
    name,
    lastName,
    email,
    location,
    gender,
    birthdate,
    accessToken,
    image,
    userTypeId,
  } = user;

  const { toast } = useToast();

  const { update } = useSession();

  const imageUrl = useUserImage({ accessToken, image });
  const [newUserImage, setNewUserImage] = useState<File | undefined>();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<EditProfileInputs>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name,
      lastName: lastName,
      email,
      location: location.toString(),
      gender: gender?.toString(),
      birthdate:
        birthdate && new Date(birthdate) > new Date("1901-01-01")
          ? new Date(birthdate)
          : undefined,
    },
  });

  const [selectedLocation, selectedGender] = watch(["location", "gender"]);

  const mutation = useMutation({
    mutationFn: updateUser,
    onError: ({ message }) =>
      toast({
        title: message,
        variant: "destructive",
      }),
    onSuccess: () => {
      update();

      toast({
        title: "Datos actualizados con éxito",
      });
    },
  });

  const onSubmit = (formData: EditProfileInputs) =>
    mutation.mutate({
      editProfileData: formData,
      accessToken,
      image: newUserImage,
      patientId: user.id,
      userTypeId,
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-inter">
      <ProfileImageInput
        image={
          newUserImage ? URL.createObjectURL(newUserImage as File) : imageUrl
        }
        onImageChange={setNewUserImage}
      />

      <div className="items-center space-y-4 lg:grid lg:grid-rows-2">
        <div className="space-y-4 lg:grid lg:grid-cols-3 lg:space-x-4 lg:space-y-0">
          <Input
            label="Nombre"
            type="text"
            id="name"
            placeholder="Nombre"
            className="ring-light-grayish-blue text-sm leading-4"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("name")}
            errorText={errors.name?.message}
          />

          <Input
            label="Apellido"
            type="text"
            id="lastName"
            placeholder="Apellido"
            className="ring-light-grayish-blue text-sm leading-4"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("lastName")}
            errorText={errors.lastName?.message}
          />

          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            className="ring-light-grayish-blue text-sm leading-4"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("email")}
            errorText={errors.email?.message}
          />
        </div>

        <div className="space-y-4 lg:grid lg:grid-cols-3 lg:space-x-4 lg:space-y-0">
          <Select
            label="País"
            id="location"
            {...register("location")}
            options={locations}
            value={selectedLocation}
            className="ring-light-grayish-blue text-sm leading-4"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            errorText={errors.location?.message}
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
            className="ring-light-grayish-blue text-sm leading-4"
            placeholder="No aplica"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
          />

          <Controller
            control={control}
            name="birthdate"
            render={({ field: { value, onChange } }) => (
              <DatePicker
                label="Fecha de nacimiento"
                name="birthdate"
                className="ring-light-grayish-blue text-sm leading-4"
                labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
                value={value}
                onChange={onChange}
              />
            )}
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

export default EditProfileForm;
