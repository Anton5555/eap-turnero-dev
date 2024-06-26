interface IconProps {
  width?: number;
  height?: number;
  direction: "right" | "left";
  disabled?: boolean;
}

const ArrowIcon: React.FC<IconProps> = ({
  width = 22,
  height = 20,
  direction,
  disabled = false,
}: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {direction === "right" ? (
      <path
        d="M20.8989 10.899C21.3954 10.4025 21.3954 9.59752 20.8989 9.10104L12.8083 1.0104C12.3118 0.513923 11.5069 0.513923 11.0104 1.0104C10.5139 1.50689 10.5139 2.31184 11.0104 2.80832L18.2021 10L11.0104 17.1917C10.5139 17.6882 10.5139 18.4931 11.0104 18.9896C11.5069 19.4861 12.3118 19.4861 12.8083 18.9896L20.8989 10.899ZM0.930176 11.2713L20 11.2713L20 8.72868L0.930176 8.72868L0.930176 11.2713Z"
        fill={disabled ? "#727477" : "black"}
      />
    ) : (
      <path
        d="M0.961403 9.10104C0.464922 9.59752 0.464922 10.4025 0.961403 10.899L9.05204 18.9896C9.54852 19.4861 10.3535 19.4861 10.85 18.9896C11.3464 18.4931 11.3464 17.6882 10.85 17.1917L3.65828 10L10.85 2.80832C11.3464 2.31184 11.3464 1.50689 10.85 1.0104C10.3535 0.513923 9.54852 0.513923 9.05204 1.0104L0.961403 9.10104ZM20.9302 8.72868L1.86036 8.72868L1.86036 11.2713L20.9302 11.2713L20.9302 8.72868Z"
        fill={disabled ? "#727477" : "black"}
      />
    )}
  </svg>
);

export default ArrowIcon;
