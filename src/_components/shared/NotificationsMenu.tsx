import React from "react";
import NotificationsIcon from "../icons/Notifications";
import { Popover } from "@headlessui/react";

const notifications = [
  {
    message: "Tu cita con el Dr.Trulush sido agendada correctamente!",
  },
  {
    message: "Tu cita a sido agendada correctamente!",
  },
];

const NotificationsMenu: React.FC = () => {
  const unreadNotifications = true;

  return (
    <Popover>
      <Popover.Button>
        <NotificationsIcon unreadNotifications={unreadNotifications} />
      </Popover.Button>

      <Popover.Panel className="w-60">
        <div className="flex flex-col">
          {notifications.map((notification, index) => (
            <div key={index}>
              <div className="flex flex-row items-center">
                <p className="ml-2 text-sm font-light leading-tight text-black">
                  {notification.message}
                </p>
              </div>

              {index !== notifications.length - 1 && (
                <div className="my-2 border-b-[0.5px] border-black"></div>
              )}
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default NotificationsMenu;
