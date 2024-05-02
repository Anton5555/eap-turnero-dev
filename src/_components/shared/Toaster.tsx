"use client";

import { Toaster as Sonner } from "sonner";
import cn from "~/lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ className, ...props }: ToasterProps) => (
  <Sonner
    className={cn("toaster group fixed p-4", className)}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast:
          "group flex font-sans space-x-2 flex-row min-h-16 p-4 w-full rounded-md items-center toast group-[.toaster]:text-black group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        default: "border bg-white text-black",
        success:
          "border group-[.toaster]:bg-green group-[.toaster]:border-green group-[.toaster]:text-white",
        error: "border-orange group-[.toaster]:bg-orange text-black bg-orange",
      },
    }}
    {...props}
  />
);

export { Toaster };
