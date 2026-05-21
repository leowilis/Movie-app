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
      className='w-36 md:w-64 lg:w-72 rounded-2xl shadow-2xl shrink-0 self-start md:rounded-xl'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    />
  );
}
