"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useLocale, useTranslations } from "next-intl";
import { Select } from "../common/Select";
import { Textarea } from "../common/Textarea";
import ContactFormConfirmationDialog from "../contact/ContactFormConfirmationDialog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendContactInformation } from "~/lib/api/contact";

const specialties = [
  {
    value: "psychology",
  },
  {
    value: "nutrition",
  },
  {
    value: "legal",
  },
  {
    value: "finance",
  },
  {
    value: "informative",
  },
];

const contactFormSchema = z.object({
  email: z.string().email({ message: "landing.fields.email.errors.required" }),
  specialty: z
    .string()
    .min(1, { message: "landing.fields.specialty.errors.required" }),
  availability: z
    .string()
    .min(1, { message: "landing.fields.availability.errors.required" }),
});

export type ContactFormInputs = z.infer<typeof contactFormSchema>;

const ContactForm: React.FC = () => {
  const t = useTranslations();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const currentLocale = useLocale();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const specialty = watch("specialty");

  const translatedSpecialties = specialties.map((specialty) => ({
    value: t(`specialties.${specialty.value}`),
  }));

  const { mutateAsync } = useMutation({
    mutationFn: sendContactInformation,
    onSuccess: () => {
      setIsConfirmDialogOpen(true);

      reset();
    },
  });

  const onSubmit = async (data: ContactFormInputs) =>
    toast.promise(
      mutateAsync({
        contactFormData: data,
        currentLocale,
        subject: t("landing.subject"),
      }),
      {
        loading: t("landing.loading"),
        error: t("landing.error"),
      },
    );

  return (
    <>
      <form
        className="w-full justify-center space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="email"
          id="email"
          {...register("email")}
          placeholder={t("landing.fields.email.placeholder")}
          label={t("landing.fields.email.label")}
          errorText={errors.email?.message && t(errors.email?.message)}
        />

        <Select
          id="location"
          {...register("specialty")}
          options={translatedSpecialties}
          value={specialty}
          label={t("landing.fields.specialty.label")}
          placeholder={t("landing.fields.specialty.placeholder")}
          errorText={errors.specialty?.message && t(errors.specialty?.message)}
        />

        <Textarea
          id="availability"
          {...register("availability")}
          placeholder={t("landing.fields.availability.placeholder")}
          label={t("landing.fields.availability.label")}
          errorText={
            errors.availability?.message && t(errors.availability?.message)
          }
        />

        <Button size="full" type="submit" disabled={isSubmitting}>
          {t("landing.button")}
        </Button>
      </form>

      {isConfirmDialogOpen && (
        <ContactFormConfirmationDialog
          open={isConfirmDialogOpen}
          onClose={() => setIsConfirmDialogOpen(false)}
        />
      )}
    </>
  );
};

export default ContactForm;
