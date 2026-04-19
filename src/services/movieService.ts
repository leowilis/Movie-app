import { api } from '@/lib/api';
import {
  Movie,
  MovieCredits,
  MovieDetail,
  MovieResponse,
  Video,
} from '@/features/types/Movie';

export const getNowPlaying = async (): Promise<Movie[]> => {
  const { data } = await api.get<MovieResponse>('/movie/now_playing');
  return data.results;
};

export const getTrending = async (): Promise<Movie[]> => {
  const { data } = await api.get<MovieResponse>('/trending/movie/day');
  return data.results;
};

export const getPopular = async (): Promise<Movie[]> => {
  const { data } = await api.get<MovieResponse>('/movie/popular');
  return data.results;
};

export const getMovieVideos = async (id: string): Promise<Video[]> => {
  const { data } = await api.get<{ results: Video[] }>(`/movie/${id}/videos`);
  return data.results.filter(
    (v) => v.site === 'YouTube' && v.type === 'Trailer',
  );
};

export const getNewRelease = async (): Promise<Movie[]> => {
  const { data } = await api.get<MovieResponse>('/movie/now_playing');
  return data.results;
};

export const getMovieById = async (id: string): Promise<MovieDetail> => {
  const { data } = await api.get<MovieDetail>(`/movie/${id}`);
  return data;
};

export const getMovieCredits = async (id: string): Promise<MovieCredits> => {
  const { data } = await api.get<MovieCredits>(`/movie/${id}/credits`);
  return data;
};
