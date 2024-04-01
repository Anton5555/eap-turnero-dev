import React from "react";
import cn from "~/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  {
    label?: string;
    errorText?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ className, label, errorText, type, ...props }, ref) => (
  <div>
    {label && (
      <label
        htmlFor={props.name}
        className="mb-4 block text-lg font-bold leading-5"
      >
        {label}
      </label>
    )}

    <input
      type={type}
      className={cn(
        "align-center block h-12 w-full rounded-full border-0 px-4 py-1.5 leading-5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green focus:placeholder:text-green ",
        className,
        errorText &&
          "text-orange ring-orange focus:ring-inset focus:ring-orange focus:placeholder:text-orange",
      )}
      ref={ref}
      {...props}
      aria-invalid={!!errorText}
      aria-describedby={errorText}
    />

    {errorText && <div className="mt-1 text-sm text-orange">{errorText}</div>}
  </div>
));

Input.displayName = "Input";

export { Input };
