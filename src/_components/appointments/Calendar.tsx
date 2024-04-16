"use client";

import React from "react";
import {
  CaptionLabelProps,
  CaptionProps,
  DayPicker,
  MonthChangeEventHandler,
  useDayPicker,
  useNavigation,
} from "react-day-picker";
import cn from "~/lib/utils";
import { buttonVariants } from "../common/Button";
import ChevronLeftIcon from "../icons/ChevronLeft";
import ChevronRightIcon from "../icons/ChevronRight";
import { Select } from "../common/Select";
import { es } from "date-fns/locale";
import Link from "next/link";

const currentDay = new Date();
const currentMonth = currentDay.getMonth();
const currentYear = currentDay.getFullYear();

const currentMonths = [
  { value: 0, label: "Enero" },
  { value: 1, label: "Febrero" },
  { value: 2, label: "Marzo" },
  { value: 3, label: "Abril" },
  { value: 4, label: "Mayo" },
  { value: 5, label: "Junio" },
  { value: 6, label: "Julio" },
  { value: 7, label: "Agosto" },
  { value: 8, label: "Septiembre" },
  { value: 9, label: "Octubre" },
  { value: 10, label: "Noviembre" },
  { value: 11, label: "Diciembre" },
];

const years = [{ value: currentYear }, { value: currentYear + 1 }];

const CaptionLabel: React.FC<
  CaptionLabelProps & {
    onYearClick: (year: string) => void;
    onMonthClick: (month: string) => void;
  }
> = (props) => {
  const { classNames } = useDayPicker();
  const { displayMonth, onYearClick, onMonthClick } = props;

  return (
    <div
      key="caption"
      className={classNames.caption_label}
      aria-live="polite"
      aria-atomic="true"
    >
      <Select
        options={currentMonths.map((m) => ({
          ...m,
          disabled:
            displayMonth.getFullYear() === currentYear &&
            currentDay.getMonth() > m.value,
        }))}
        className="h-9 w-3/4 rounded-lg bg-[#F8F7FA] pl-3 pr-0 text-sm font-bold text-green ring-0 lg:h-10"
        onChange={(e) => onMonthClick(e.target.value)}
      />

      <Select
        options={years}
        className="-ml-5 h-9 w-7/12 rounded-lg bg-[#F8F7FA] pl-2 pr-0 text-sm font-bold text-green ring-0 lg:h-10"
        onChange={(e) => onYearClick(e.target.value)}
      />

      <div className="flex items-center lg:hidden">
        <Link
          href="#"
          className="mr-2"
          onClick={() => onMonthClick((displayMonth.getMonth() - 1).toString())}
        >
          <ChevronLeftIcon />
        </Link>

        <Link
          href="#"
          className="ml-4"
          onClick={() => onMonthClick((displayMonth.getMonth() + 1).toString())}
        >
          <ChevronRightIcon />
        </Link>
      </div>
    </div>
  );
};

const CustomCaption = (props: CaptionProps) => {
  const { displayMonth } = props;
  const context = useDayPicker();
  const { classNames, styles, onMonthChange } = context;

  const { goToMonth } = useNavigation();

  const onYearClick = (year: string) =>
    handleMonthChange(
      new Date(
        Number(year),
        Number(year) === currentYear && displayMonth.getMonth() < currentMonth
          ? currentMonth
          : displayMonth.getMonth(),
      ),
    );

  const onMonthClick = (month: string) =>
    handleMonthChange(new Date(displayMonth.getFullYear(), Number(month)));

  const handleMonthChange: MonthChangeEventHandler = (newMonth) => {
    goToMonth(newMonth);
    onMonthChange?.(newMonth);
  };

  return (
    <div className={classNames.caption} style={styles.caption}>
      <CaptionLabel
        displayMonth={displayMonth}
        onYearClick={onYearClick}
        onMonthClick={onMonthClick}
      />
    </div>
  );
};
type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar: React.FC<
  CalendarProps & {
    availableDays: string[];
  }
> = ({
  availableDays,
  className,
  classNames,
  showOutsideDays = true,
  onDayClick,
  onMonthChange,
  ...props
}) => (
  <DayPicker
    locale={es}
    weekStartsOn={0}
    disabled={(date) => date.getDate() < currentDay.getDate()}
    onDayClick={onDayClick}
    onMonthChange={onMonthChange}
    modifiers={{
      available: availableDays.map(
        (day) => new Date(currentYear, currentMonth, Number(day)),
      ),
    }}
    modifiersClassNames={{
      available: "bg-green text-white cursor-pointer pointer-events-auto",
    }}
    showOutsideDays={showOutsideDays}
    captionLayout="dropdown-buttons"
    fromYear={currentYear}
    toYear={currentYear + 1}
    className={cn("font-['Open_Sans'] text-base text-black", className)}
    classNames={{
      months:
        "flex justify-center space-y-4 sm:space-x-4 sm:space-y-0 pb-4 lg:pb-0",
      month: "space-y-4",
      caption:
        "flex justify-between lg:justify-center pt-4 lg:pt-1 px-2 lg:px-0 items-center",
      caption_label: "flex flex-row justify-between lg:justify-center",
      table: "w-full max-w-none border-collapse space-y-1",
      head_row:
        "flex border-b-[0.5px] border-b-[#E5E5E5] pb-2 lg:border-none lg:hidden justify-between ",
      head_cell:
        "lg:text-gray40 text-black font-semibold capitalize w-12 md:w-16 lg:w-16 xl:w-28 lg:font-bold",
      row: "flex w-full mt-2",
      cell: "h-12 w-12 lg:h-10 md:w-16 lg:w-16 xl:w-28 pointer-events-none cursor-default text-center lg:text-base font-normal p-0 relative [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent focus-within:relative focus-within:z-20",
      day: cn(
        buttonVariants({ variant: "ghost" }),
        "h-12 w-12 lg:h-10 md:w-16 lg:w-16 xl:w-28 p-0 font-normal mx-auto aria-selected:opacity-100 hover:bg-transparent hover:text-black",
      ),
      day_selected:
        "bg-green/50 text-white hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
      day_outside:
        "opacity-50 aria-selected:bg-green/50 aria-selected:opacity-30 pointer-events-none cursor-default",
      day_disabled:
        "opacity-50 hover:bg-transparent hover:opacity-50 hover:text-black pointer-events-none cursor-default",
      day_hidden: "invisible",
      ...classNames,
    }}
    components={{
      IconLeft: () => <ChevronLeftIcon />,
      IconRight: () => <ChevronRightIcon />,
      Caption: CustomCaption,
    }}
    {...props}
  />
);

Calendar.displayName = "Calendar";

export default Calendar;
