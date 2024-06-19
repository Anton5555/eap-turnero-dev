"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { resetPassword } from "~/lib/api/password-recovery";

const NewPasswordForm: React.FC<{
  resetPasswordUUID: string;
}> = ({ resetPasswordUUID }) => {
  const router = useRouter();

  const t = useTranslations("passwordRecovery");

  const resetPasswordFormSchema = z
    .object({
      email: z
        .string()
        .trim()
        .email({ message: t("fields.email.errors.required") }),
      password: z
        .string()
        .min(8, { message: t("fields.password.errors.minLength") }),
      confirmPassword: z
        .string()
        .min(8, { message: t("fields.password.errors.minLength") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("fields.confirmPassword.errors.match"),
    });

  type Inputs = z.infer<typeof resetPasswordFormSchema>;

  const { mutateAsync } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => router.replace("/auth/login?resetPassword=true"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const onSubmit = async (data: Inputs) => {
    const { email, password } = data;

    toast.promise(mutateAsync({ email, password, uuid: resetPasswordUUID }), {
      loading: t("resettingPassword"),
      error: ({ message }) => t(`errors.${message}`),
    });
  };

  return (
    <form
      className="w-full justify-center space-y-5 lg:max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="email"
        id="email"
        {...register("email")}
        placeholder={t("fields.email.placeholder")}
        label={t("fields.email.label")}
        errorText={errors.email?.message}
      />

      <Input
        type="password"
        id="password"
        {...register("password")}
        placeholder="********"
        label={t("fields.password.label")}
        errorText={errors.password?.message}
      />

      <Input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
        placeholder="********"
        label={t("fields.confirmPassword.label")}
        errorText={errors.confirmPassword?.message}
      />

      <Button size="full" type="submit" disabled={isSubmitting}>
        {t("buttons.confirm")}
      </Button>
    </form>
  );
};

export default NewPasswordForm;
