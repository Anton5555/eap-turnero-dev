"use client";

import React from "react";
import { DayPicker, type DayPickerSingleProps } from "react-day-picker";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../common/Button";
import ChevronLeftIcon from "../icons/ChevronLeft";
import ChevronRightIcon from "../icons/ChevronRight";
import { format } from "date-fns";
import useDateFnsLocale from "~/lib/hooks/useDateFnsLocale";

const currentDay = new Date();

type CalendarProps = DayPickerSingleProps & {
  displayedMonth: Date;
  availableDays: string[];
};

const SUNDAY = 0;

const calendarClassNames = {
  months:
    "flex justify-center space-y-4 sm:space-x-4 sm:space-y-0 pb-4 lg:pb-0",
  month: "space-y-4",
  caption_label: "hidden",
  nav: "space-x-4 lg:hidden flex items-center",
  caption:
    "flex justify-between lg:justify-center pt-4 lg:pt-1 px-2 lg:px-0 items-center",
  caption_dropdowns: "flex gap-2",
  dropdown:
    "flex bg-ultra-light-gray border-none h-9 w-full rounded-lg pl-3 pr-0 text-sm font-bold text-green ring-0 lg:h-10 focus:ring-green focus:ring-2 focus:ring-inset focus:border-none",
  dropdown_month: "w-32",
  dropdown_year: "w-20",
  table: "w-full max-w-none border-collapse space-y-1",
  head_row:
    "flex border-b-[0.5px] border-b-light-gray pb-2 lg:border-none justify-between ",
  head_cell:
    "lg:text-dark-gray text-black font-semibold capitalize w-12 md:w-16 lg:w-16 xl:w-24 2xl:w-28 lg:font-bold",
  row: "flex w-full mt-2 justify-between",
  cell: "h-12 w-12 lg:h-10 md:w-16 lg:w-16 xl:w-24 2xl:w-28 pointer-events-none cursor-default text-center lg:text-base font-normal p-0 relative [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent focus-within:relative focus-within:z-20",
  day: cn(
    buttonVariants({ variant: "ghost" }),
    "h-12 w-12 lg:h-10 md:w-16 lg:w-16 xl:w-24 2xl:w-28 p-0 font-normal mx-auto aria-selected:opacity-100 hover:text-black",
  ),
  day_outside:
    "opacity-50 aria-selected:bg-green/50 aria-selected:opacity-30 pointer-events-none cursor-default",
  day_disabled:
    "opacity-50 hover:bg-transparent hover:opacity-50 hover:text-black pointer-events-none cursor-default",
  day_hidden: "invisible",
};

const Calendar: React.FC<CalendarProps> = ({
  availableDays,
  className,
  showOutsideDays = true,
  displayedMonth,
  onMonthChange,
  selected,
  ...props
}) => {
  const locale = useDateFnsLocale();

  return (
    <DayPicker
      locale={locale}
      weekStartsOn={SUNDAY}
      disabled={(date) =>
        date.getMonth() === currentDay.getMonth() &&
        date.getDate() < currentDay.getDate()
      }
      onMonthChange={onMonthChange}
      defaultMonth={displayedMonth}
      fromMonth={currentDay}
      toYear={currentDay.getFullYear() + 1}
      selected={selected}
      modifiers={{
        available: availableDays
          .filter((day) => Number(day) !== selected?.getDate())
          .map(
            (day) =>
              new Date(
                displayedMonth.getFullYear(),
                displayedMonth.getMonth(),
                Number(day),
              ),
          ),
      }}
      modifiersClassNames={{
        available:
          "bg-light-gray text-black hover:bg-green/50 cursor-pointer pointer-events-auto",
        selected: "bg-green text-white",
      }}
      formatters={{
        formatMonthCaption: (date) => {
          const formattedDate = format(date, "LLLL", { locale });
          return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        },
      }}
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown-buttons"
      className={cn("font-openSans text-base text-black", className)}
      classNames={calendarClassNames}
      components={{
        IconLeft: () => <ChevronLeftIcon />,
        IconRight: () => <ChevronRightIcon />,
      }}
      {...props}
    />
  );
};

Calendar.displayName = "Calendar";

export default Calendar;
