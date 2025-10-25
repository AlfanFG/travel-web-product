import { create } from "zustand";

interface ILoadingStore {
  isLoading: boolean;

  loading: (loading: boolean) => void;
}

const useLoading = create<ILoadingStore>()((set) => ({
  isLoading: false, // Initialize 'open' with a default boolean value
  loading: (loading: boolean) => set(() => ({ isLoading: loading })),
}));

export const useGetLoading = () => useLoading((state) => state.isLoading);

export const useSetLoading = () => useLoading((state) => state.loading);
