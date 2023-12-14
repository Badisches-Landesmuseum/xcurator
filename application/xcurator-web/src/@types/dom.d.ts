export interface EntityDetails {
  links: {
    source: string;
    id: string;
    url: string;
  }[];
  startPosition: number;
  endPosition: number;
  property: string;
}

interface CustomEventMap {
  entityDetails: CustomEvent<EntityDetails>;
}

declare global {
  interface Window {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Window, ev: CustomEventMap[K]) => unknown,
      useCapture?: boolean
    ): void;
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Window, ev: CustomEventMap[K]) => unknown,
      useCapture?: boolean
    ): void;
  }
}
export {};
