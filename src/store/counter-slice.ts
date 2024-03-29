import { Slice } from '.';

export interface CounterSlice {
  count: number;
  inc: () => void;
  dec: () => void;
}

export const createCounterSlice: Slice<CounterSlice> = (set) => {
  return {
    count: 0,
    inc: () => {
      set((state) => ({ count: state.count + 1 }));
    },
    dec: () => {
      set((state) => ({ count: state.count - 1 }));
    },
  };
};
