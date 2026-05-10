import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Movie } from '@/features/types/Movie';
import StarRating from '@/features/ui/icons/StarRating';
import FavoriteButton from '@/features/ui/icons/Favorites';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import PlayIcon from '@/assets/play-icon/play.svg';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

interface SearchResultCardProps {
  // The movie domain object containing metadata for rendering
  movie: Movie;
}

/**
 * SearchResultCard Component
 *
 * A high-fidelity card component designed for the search discovery view.
 *
 * Technical Features:
 * -Image Hydration: Synchronizes a pulse skeleton with the actual poster using the onLoad event.
 * -Event Orchestration: Implements stopPropagation on action buttons to prevent parent card navigation.
 * -Global State Sync: Connects directly to the Zustand store for real-time favorite status management.
 * -Visual Hierarchy: Optimized for high information density using line-clamp and responsive geometry.
 */
export default function SearchResultCard({ movie }: SearchResultCardProps) {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  // Global favorite state management
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const favorite = isFavorite(movie.id);

  // Toggles the favorite status without triggering the parent card navigation
  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  // Handles the primary navigation to the movie detail page
  const handleNavigate = () => navigate(`/movie/${movie.id}`);

  // Handles trailer action while isolating the click event from the parent card
  const handleTrailer = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents event bubbling to the parent onClick handler
    navigate(`/movie/${movie.id}`);
  };

  // Handles favorite action while isolating the click event from the parent card
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents event bubbling to the parent onClick handler
    handleToggleFavorite();
  };

  return (
    <div
      onClick={handleNavigate}
      className='mb-3 overflow-hidden active:scale-[0.99] transition-transform duration-150 cursor-pointer'
    >
      {/* Top Section: Media & Primary Metadata */}
      <div className='flex gap-3 p-3'>
        {/* Poster Container */}
        <div className='h-42.5 shrink-0 rounded-md overflow-hidden bg-zinc-800 relative'>
          {!imgLoaded && (
            <div className='absolute inset-0 bg-zinc-700 animate-pulse' />
          )}
          {movie.poster_path ? (
            <img
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-zinc-500 text-xs text-center px-1'>
              No Image
            </div>
          )}
        </div>

        {/* Content: Title & Overview */}
        <div className='flex-1 flex flex-col justify-between py-0.5 min-w-0'>
          <div>
            <h3 className='text-white text-lg font-semibold leading-snug line-clamp-2 mb-1.5'>
              {movie.title}
            </h3>
            <StarRating rating={movie.vote_average} />
          </div>
          <p className='text-zinc-400 text-sm leading-relaxed line-clamp-4'>
            {movie.overview || 'No description available.'}
          </p>
        </div>
      </div>

      {/* Bottom Section: Action Indicators */}
      <div className='flex items-center gap-2.5 px-3 pb-3'>
        {/* CTA: Trailer Navigation */}
        <button
          onClick={handleTrailer}
          className='flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-full py-2.5 transition-colors duration-150'
        >
          <span className='text-white text-xs font-semibold tracking-wide'>
            Watch Trailer
          </span>
          <img src={PlayIcon} className='w-6 h-6' alt='' aria-hidden='true' />
        </button>

        {/* Interaction: Bookmark/Favorite Toggle */}
        <div onClick={handleFavoriteClick}>
          <FavoriteButton
            isFavorite={favorite}
            onClick={handleToggleFavorite}
          />
        </div>
      </div>

      {/* Visual Divider */}
      <div className='mx-3 my-5 border-b border-white/10' />
    </div>
  );
}
