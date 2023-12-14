import * as React from 'react';
import { Box, Flex } from 'src/@3pc/layout-components-react';
import { CheckIcon, CrossIcon } from 'src/icons';
import {
  Toast,
  ToastAction,
  ToastDescription,
} from 'src/components/Common/Toast';
import { Button } from 'src/components/Common/Button';
import { useTranslations } from 'next-intl';

export const GlobalToasts = React.createContext<{
  setOnboardingSuccess: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const GlobalToastsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const translate = useTranslations('Preferences');
  const [onboardingSuccess, setOnboardingSuccess] = React.useState(false);

  return (
    <GlobalToasts.Provider value={{ setOnboardingSuccess }}>
      {children}
      <Toast open={onboardingSuccess} onOpenChange={setOnboardingSuccess}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex css={{ mt: '$3' }}>
              <Flex css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}>
                <CheckIcon aria-hidden="true" />
              </Flex>
              {translate('success')}
            </Flex>
          </ToastDescription>
          <Box css={{ pt: '6px', flexShrink: 0 }}>
            <ToastAction asChild altText="Close">
              <Button aria-label={translate('close')} variant="ghost-blue">
                <Flex css={{ display: 'inline-flex' }}>
                  <CrossIcon aria-hidden="true" />
                </Flex>
              </Button>
            </ToastAction>
          </Box>
        </Flex>
      </Toast>
    </GlobalToasts.Provider>
  );
};

export function useGlobalToasts() {
  const context = React.useContext(GlobalToasts);
  if (context === null) {
    throw new Error(
      'useGlobalToasts must be used within a GlobalToastsProvider'
    );
  }
  return context;
}
