import React from "react";

interface IconProps {
  size?: number;
  unreadNotifications?: boolean;
}

const NotificationsIcon: React.FC<IconProps> = ({
  size = 16,
  unreadNotifications,
}) => (
  <div className="relative">
    {unreadNotifications && (
      <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-orange"></div>
    )}

    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 6.66663C15 5.34054 14.4732 4.06877 13.5355 3.13109C12.5979 2.19341 11.3261 1.66663 10 1.66663C8.67392 1.66663 7.40215 2.19341 6.46447 3.13109C5.52678 4.06877 5 5.34054 5 6.66663C5 12.5 2.5 14.1666 2.5 14.1666H17.5C17.5 14.1666 15 12.5 15 6.66663Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70803 18.3304 9.42117 18.2537 9.16816 18.1079C8.91515 17.9622 8.70486 17.7526 8.55835 17.5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default NotificationsIcon;
