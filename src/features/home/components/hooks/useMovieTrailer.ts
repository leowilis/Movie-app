import { useQuery } from '@tanstack/react-query'
import { getMovieVideos } from '@/services/movieService'
import type { Video } from '@/features/types/Movie'

export const useMovieTrailer = (id: string) =>
  useQuery<Video[], Error, Video | undefined>({
    queryKey: ['movie-trailer', id],
    queryFn: () => getMovieVideos(id),
    enabled: !!id,
    select: (data) => data[0],
  })