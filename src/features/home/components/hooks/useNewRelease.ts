import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Movie, MovieResponse } from '@/features/types/Movie';

// Fetches a paginated list of movies currently playing in theaters
const getNewRelease = async (page: number): Promise<MovieResponse> => {
  const { data } = await api.get<MovieResponse>('/movie/now_playing', {
    params: { page },
  });
  return data;
};

/**
 * Custom hook for managing infinite scroll data for New Release movies.
 * Uses TanStack Query's useInfiniteQuery to handle automated pagination and cache management for large data sets.
 * The infinite query result object containing pages, loading, and fetchNextPage states.
 */
export const useNewRelease = () =>
  useInfiniteQuery<MovieResponse, Error>({
    queryKey: ['new-release'],
    queryFn: ({ pageParam }) => getNewRelease(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
