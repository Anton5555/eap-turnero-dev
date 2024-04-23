interface IconProps {
  width?: number;
  height?: number;
}

const ChevronRightIcon: React.FC<IconProps> = ({ width = 8, height = 13 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 8 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.49997 0.364136L0.0899658 1.77414L4.66997 6.36414L0.0899658 10.9541L1.49997 12.3641L7.49997 6.36414L1.49997 0.364136Z"
      fill="black"
    />
  </svg>
);

export default ChevronRightIcon;
