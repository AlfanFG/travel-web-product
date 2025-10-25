import { create } from "zustand";

interface IModalStore {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPageIndex: (number: number) => void;
  setPageSize: (number: number) => void;
}

const usePagination = create<IModalStore>()((set) => ({
  pagination: {
    pageIndex: 1,
    pageSize: 10,
  }, // Initialize 'open' with a default boolean value
  setPageIndex: (value: number) =>
    set((state) => ({
      ...state,
      pagination: {
        ...state.pagination,
        pageIndex: value,
      },
    })),
  setPageSize: (value: number) =>
    set((state) => ({
      ...state,
      pagination: {
        ...state.pagination,
        pageSize: value,
      },
    })),
}));

export const useGetPagination = () =>
  usePagination((state) => state.pagination);

export const usePageIndex = () => usePagination((state) => state.setPageIndex);
export const usePageSize = () => usePagination((state) => state.setPageSize);
