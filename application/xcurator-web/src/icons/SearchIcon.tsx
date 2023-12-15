import * as React from 'react';

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  fill?: string;
  color?: string;
}

export const SearchIcon: React.FC<SearchIconProps> = ({
  width = '22px',
  height = '20px',
  color = 'currentColor',
  fill = 'none',
  ...props
}: SearchIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 20"
    fill={fill}
    stroke={color}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="9.5" cy="9.5" r="8.5" strokeWidth="2" />
    <line
      y1="-1"
      x2="5.48998"
      y2="-1"
      transform="matrix(0.719127 0.694879 -0.719127 0.694879 16.0508 16.1855)"
      strokeWidth="2"
    />
  </svg>
);
