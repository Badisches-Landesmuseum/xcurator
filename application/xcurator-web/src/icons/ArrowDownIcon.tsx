import * as React from 'react';

interface ArrowDownIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

export const ArrowDownIcon = ({
  color = 'currentColor',
  width = '14px',
  height = '14px',
  ...props
}: ArrowDownIconProps) => (
  <svg
    fill={color}
    width={width}
    height={height}
    viewBox="0 0 14 7"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0.768046 0.193187C0.956911 -0.00826881 1.27333 -0.0184759 1.47478 0.170389L6.99948 5.34979L12.5242 0.170389C12.7256 -0.0184759 13.0421 -0.00826881 13.2309 0.193187C13.4198 0.394643 13.4096 0.711061 13.2081 0.899926L7.34145 6.39993C7.14912 6.58024 6.84984 6.58024 6.65751 6.39993L0.790844 0.899926C0.589387 0.711061 0.57918 0.394643 0.768046 0.193187Z" />
  </svg>
);
