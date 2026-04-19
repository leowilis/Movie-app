import { useParams } from 'react-router';
import { useMovieDetail } from '@/features/home/components/hooks/useMovieDetail';
import { motion } from 'framer-motion';
import { useMovieTrailer } from '@/features/home/components/hooks/useMovieTrailer';
import { useState } from 'react';
import StarRating from '@/features/ui/icons/StarRating';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';
const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading } = useMovieDetail(id ?? '');
  const { data: trailer } = useMovieTrailer(id ?? '');
  const [openTrailer, setOpenTrailer] = useState(false);

  const hours = Math.floor((movie?.runtime ?? 0) / 60);
  const minutes = (movie?.runtime ?? 0) % 60;

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

          {/* Info */}
          <motion.div
            className='flex flex-col gap-4'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Title */}
            <h1 className='text-3xl md:text-5xl font-bold leading-tight'>
              {movie?.title}
            </h1>

            {/* Tagline */}
            {movie?.tagline && (
              <p className='text-white/50 italic text-sm'>{movie.tagline}</p>
            )}

            {/* Meta */}
            <div className='flex flex-wrap items-center gap-3 text-sm text-white/70'>
              <span className='flex items-center gap-1'>
                {movie?.vote_average !== undefined && (
                  <StarRating rating={movie.vote_average} />
                )}
              </span>
              <span>•</span>
              <span>{movie?.release_date.slice(0, 4)}</span>
              {(movie?.runtime ?? 0) > 0 && (
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
              {movie?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className='px-3 py-1 rounded-full border border-white/20 text-xs text-white/80'
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className='text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl'>
              {movie?.overview}
            </p>

            {/* Buttons */}
            <div>
              <button
                onClick={() => trailer && setOpenTrailer(true)}
                className='flex items-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-red-600 hover:text-white transition'
              >
                ▶ Watch Trailer
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
