import { useQuery } from '@tanstack/react-query';
import { MovieCredits } from '@/features/types/Movie';
import { getMovieCredits } from '@/services/movieService';

/**
 * Fetches cast and crew credits for a single movie by its ID.
 * Query is disabled when no ID is provided.
 */
export const useMovieCredits = (id: string) =>
  useQuery<MovieCredits, Error>({
    queryKey: ['movie-credits', id],
    queryFn: () => getMovieCredits(id),
    enabled: !!id,
  });
