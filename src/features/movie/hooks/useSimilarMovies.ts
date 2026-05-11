import { Movie, MovieResponse } from '@/features/types/Movie';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const getSimilarMovies = async (id: string): Promise<Movie[]> => {
  const { data } = await api.get<MovieResponse>(`/movie/${id}/similar`);
  return data.results;
};

/**
 * Fetches a list of movies similar to the given movie ID.
 * Query is disabled when no ID is provided.
 */
export const useSimilarMovies = (id: string) =>
  useQuery<Movie[], Error>({
    queryKey: ['similar-movies', id],
    queryFn: () => getSimilarMovies(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
