import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Genre } from '@/features/types/Movie';

const getMovieGenres = async (): Promise<Genre[]> => {
  const { data } = await api.get<{ genres: Genre[] }>('/genre/movie/list');
  return data.genres;
};

/**
 * Fetches the list of official TMDB movie genres.
 * Used for genre filter pills in NowPlayingPage.
 */
export const useMovieGenres = () =>
  useQuery<Genre[], Error>({
    queryKey: ['movie-genres'],
    queryFn: getMovieGenres,
    staleTime: 1000 * 60 * 60, // 1 hour — genres rarely change
  });
