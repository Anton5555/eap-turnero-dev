import Image from "next/image";
import { Input } from "./Input";
import { useRef, useState } from "react";
import React from "react";
import { Button } from "./Button";
import { useToast } from "../shared/toaster/useToast";

const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

const ProfileImageInput = React.forwardRef<
  HTMLInputElement,
  {
    imageUrl?: string;
    onImageChange: (image: File) => void;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ imageUrl, onImageChange, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  return (
    <div className="flex items-center space-x-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-lg">
        <Image
          src={imageUrl || "/default-avatar.webp"}
          alt="User image"
          width={96}
          height={96}
        />
      </div>

      <Input
        {...props}
        ref={inputRef}
        type="file"
        accept={allowedFileTypes.join(",")}
        className="hidden"
        onChange={(e) => {
          if (!e.target.files?.[0]) return;

          const file = e.target.files[0];

          if (!allowedFileTypes.includes(file.type)) {
            toast({
              title: "Por favor, selecciona un archivo de imagen válido",
              variant: "destructive",
            });

            return;
          }

          if (file.size > 1e6) {
            toast({
              title: "La imagen es demasiado grande",
              variant: "destructive",
            });

            return;
          }

          onImageChange(file);
        }}
      />

      <div className="space-y-2">
        <Button
          variant="outline"
          type="button"
          className="rounded border-light-grayish-blue leading-3 text-ultra-dark-gray"
          onClick={() => inputRef?.current?.click()}
        >
          Subir imagen
        </Button>

        <p className="text-sm leading-4 text-dark-blue">
          JPG o PNG.
          <br />1 MB max.
        </p>
      </div>
    </div>
  );
});

export default ProfileImageInput;
