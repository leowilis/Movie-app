import { useQuery } from '@tanstack/react-query';
import { Video } from '@/features/types/Movie';
import { getMovieVideos } from '@/services/movieService';

/**
 * Fetches the first available YouTube trailer for a movie by its ID.
 * Returns undefined if no trailer is found.
 * Query is disabled when no ID is provided.
 */
export const useMovieTrailer = (id: string) =>
  useQuery<Video[], Error, Video | undefined>({
    queryKey: ['movie-trailer', id],
    queryFn: () => getMovieVideos(id),
    enabled: !!id,
    select: (data) => data[0],
  });
