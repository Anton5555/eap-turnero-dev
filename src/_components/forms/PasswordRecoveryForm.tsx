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
import { requestPasswordRecovery } from "~/lib/api/password-recovery";
import Link from "next/link";

const PasswordRecoveryForm: React.FC = () => {
  const router = useRouter();

  const t = useTranslations("passwordRecovery");

  const passwordRecoveryFormSchema = z.object({
    email: z
      .string()
      .trim()
      .email({ message: t("fields.email.errors.required") }),
  });

  type Inputs = z.infer<typeof passwordRecoveryFormSchema>;

  const { mutateAsync: requestPasswordRecoveryMutation } = useMutation({
    mutationFn: requestPasswordRecovery,
    onError: () =>
      setError("email", { message: t("fields.email.errors.notFound") }),
    onSuccess: () => router.push("/auth/password-recovery"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(passwordRecoveryFormSchema),
  });

  const onSubmit = async (data: Inputs) => {
    const { email } = data;

    toast.promise(requestPasswordRecoveryMutation(email), {
      loading: t("loading"),
      success: t("success"),
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

      <Button size="full" type="submit" disabled={isSubmitting}>
        {t("buttons.recover")}
      </Button>

      <Button className="lg:hidden" size="full" variant="outline">
        <Link href="/auth/login">{t("buttons.cancel")}</Link>
      </Button>
    </form>
  );
};

export default PasswordRecoveryForm;
