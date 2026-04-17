import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "@/services/movieService";
import { Movie } from "@/features/types/Movie";

export const useNowPlaying = () =>
  useQuery<Movie[]>({
    queryKey: ["now-playing"],
    queryFn: getNowPlaying,
  });