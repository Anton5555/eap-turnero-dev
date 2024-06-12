interface IconProps {
  size?: number;
}

const LocaleIcon: React.FC<IconProps> = ({ size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.01544 13.1915C8.38794 13.1914 9.72154 12.7355 10.8069 11.8954C11.8922 11.0553 12.6677 9.87848 13.0118 8.54981M7.01544 13.1915C5.64295 13.1914 4.30935 12.7355 3.22403 11.8954C2.13872 11.0553 1.36315 9.87848 1.01912 8.54981M7.01544 13.1915C8.72504 13.1915 10.1113 10.419 10.1113 6.99982C10.1113 3.58062 8.72504 0.808106 7.01544 0.808106M7.01544 13.1915C5.30584 13.1915 3.91959 10.419 3.91959 6.99982C3.91959 3.58062 5.30584 0.808106 7.01544 0.808106M13.0118 8.54981C13.139 8.05447 13.2072 7.53506 13.2072 6.99982C13.2089 5.93492 12.9346 4.88775 12.4112 3.96038M13.0118 8.54981C11.1771 9.56689 9.11319 10.099 7.01544 10.0957C4.84009 10.0957 2.79614 9.53498 1.01912 8.54981M1.01912 8.54981C0.888916 8.04345 0.823268 7.52265 0.823733 6.99982C0.823733 5.89563 1.11268 4.85817 1.61971 3.96038M7.01544 0.808106C8.11361 0.807648 9.19212 1.09936 10.1403 1.65332C11.0885 2.20727 11.8723 3.00353 12.4112 3.96038M7.01544 0.808106C5.91728 0.807648 4.83877 1.09936 3.89056 1.65332C2.94236 2.20727 2.1586 3.00353 1.61971 3.96038M12.4112 3.96038C10.9132 5.25783 8.99716 5.97072 7.01544 5.96787C4.95292 5.96787 3.06651 5.2111 1.61971 3.96038"
      stroke="#1F384C"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LocaleIcon;
