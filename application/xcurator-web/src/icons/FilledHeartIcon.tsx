import * as React from 'react';

interface FilledHeartIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const FilledHeartIcon: React.FC<FilledHeartIconProps> = ({
  width = '11px',
  height = '11px',
  color = 'currentColor',
  ...props
}: FilledHeartIconProps) => (
  <svg
    fill={color}
    width={width}
    height={height}
    viewBox="0 0 11 11"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0.992188 3.59761C0.992188 2.16002 2.15343 0.992188 3.58891 0.992188C4.58934 0.992188 5.03146 1.41083 5.50038 2.15303C5.96931 1.41083 6.41143 0.992188 7.41186 0.992188C8.84733 0.992188 10.0086 2.16002 10.0086 3.59761C10.0086 4.94334 9.24133 6.23743 8.36094 7.31117C7.52703 8.32822 6.54313 9.20432 5.87144 9.8024C5.82777 9.84129 5.78541 9.879 5.7445 9.91551C5.60542 10.0396 5.39535 10.0396 5.25627 9.91551C5.21536 9.879 5.173 9.84129 5.12933 9.8024C4.45764 9.20431 3.47373 8.32822 2.63983 7.31117C1.75943 6.23743 0.992188 4.94334 0.992188 3.59761Z" />
  </svg>
);

export { FilledHeartIcon };
