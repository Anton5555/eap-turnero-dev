interface IconProps {
  size?: number;
}

const BarsIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 18.8641H21V16.8641H3V18.8641ZM3 13.8641H21V11.8641H3V13.8641ZM3 6.86414V8.86414H21V6.86414H3Z"
      fill="white"
    />
  </svg>
);

export default BarsIcon;
