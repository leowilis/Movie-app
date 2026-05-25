import { motion } from 'framer-motion';

const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

interface MoviePosterProps {
  posterPath: string;
  title: string;
}

/**
 * MoviePoster renders the movie poster with a fade-in animation.
 */
export default function MoviePoster({ posterPath, title }: MoviePosterProps) {
  return (
    <motion.img
      src={`${POSTER_BASE}${posterPath}`}
      alt={title}
      className='w-36 md:w-56 lg:w-64 rounded-2xl shadow-2xl shrink-0 self-start md:ring-1 md:ring-white/10'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    />
  );
}