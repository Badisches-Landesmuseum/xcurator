import {
  Box,
  Inline,
  Stack,
  Flex,
  styled,
} from 'src/@3pc/layout-components-react';
import { useEffect, useRef, useState } from 'react';
import { ButtonTag } from 'src/components/Common/ButtonTag';
import { Text } from 'src/components/Common/Text';
import { TextField } from 'src/components/Common/TextField';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
} from 'src/components/Common/Dialog';
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastTitle,
} from 'src/components/Common/Toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/Common/Popover';
import {
  ToggleGroup,
  ToggleGroupItem,
} from 'src/components/Common/ToggleGroup';
import { Button } from 'src/components/Common/Button';
import { GetServerSidePropsContext } from 'next';
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  DropdownLink,
  DropdownItem,
} from 'src/components/Common/Dropdown';
import {
  AlertIcon,
  CheckIcon,
  CrossIcon,
  EditIcon,
  ThreeDotsIcon,
} from 'src/icons';
import {
  Overlay,
  OverlayTrigger,
  OverlayContent,
  OverlayClose,
} from 'src/components/Common/Overlay';
import Link from 'next/link';

const tags = [
  'Kirschtomaten',
  'Möhren',
  'Erdbeeren',
  'Ingwer',
  'vegetarische Salami',
  'Barista',
  'Roggenmischbrot',
  'Samba',
  'Gurke',
  'Parmesan',
  'Olivenöl',
  'Mayonaise',
  'Apfel-Zwiebel Aufstrich',
];

export default function Page() {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [activeTag, setActiveTag] = useState('Samba');

  return (
    <Box
      p="4"
      pb="24"
      pt="24"
      css={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Stack space="4">
        <Text size="xxlarge">Styles</Text>
      </Stack>
      <Box mt="12" pb="12">
        <Stack space="12">
          <Box>
            <Stack space="4">
              <Text italic>Colors</Text>
              <Inline space="1">
                <ColorSwatch
                  css={{
                    $$color: '$colors$blueDark',
                  }}
                />
                <ColorSwatch
                  css={{
                    $$color: '$colors$blue',
                  }}
                />
                <ColorSwatch
                  css={{
                    $$color: '$colors$blue200',
                  }}
                />
                <ColorSwatch
                  css={{
                    $$color: '$colors$blue100',
                  }}
                />
                <ColorSwatch
                  css={{
                    $$color: '$colors$blue50',
                  }}
                />
              </Inline>
              <Inline space="1">
                <ColorSwatch
                  css={{
                    $$color: 'black',
                  }}
                />
                <ColorSwatch
                  css={{
                    $$color: '$colors$black600',
                  }}
                />
                <ColorSwatch
                  css={{
                    $$color: '$colors$black300',
                  }}
                />
                <ColorSwatch
                  css={{
                    $$color: '$colors$black100',
                  }}
                />
                <ColorSwatch
                  css={{
                    $$color: '$colors$black50',
                  }}
                />
              </Inline>
              <Inline>
                <ColorSwatch
                  css={{
                    $$color: '$colors$green',
                  }}
                />
              </Inline>
            </Stack>
          </Box>
          <Box>
            <Stack space="4">
              <Text italic>Buttons</Text>
              <Inline space="2">
                <Button>Default Button</Button>
                <Button disabled>Default Button</Button>
              </Inline>
              <Inline space="2">
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="secondary" disabled>
                  Secondary Button
                </Button>
              </Inline>
              <Stack space="1">
                <Inline space="2">
                  <Button variant="icon">Icon Button</Button>
                  <Button variant="icon" disabled>
                    Icon Button
                  </Button>
                </Inline>
              </Stack>
              <Inline space="2">
                <Button variant="hero">Hero Button</Button>
                <Button variant="hero" disabled>
                  Hero Button
                </Button>
              </Inline>
              <Inline space="2">
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="ghost" disabled>
                  Default Ghost Button
                </Button>
              </Inline>
              <Inline space="2">
                <Button variant="ghost-dark">Ghost Dark Button</Button>
                <Button variant="ghost-dark" disabled>
                  Ghost Button
                </Button>
              </Inline>
            </Stack>
          </Box>
          <Box>
            <Stack space="4">
              <Text italic>TextField</Text>
              <Stack space="2">
                <TextField />
                <TextField value="Disabled" disabled />
                <TextField placeholder="Placeholdertext" label="Labeltext" />
                <TextField
                  placeholder="Clearable"
                  value={textFieldValue}
                  onChange={e => setTextFieldValue(e.target.value)}
                  onClear={() => setTextFieldValue('')}
                />
              </Stack>
            </Stack>
          </Box>
          <Box>
            <Stack space="4">
              <Text italic>Toggle Group</Text>
              <ToggleGroup
                type="single"
                defaultValue="center"
                aria-label="Text alignment"
              >
                <ToggleGroupItem value="left" aria-label="Left aligned">
                  Left
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Center aligned">
                  Center
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Right aligned">
                  Right
                </ToggleGroupItem>
              </ToggleGroup>
            </Stack>
          </Box>
          <Box>
            <Stack space="4">
              <Text italic>Button Tags</Text>
              <Inline space="2">
                {tags.map((tag, i) => (
                  <ButtonTag
                    key={i}
                    variant={i > 6 ? 'ai' : undefined}
                    isActive={tag === activeTag}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </ButtonTag>
                ))}
              </Inline>
            </Stack>
          </Box>
          <Box>
            <Stack space="4">
              <Text italic>Notifications, Dialogs, Dropdown & Popover</Text>
              <Inline space="1">
                <ToastDemo />
                <FailToastDemo />
                <DialogDemo />
                <PopverDemo />
                <OverlayDemo />
                <DropdownMenuDemo />
              </Inline>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

const ColorSwatch = styled(Box, {
  width: 32,
  height: 32,
  borderRadius: '6px',
  bg: '$$color',
});

const ToastDemo = () => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      <Button
        variant="icon"
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, 100);
        }}
      >
        Show Notification
      </Button>
      <Toast open={open} onOpenChange={setOpen}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex gap="2" css={{ mt: '$3' }}>
              <Flex css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}>
                <CheckIcon />
              </Flex>
              Zur Story &quot;Meine neue lange Story&quot; hinzugefügt
            </Flex>
          </ToastDescription>
          <Box css={{ pt: '6px', flexShrink: 0 }}>
            <ToastAction asChild altText="Close">
              <Button variant="ghost-blue">
                <Flex css={{ display: 'inline-flex' }}>
                  <CrossIcon />
                </Flex>
              </Button>
            </ToastAction>
          </Box>
        </Flex>

        <Flex justifyContent="flex-end" css={{ pr: '$3', mt: '$2' }}>
          <Link href="/styles" onClick={() => setOpen(false)}>
            <Flex
              alignItems="center"
              css={{
                px: '$3',
                py: '6px',
                border: '1px solid',
                borderColor: '$blue50',
                borderRadius: '$1',
              }}
            >
              <Flex css={{ display: 'inline-flex', mr: '$1' }}>
                <EditIcon width="14px" height="14px" />
              </Flex>
              <Text size="xsmall">Story bearbeiten</Text>
            </Flex>
          </Link>
        </Flex>
      </Toast>
    </>
  );
};

