'use client';

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
 * SearchResultCard Component
 *
 * A high-fidelity, production-ready card component designed for search results
 * and favorite collection listings.
 *
 * Technical Features & Design Patterns:
 * 1. **Responsive Responsive Adaptability**: Conditionally re-orchestrates layouts via `hidden md:flex`
 *    and `flex md:hidden` media triggers to reposition action targets depending on viewport limits.
 *    - Mobile view targets: Bottom-anchored button layout pattern.
 *    - Widescreen view targets: Inlined layout structure inside meta columns.
 * 2. **Event Bubble Isolation**: Leverages strict programmatic `e.stopPropagation()` triggers
 *    to fully block structural button events from bleeding through to card-level route overrides.
 * 3. **Global Synchronization**: Binds directly with `useFavoriteStore` to drive live, optimistic UI updates
 *    across multiple separate feature pages concurrently.
 * 4. **Aspect Ratio Enforcement**: Maps rigid pixel boundaries (`h-[170px] w-[114px]` and `md:h-[200px] md:w-[134px]`)
 *    to preserve the standard 2:3 theatrical poster canvas and block Cumulative Layout Shifts (CLS).
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
      className='mb-3 overflow-hidden active:scale-[0.99] transition-transform duration-150 cursor-pointer relative'
    >
      {/* Top Section: Media Asset Container + Fluid Meta Column */}
      <div className='flex gap-3 p-3 md:gap-6 md:p-4'>
        {/* Poster Canvas Frame (Enforces 2:3 aspect constraints) */}
        <div className='h-[170px] w-[114px] md:h-[200px] md:w-[134px] shrink-0 rounded-md overflow-hidden bg-zinc-800'>
          <MovieImage
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className='w-full h-full'
          />
        </div>

        {/* Info Area: Dynamically bound typography scales */}
        <div className='flex-1 flex flex-col justify-between py-0.5 min-w-0'>
          <div>
            <h3 className='text-white text-lg md:text-xl font-semibold leading-snug line-clamp-2 mb-1.5'>
              {movie.title}
            </h3>
            <StarRating rating={movie.vote_average} />
          </div>

          <p className='text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-3 mt-2'>
            {movie.overview || 'No description available.'}
          </p>

          {/* Desktop Adaptive Core: Displayed inline within meta columns only */}
          <div className='hidden md:flex items-center gap-3 mt-4'>
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
            className='absolute top-3 right-3 z-10'
            onClick={handleFavoriteClick}>
              <FavoriteButton isFavorite={favorite} onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Adaptive Core: Isolated bottom layout block */}
      <div className='flex md:hidden items-center gap-2.5 px-3 pb-3'>
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
      <div className='mx-3 md:mx-4 my-5 border-b border-white/10' />
    </div>
  );
}
