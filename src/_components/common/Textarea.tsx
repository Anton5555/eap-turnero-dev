import React from "react";
import { cn } from "~/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  {
    label?: string;
    labelClassName?: string;
    errorText?: string;
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, label, errorText, labelClassName, ...props }, ref) => (
  <div>
    {label && (
      <label
        htmlFor={props.name}
        className={cn("mb-4 block text-lg font-bold leading-5", labelClassName)}
      >
        {label}
      </label>
    )}

    <textarea
      className={cn(
        "align-center block h-36 w-full rounded-2xl border-0 p-4 leading-5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green focus:placeholder:text-green",
        className,
        errorText &&
          "text-orange ring-orange focus:ring-inset focus:ring-orange focus:placeholder:text-orange",
      )}
      {...props}
      ref={ref}
      aria-invalid={!!errorText}
      aria-describedby={errorText}
    />

    {errorText && <div className="mt-1 text-sm text-orange">{errorText}</div>}
  </div>
));

Textarea.displayName = "Textarea";

export { Textarea };
