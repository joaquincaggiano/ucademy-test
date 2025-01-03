interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const PhoneSvg = ({ width = 25, height = 26, color = '#262D34' }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 26"
      fill="none"
    >
      <g clipPath="url(#clip0_337_204)">
        <path
          d="M17.8125 0.5H7.96873C6.15636 0.5 4.68748 1.89893 4.68748 3.625V22.375C4.68748 24.1011 6.15636 25.5 7.96873 25.5H17.8125C19.6249 25.5 21.0937 24.1011 21.0937 22.375V3.625C21.0937 1.89893 19.6223 0.5 17.8125 0.5ZM19.4531 22.375C19.4531 23.2363 18.7169 23.9375 17.8125 23.9375H7.96873C7.06434 23.9375 6.32811 23.2363 6.32811 22.375V3.625C6.32811 2.76367 7.06434 2.0625 7.96873 2.0625H17.8125C18.7169 2.0625 19.4531 2.76367 19.4531 3.625V22.375ZM14.5312 20.0312H11.25C10.797 20.0312 10.4297 20.381 10.4297 20.8125C10.4297 21.2439 10.797 21.5938 11.25 21.5938H14.5312C14.9843 21.5938 15.3515 21.2439 15.3515 20.8125C15.3515 20.3828 14.9824 20.0312 14.5312 20.0312Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_337_204">
          <rect
            width={width}
            height={height}
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PhoneSvg;
