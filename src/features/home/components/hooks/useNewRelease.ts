import { getNewRelease } from '@/services/movieService';
import { useQuery } from '@tanstack/react-query';

export const useNewRelease = () => {
  return useQuery({
    queryKey: ['new-release'],
    queryFn: getNewRelease,
  });
};
