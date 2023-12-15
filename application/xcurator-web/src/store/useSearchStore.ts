import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface State {
  query: string;
  randomQuery: boolean;
}

interface Actions {
  updateQuery: (query: string) => void;
  updateRandomQuery: (random: boolean) => void;
}

const initialState: State = {
  query: '',
  randomQuery: true,
};

export const useSearchStore = create(
  persist<State & Actions>(
    set => ({
      ...initialState,
      updateQuery: query => {
        set({
          query: query,
        });
      },
      updateRandomQuery: random => {
        set({
          randomQuery: random,
        });
      },
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
