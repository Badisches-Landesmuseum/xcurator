import { Box, Flex, styled } from 'src/@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from 'src/components/Common/Dialog';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  DropdownLink,
  DropdownTrigger,
} from 'src/components/Common/Dropdown';
import {
  ModuleFragment,
  namedOperations,
  useDeleteModuleMutation,
  useUnpublishStoryMutation,
} from 'src/graphql/_generated/types';
import { EditIcon, DeleteIcon, CrossIcon, ThreeDotsIcon } from 'src/icons';
import { Button } from 'src/components/Common/Button';
import { useTranslations } from 'next-intl';

type ModuleDropdownProps = {
  storyId: string;
  moduleId: string;
  modules: ModuleFragment[];
};

export default function ModuleDropdown({
  storyId,
  moduleId,
  modules,
}: ModuleDropdownProps) {
  const translate = useTranslations('EditStory');
  const [unpublishStory] = useUnpublishStoryMutation();
  const [deleteModule] = useDeleteModuleMutation({
    refetchQueries: [namedOperations.Query.MyStories],
  });
  return (
    <Dialog>
      <Dropdown>
        <DropdownTrigger asChild>
          <ThreeDotsButton>
            <ThreeDotsIcon />
          </ThreeDotsButton>
        </DropdownTrigger>
        <DropdownContent align="end" sideOffset={4}>
          <DropdownItem>
            <DropdownLink href={`/stories/${storyId}/${moduleId}`}>
              <Box mr="2" css={{ display: 'inline-flex' }}>
                <EditIcon aria-hidden="true" />
              </Box>
              <Text>{translate('edit')}</Text>
            </DropdownLink>
          </DropdownItem>
          <DropdownItem>
            <DialogTrigger asChild>
              <DropdownButton>
                <Flex css={{ display: 'inline-flex', mr: '$2' }}>
                  <DeleteIcon aria-hidden="true" />
                </Flex>
                <Text>{translate('delete')}</Text>
              </DropdownButton>
            </DialogTrigger>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
      <DialogContent small>
        <Box mt="4">
          <Flex justifyContent="flex-end">
            <DialogClose asChild>
              <Button aria-label="Close" variant="icon">
                <CrossIcon aria-hidden="true" width="27px" height="27px" />
              </Button>
            </DialogClose>
          </Flex>
        </Box>
        <Box px="8" pb="6" mt="1" css={{ textAlign: 'center' }}>
          <DialogTitle>{translate('confirmDelete')}</DialogTitle>
          <DialogDescription>{translate('storyDeleted')}</DialogDescription>
          {modules.length === 1 ? (
            <DialogDescription>{translate('lastModule')}</DialogDescription>
          ) : null}
          <Flex justifyContent="center" gap="5">
            <DialogClose asChild>
              <Button variant="ghost-dark">{translate('Cancel')}</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  deleteModule({
                    variables: {
                      delete: {
                        storyId: storyId,
                        moduleId: moduleId,
                      },
                    },
                  });
                  if (modules.length <= 1) {
                    unpublishStory({
                      variables: { where: { id: storyId as string } },
                    });
                  }
                }}
              >
                {translate('delete')}
              </Button>
            </DialogClose>
          </Flex>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

const ThreeDotsButton = styled('button', {
  all: 'unset',
  width: '26px',
  height: '26px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: '$blue100',
  border: '1px solid',
  borderColor: '$blue100',
  color: '$blue',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:hover': {
    borderColor: '$blue',
  },

  '&:active, &[data-state="open"]': {
    borderColor: '$blue',
  },
});
