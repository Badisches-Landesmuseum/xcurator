import * as React from 'react';

interface TrashIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const TrashIcon: React.FC<TrashIconProps> = ({
  width = '16px',
  height = '16px',
  color = 'currentColor',
  ...props
}: TrashIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 22"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.06615 1.69922C7.79 1.69922 7.56615 1.92308 7.56615 2.19922C7.56615 2.47536 7.79 2.69922 8.06615 2.69922H13.9328C14.209 2.69922 14.4328 2.47536 14.4328 2.19922C14.4328 1.92308 14.209 1.69922 13.9328 1.69922H8.06615ZM6.86615 5.63255H15.1328V18.0659H6.86615V5.63255ZM15.1328 4.39922C15.3772 4.39922 15.6012 4.48691 15.7749 4.63255H16.8661C17.1423 4.63255 17.3661 4.85641 17.3661 5.13255C17.3661 5.40869 17.1423 5.63255 16.8661 5.63255H16.1328V18.0659C16.1328 18.6182 15.6851 19.0659 15.1328 19.0659H6.86615C6.31386 19.0659 5.86615 18.6182 5.86615 18.0659V5.63255H5.13281C4.85667 5.63255 4.63281 5.40869 4.63281 5.13255C4.63281 4.85641 4.85667 4.63255 5.13281 4.63255H6.22406C6.39778 4.48691 6.62172 4.39922 6.86615 4.39922H15.1328Z"
    />
  </svg>
);

export { TrashIcon };
