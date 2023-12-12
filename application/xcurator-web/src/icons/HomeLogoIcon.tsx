import * as React from 'react';

interface HomeLogoIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const HomeLogoIcon: React.FC<HomeLogoIconProps> = ({
  width = '120px',
  height = '109px',
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 109"
    width={width}
    height={height}
    fill="none"
  >
    <g clipPath="url(#a)">
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="3"
        d="M2 1c25 0 66 38 59 63-8 26-60 55-54 38 5-16 40-36 54-44 14-9 83-67 43-48-40 18-74 103 15 96"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h120v109H0z" />
      </clipPath>
    </defs>
  </svg>
);

export { HomeLogoIcon };
