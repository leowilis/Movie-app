import { motion, AnimatePresence } from 'framer-motion';
import { Movie } from '@/features/types/Movie';
import { Video } from '@/features/types/Movie';
import StarRating from '@/features/ui/icons/StarRating';
import Button from '@/features/ui/Button';
import PlayIcon from '@/assets/play-icon/play.svg';

interface HeroContentProps {
  movie: Movie;
  trailer: Video | undefined;
  onWatchTrailer: () => void;
  onSeeDetail: () => void;
}

/**
 * HeroContent renders the movie title, rating, overview,
 * and action buttons overlaid on the hero backdrop.
 */
export default function HeroContent({
  movie,
  trailer,
  onWatchTrailer,
  onSeeDetail,
}: HeroContentProps) {
  return (
    <div className="relative z-10 h-full flex items-end">
      <div className="layout-gutter w-full max-w-2xl space-y-4 pb-16">
        {/* Badge */}
        <motion.span
          key={movie.id + '-badge'}
          className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Now Playing
        </motion.span>

        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={movie.id + '-title'}
            className="text-2xl md:text-5xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
          >
            {movie.title}
          </motion.h1>
        </AnimatePresence>

        {/* Rating + Year */}
        <motion.div
          key={movie.id + '-meta'}
          className="flex items-center gap-3 text-sm text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StarRating rating={movie.vote_average} />
          <span>•</span>
          <span>{movie.release_date.slice(0, 4)}</span>
        </motion.div>

        {/* Overview */}
        <AnimatePresence mode="wait">
          <motion.p
            key={movie.id + '-overview'}
            className="text-zinc-300 text-sm md:text-base line-clamp-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {movie.overview}
          </motion.p>
        </AnimatePresence>

        {/* Buttons */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Button disabled={!trailer} onClick={onWatchTrailer}>
            Watch Trailer
            <img src={PlayIcon} className="w-6 h-6" alt="" aria-hidden="true" />
          </Button>
          <Button variant="secondary" onClick={onSeeDetail}>
            See Detail
          </Button>
        </motion.div>
      </div>
    </div>
  );
}