import * as React from 'react';

interface NotPublicIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const NotPublicIcon: React.FC<NotPublicIconProps> = ({
  width = '16px',
  height = '16px',
  color = 'currentColor',
  ...props
}: NotPublicIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={color}
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.3 4.95c0-.94.26-1.65.7-2.12.43-.46 1.08-.75 2-.75.92 0 1.58.29 2 .75.44.47.7 1.17.7 2.11v1.5H5.3v-1.5Zm-1 1.48V4.95c0-1.12.31-2.1.96-2.8A3.6 3.6 0 0 1 8 1.08a3.6 3.6 0 0 1 2.74 1.07c.65.7.96 1.67.96 2.8v1.48h1.13a1 1 0 0 1 1 1v6.47a1 1 0 0 1-1 1H3.17a1 1 0 0 1-1-1V7.43a1 1 0 0 1 1-1H4.3Zm-1.13 1h9.66v6.47H3.17V7.43Z"
    />
  </svg>
);

export { NotPublicIcon };
