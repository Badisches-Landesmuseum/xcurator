import * as React from 'react';

interface DragIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

export const DragIcon: React.FC<DragIconProps> = ({
  width = '16px',
  height = '16px',
  ...props
}: DragIconProps) => (
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
      strokeLinecap="round"
      d="M.5 5h15M.5 8h15M.5 11h15"
    />
  </svg>
);
