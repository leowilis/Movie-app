import { motion } from 'framer-motion';
import { MovieDetail } from '@/features/types/Movie';
import { Video } from '@/features/types/Movie';
import StarRating from '@/features/ui/icons/StarRating';
import FavoriteButton from '@/features/ui/icons/Favorites';
import Button from '@/features/ui/Button';
import PlayIcon from '@/assets/play-icon/play.svg';

interface MovieInfoProps {
  movie: MovieDetail;
  trailer: Video | undefined;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onWatchTrailer: () => void;
}

/**
 * MovieInfo displays movie metadata including title, rating, genres,
 * overview, and action buttons (trailer + favorite).
 */
export default function MovieInfo({
  movie,
  trailer,
  isFavorited,
  onToggleFavorite,
  onWatchTrailer,
}: MovieInfoProps) {
  const hours = Math.floor((movie.runtime ?? 0) / 60);
  const minutes = (movie.runtime ?? 0) % 60;

  return (
    <motion.div
      className='flex flex-col gap-4'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Title */}
      <div className='flex items-start justify-between gap-4'>
        <h1 className='text-3xl md:text-5xl font-bold leading-tight'>
          {movie.title}
        </h1>
        {/* Watch Trailer + Favorite */}
        <div className='flex gap-3 mt-2'>
          <Button
            variant='outline'
            disabled={!trailer}
            onClick={onWatchTrailer}
          >
            Watch Trailer
            <img src={PlayIcon} className='w-6 h-6' alt='' aria-hidden='true' />
          </Button>
          <FavoriteButton isFavorite={isFavorited} onClick={onToggleFavorite} />
        </div>
      </div>

      {/* Tagline */}
      {movie.tagline && (
        <p className='text-white/50 italic text-sm'>{movie.tagline}</p>
      )}

      {/* Meta */}
      <div className='flex flex-wrap items-center gap-3 text-sm text-white/70'>
        <StarRating rating={movie.vote_average} />
        <span>•</span>
        <span>{movie.release_date.slice(0, 4)}</span>
        {(movie.runtime ?? 0) > 0 && (
          <>
            <span>•</span>
            <span>
              {hours}h {minutes}m
            </span>
          </>
        )}
      </div>

      {/* Genres */}
      <div className='flex flex-wrap gap-2'>
        {movie.genres?.map((genre) => (
          <span
            key={genre.id}
            className='px-3 py-1 rounded-full border border-white/20 text-xs text-white/80'
          >
            {genre.name}
          </span>
        ))}
      </div>

      {/* Overview */}
      <h2 className='text-2xl font-bold pb-2 mt-2'>Overview</h2>
      <p className='text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl'>
        {movie.overview}
      </p>
    </motion.div>
  );
}
