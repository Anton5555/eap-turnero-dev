import Image from "next/image";
import { Input } from "./Input";
import { useRef, useState } from "react";
import React from "react";
import { Button } from "./Button";

const ProfileImageInput = React.forwardRef<
  HTMLInputElement,
  {
    image?: string;
    onImageChange: (image: File) => void;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ image, onImageChange, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center space-x-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-lg">
        <Image
          src={image || "/default-avatar.webp"}
          alt="User image"
          width={96}
          height={96}
        />
      </div>

      <Input
        {...props}
        ref={inputRef}
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        className="hidden"
        onChange={(e) => {
          if (!e.target.files) return;

          const file = e.target.files[0];
          if (file) onImageChange(file);
        }}
      />

      <div className="space-y-2">
        <Button
          variant="outline"
          className="border-light-grayish-blue rounded leading-3 text-ultra-dark-gray"
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
