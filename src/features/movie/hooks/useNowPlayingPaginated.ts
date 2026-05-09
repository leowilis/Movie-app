import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { MovieResponse } from '@/features/types/Movie';

// Fetches a paginated list of movies currently playing in theaters.
const getNowPlayingPaginated = async (page: number): Promise<MovieResponse> => {
  const { data } = await api.get<MovieResponse>('/movie/now_playing', {
    params: { page },
  });
  return data;
};

/**
 * Custom hook for managing infinite scroll/paginated data for the Now Playing domain.
 * Leverages TanStack Query's automated cache management and pagination logic to provide a seamless "Load More" experience.
 */
export const useNowPlayingPaginated = () =>
  useInfiniteQuery<MovieResponse, Error>({
    queryKey: ['now-playing-paginated'],
    queryFn: ({ pageParam }) => getNowPlayingPaginated(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
