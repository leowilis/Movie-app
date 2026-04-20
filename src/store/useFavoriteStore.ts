import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '@/features/types/Movie';

interface FavoriteStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => ({ favorites: [...state.favorites, movie] })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((m) => m.id === id),
    }),
    { name: 'favorites' },
  ),
);
