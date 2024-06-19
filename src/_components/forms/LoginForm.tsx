"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { signIn } from "next-auth/react";
import { H4 } from "../common/Typography";
import { toast } from "sonner";
import { activateAccount } from "~/lib/api/users";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "~/navigation";

const LoginForm: React.FC<{
  accountActivationUUID?: string;
}> = ({ accountActivationUUID }) => {
  const router = useRouter();

  const t = useTranslations();

  const loginFormSchema = z.object({
    email: z
      .string()
      .trim()
      .email({ message: t("login.fields.userName.errors.required") }),
    password: z.string().min(8, {
      message: t("login.fields.password.errors.minLength"),
    }),
  });

  type Inputs = z.infer<typeof loginFormSchema>;

  const { mutateAsync } = useMutation({
    mutationFn: activateAccount,
    onSuccess: () => router.refresh(),
    onSettled: () => router.replace("/auth/login"),
  });

  useEffect(() => {
    if (accountActivationUUID) {
      toast.promise(mutateAsync(accountActivationUUID), {
        loading: t("login.activation.loading"),
        success: t("login.activation.success"),
        error: t("login.activation.error"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountActivationUUID]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: Inputs) => {
    const { email, password } = data;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response?.error) {
      router.push("/auth/welcome");
      router.refresh();

      return;
    }

    if (response?.error === "invalidPassword")
      setError("password", {
        message: t("login.fields.password.errors.invalid"),
      });
    else if (response?.error === "Usuario no encontrado")
      setError("email", {
        message: t("login.fields.userName.errors.notFound"),
      });
    else if (response?.error === "Usuario no activo")
      setError("email", {
        message: t("login.fields.userName.errors.notActive"),
      });
    else if (
      response?.error === "Consultante no inicialializado para turno online"
    )
      setError("email", {
        message: t("login.fields.userName.errors.notInitialized"),
      });
    else if (response?.error === "genericError")
      toast.error(t("login.fields.userName.errors.genericError"));
    else toast.error(response?.error);
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
        placeholder={t("login.fields.userName.placeholder")}
        label={t("login.fields.userName.label")}
        errorText={errors.email?.message}
      />

      <H4 className="hidden text-base font-semibold text-black lg:block">
        {t.rich("login.fields.userName.information", {
          highlight: (children) => (
            <span className="text-green">{children}</span>
          ),
        })}
      </H4>

      <Input
        type="password"
        id="password"
        {...register("password")}
        placeholder="********"
        label={t("login.fields.password.label")}
        errorText={errors.password?.message}
      />

      <div className="flex justify-end lg:justify-center">
        <H4 className="text-base font-semibold text-black">
          {t("login.forgotPassword")}{" "}
          <Link href="/auth/password-recovery" className="text-green">
            {t("login.recover")}
          </Link>
        </H4>
      </div>

      <Button size="full" type="submit" disabled={isSubmitting}>
        {t("login.buttons.login")}
      </Button>

      <div className="flex justify-center">
        <H4 className="text-base font-semibold text-black">
          {t("login.dontHaveUser")}{" "}
          <Link href="/auth/signup" className="text-green">
            {t("login.buttons.signUp")}
          </Link>
        </H4>
      </div>
    </form>
  );
};

export default LoginForm;
