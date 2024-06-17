import React from "react";
import NotificationsIcon from "../icons/Notifications";
import { type AppointmentNotification } from "~/types/notifications";
import CloseIcon from "../icons/Close";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../common/Popover";
import { Button } from "../common/Button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { markAllAsRead } from "~/lib/api/notifications";
import { cn } from "~/lib/utils";
import { type User } from "~/types/users";
import { useTranslations } from "next-intl";
import useDateFnsLocale from "~/lib/hooks/useDateFnsLocale";
import { format } from "date-fns";

type SpecialtyColors = Record<string, string>;

const specialtyColors: SpecialtyColors = {
  informative: "bg-green",
  legal: "bg-blue",
  finance: "bg-pink",
  nutrition: "bg-purple",
  psychology: "bg-yellow",
};

const NotificationsMenu: React.FC<{
  notifications?: AppointmentNotification[];
  user: User;
}> = ({ notifications, user }) => {
  const router = useRouter();

  const t = useTranslations();
  const locale = useDateFnsLocale();

  const { mutate, isPending } = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => router.refresh(),
  });

  const handleMarkAllAsRead = () =>
    mutate({
      accessToken: user.accessToken,
      patientId: Number(user.id),
    });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button aria-label="Notifications">
          <NotificationsIcon
            unreadNotifications={notifications && notifications.length > 0}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className="max-h-[calc(60dvh)] w-96 overflow-y-scroll p-0 font-inter lg:w-full lg:min-w-96">
        <div className="flex flex-row items-center justify-between p-4">
          <p className="text-sm font-bold">{t("notifications.title")}</p>

          <PopoverClose>
            <CloseIcon aria-hidden="true" width={16} height={12} />
          </PopoverClose>
        </div>

        <div className="border-b border-black/25" />

        {!notifications ||
          (notifications.length === 0 && (
            <div className="flex flex-row items-center justify-center p-4">
              <p className="text-sm font-light leading-tight text-black">
                {t("notifications.noNotifications")}.
              </p>
            </div>
          ))}

        {notifications && notifications.length > 0 && (
          <>
            <ul className="flex flex-col">
              {notifications.map((notification, index) => (
                <li key={index}>
                  <div className="space-y-2 p-4">
                    <div className="flex flex-row items-center justify-between">
                      <p className="w-3/4 text-sm font-semibold leading-4 text-black">
                        {notification.title}
                      </p>

                      <p className="text-xs font-light uppercase text-dark-gray">
                        {format(notification.dateCreated, "MMM d", {
                          locale,
                        })}
                      </p>
                    </div>

                    <p className="flex flex-row text-xs font-normal text-dark-gray">
                      {notification.description}
                    </p>

                    <div
                      className={cn(
                        "inline-flex items-center rounded-md border px-3 py-1 font-inter text-[10px] font-semibold text-white",
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        specialtyColors[notification.specialty] ?? "bg-gray",
                      )}
                    >
                      {t(`specialties.${notification.specialty}`)}
                    </div>
                  </div>

                  <div className="border-b border-black/25" />
                </li>
              ))}
            </ul>

            <div className="w-full p-4">
              <Button
                disabled={isPending}
                variant="outline"
                className="h-8 w-full text-sm font-normal leading-3"
                onClick={handleMarkAllAsRead}
              >
                {t("notifications.markAllAsRead")}
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsMenu;
