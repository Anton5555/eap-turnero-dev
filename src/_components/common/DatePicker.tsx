import React, { useState } from "react";
import { Button, buttonVariants } from "./Button";
import cn from "~/lib/utils";
import { format } from "date-fns";
import CalendarIcon from "../icons/Calendar";
import { DayPicker } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { es } from "date-fns/locale";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

const DatePickerCalendar: React.FC<CalendarProps> = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    className={cn("p-3", className)}
    locale={es}
    captionLayout="dropdown"
    fromYear={new Date().getFullYear() - 110}
    toYear={new Date().getFullYear()}
    formatters={{
      formatMonthCaption: (date) => {
        const formattedDate = format(date, "LLLL", { locale: es });
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      },
    }}
    classNames={{
      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
      month: "space-y-4",
      caption_label: "hidden",
      nav: "space-x-1 flex items-center",
      caption: "flex pt-1 items-center px-2",
      caption_dropdowns: "flex gap-2",
      dropdown:
        "flex bg-ultra-light-gray  h-9 w-full rounded-lg pl-3 pr-0 text-sm font-bold text-green ring-0 lg:h-10 focus:ring-green focus:ring-2 focus:ring-inset focus:border-none",
      dropdown_month: "w-32",
      dropdown_year: "w-20",
      table: "w-full border-collapse space-y-1",
      head_row: "flex",
      head_cell:
        "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] capitalize",
      row: "flex w-full mt-2",
      cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
      day: cn(
        buttonVariants({ variant: "ghost" }),
        "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
      ),
      day_selected:
        "bg-green text-white hover:bg-green/80 hover:text-white focus:bg-green focus:text-white",
      day_outside:
        "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
      day_disabled: "text-muted-foreground opacity-50",
      day_hidden: "invisible",
      ...classNames,
    }}
    {...props}
  />
);

DatePickerCalendar.displayName = "DatePickerCalendar";

const DatePicker = (props: {
  value: Date | undefined;
  className: string;
  label: string;
  onChange: (value: Date) => void;
  labelClassName: string;
  name: string;
}) => {
  const { value, className, label, onChange, labelClassName, name } = props;

  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div>
      <label
        htmlFor={name}
        className={cn(
          "mb-4 block text-left text-lg font-bold leading-5",
          labelClassName,
        )}
      >
        {label}
      </label>

      <Popover
        className="w-full"
        open={calendarOpen}
        onOpenChange={setCalendarOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "h-12 w-full justify-between rounded-full border-0 bg-white px-4 py-1.5 font-normal text-black shadow-sm ring-1 ring-inset ring-light-grayish-blue focus:ring-2 focus:ring-inset focus:ring-green focus:placeholder:text-green",
              !value && "text-gray-400",
              className,
            )}
          >
            {value ? (
              format(value, "PPP", { locale: es })
            ) : (
              <span>Fecha de nacimiento</span>
            )}

            <CalendarIcon size={16} color={"#64748B"} />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <DatePickerCalendar
            selected={value}
            defaultMonth={value}
            mode="single"
            onSelect={(date) => {
              date && onChange(date);
              setCalendarOpen(false);
            }}
            disabled={(date) => date > new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
