interface Props {
  color?: string;
  width?: number;
  height?: number;
}

const ArrowLeftSvg = ({
  color = '#262D34',
  width = 12,
  height = 12,
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Left">
        <path
          id="Vector"
          d="M8.83962 2.06622V1.03095C8.83962 0.941219 8.7365 0.891665 8.66685 0.946576L2.62935 5.6622C2.57805 5.70209 2.53655 5.75318 2.50799 5.81155C2.47944 5.86992 2.4646 5.93405 2.4646 5.99903C2.4646 6.06401 2.47944 6.12814 2.50799 6.18651C2.53655 6.24489 2.57805 6.29597 2.62935 6.33586L8.66685 11.0515C8.73783 11.1064 8.83962 11.0568 8.83962 10.9671V9.93184C8.83962 9.86622 8.80882 9.80327 8.75792 9.76309L3.93649 5.9997L8.75792 2.23497C8.80882 2.19479 8.83962 2.13184 8.83962 2.06622Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default ArrowLeftSvg;
