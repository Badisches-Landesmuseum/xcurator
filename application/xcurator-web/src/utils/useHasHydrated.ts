import * as React from 'react';

export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};
