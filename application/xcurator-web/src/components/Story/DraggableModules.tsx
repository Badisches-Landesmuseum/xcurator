import * as React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { Text } from 'src/components/Common/Text';
import {
  ModuleFragment,
  namedOperations,
  useUpdateModuleMutation,
} from 'src/graphql/_generated/types';
import { Box, Flex, styled } from '@3pc/layout-components-react';
import ModuleDropdown from 'src/components/Story/ModuleDropdown';
import ModuleContent from './ModuleContent';
import { DragIcon } from 'src/icons';

type DraggableModulesProps = {
  modules: ModuleFragment[];
  storyId: string;
};

export default function DraggableModules({
  modules,
  storyId,
}: DraggableModulesProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [updateModule] = useUpdateModuleMutation();
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (
      active.data.current?.sortable.index !== over?.data.current?.sortable.index
    ) {
      updateModule({
        variables: {
          update: {
            moduleId: active.id.toString(),
            storyId: storyId,
            index: over?.data.current?.sortable.index + 1,
          },
        },
        refetchQueries: [namedOperations.Query.Story],
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      {modules.length > 0 && (
        <Box mt="4" px={{ '@initial': 5, '@bp2': 10 }}>
          <SortableContext
            items={modules.map(module => module.id)}
            strategy={verticalListSortingStrategy}
          >
            {modules.map(module => (
              <Box
                key={module.id}
                mt={{ '@initial': 5, '@bp2': 10 }}
                pt={{ '@initial': 2, '@bp2': 10 }}
                css={{ borderTop: '1px solid', borderColor: '$blue' }}
              >
                <Module storyId={storyId} module={module} modules={modules} />
              </Box>
            ))}
          </SortableContext>
        </Box>
      )}
    </DndContext>
  );
}

type ModuleProps = {
  storyId: string;
  module: ModuleFragment;
  modules: ModuleFragment[];
};

function Module({ storyId, module, modules }: ModuleProps) {
  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
    attributes,
    listeners,
  } = useSortable({
    id: module.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      css={{
        position: 'relative',
        backgroundColor: '$background',
        zIndex: isDragging ? 1 : 0,
      }}
      style={style}
      ref={setNodeRef}
    >
      <Flex
        flexDirection={{ '@initial': 'column', '@bp2': 'row' }}
        gap={{ '@initial': 1, '@bp2': 10 }}
        css={{ position: 'relative' }}
        alignItems={{ '@bp2': 'flex-start' }}
      >
        <Flex
          alignItems="center"
          css={{ minHeight: '28px', '@bp2': { minHeight: 'unset' } }}
        >
          <Box {...attributes} {...listeners}>
            <DragButton>
              <DragIcon aria-hidden="true" />
            </DragButton>
          </Box>
        </Flex>
        <Box
          css={{
            '@bp2': {
              flexGrow: 1,
            },
          }}
        >
          <ModuleContent artefacts={module.artefacts} />
        </Box>
        <Box
          css={{
            position: 'absolute',
            top: 0,
            right: 0,

            '@bp2': {
              position: 'relative',
              top: 'unset',
              right: 'unset',
            },
          }}
        >
          <ModuleDropdown
            storyId={storyId}
            moduleId={module.id}
            modules={modules}
          />
        </Box>
      </Flex>

      {module.thought ? (
        <Box
          mt={{ '@initial': 4, '@bp2': 5, '@bp3': 10 }}
          css={{
            backgroundColor: '$black50',
            px: '6px',
            py: '8px',
            borderRadius: '$1',

            '@bp2': {
              mx: 'calc($10 + 22.3px)',
              px: '$10',
              py: '$5',
            },

            '@bp3': {
              mx: 'auto',
              maxWidth: '800px',
            },
          }}
        >
          <Text>{module.thought}</Text>
        </Box>
      ) : null}
    </Box>
  );
}

const DragButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  px: '$1',
  opacity: 0.5,
  transition: 'opacity 150ms ease-in',
  cursor: 'grab',

  '&:hover': {
    opacity: '1 !important',
  },
});
