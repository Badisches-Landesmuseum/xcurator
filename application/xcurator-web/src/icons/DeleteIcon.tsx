interface DeleteIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}
export const DeleteIcon = ({
  width = '16px',
  height = '16px',
  fill = 'currentColor',
  ...props
}: DeleteIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      id="Vector"
      d="M4.3513 14C4.0763 14 3.84089 13.9021 3.64505 13.7063C3.44922 13.5104 3.3513 13.275 3.3513 13V3.5H2.66797V2.5H5.8013V2H10.2013V2.5H13.3346V3.5H12.6513V13C12.6513 13.2667 12.5513 13.5 12.3513 13.7C12.1513 13.9 11.918 14 11.6513 14H4.3513ZM11.6513 3.5H4.3513V13H11.6513V3.5ZM6.11797 11.5667H7.11797V4.91667H6.11797V11.5667ZM8.88463 11.5667H9.88463V4.91667H8.88463V11.5667Z"
    />
  </svg>
);
