interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const WarningSvg = ({ width = 32, height = 32, color = "#262D34" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <g clipPath="url(#clip0_1_3512)">
        <path
          d="M16 0C7.1625 0 0 7.1625 0 16C0 24.8375 7.1625 32 16 32C24.8375 32 32 24.8375 32 16C32 7.1625 24.8375 0 16 0ZM16 30C8.28125 30 2 23.7188 2 16C2 8.28125 8.28125 2 16 2C23.7188 2 30 8.28125 30 16C30 23.7188 23.7188 30 16 30ZM16 19C16.5527 19 17 18.5527 17 18V8C17 7.44725 16.5527 7 16 7C15.4473 7 15 7.45 15 8V18C15 18.55 15.45 19 16 19ZM16 21.5C15.1719 21.5 14.5 22.1719 14.5 23C14.5 23.8281 15.1719 24.5 16 24.5C16.8281 24.5 17.5 23.8281 17.5 23C17.5 22.1719 16.8312 21.5 16 21.5Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_3512">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default WarningSvg;
