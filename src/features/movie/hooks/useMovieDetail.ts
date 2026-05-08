import { useQuery } from '@tanstack/react-query';
import { MovieDetail } from '@/features/types/Movie';
import { getMovieById } from '@/services/movieService';

/**
 * Fetches detailed information for a single movie by its ID.
 * Query is disabled when no ID is provided.
 */
export const useMovieDetail = (id: string) =>
  useQuery<MovieDetail, Error>({
    queryKey: ['movie-detail', id],
    queryFn: () => getMovieById(id),
    enabled: !!id,
  });