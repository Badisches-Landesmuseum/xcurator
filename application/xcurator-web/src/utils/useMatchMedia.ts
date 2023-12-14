'use client';
import { useState, useEffect } from 'react';
const useMatchMedia = (mediaQuery: string) => {
  const [matching, setMatching] = useState(false);

  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => {
      setMatching(e.matches);
    };

    if (typeof window !== 'undefined') {
      const media = window.matchMedia(mediaQuery);
      media.addEventListener('change', onChange);

      if (media.matches) {
        setMatching(true);
      }

      return () => media.removeEventListener('change', onChange);
    }
  }, [mediaQuery]);

  return matching;
};

export default useMatchMedia;
