import { useLayoutEffect, useRef } from 'react';

// This hook uses id's as selector to find elements. So you need to make sure that your elements have set the id prop corresponding to your data.
export const useFlip = <T extends { id: string }>(data: T[]) => {
  const rects = useRef<{ [id: string]: DOMRect }>({});

  useLayoutEffect(() => {
    data.forEach(date => {
      const element: HTMLElement | null = document.querySelector(
        `#${CSS.escape(date.id)}`
      );
      if (!element) return;
      const end = element.getBoundingClientRect();
      const start = rects.current[date.id];
      if (start) {
        const deltaX = start.left - end.left;
        if (deltaX !== 0) {
          // animate moving to new position
          requestAnimationFrame(() => {
            element.style.transform = `translateX(${deltaX}px)`;
            element.style.transition = '';

            requestAnimationFrame(() => {
              element.style.transform = '';
              element.style.transition = 'transform 250ms';
            });
          });
        }
      } else {
        // animate element fading in
        requestAnimationFrame(() => {
          element.style.opacity = '0';
          element.style.transition = '';

          requestAnimationFrame(() => {
            element.style.opacity = '';
            element.style.transition = 'opacity 250ms';
          });
        });
      }
      rects.current[date.id] = end;
    });
    // purge rects from old data
    if (Object.keys(rects.current).length !== data.length) {
      Object.keys(rects.current).forEach(key => {
        if (!data.find(d => d.id === key)) delete rects.current[key];
      });
    }
  }, [data]);
};
