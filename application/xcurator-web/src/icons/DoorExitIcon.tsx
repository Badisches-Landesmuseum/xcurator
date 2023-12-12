import * as React from 'react';

interface DoorExitIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

export const DoorExitIcon = ({
  width = '21px',
  height = '18px',
  color = 'white',
  ...props
}: DoorExitIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 18"
    width={width}
    height={height}
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      fill={color}
      d="M5.075 8.25H18.1L15.875 6.025L16.95 4.95L21 9L16.95 13.05L15.875 11.975L18.1 9.75H5.075V8.25ZM12.5 6.75V1.5H1.5V16.5H12.5V11.25H14V16.5C14 16.9125 13.8531 17.2656 13.5594 17.5594C13.2656 17.8531 12.9125 18 12.5 18H1.5C1.0875 18 0.734375 17.8531 0.440625 17.5594C0.146875 17.2656 0 16.9125 0 16.5V1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0H12.5C12.9125 0 13.2656 0.146875 13.5594 0.440625C13.8531 0.734375 14 1.0875 14 1.5V6.75H12.5Z"
    />
  </svg>
);
