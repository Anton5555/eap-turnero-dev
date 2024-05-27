import React from "react";
import { cn } from "~/lib/utils";

const Checkbox = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    labelClassName?: string;
    errorText?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ className, label, errorText, labelClassName, ...props }, ref) => (
  <div className="flex flex-col items-start">
    <div className="flex flex-row items-center">
      <input
        type="checkbox"
        className={cn(
          "h-4 w-4 rounded border-gray-300 text-green focus:ring-green",
          className,
          errorText && "border-orange text-orange focus:ring-orange",
        )}
        {...props}
        ref={ref}
        aria-invalid={!!errorText}
        aria-describedby={errorText}
      />
      <label
        htmlFor={props.name}
        className={cn(
          "ml-4 h-16 overflow-y-scroll text-xs font-light",
          labelClassName,
        )}
      >
        {label}
      </label>
    </div>

    {errorText && (
      <div className="mt-2 flex flex-row text-sm text-orange">{errorText}</div>
    )}
  </div>
));

Checkbox.displayName = "Checkbox";

export { Checkbox };
