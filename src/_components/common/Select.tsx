import React from "react";
import cn from "~/lib/utils";

const Select = React.forwardRef<
  HTMLSelectElement,
  {
    label?: string;
    errorText?: string;
    options: Array<{
      value: string | number;
      label?: string;
      disabled?: boolean;
    }>;
    placeholder?: string;
  } & React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, label, errorText, options, ...props }, ref) => (
  <div>
    {label && (
      <label
        htmlFor={props.name}
        className="mb-4 block text-lg font-bold leading-5"
      >
        {label}
      </label>
    )}

    <select
      {...props}
      className={cn(
        "align-center block h-12 w-full rounded-full border-0 px-4 py-1.5 leading-5 text-black shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-green",
        className,
        errorText && "ring-orange focus:ring-inset focus:ring-orange",
      )}
      ref={ref}
      aria-invalid={!!errorText}
      aria-describedby={errorText}
    >
      <option value="" disabled hidden>
        {props.placeholder ?? "Selecciona una opción"}
      </option>

      {options.map((item) => (
        <option
          key={item.value}
          value={item.value}
          disabled={item.disabled ?? false}
        >
          {item.label ?? item.value}
        </option>
      ))}
    </select>

    {errorText && <div className="mt-1 text-sm text-orange">{errorText}</div>}
  </div>
));

Select.displayName = "Select";

export { Select };
