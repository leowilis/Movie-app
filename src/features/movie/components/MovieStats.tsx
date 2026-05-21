import { motion } from 'framer-motion';
import { MovieDetail } from '@/features/types/Movie';

interface MovieStatsProps {
  movie: MovieDetail;
}

/**
 * MovieStats displays financial and popularity stats for a movie.
 * Only renders if at least one stat (budget or revenue) is available.
 */
export default function MovieStats({ movie }: MovieStatsProps) {
  const hasStats = movie.budget > 0 || movie.revenue > 0;
  if (!hasStats) return null;

  return (
    <motion.div
      className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-4'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {movie.budget > 0 && (
        <div className='bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-4 md:p-6'>
          <p className='text-white/40 text-xs mb-1 md:mb-2 uppercase tracking-widest'>
            Budget
          </p>
          <p className='text-white font-semibold text-lg md:text-2xl'>
            ${(movie.budget / 1_000_000).toFixed(0)}M
          </p>
        </div>
      )}
      {movie.revenue > 0 && (
        <div className='bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-4 md:p-6'>
          <p className='text-white/40 text-xs mb-1 md:mb-2 uppercase tracking-widest'>
            Revenue
          </p>
          <p className='text-white font-semibold text-lg md:text-2xl'>
            ${(movie.revenue / 1_000_000).toFixed(0)}M
          </p>
        </div>
      )}
      <div className='bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-4 md:p-6'>
        <p className='text-white/40 text-xs mb-1 md:mb-2 uppercase tracking-widest'>
          Votes
        </p>
        <p className='text-white font-semibold text-lg md:text-2xl'>
          {movie.vote_count.toLocaleString()}
        </p>
      </div>
      <div className='bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-4 md:p-6'>
        <p className='text-white/40 text-xs mb-1 md:mb-2 uppercase tracking-widest'>
          Popularity
        </p>
        <p className='text-white font-semibold text-lg md:text-2xl'>
          {Math.round(movie.popularity).toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
