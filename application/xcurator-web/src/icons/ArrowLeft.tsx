import * as React from 'react';

interface ArrowLeftProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

export const ArrowLeft: React.FC<ArrowLeftProps> = ({
  width = '16px',
  height = '16px',
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 28 28"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14.0013 23.3346L4.66797 14.0013L14.0013 4.66797L15.3721 6.02906L8.37211 13.0291H23.3346V14.9735H8.37211L15.3721 21.9735L14.0013 23.3346Z" />
  </svg>
);
