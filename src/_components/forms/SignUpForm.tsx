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
import { useTranslations } from "next-intl";
import DatePicker from "../profile/DatePicker";
import { isOver18 } from "~/lib/utils";

const signupFormSchema = z
  .object({
    name: z.string().min(1, { message: "fields.firstName.errors.required" }),
    lastName: z.string().min(1, { message: "fields.lastName.errors.required" }),
    location: z.string().min(1, { message: "fields.location.errors.required" }),
    email: z.string().email({ message: "fields.email.errors.required" }),
    password: z
      .string()
      .min(8, { message: "fields.password.errors.minLength" }),
    confirmPassword: z
      .string()
      .min(8, { message: "fields.password.errors.minLength" }),
    pdp: z.boolean().refine((val) => val === true, {
      message: "fields.pdp.errors.required",
    }),
    birthdate: z
      .date({
        required_error: "fields.birthdate.errors.required",
      })
      .refine(isOver18, { message: "fields.birthdate.errors.under18" }),
    dataVeracity: z.boolean().refine((val) => val === true, {
      message: "fields.dataVeracity.errors.required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "fields.confirmPassword.errors.match",
  });

export type SignupFormInputs = z.infer<typeof signupFormSchema>;

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const t = useTranslations("signUp");

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
      if (error.message === "userExists") {
        setError("email", { message: t("fields.email.errors.alreadyExists") });

        return;
      }

      toast.error(t("errors.genericError"));
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
        placeholder={t("fields.firstName.placeholder")}
        label={t("fields.firstName.label")}
        errorText={errors.name?.message && t(errors.name.message)}
      />

      <Input
        type="text"
        id="lastName"
        {...register("lastName")}
        placeholder={t("fields.lastName.placeholder")}
        label={t("fields.lastName.label")}
        errorText={errors.lastName?.message && t(errors.lastName.message)}
      />

      <Input
        type="email"
        id="email"
        {...register("email")}
        placeholder={t("fields.email.placeholder")}
        label={t("fields.email.label")}
        errorText={errors.email?.message && t(errors.email?.message)}
      />

      <Select
        id="location"
        {...register("location")}
        options={locations}
        value={location}
        label={t("fields.location.label")}
        placeholder={t("fields.location.placeholder")}
        errorText={errors.location?.message && t(errors.location?.message)}
      />

      <Input
        type="password"
        id="password"
        {...register("password")}
        placeholder="********"
        label={t("fields.password.label")}
        errorText={errors.password?.message && t(errors.password?.message)}
      />

      <Input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
        placeholder="********"
        label={t("fields.confirmPassword.label")}
        errorText={
          errors.confirmPassword?.message && t(errors.confirmPassword?.message)
        }
      />

      <Controller
        control={control}
        name="birthdate"
        render={({ field: { value, onChange } }) => (
          <DatePicker
            label={t("fields.birthdate.label")}
            name="birthdate"
            className="ring-black"
            value={value}
            onChange={onChange}
            placeholder={t("fields.birthdate.placeholder")}
            errorText={
              errors.birthdate?.message && t(errors.birthdate?.message)
            }
          />
        )}
      />

      <Checkbox
        label={t("fields.dataVeracity.label")}
        {...register("dataVeracity")}
        errorText={
          errors.dataVeracity?.message && t(errors.dataVeracity?.message)
        }
      />

      <Checkbox
        label={t("fields.pdp.label")}
        {...register("pdp")}
        labelClassName="overflow-y-scroll h-16 "
        errorText={errors.pdp?.message && t(errors.pdp?.message)}
      />

      <Button size="full" type="submit" disabled={isSubmitting}>
        {t("buttons.signUp")}
      </Button>

      <div className="flex justify-center">
        <H4 className="text-base font-semibold text-black">
          {t("alreadyHaveUser")}{" "}
          <Link href={"/auth/login"} className="text-green">
            {t("login")}
          </Link>
        </H4>
      </div>
    </form>
  );
};

export default SignUpForm;
