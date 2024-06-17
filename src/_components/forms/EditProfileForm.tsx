"use client";

import { z } from "zod";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import ProfileImageInput from "../profile/ProfileImageInput";
import { type User } from "~/types/users";
import useUserImage from "~/lib/hooks/useUserImage";
import { locations } from "~/lib/constants";
import { useState } from "react";
import DatePicker from "../profile/DatePicker";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "~/lib/api/users";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { isOver18 } from "~/lib/utils";
import { useTranslations } from "next-intl";

const editProfileSchema = z.object({
  name: z.string().min(1, { message: "fields.firstName.errors.required" }),
  lastName: z.string().min(1, { message: "fields.lastName.errors.required" }),
  email: z.string().readonly(),
  location: z.string(),
  gender: z.string().optional(),
  birthdate: z
    .date({
      required_error: "fields.birthdate.errors.required",
    })
    .refine(isOver18, { message: "fields.birthdate.errors.under18" }),
});

export type EditProfileInputs = z.infer<typeof editProfileSchema>;

const EditProfileForm: React.FC<{
  genders: {
    id: number;
    name: string;
  }[];
  user: User;
}> = ({ genders, user }) => {
  const {
    name,
    lastName,
    email,
    location,
    gender,
    birthdate,
    accessToken,
    imageName,
    userTypeId,
  } = user;

  const router = useRouter();

  const t = useTranslations("profile");

  const { update } = useSession();

  const imageUrl = useUserImage({ accessToken, imageName });
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
      birthdate: birthdate ? new Date(birthdate) : undefined,
    },
  });

  const [selectedLocation, selectedGender] = watch(["location", "gender"]);

  const { mutateAsync } = useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      await update();

      router.refresh();
    },
  });

  const onSubmit = (formData: EditProfileInputs) =>
    toast.promise(
      mutateAsync({
        editProfileData: formData,
        accessToken,
        image: newUserImage,
        patientId: user.id,
        userTypeId,
      }),
      {
        loading: t("updatingUser"),
        success: t("userUpdatedSuccessfully"),
        error: t("errorUpdatingUser"),
      },
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-inter">
      <ProfileImageInput
        imageUrl={newUserImage ? URL.createObjectURL(newUserImage) : imageUrl}
        onImageChange={setNewUserImage}
      />

      <div className="items-center space-y-4 lg:grid lg:grid-rows-2">
        <div className="space-y-4 lg:grid lg:grid-cols-3 lg:space-x-4 lg:space-y-0">
          <Input
            label={t("fields.firstName.label")}
            type="text"
            id="name"
            placeholder={t("fields.firstName.placeholder")}
            className="text-sm leading-4 ring-light-grayish-blue"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("name")}
            errorText={errors.name?.message && t(errors.name?.message)}
          />

          <Input
            label={t("fields.lastName.label")}
            type="text"
            id="lastName"
            placeholder={t("fields.lastName.placeholder")}
            className="text-sm leading-4 ring-light-grayish-blue"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("lastName")}
            errorText={errors.lastName?.message && t(errors.lastName?.message)}
          />

          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            disabled
            className="text-sm leading-4 ring-light-grayish-blue"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("email")}
          />
        </div>

        <div className="space-y-4 lg:grid lg:grid-cols-3 lg:space-x-4 lg:space-y-0">
          <Select
            label={t("fields.location.label")}
            id="location"
            {...register("location")}
            options={locations}
            value={selectedLocation}
            className="text-sm leading-4 ring-light-grayish-blue"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            errorText={errors.location?.message && t(errors.location?.message)}
          />

          <Select
            label={t("fields.gender.label")}
            id="gender"
            {...register("gender")}
            options={genders.map((gender) => ({
              value: gender.id,
              label: gender.name,
            }))}
            value={selectedGender}
            className="text-sm leading-4 ring-light-grayish-blue"
            placeholder={t("fields.gender.placeholder")}
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
          />

          <Controller
            control={control}
            name="birthdate"
            render={({ field: { value, onChange } }) => (
              <DatePicker
                label={t("fields.birthdate.label")}
                name="birthdate"
                className="text-sm leading-4 ring-light-grayish-blue"
                labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
                value={value}
                onChange={onChange}
                errorText={
                  errors.birthdate?.message && t(errors.birthdate?.message)
                }
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
          {t("save")}
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
