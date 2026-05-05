import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Movie, MovieResponse } from '@/features/types/Movie';

// Fetches movie results from the TMDB search endpoint
const searchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await api.get<MovieResponse>('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return data.results;
};

// Custom hook for searching movies with built-in caching and conditional fetching
export const useSearchMovie = (query: string) =>
  useQuery<Movie[]>({
    queryKey: ['search-movie', query],
    queryFn: () => searchMovies(query),
    enabled: query.trim().length > 0, // Prevents empty API calls
    staleTime: 1000 * 60 * 5, // 5 minutes cache duration
  });