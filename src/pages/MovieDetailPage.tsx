import { useParams } from 'react-router';
import { useMovieDetail } from '@/features/home/components/hooks/useMovieDetail';
import { motion } from 'framer-motion';
import { useMovieTrailer } from '@/features/home/components/hooks/useMovieTrailer';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';
const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading } = useMovieDetail(id ?? '');
  const { data: trailer } = useMovieTrailer(id ?? '');

  return (
    <div className='min-h-screen text-white'>
      {/* Backdrop */}
      <div className='relative h-[50vh] md:h-[60vh] w-full overflow-hidden'>
        <motion.img
          src={`${IMAGE_BASE}${movie?.backdrop_path}`}
          alt={movie?.title}
          className='w-full h-full object-cover object-center'
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/50 to-transparent' />
      </div>

      {/* Detail Content */}
      <div className='layout-gutter -mt-24 relative z-10 pb-16'>
        <div className='flex flex-col md:flex-row gap-8'>
            {/* Poster */}
            <motion.img 
            src={`${POSTER_BASE}${movie?.poster_path}`}
            alt={movie?.title}
            className='w-36 md:w-52 rounded-2xl shadow-2xl shrink-0 self-start'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            />
            
        </div>
      </div>
    </div>
  );
}
