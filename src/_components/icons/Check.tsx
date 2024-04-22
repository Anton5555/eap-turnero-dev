interface IconProps {
  width?: number;
  height?: number;
}

const CheckIcon: React.FC<IconProps> = ({ width = 10, height = 8 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.56262 4.21045L4.31262 6.96045L8.43762 0.772949"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CheckIcon;
