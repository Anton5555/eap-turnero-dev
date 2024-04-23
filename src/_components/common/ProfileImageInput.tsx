import Image from "next/image";
import { Input } from "./Input";
import { useRef, useState } from "react";
import React from "react";
import { Button } from "./Button";

// component with an image on the left and an input button on the right that receives a file

const ProfileImageInput = React.forwardRef<
  HTMLInputElement,
  {
    initialImage: File | null;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ initialImage, ...props }, ref) => {
  const [image, setImage] = useState(
    initialImage && URL.createObjectURL(initialImage),
  );

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center space-x-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-lg">
        <Image
          src={image || "/default-avatar.webp"}
          alt="User image"
          layout="fill"
          objectFit="cover"
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
          if (file) setImage(URL.createObjectURL(file));
        }}
      />

      <div className="space-y-2">
        <Button
          variant="outline"
          className="border-mediumGray rounded leading-3 text-darkGray"
          onClick={() => inputRef?.current?.click()}
        >
          Subir imagen
        </Button>

        <p className="text-sm leading-4 text-darkBlue">
          JPG o PNG.
          <br />1 MB max.
        </p>
      </div>
    </div>
  );
});

export default ProfileImageInput;
