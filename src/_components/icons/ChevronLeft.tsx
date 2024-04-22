interface IconProps {
  width?: number;
  height?: number;
}

const ChevronLeftIcon: React.FC<IconProps> = ({ width = 8, height = 13 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 8 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.91 1.77414L6.5 0.364136L0.5 6.36414L6.5 12.3641L7.91 10.9541L3.33 6.36414L7.91 1.77414Z"
      fill="black"
    />
  </svg>
);

export default ChevronLeftIcon;
