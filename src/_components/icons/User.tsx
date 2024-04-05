interface IconProps {
  active?: boolean;
  size?: number;
  fill?: boolean;
}

const UserIcon: React.FC<IconProps> = ({
  active = false,
  size = 24,
  fill = true,
}) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {fill ? (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99994 6C7.99994 4.80653 8.47405 3.66193 9.31796 2.81802C10.1619 1.97411 11.3065 1.5 12.4999 1.5C13.6934 1.5 14.838 1.97411 15.6819 2.81802C16.5258 3.66193 16.9999 4.80653 16.9999 6C16.9999 7.19347 16.5258 8.33807 15.6819 9.18198C14.838 10.0259 13.6934 10.5 12.4999 10.5C11.3065 10.5 10.1619 10.0259 9.31796 9.18198C8.47405 8.33807 7.99994 7.19347 7.99994 6ZM4.25094 20.105C4.28466 17.9395 5.16858 15.8741 6.7119 14.3546C8.25522 12.8351 10.3342 11.9834 12.4999 11.9834C14.6657 11.9834 16.7447 12.8351 18.288 14.3546C19.8313 15.8741 20.7152 17.9395 20.7489 20.105C20.7515 20.2508 20.7116 20.3942 20.634 20.5176C20.5564 20.641 20.4445 20.7392 20.3119 20.8C17.8611 21.9237 15.1961 22.5037 12.4999 22.5C9.71394 22.5 7.06694 21.892 4.68794 20.8C4.55543 20.7392 4.44352 20.641 4.36591 20.5176C4.28829 20.3942 4.24834 20.2508 4.25094 20.105Z"
        fill={active ? "#009D7D" : "#727477"}
      />
    ) : (
      <path
        d="M10.4999 4.75977C10.4999 5.42281 10.2366 6.05869 9.76771 6.52753C9.29887 6.99637 8.66298 7.25977 7.99994 7.25977C7.3369 7.25977 6.70102 6.99637 6.23218 6.52753C5.76334 6.05869 5.49994 5.42281 5.49994 4.75977C5.49994 4.09672 5.76334 3.46084 6.23218 2.992C6.70102 2.52316 7.3369 2.25977 7.99994 2.25977C8.66298 2.25977 9.29887 2.52316 9.76771 2.992C10.2366 3.46084 10.4999 4.09672 10.4999 4.75977ZM3.00061 14.1718C3.02203 12.86 3.55817 11.6092 4.4934 10.6891C5.42862 9.76905 6.688 9.25341 7.99994 9.25341C9.31188 9.25341 10.5713 9.76905 11.5065 10.6891C12.4417 11.6092 12.9779 12.86 12.9993 14.1718C11.4309 14.8909 9.72537 15.2621 7.99994 15.2598C6.21594 15.2598 4.52261 14.8704 3.00061 14.1718Z"
        stroke="black"
        strokeWidth="1.01453"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
    ;
  </svg>
);

export default UserIcon;
