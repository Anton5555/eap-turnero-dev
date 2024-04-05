interface IconProps {
  width?: number;
  height?: number;
}

const CloseIcon: React.FC<IconProps> = ({ width = 26, height = 20 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 26 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.18066 18.7996L21.4402 1.54"
      stroke="black"
      strokeWidth="1.43519"
      strokeLinecap="round"
    />
    <path
      d="M4.17896 1.5437L21.4311 18.7958"
      stroke="black"
      strokeWidth="1.43519"
      strokeLinecap="round"
    />
  </svg>
);

export default CloseIcon;
