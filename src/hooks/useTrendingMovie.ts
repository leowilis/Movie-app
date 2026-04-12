import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/services/movieService";
import { Movie } from "@/features/types/Movie";


export const useTrendingMovies = () =>
  useQuery<Movie[]>({
    queryKey: ["trending-movies"],
    queryFn: getTrending,
  });