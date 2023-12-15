import * as React from 'react';

interface PlusIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  width = '16px',
  height = '16px',
  ...props
}: PlusIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={width}
    height={height}
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke={props.color || 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      d="M8 1v14M15 8H1"
    />
  </svg>
);

export { PlusIcon };
