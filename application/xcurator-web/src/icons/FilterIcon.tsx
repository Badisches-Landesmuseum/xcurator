import * as React from 'react';

interface FilterIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const FilterIcon: React.FC<FilterIconProps> = ({
  width = '16px',
  height = '16px',
  color = 'currentColor',
  ...props
}: FilterIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 27 27"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.675 23V17.375H14.175V19.45H23V20.95H14.175V23H12.675ZM5 20.95V19.45H11.175V20.95H5ZM9.675 16.8V14.75H5V13.25H9.675V11.15H11.175V16.8H9.675ZM12.675 14.75V13.25H23V14.75H12.675ZM16.825 10.625V5H18.325V7.05H23V8.55H18.325V10.625H16.825ZM5 8.55V7.05H15.325V8.55H5Z" />
  </svg>
);

export { FilterIcon };
