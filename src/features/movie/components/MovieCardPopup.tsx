import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Movie } from '@/features/types/Movie';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { useMovieTrailer } from '@/features/movie/hooks/useMovieTrailer';
import StarRating from '@/features/ui/icons/StarRating';
import PlayIcon from '@/assets/play-icon/play.svg';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';

interface MovieCardPopupProps {
  movie: Movie;
  isOpen: boolean;
  position: {
    top: number;
    left: number;
    width: number;
    transformOrigin: string;
  } | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * MovieCardPopup renders a Netflix-style hover popup via React Portal.
 * Positioned using fixed coordinates to escape any overflow:hidden parent.
 */
export default function MovieCardPopup({
  movie,
  isOpen,
  position,
  onMouseEnter,
  onMouseLeave,
}: MovieCardPopupProps) {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const favorite = isFavorite(movie.id);

  const { data: trailer } = useMovieTrailer(isOpen ? String(movie.id) : '');

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) removeFavorite(movie.id);
    else addFavorite(movie);
  };

  const handlePlayTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (trailer?.key) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
    }
  };

  const handleSeeDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/movie/${movie.id}`);
  };

  if (!position) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={(e) => e.stopPropagation()}
          className='fixed z-[9999] rounded-xl overflow-hidden bg-zinc-900 shadow-2xl shadow-black/80 border border-zinc-800'
          style={{
            top: position.top,
            left: position.left,
            width: position.width,
            transformOrigin: position.transformOrigin,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {/* Preview — 16:9 trailer or backdrop fallback */}
          <div className='w-full aspect-video bg-zinc-800 relative overflow-hidden'>
            {trailer?.key ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${trailer.key}`}
                allow='autoplay; encrypted-media'
                className='w-full h-full'
                style={{ border: 'none', pointerEvents: 'none' }}
                title={`${movie.title} trailer`}
              />
            ) : (
              <img
                src={`${IMAGE_BASE}${movie.backdrop_path ?? movie.poster_path}`}
                alt={movie.title}
                className='w-full h-full object-cover'
              />
            )}
            <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-900 to-transparent' />
          </div>

          {/* Info + actions */}
          <div className='p-3'>
            <p className='text-white text-sm font-bold line-clamp-1 mb-1.5'>
              {movie.title}
            </p>
            <StarRating rating={movie.vote_average} />

            <div className='flex items-center gap-2 mt-3'>
              {/* Play Trailer */}
              <button
                onClick={handlePlayTrailer}
                disabled={!trailer?.key}
                className='flex items-center gap-1.5 bg-white hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-semibold px-3 py-2 rounded-full transition-colors duration-150'
              >
                <img src={PlayIcon} className='w-3.5 h-3.5 invert' alt='' aria-hidden='true' />
                Trailer
              </button>

              {/* Add Favorite */}
              <button
                onClick={handleFavorite}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-150 ${
                  favorite
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'border-zinc-600 text-zinc-400 hover:border-white hover:text-white'
                }`}
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg width='14' height='14' viewBox='0 0 24 24' fill={favorite ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='2' aria-hidden='true'>
                  <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
                </svg>
              </button>

              {/* See Detail */}
              <button
                onClick={handleSeeDetail}
                className='ml-auto flex items-center gap-1.5 border border-zinc-600 text-zinc-400 hover:border-white hover:text-white text-xs px-3 py-2 rounded-full transition-all duration-150'
              >
                Detail
                <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
                  <path d='M9 18l6-6-6-6' />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}