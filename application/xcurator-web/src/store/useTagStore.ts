import { SearchTag, SearchTagInput } from 'src/graphql/_generated/types';
import { create } from 'zustand';

interface State {
  canvasTags: { tag: SearchTag; isSelected: boolean }[];
  filteredTags: SearchTagInput[];
  tagId: string;
  tagImage: string;
}

interface Actions {
  toggleTag: (tag: SearchTag) => void;
  resetTags: () => void;
  deselectTags: () => void;
  filterByTags: (tags: { tag: SearchTag; isSelected: boolean }[]) => void;
  updateArtefact: (id: string, image: string) => void;
}

const initialState: State = {
  canvasTags: [],
  filteredTags: [],
  tagId: '',
  tagImage: '',
};

export const useTagStore = create<State & Actions>(set => ({
  ...initialState,
  toggleTag: tag => {
    set(state => ({
      canvasTags: state.canvasTags.map(t =>
        t.tag.literal === tag.literal ? { ...t, isSelected: !t.isSelected } : t
      ),
    }));
  },
  deselectTags: () => {
    set(state => ({
      canvasTags: state.canvasTags.map(t => ({ ...t, isSelected: false })),
      filteredTags: [],
    }));
  },
  resetTags: () => {
    set({
      ...initialState,
    });
  },
  updateArtefact: (id, image) => {
    set({
      tagId: id,
      tagImage: image,
    });
  },
  filterByTags: tags => {
    set({
      canvasTags: tags,
      filteredTags: tags.reduce<SearchTagInput[]>((acc, current) => {
        if (current.isSelected)
          acc.push({
            literal: current.tag.literal,
            type: current.tag.type,
          });
        return acc;
      }, []),
    });
  },
}));
