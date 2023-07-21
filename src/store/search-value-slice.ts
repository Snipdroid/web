import { Slice } from '.';

export interface SearchValueSlice {
  searchValue: string;
  setSearchValue: (val: string) => void;
}

export const createSearchValueSlice: Slice<SearchValueSlice> = (set) => {
  return {
    searchValue: '',
    setSearchValue: (val: string) => {
      set(() => ({ searchValue: val }));
    },
  };
};
