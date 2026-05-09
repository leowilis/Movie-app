import { motion, AnimatePresence } from 'framer-motion';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

interface HeroBackdropProps {
  movieId: number;
  backdropPath: string;
  title: string;
}

/**
 * HeroBackdrop renders the animated full-width backdrop image
 * with cinematic gradient overlays.
 */
export default function HeroBackdrop({ movieId, backdropPath, title }: HeroBackdropProps) {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.img
          key={movieId}
          src={`${IMAGE_BASE}${backdropPath}`}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
    </>
  );
}