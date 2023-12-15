import * as React from 'react';

interface ChevronIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({
  width = '10px',
  height = '18px',
  ...props
}: ChevronIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 18"
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
      d="M9 1 1.707 8.293a1 1 0 0 0 0 1.414L9 17"
    />
  </svg>
);

export { ChevronIcon };
