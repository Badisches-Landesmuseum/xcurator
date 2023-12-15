import { Flex, Box } from 'src/@3pc/layout-components-react';
import {
  Toast,
  ToastAction,
  ToastDescription,
} from 'src/components/Common/Toast';
import { CrossIcon, CheckIcon, AlertIcon } from 'src/icons';
import { Button } from '../Common/Button';
import { useTranslations } from 'next-intl';
import { GetServerSidePropsContext } from 'next';
interface ToastProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ToastSucess = ({ open, setOpen }: ToastProps) => {
  const translate = useTranslations('Profile');
  return (
    <>
      <Toast open={open} onOpenChange={setOpen}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex gap="2" css={{ mt: '$3' }}>
              <Flex css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}>
                <CheckIcon aria-hidden="true" />
              </Flex>
              {translate('wasAdded')}
            </Flex>
          </ToastDescription>
          <Box css={{ pt: '6px', flexShrink: 0 }}>
            <ToastAction asChild altText="Close">
              <Button variant="ghost-blue" aria-label={translate('close')}>
                <Flex css={{ display: 'inline-flex' }}>
                  <CrossIcon aria-hidden="true" />
                </Flex>
              </Button>
            </ToastAction>
          </Box>
        </Flex>
      </Toast>
    </>
  );
};
export const FailToast = ({ open, setOpen }: ToastProps) => {
  const translate = useTranslations('Profile');
  return (
    <>
      <Toast open={open} onOpenChange={setOpen}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex gap="2" css={{ mt: '$3' }}>
              <Flex css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}>
                <AlertIcon aria-hidden="true" />
              </Flex>
              <Box>
                {translate('wasNotAdded')}
                <Box mt="2">{translate('pleaseTryLater')}</Box>
              </Box>
            </Flex>
          </ToastDescription>
          <Box css={{ pt: '6px', flexShrink: 0 }}>
            <ToastAction asChild altText="Close">
              <Button variant="ghost-blue" aria-label={translate('close')}>
                <Flex css={{ display: 'inline-flex' }}>
                  <CrossIcon aria-hidden="true" />
                </Flex>
              </Button>
            </ToastAction>
          </Box>
        </Flex>
      </Toast>
    </>
  );
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
