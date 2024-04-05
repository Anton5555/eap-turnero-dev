interface IconProps {
  size?: number;
}

const ExitIcon: React.FC<IconProps> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 14.9744H3.33333C2.97971 14.9744 2.64057 14.8339 2.39052 14.5838C2.14048 14.3338 2 13.9947 2 13.641V4.3077C2 3.95408 2.14048 3.61494 2.39052 3.36489C2.64057 3.11484 2.97971 2.97437 3.33333 2.97437H6"
      stroke="#334155"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6667 12.3078L14.0001 8.97445L10.6667 5.64111"
      stroke="#334155"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 8.97437H6"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ExitIcon;
