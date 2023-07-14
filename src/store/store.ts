import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CounterSlice, createCounterSlice } from './counter-slice'

type Store = CounterSlice

export const useBaseStore = create<Store>()(
  devtools((...a) => ({
    ...createCounterSlice(...a),
  }))
)
