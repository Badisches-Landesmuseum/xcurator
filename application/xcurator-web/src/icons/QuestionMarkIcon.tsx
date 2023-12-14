import * as React from 'react';

interface QuestionMarkIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const QuestionMarkIcon: React.FC<QuestionMarkIconProps> = ({
  width = '16px',
  height = '16px',
  color = 'currentColor',
  ...props
}: QuestionMarkIconProps) => (
  <svg
    stroke={color}
    fill={color}
    width={width}
    height={height}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="0"
    {...props}
  >
    <path d="M8 1.3c3.69 0 6.7 3.01 6.7 6.7s-3.01 6.7-6.7 6.7S1.3 11.69 1.3 8 4.31 1.3 8 1.3M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8Z" />
    <path d="M7.04 10.3v-.13c0-.34.05-.64.15-.89.1-.25.23-.48.39-.69.16-.2.34-.4.53-.59.33-.33.58-.61.77-.85.19-.24.28-.53.28-.87 0-.21-.05-.39-.14-.54a.95.95 0 0 0-.4-.34c-.17-.08-.38-.12-.61-.12-.35 0-.68.05-.98.14-.3.09-.6.21-.9.36l-.18-1.54c.34-.17.7-.3 1.08-.4.38-.1.84-.16 1.37-.16s1 .1 1.39.3c.39.2.69.47.89.82s.31.74.31 1.19c0 .3-.05.58-.16.84-.1.25-.25.5-.43.73-.19.24-.4.48-.65.72-.27.27-.5.54-.7.82-.2.28-.3.61-.3.98v.21H7.04Zm0 2.7v-1.77h1.7V13h-1.7Z" />
  </svg>
);

export { QuestionMarkIcon };
