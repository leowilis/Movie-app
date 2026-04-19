import { useParams } from 'react-router';
import { useMovieDetail } from '@/features/home/components/hooks/useMovieDetail';
import { motion } from 'framer-motion';
import { useMovieTrailer } from '@/features/home/components/hooks/useMovieTrailer';
import { useMovieCredits } from '@/features/home/components/hooks/useMovieCredits';
import { useState } from 'react';
import StarRating from '@/features/ui/icons/StarRating';
import Button from '@/features/ui/Button';
import PlayIcon from '@/assets/play-icon/play.svg';
import TrailerModal from '@/components/movie/TrailerModal';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';
const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading } = useMovieDetail(id ?? '');
  const { data: trailer } = useMovieTrailer(id ?? '');
  const { data: credits } = useMovieCredits(id ?? '');
  const [openTrailer, setOpenTrailer] = useState(false);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin' />
      </div>
    );
  }

  if (!movie) return null;

  const hours = Math.floor((movie.runtime ?? 0) / 60);
  const minutes = (movie.runtime ?? 0) % 60;

  return (
    <div className='min-h-screen text-white'>
      {/* Backdrop */}
      <div className='relative h-[50vh] md:h-[60vh] w-full overflow-hidden'>
        <motion.img
          src={`${IMAGE_BASE}${movie.backdrop_path}`}
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
            src={`${POSTER_BASE}${movie.poster_path}`}
            alt={movie.title}
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
              {movie.title}
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
              <span>{movie.release_date.slice(0, 4)}</span>
              {(movie.runtime ?? 0) > 0 && (
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
            <p className='text-2xl font-bold pb-2'>Overview</p>
            <p className='text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl'>
              {movie.overview}
            </p>

            {/* Buttons */}
            <div className='flex gap-3 mt-2'>
              <Button
                variant='outline'
                onClick={() => trailer && setOpenTrailer(true)}
              >
                Watch Trailer
                <img src={PlayIcon} className='w-6 h-6' alt='Play' />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        {(movie.budget > 0 || movie.revenue > 0) && (
          <motion.div
            className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {movie.budget > 0 && (
              <div className='bg-white/5 rounded-2xl p-4'>
                <p className='text-white/40 text-xs mb-1'>Budget</p>
                <p className='text-white font-semibold'>
                  ${(movie.budget / 1_000_000).toFixed(0)}M
                </p>
              </div>
            )}
            {movie.revenue > 0 && (
              <div className='bg-white/5 rounded-2xl p-4'>
                <p className='text-white font-semibold'>Revenue</p>
                <p className='text-white font-semibold'>
                  ${(movie.revenue / 1_000_000).toFixed(0)}M
                </p>
              </div>
            )}
            <div className='bg-white/5 rounded-2xl p-4'>
              <p className='text-white/40 text-xs mb-1'>Votes</p>
              <p className='text-white font-semibold'>
                {movie.vote_count.toLocaleString()}
              </p>
            </div>
          </motion.div>
        )}

        {/* Cast & Crew */}
        {(credits?.cast?.length ?? 0) > 0 && (
          <motion.div
            className='mt-10'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-2xl font-bold mb-4'>Cast & Crew</h2>
            <div className='flex flex-col'>
              {credits?.cast.slice(0, 10).map((person, index) => (
                <motion.div
                  key={person.id}
                  className='flex items-center gap-4 py-4 border-b border-white/10'
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                      alt={person.name}
                      className='w-25 h-full rounded-xl object-cover shrink-0'
                    />
                  ) : (
                    <div className='w-25 h-40 rounded-xl bg-white/10 shrink-0 flex items-center justify-center text-white/30 text-xl'>
                      ?
                    </div>
                  )}
                  <div>
                    <p className='text-white font-semibold text-sm'>
                      {person.name}
                    </p>
                    <p className='text-white/40 text-xs mt-0.5'>
                      {person.character}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Trailer Modal */}
      {openTrailer && trailer && (
        <TrailerModal
          videoKey={trailer.key}
          onClose={() => setOpenTrailer(false)}
        />
      )}
    </div>
  );
}
