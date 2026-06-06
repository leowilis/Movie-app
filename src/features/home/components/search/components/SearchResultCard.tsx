import { useNavigate } from 'react-router';
import { Movie } from '@/features/types/Movie';
import StarRating from '@/features/ui/icons/StarRating';
import FavoriteButton from '@/features/ui/icons/Favorites';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import PlayIcon from '@/assets/play-icon/play.svg';
import MovieImage from '@/features/ui/MovieImage';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

interface SearchResultCardProps {
  movie: Movie;
}

/**
 * SearchResultCard displays a movie poster, title, rating, overview,
 * and action buttons. Layout adapts between mobile (stacked) and desktop (inline).
 */
export default function SearchResultCard({ movie }: SearchResultCardProps) {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const favorite = isFavorite(movie.id);

  const handleNavigate = () => navigate(`/movie/${movie.id}`);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) removeFavorite(movie.id);
    else addFavorite(movie);
  };

  return (
    <div
      onClick={handleNavigate}
      className='group relative cursor-pointer overflow-hidden transition-colors duration-200 hover:bg-white/[0.03] active:scale-[0.99]'
    >
      <div className='flex gap-4 p-4 md:gap-8 md:p-6'>
        {/* Poster */}
        <div className='h-[170px] w-[114px] md:h-[220px] md:w-[150px] shrink-0 rounded-xl overflow-hidden bg-zinc-900'>
          <MovieImage
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className='w-full h-full'
          />
        </div>

        {/* Metadata */}
        <div className='flex-1 flex flex-col justify-between py-0.5 min-w-0'>
          <div className='flex items-start justify-between gap-2'>
            <div className='flex flex-col gap-2 min-w-0'>
              <h3 className='text-white text-lg md:text-2xl font-bold leading-snug line-clamp-2'>
                {movie.title}
              </h3>
              <StarRating rating={movie.vote_average} />
            </div>

            {/* Favorite — desktop only, inline with title */}
            <div className='hidden md:block shrink-0' onClick={handleFavoriteClick}>
              <FavoriteButton isFavorite={favorite} onClick={() => {}} />
            </div>
          </div>

          <p className='text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-3 mt-3 md:max-w-2xl'>
            {movie.overview || 'No description available.'}
          </p>

          {/* Desktop actions */}
          <div className='hidden md:flex items-center gap-3 mt-5'>
            <button
              onClick={handleNavigate}
              className='flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-full px-6 py-2 transition-colors duration-150'
            >
              <span className='text-white text-sm font-semibold tracking-wide'>
                Watch Trailer
              </span>
              <img src={PlayIcon} className='w-5 h-5' alt='' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile actions */}
      <div className='flex md:hidden items-center gap-2.5 px-3 pb-3'>
        <button
          onClick={handleNavigate}
          className='flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-full py-2.5 transition-colors duration-150'
        >
          <span className='text-white text-xs font-semibold tracking-wide'>
            Watch Trailer
          </span>
          <img src={PlayIcon} className='w-6 h-6' alt='' aria-hidden='true' />
        </button>
        <div onClick={handleFavoriteClick}>
          <FavoriteButton isFavorite={favorite} onClick={() => {}} />
        </div>
      </div>

      <div className='mx-3 md:mx-6 my-5 border-b border-white/10' />
    </div>
  );
}