import { styled } from 'src/@3pc/layout-components-react';
import * as Progress from '@radix-ui/react-progress';

export const ProgressBar = ({
  value,
  max,
  ...props
}: Progress.ProgressProps) => {
  const progress = Math.round(((value ?? 0) / (max ?? 100)) * 100);
  return (
    <ProgressRoot value={value} max={max} {...props}>
      <ProgressIndicator
        style={{
          transform: `translateX(-${100 - progress}%)`,
        }}
      />
    </ProgressRoot>
  );
};

const ProgressRoot = styled(Progress.Root, {
  position: 'relative',
  overflow: 'hidden',
  background: '$blue200',
  borderRadius: '9999px',
  width: '100%',
  height: '4px',

  // Fix overflow clipping in Safari
  // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
  transform: 'translateZ(0)',
});

const ProgressIndicator = styled(Progress.Indicator, {
  backgroundColor: '$blue',
  width: '100%',
  height: '100%',
  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'transform 300ms $easings$out',
  },
});
