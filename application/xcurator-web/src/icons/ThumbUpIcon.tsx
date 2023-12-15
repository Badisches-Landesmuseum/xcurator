import * as React from 'react';

interface ThumbUpIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const ThumbUpIcon: React.FC<ThumbUpIconProps> = ({
  width = '26px',
  height = '26px',
  color = 'currentColor',
  ...props
}: ThumbUpIconProps) => (
  <svg
    fill={color}
    width={width}
    height={height}
    viewBox="0 0 26 26"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.1,14.5l-0.2,0.6l0.2,0.1L1,24.4v0.3c0.1,0.2,0.4,0.8,1.1,0.8h1.7c0.6,0,1.2-0.6,1.2-1.2V13.4H1.2
	C0.7,13.4,0.2,13.8,0.1,14.5z M24.8,11.8c-0.6-0.8-1.4-1.2-2.3-1.4h-5.3c0.3-0.7,0.5-1.5,0.6-2.4V7.8C18,7.1,18,6.5,18,5.7
	c0-0.5-0.1-1-0.2-1.3c-0.1-0.4-0.4-0.8-0.6-1c-0.1-0.1-0.1-0.1-0.1-0.2L17,3.1c-0.5-0.5-1.1-0.7-1.6-0.7c-0.2,0-0.5,0-0.8,0.2
	c-0.8,0.3-1.5,1-1.7,1.8l-0.2,0.7c-0.8,2.4-2.1,4.7-4,6.6l-1.5,1.5v9.4c0,1.9,1.5,3.4,3.5,3.4l9-0.8c1.7,0,3.2-1.3,3.4-2.9l2.3-7.8
	v-0.1C25.6,13.5,25.3,12.6,24.8,11.8z"
    />
  </svg>
);

export { ThumbUpIcon };
