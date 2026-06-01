import { useNavigate } from 'react-router';
import { Movie } from '@/features/types/Movie';
import StarRating from '@/features/ui/icons/StarRating';
import FavoriteButton from '@/features/ui/icons/Favorites';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import PlayIcon from '@/assets/play-icon/play.svg';
import MovieImage from '@/features/ui/MovieImage';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

interface SearchResultCardProps {
  /** The core movie domain object containing API metadata payloads */
  movie: Movie;
}

/**
 * SearchResultCard displays a movie poster, metadata, and action buttons.
 * Adapts layout between mobile (stacked) and desktop (inline) viewports.
 */
export default function SearchResultCard({ movie }: SearchResultCardProps) {
  const navigate = useNavigate();

  // Connects to the global state store to intercept personal collection bookmarks
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const favorite = isFavorite(movie.id);

  // Primary route event handler to open up the main movie profile detail workspace
  const handleNavigate = () => navigate(`/movie/${movie.id}`);

  // Safe click interceptor handling navigation requests without triggering parent layout traps
  const handleGoToDetail = (e: React.MouseEvent) => {
    e.stopPropagation(); // Halts bubbling up to the card wrapper's navigation trigger
    navigate(`/movie/${movie.id}`);
  };

  /**
   * Synchronizes localized card interactions directly with persistent store states.
   * Isolates bubble sequences from card wrappers.
   */
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents event leakage to ensure parent onClick isn't executed
    if (favorite) removeFavorite(movie.id);
    else addFavorite(movie);
  };

  return (
    <div
      onClick={handleNavigate}
      className='group relative cursor-pointer transition-colors duration-200 hover:bg-white/[0.03] active:scale-[0.99]'
    >
      {/* Top Section: Media Asset Container + Fluid Meta Column */}
      <div className='flex gap-4 p-4 md:gap-8 md:py-6 md:px-0'>
        {/* Poster Canvas Frame (Enforces 2:3 aspect constraints) */}
        <div className='h-[170px] w-[114px] md:h-[220px] md:w-[150px] shrink-0 rounded-xl overflow-hidden bg-zinc-900'>
          <MovieImage
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className='w-full h-full'
          />
        </div>

        {/* Info Area: Dynamically bound typography scales */}
        <div className='flex-1 flex flex-col justify-between py-0.5 min-w-0'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-white text-lg md:text-2xl font-bold leading-snug line-clamp-2 pr-10'>
              {movie.title}
            </h3>
            <StarRating rating={movie.vote_average} />
          </div>

          <p className='text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-3 mt-3 md:max-w-2xl'>
            {movie.overview || 'No description available.'}
          </p>

          {/* Desktop Adaptive Core: Displayed inline within meta columns only */}
          <div className='hidden md:flex items-center gap-3 mt-5'>
            <button
              onClick={handleGoToDetail}
              className='flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-full px-6 py-2 transition-colors duration-150'
            >
              <span className='text-white text-sm font-semibold tracking-wide'>
                Watch Trailer
              </span>
              <img
                src={PlayIcon}
                className='w-5 h-5'
                alt=''
                aria-hidden='true'
              />
            </button>
            <div
              className='absolute top-3 right-3 z-10 md:top-5 md:right-6'
              onClick={handleFavoriteClick}
            >
              <FavoriteButton isFavorite={favorite} onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Adaptive Core: Isolated bottom layout block */}
      <div className='flex md:hidden items-center gap-2.5 px-3 pb-3 md:px-0'>
        <button
          onClick={handleGoToDetail}
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

      {/* Structural Visual Divider System */}
      <div className='mx-3 md:mx-0 my-5 border-b border-white/10' />
    </div>
  );
}
