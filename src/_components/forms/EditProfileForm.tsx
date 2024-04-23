"use client";
import { z } from "zod";
import { useToast } from "../shared/toaster/useToast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import ProfileImageInput from "../common/ProfileImageInput";
import { Gender } from "~/types/users";
import { useSession } from "next-auth/react";
import { locations } from "~/lib/utils";

const signupFormSchema = z.object({
  name: z.string().min(1, { message: "Ingresa tu nombre" }),
  lastName: z.string().min(1, { message: "Ingresa tu apellido" }),
  email: z.string().email({ message: "Ingresa un email válido" }),
  location: z.number(),
  gender: z.number(),
  birthdate: z.string(),
});

export type Inputs = z.infer<typeof signupFormSchema>;

const EditProfileForm: React.FC<{ genders: Gender[] }> = ({ genders }) => {
  const { data: session } = useSession();

  if (!session) return;
  const { toast } = useToast();

  const {
    user: { name, lastName, email, location, gender, birthdate },
  } = session;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name,
      lastName: lastName,
      email,
      location,
      gender,
      birthdate: birthdate?.toLocaleDateString(),
    },
  });

  const [selectedLocation, selectedGender] = watch(["location", "gender"]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-inter">
      <ProfileImageInput initialImage={null} />

      <div className="items-center space-y-4 lg:grid lg:grid-rows-2">
        <div className="lg:grid lg:grid-cols-3 lg:space-x-4">
          <Input
            label="Nombre"
            type="text"
            id="name"
            placeholder="Nombre"
            className="ring-mediumGray"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("name")}
          />

          <Input
            label="Apellido"
            type="text"
            id="lastName"
            placeholder="Apellido"
            className="ring-mediumGray"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("lastName")}
          />

          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            className="ring-mediumGray"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
            {...register("email")}
          />
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:space-x-4">
          <Select
            label="País"
            id="location"
            {...register("location")}
            options={locations}
            value={selectedLocation}
            className="ring-mediumGray"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
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
            className="ring-mediumGray"
            placeholder="No aplica"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
          />

          <Input
            label="Fecha de nacimiento"
            type="date"
            id="birthdate"
            {...register("birthdate")}
            className="ring-mediumGray"
            labelClassName="text-orange mb-2 text-sm leading-4 font-medium"
          />
        </div>
      </div>

      <Button type="submit">{isSubmitting ? "Guardando..." : "Guardar"}</Button>
    </form>
  );
};

export default EditProfileForm;
