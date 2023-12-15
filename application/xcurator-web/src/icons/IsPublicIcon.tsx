import * as React from 'react';

interface IsPublicIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const IsPublicIcon: React.FC<IsPublicIconProps> = ({
  width = '16px',
  height = '16px',
  color = 'currentColor',
  ...props
}: IsPublicIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill={color}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99981 0.0351562C6.75624 0.0351562 5.73828 0.447751 5.08101 1.29543C4.55323 1.9761 4.3013 2.86842 4.3013 3.87729H5.3013C5.3013 3.02914 5.51269 2.37066 5.87128 1.90819C6.29336 1.36384 6.98206 1.03516 7.99981 1.03516C8.92238 1.03516 9.57893 1.32027 10.008 1.77767C10.4414 2.23973 10.7013 2.94032 10.7013 3.88024V6.43516H3.16797C2.61568 6.43516 2.16797 6.88287 2.16797 7.43516V13.9018C2.16797 14.4541 2.61569 14.9018 3.16797 14.9018H12.8346C13.3869 14.9018 13.8346 14.4541 13.8346 13.9018V7.43516C13.8346 6.88287 13.3869 6.43516 12.8346 6.43516H11.7013V3.88024C11.7013 2.76123 11.3899 1.78929 10.7373 1.09354C10.0803 0.393124 9.13616 0.0351562 7.99981 0.0351562ZM3.16797 7.43516L12.8346 7.43516L12.8346 13.9018L3.16797 13.9018V7.43516Z"
    />
  </svg>
);

export { IsPublicIcon };
