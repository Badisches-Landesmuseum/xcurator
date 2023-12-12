import * as React from 'react';

interface MinusIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
  strokeWidth?: number; // Add a strokeWidth prop
}

const MinusIcon: React.FC<MinusIconProps> = ({
  width = '24px',
  height = '24px',
  fill = '#002fff',
  strokeWidth = 1, // Set the default stroke width
  ...props
}: MinusIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28"
    width={width}
    height={height}
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      id="Shape"
      fill={fill}
      stroke={fill}
      strokeWidth={strokeWidth}
      d="M4.13281 14C4.13281 13.4477 4.58053 13 5.13281 13H22.8661C23.4184 13 23.8661 13.4477 23.8661 14C23.8661 14.5523 23.4184 15 22.8661 15H5.13281C4.58053 15 4.13281 14.5523 4.13281 14Z"
    />
  </svg>
);

export { MinusIcon };
