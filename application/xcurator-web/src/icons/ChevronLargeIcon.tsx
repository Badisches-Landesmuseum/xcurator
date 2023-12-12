import * as React from 'react';

interface ChevronLargeIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const ChevronLargeIcon: React.FC<ChevronLargeIconProps> = ({
  width = '25px',
  height = '10px',
  color = 'currentColor',
  ...props
}: ChevronLargeIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 10"
    width={width}
    height={height}
    fill="none"
    stroke={color}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M2 2L12.5 8L23 2"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { ChevronLargeIcon };
