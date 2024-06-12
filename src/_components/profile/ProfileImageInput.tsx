import Image from "next/image";
import { Input } from "../common/Input";
import { useRef } from "react";
import React from "react";
import { Button } from "../common/Button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

const ProfileImageInput = React.forwardRef<
  HTMLInputElement,
  {
    imageUrl?: string;
    onImageChange: (image: File) => void;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ imageUrl, onImageChange, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const t = useTranslations("profile.imageInput");

  return (
    <div className="flex items-center space-x-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-lg">
        <Image
          src={imageUrl ?? "/default-avatar.webp"}
          alt={t("altText")}
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
            toast.error(t("invalidImageFile"));

            return;
          }

          if (file.size > 1e6) {
            toast.error(t("imageTooLarge"));

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
          {t("uploadImage")}
        </Button>

        <p className="text-sm leading-4 text-dark-blue">
          {t("fileTypes")}
          <br />1 MB max.
        </p>
      </div>
    </div>
  );
});

ProfileImageInput.displayName = "ProfileImageInput";

export default ProfileImageInput;
