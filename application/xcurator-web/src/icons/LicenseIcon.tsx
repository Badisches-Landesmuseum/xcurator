import * as React from 'react';

interface LicenseIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}
export const LicenseIcon: React.FC<LicenseIconProps> = ({
  width = '16px',
  height = '16px',
  color = 'currentColor',
  ...props
}: LicenseIconProps) => (
  <svg
    fill={color}
    width={width}
    height={height}
    viewBox="0 0 15 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#b)">
      <path d="m5.7578 7.8906c-0.14062-0.8125-0.78906-1.2812-1.6172-1.2812-1.1172 0-1.8984 0.85156-1.8984 2.3906 0 1.5391 0.78906 2.3906 1.8984 2.3906 0.8125 0 1.4688-0.4453 1.625-1.25h1.2422c-0.1875 1.3047-1.2656 2.3516-2.8828 2.3516-1.7969 0-3.1172-1.2969-3.1172-3.5 0-2.2031 1.3359-3.4922 3.1094-3.4922 1.5078 0 2.6719 0.875 2.8828 2.3906h-1.2422z" />
    </g>
    <g clipPath="url(#a)">
      <path d="m12.758 7.8906c-0.1406-0.8125-0.7891-1.2812-1.6172-1.2812-1.1172 0-1.8984 0.85156-1.8984 2.3906 0 1.5391 0.78901 2.3906 1.8984 2.3906 0.8125 0 1.4688-0.4453 1.625-1.25h1.2422c-0.1875 1.3047-1.2656 2.3516-2.8828 2.3516-1.7969 0-3.1172-1.2969-3.1172-3.5 0-2.2031 1.3359-3.4922 3.1094-3.4922 1.5078 0 2.6719 0.875 2.8828 2.3906h-1.2422z" />
    </g>
    <defs>
      <clipPath id="b">
        <rect transform="translate(1 5.5)" width="6" height="7" fill="#fff" />
      </clipPath>
      <clipPath id="a">
        <rect transform="translate(8 5.5)" width="6" height="7" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
