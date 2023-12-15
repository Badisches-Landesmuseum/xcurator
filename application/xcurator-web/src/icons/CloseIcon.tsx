import * as React from 'react';

interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
  stroke?: string;
}

export const CloseIcon = ({
  width = '16px',
  height = '16px',
  color = 'currentColor',
  ...props
}: CloseIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={width}
    height={height}
    fill={color}
    aria-hidden="true"
    {...props}
  >
    <path d="M1.23077 16L0 14.7692L6.76923 8L0 1.23077L1.23077 0L8 6.76923L14.7692 0L16 1.23077L9.23077 8L16 14.7692L14.7692 16L8 9.23077L1.23077 16Z" />
  </svg>
);
