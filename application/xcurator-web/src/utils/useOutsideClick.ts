import * as React from 'react';
import { RefObject } from 'react';

export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  onClickOut: () => void
) {
  React.useEffect(() => {
    const onClick = ({ target }: MouseEvent) =>
      ref.current && !ref.current.contains(target as Node) && onClickOut();
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [onClickOut, ref]);
}
