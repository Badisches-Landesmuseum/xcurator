import { Location } from 'src/graphql/_generated/types';
import { create } from 'zustand';

type Color = keyof Messages['Filter']['Colors'];

export interface State {
  locations: Location['name'][];
  colors: Color[];
  epochs: (keyof Messages['Filter']['Epoch'])[];
  materials: (keyof Messages['Filter']['Material'])[];
}

interface Actions {
  toggleLocations: (location: Location['name']) => void;
  toggleColors: (color: Color) => void;
  toggleEpochs: (epoch: keyof Messages['Filter']['Epoch']) => void;
  toggleMaterials: (material: keyof Messages['Filter']['Material']) => void;
  resetFilter: (filter?: State[]) => void;
}

const initialState: State = {
  locations: [],
  colors: [],
  epochs: [],
  materials: [],
};

export const useFilterStore = create<State & Actions>(set => ({
  ...initialState,
  toggleLocations: location => {
    set(state => {
      if (state.locations.some(l => l === location)) {
        return {
          locations: state.locations.filter(l => l !== location),
        };
      } else {
        return {
          locations: [...state.locations, location],
        };
      }
    });
  },
  toggleColors: color => {
    set(state => {
      if (state.colors?.some(c => c === color)) {
        return {
          colors: state.colors.filter(c => c !== color),
        };
      } else {
        return {
          colors: [...state.colors, color],
        };
      }
    });
  },
  toggleEpochs: epoch => {
    set(state => {
      if (state.epochs.some(e => e === epoch)) {
        return {
          epochs: state.epochs.filter(e => e !== epoch),
        };
      } else {
        return {
          epochs: [...state.epochs, epoch],
        };
      }
    });
  },
  toggleMaterials: material => {
    set(state => {
      if (state.materials.some(m => m === material)) {
        return {
          materials: state.materials.filter(m => m !== material),
        };
      } else {
        return {
          materials: [...state.materials, material],
        };
      }
    });
  },
  resetFilter: () => {
    set({
      locations: [],
      colors: [],
      epochs: [],
      materials: [],
    });
  },
}));
