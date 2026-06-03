import { useNavigate } from 'react-router';
import { Movie } from '@/features/types/Movie';
import { Skeleton } from '@/features/ui/Skeleton';
import StarRating from '@/features/ui/icons/StarRating';
import MovieImage from '@/features/ui/MovieImage';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

interface FavoriteMovieCardProps {
  movie: Movie;
  index: number;
}

/**
 * FavoriteMovieCard extends MovieCard with a numbered order badge
 * and a heart indicator to reinforce the favorites context.
 */
export default function FavoriteMovieCard({ movie, index }: FavoriteMovieCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className='group cursor-pointer active:scale-95 transition-transform duration-200'
    >
      {/* Poster */}
      <div className='aspect-[2/3] w-full rounded-lg overflow-hidden bg-zinc-900 mb-3 relative'>
        {movie.poster_path ? (
          <MovieImage
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
        ) : (
          <Skeleton className='w-full h-full' />
        )}

        {/* Number badge — top left */}
        <div className='absolute top-2 left-2 w-6 h-6 rounded-full bg-black/70 border border-white/10 flex items-center justify-center'>
          <span className='text-[10px] font-semibold text-zinc-400'>{index}</span>
        </div>

        {/* Heart badge — top right */}
        <div className='absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600/90 flex items-center justify-center'>
          <svg
            width='11'
            height='11'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='text-white'
            aria-hidden='true'
          >
            <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
          </svg>
        </div>
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