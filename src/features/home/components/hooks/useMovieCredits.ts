import { useQuery } from '@tanstack/react-query';
import { MovieCredits } from '@/features/types/Movie';
import { getMovieCredits } from '@/services/movieService';

export const useMovieCredits = (id: string) =>
  useQuery<MovieCredits>({
    queryKey: ['movie-credits', id],
    queryFn: () => getMovieCredits(id),
    enabled: !!id,
  });
