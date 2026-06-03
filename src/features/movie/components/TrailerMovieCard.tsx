import { useNavigate } from 'react-router';
import { Movie } from '@/features/types/Movie';
import { Skeleton } from '@/features/ui/Skeleton';
import StarRating from '@/features/ui/icons/StarRating';
import MovieImage from '@/features/ui/MovieImage';
import MovieCardPopup from '@/features/movie/components/MovieCardPopup';
import { useCardPopup } from '@/features/movie/hooks/useCardPopup';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

interface TrailerMovieCardProps {
  movie: Movie;
}

/**
 * TrailerMovieCard renders a standard poster card that triggers
 * a Netflix-style popup on hover via MovieCardPopup portal.
 */
export default function TrailerMovieCard({ movie }: TrailerMovieCardProps) {
  const navigate = useNavigate();
  const {
    cardRef,
    isOpen,
    position,
    handleMouseEnter,
    handleMouseLeave,
    handlePopupMouseEnter,
    handlePopupMouseLeave,
  } = useCardPopup();

  return (
    <>
      <div
        ref={cardRef}
        onClick={() => navigate(`/movie/${movie.id}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='group cursor-pointer active:scale-95 transition-transform duration-200'
      >
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
        </div>

        <div className='px-1'>
          <p className='text-sm font-semibold text-white line-clamp-1 mb-1'>
            {movie.title}
          </p>
          <StarRating rating={movie.vote_average} />
        </div>
      </div>

      <MovieCardPopup
        movie={movie}
        isOpen={isOpen}
        position={position}
        onMouseEnter={handlePopupMouseEnter}
        onMouseLeave={handlePopupMouseLeave}
      />
    </>
  );
}