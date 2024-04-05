interface IconProps {
  width?: number;
  height?: number;
}

const ChevronIcon: React.FC<IconProps> = ({ width = 10, height = 8 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.00003 7.09424L10.0084 2.08591L8.83086 0.906738L5.00003 4.74007L1.17003 0.906738L-0.00830078 2.08507L5.00003 7.09424Z"
      fill="#1F384C"
    />
  </svg>
);

export default ChevronIcon;
