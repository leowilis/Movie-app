import { useQuery } from "@tanstack/react-query";
import { MovieDetail } from "@/features/types/Movie";
import { getMovieById } from '@/services/movieService';

export const useMovieDetail = (id: string) =>
  useQuery<MovieDetail>({
    queryKey: ['movie-detail', id],
    queryFn: () => getMovieById(id),
    enabled: !!id,
  });
