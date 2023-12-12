import * as React from 'react';

interface EditIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

export const EditIcon = ({
  width = '16px',
  height = '16px',
  color = 'currentColor',
  ...props
}: EditIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={width}
    height={height}
    fill={color}
    aria-hidden="true"
    {...props}
  >
    <path d="M1.30969 14.6903H2.27012L11.94 5.02046L10.9795 4.06003L1.30969 13.7299V14.6903ZM14.7121 4.08186L11.9181 1.28786L12.8349 0.371078C13.0823 0.123693 13.3879 0 13.7517 0C14.1155 0 14.4211 0.123693 14.6685 0.371078L15.6289 1.33151C15.8763 1.5789 16 1.88449 16 2.24829C16 2.6121 15.8763 2.91769 15.6289 3.16508L14.7121 4.08186ZM13.7954 4.99864L2.794 16H0V13.206L11.0014 2.20464L13.7954 4.99864ZM11.4598 4.54025L10.9795 4.06003L11.94 5.02046L11.4598 4.54025Z" />
  </svg>
);
