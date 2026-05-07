import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNowPlaying } from '@/features/home/components/hooks/useNowPlaying';
import { useMovieTrailer } from '@/features/home/components/hooks/useMovieTrailer';
import { useNavigate } from 'react-router';
import Button from '@/features/ui/Button';
import PlayIcon from '@/assets/play-icon/play.svg';
import TrailerModal from '@/components/movie/TrailerModal';
import StarRating from '@/features/ui/icons/StarRating';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';
const AUTO_SLIDE_INTERVAL = 6000;

export default function HeroSection() {
  const { data: movies, isLoading, isError } = useNowPlaying();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openTrailer, setOpenTrailer] = useState(false);
  const navigate = useNavigate();

  const movie = movies?.[activeIndex];
  const { data: trailer } = useMovieTrailer(movie?.id ? String(movie.id) : '');

  useEffect(() => {
    if (!movies?.length) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % movies.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [movies]);

  // Reset trailer modal when slide change
  useEffect(() => {
    setOpenTrailer(false);
  }, [activeIndex]);

  if (isLoading || isError) {
    return <section className='h-[75vh] w-full bg-black animate-pulse' />;
  }

  return (
    <section className='relative h-[82vh] w-full overflow-hidden'>
      {/* Backdrop */}
      <AnimatePresence mode='wait'>
        <motion.img
          key={movie?.id}
          src={`${IMAGE_BASE}${movie?.backdrop_path}`}
          alt={movie?.title}
          className='absolute inset-0 w-full h-full object-cover object-center'
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-black/20' />
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent' />
      <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent' />

      {/* Content */}
      <div className='relative z-10 h-full flex items-end'>
        <div className='layout-gutter w-full max-w-2xl space-y-4 pb-16'>
          {/* Badge */}
          <motion.span
            key={movie?.id + '-badge'}
            className='inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Now Playing
          </motion.span>

          {/* Title */}
          <AnimatePresence mode='wait'>
            <motion.h1
              key={movie?.id + '-title'}
              className='text-2xl md:text-5xl font-bold text-white leading-tight'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              {movie?.title}
            </motion.h1>
          </AnimatePresence>

          {/* Rating + Year */}
          <motion.div
            key={movie?.id + '-meta'}
            className='flex items-center gap-3 text-sm text-white/80'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className='flex items-center gap-1'>
              {movie?.vote_average !== undefined && (
                <StarRating rating={movie.vote_average} />
              )}
            </span>
            <span>•</span>
            <span>{movie?.release_date.slice(0, 4)}</span>
          </motion.div>

          {/* Overview */}
          <AnimatePresence mode='wait'>
            <motion.p
              key={movie?.id + '-overview'}
              className='text-zinc-300 text-sm md:text-base line-clamp-4'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {movie?.overview}
            </motion.p>
          </AnimatePresence>

          {/* Buttons */}
          <motion.div
            className='flex flex-col gap-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
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

      {/* Dot Indicators */}
      <div className='relative justify-center bottom-6 z-10 flex gap-2'>
        {movies?.slice(0, 8).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Trailer Modal */}
      {openTrailer && trailer && (
        <TrailerModal
          videoKey={trailer.key}
          onClose={() => setOpenTrailer(false)}
        />
      )}
    </section>
  );
}
