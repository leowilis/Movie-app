import { useParams } from 'react-router';
import { useMovieDetail } from '@/features/home/components/hooks/useMovieDetail';
import { motion } from 'framer-motion';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading } = useMovieDetail(id ?? '');

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
    </div>
  );
}
