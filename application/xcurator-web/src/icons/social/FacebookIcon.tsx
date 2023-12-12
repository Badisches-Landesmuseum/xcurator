import * as React from 'react';

interface FacebookIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

export const FacebookIcon = ({
  width = '10px',
  height = '18px',
  ...props
}: FacebookIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.1216 10.0608C20.1216 4.50477 15.6169 0 10.0608 0C4.50477 0 0 4.50477 0 10.0608C0 15.082 3.67849 19.2445 8.48901 20V12.9698H5.93392V10.061H8.48901V7.8439C8.48901 5.3226 9.99165 3.92902 12.2891 3.92902C13.3899 3.92902 14.5416 4.12572 14.5416 4.12572V6.60162H13.2726C12.0233 6.60162 11.6328 7.37702 11.6328 8.17343V10.0608H14.4229L13.9773 12.9696H11.6328V19.9998C16.4431 19.2456 20.1218 15.0834 20.1218 10.0606L20.1216 10.0608Z"
      fill="white"
    />
  </svg>
);
