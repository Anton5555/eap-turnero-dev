import React from "react";
import cn from "~/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<
  HTMLInputElement,
  {
    label?: string;
    errorText?: string;
  } & InputProps
>(({ className, label, errorText, type, name, ...props }, ref) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}

      <input
        type={type}
        className={cn(
          "block w-full rounded-full border-0 px-4 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6",
          className,
          errorText &&
            "text-orange ring-orange focus:ring-inset focus:ring-orange",
        )}
        ref={ref}
        {...props}
        aria-invalid={!!errorText}
        aria-describedby={errorText}
      />

      {errorText && <div className="mt-2 text-sm text-orange">{errorText}</div>}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
