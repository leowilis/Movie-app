import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Movie } from '@/features/types/Movie';
import { Skeleton } from '@/features/ui/Skeleton';
import StarRating from '@/features/ui/icons/StarRating';
import MovieImage from '@/features/ui/MovieImage';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

interface MovieCardProps {
  movie: Movie;
}

/**
 * MovieCard displays a movie poster with its title and rating.
 * Navigates to the movie detail page on click.
 * Includes a skeleton placeholder while the poster image is loading.
 */
export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className='group shrink-0 w-[200px] cursor-pointer active:scale-95 transition-transform duration-200'
    >
      {/* Poster */}
      <div className='h-[300px] w-[200px] rounded-lg overflow-hidden bg-zinc-900 mb-4'>
        {movie.poster_path ? (
          <MovieImage
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className='w-full h-full group-hover:scale-105 transition-transform duration-300'
          />
        ) : (
          <Skeleton className='w-full h-full' />
        )}
      </div>

      {/* Title + Rating */}
      <div className='px-1'>
        <p className='text-sm font-semibold text-white line-clamp-1 mb-1'>
          {movie.title}
        </p>
        <StarRating rating={movie.vote_average} />
      </div>
    </div>
  );
}
