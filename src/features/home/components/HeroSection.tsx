import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMovieTrailer } from '@/hooks/useMovieTrailer';
import { useTrendingMovies } from '@/hooks/useTrendingMovie';
import { useNavigate } from 'react-router';
import Button from '@/features/ui/Button';
import PlayIcon from '@/assets/play-icon/play.svg';
import TrailerModal from '@/components/movie/TrailerModal';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

export default function HeroSection() {
  const { data: trendingMovies, isLoading, isError } = useTrendingMovies();
  const [openTrailer, setOpenTrailer] = useState(false);
  const navigate = useNavigate();

  const movie = trendingMovies?.[0];
  const { data: trailer } = useMovieTrailer(movie?.id ? String(movie.id) : '');

  if (isLoading || isError) {
    return <section className='h-screen w-full bg-black' />;
  }

  const backdropUrl = movie?.backdrop_path
    ? `${IMAGE_BASE}${movie.backdrop_path}`
    : '';

  return (
    <section className='realtive h-screen w-full overflow-hidden'>
      {/* Hero background */}
      <motion.div
        className='absolute inset-0'
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <img
          src={backdropUrl}
          alt={movie?.title}
          className='w-full h-full object-cover object-top'
        />
        <div className='absolute inset-0 bg-black/40' />
        <div className='absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent' />
      </motion.div>

      {/* Hero Content */}
      <div className='relative z-10 h-full flex items-end pb-24'>
        <div className='layout-gutter w-full space-y-6 max-w-2xl'>
          {/* Movie Title */}
          <motion.h1
            className='text-3xl md:text-5xl font-bold'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
          >
            {movie?.title}
          </motion.h1>

          {/* Movie Description */}
          <motion.p
            className='text-zinc-300 text-sm md:text-lg line-clamp-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
          >
            {movie?.overview}
          </motion.p>

          {/* Button component */}
          <motion.div
            className='flex flex-col gap-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
          >
            <Button onClick={() => trailer && setOpenTrailer(true)}>
              Watch Trailer
              <img src={PlayIcon} className='w-6 h-6' alt='Play' />
            </Button>

            <Button
              variant='secondary'
              onClick={() => movie && navigate(`/movie/${movie.id}`)}
            >
              See Detail
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Trailer */}
      {openTrailer && trailer && (
        <TrailerModal
          videoKey={trailer.key}
          onClose={() => setOpenTrailer(false)}
        />
      )}
    </section>
  );
}
