import { api } from '@/lib/api';
import { Movie, MovieResponse } from '@/features/types/Movie';

export const getNowPlaying = async (): Promise<Movie[]> => {
  const { data } = await api.get<MovieResponse>('/movie/now_playing');
  return data.results;
};

export const getTranding = async (): Promise<Movie[]> => {
    const { data } = await api.get<MovieResponse>('/trending/movie/day');
    return data.results;
};

export const getPopular = async (): Promise<Movie[]> => {
    const { data } = await api.get<MovieResponse>('/movie/popular');
    return data.results;
}