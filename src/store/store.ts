import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CounterSlice, createCounterSlice } from './counter-slice';
import { SearchValueSlice, createSearchValueSlice } from './search-value-slice';

type Store = CounterSlice & SearchValueSlice;

export const useBaseStore = create<Store>()(
  devtools((...a) => ({
    ...createCounterSlice(...a),
    ...createSearchValueSlice(...a),
  }))
);
