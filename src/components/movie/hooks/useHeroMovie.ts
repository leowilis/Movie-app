import { useQuery } from '@tanstack/react-query'
import { getNowPlaying } from '@/services/movieService';

const useHeroMovie = () => {
  return useQuery({
    queryKey: ['hero-movie'],
    queryFn: async () => {
      const movies = await getNowPlaying();
      return movies[0];
    },
  });
};

export default useHeroMovie;