const FailToastDemo = () => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      <Button
        variant="icon"
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, 100);
        }}
      >
        Show Error
      </Button>
      <Toast open={open} onOpenChange={setOpen}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex gap="2" css={{ mt: '$3' }}>
              <Flex css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}>
                <AlertIcon />
              </Flex>
              <Box>
                Konnte nicht zur Story “Der Soldat Julius Steinhäuser”
                hinzugefügt werden.
                <Box mt="2">Bitte versuchen sie es später erneut.</Box>
              </Box>
            </Flex>
          </ToastDescription>
          <Box css={{ pt: '6px', flexShrink: 0 }}>
            <ToastAction asChild altText="Close">
              <Button variant="ghost-blue">
                <Flex css={{ display: 'inline-flex' }}>
                  <CrossIcon />
                </Flex>
              </Button>
            </ToastAction>
          </Box>
        </Flex>
      </Toast>
    </>
  );
};

const DialogCloseButton = styled(Button, {
  position: 'absolute',
  top: 10,
  right: 10,
});

const DialogDemo = () => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="icon">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
          <Flex css={{ marginTop: '20', justifyContent: 'flex-end' }}>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setOpen(false);
                  window.clearTimeout(timerRef.current);
                  timerRef.current = window.setTimeout(() => {
                    setOpen(true);
                  }, 100);
                }}
              >
                Save changes
              </Button>
            </DialogClose>
          </Flex>
          <DialogClose asChild>
            <DialogCloseButton aria-label="Close" variant="ghost-dark">
              Close
            </DialogCloseButton>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>✅ Changes saved successfully</ToastTitle>
        <ToastDescription>Description</ToastDescription>
        <ToastAction asChild altText="Close Notification">
          <Button variant="icon">Close</Button>
        </ToastAction>
      </Toast>
    </>
  );
};

const PopverDemo = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="icon">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={2}>
        <Box
          css={{
            padding: '20px 10px',
          }}
        >
          <Text>Popver Content</Text>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

const DropdownMenuDemo = () => {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="ghost">
          <Box>
            <ThreeDotsIcon />
          </Box>
        </Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>
          <DropdownLink href="/">
            <Box mr="2" css={{ display: 'inline-flex' }}>
              <EditIcon />
            </Box>
            <Text>Start</Text>
          </DropdownLink>
        </DropdownItem>
        <DropdownItem>
          <DropdownLink href="/styles">
            <Text>Styles</Text>
          </DropdownLink>
        </DropdownItem>
        <DropdownItem disabled>
          <DropdownLink href="/stories">
            <Text>Stories</Text>
          </DropdownLink>
        </DropdownItem>
        <DropdownItem>
          <DropdownLink href="/favorites">
            <Text>Favorites</Text>
          </DropdownLink>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

const OverlayDemo = () => {
  const [activeTag, setActiveTag] = useState('');
  return (
    <Overlay>
      <OverlayTrigger asChild>
        <Button variant="icon">Open Overlay</Button>
      </OverlayTrigger>
      <OverlayContent>
        <Box px="4" py="4">
          <Flex justifyContent="flex-end">
            <OverlayClose asChild>
              <Button variant="ghost">
                <CrossIcon aria-hidden="true" />
              </Button>
            </OverlayClose>
          </Flex>
          <Box mt="4">
            <Stack space="8">
              <Text as="h2" size="large" weight="bold">
                Artefakte Schnarfelakte
              </Text>
              <Stack space="4">
                {tags.map((tag, i) => (
                  <ButtonTag
                    key={i}
                    isActive={tag === activeTag}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </ButtonTag>
                ))}
                {tags.map((tag, i) => (
                  <ButtonTag
                    key={i}
                    isActive={tag === activeTag}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </ButtonTag>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Box>
      </OverlayContent>
    </Overlay>
  );
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
