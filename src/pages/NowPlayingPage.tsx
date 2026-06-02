import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNowPlayingPaginated } from '@/features/movie/hooks/useNowPlayingPaginated';
import { useMovieGenres } from '@/features/movie/hooks/useMovieGenres';
import { MovieCardSkeleton } from '@/features/ui/Skeleton';
import GenreFilter from '@/features/movie/components/GenreFilter';
import MovieCard from '@/components/movie/MovieCard';
import BackButton from '@/features/ui/BackButton';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { usePageTitle } from '@/hooks/usePageTitle';

const SKELETON_COUNT = 8;

// Stagger variants for the movie grid container
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

// Per-card enter animation variant
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/**
 * NowPlayingPage — displays currently playing movies in a responsive grid.
 * Features: genre filter pills with result count, stagger card animation,
 * and Load More pagination via infinite query.
 */
export default function NowPlayingPage() {
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNowPlayingPaginated();

  const { data: genres = [] } = useMovieGenres();

  usePageTitle('Now Playing');

  const allMovies = data?.pages.flatMap((page) => page.results) ?? [];

  // Client-side filter by selected genre id
  const movies =
    selectedGenreId === null
      ? allMovies
      : allMovies.filter((movie) => movie.genre_ids.includes(selectedGenreId));

  const currentPage = data?.pages.length ?? 0;

  // Loading state
  if (isLoading) {
    return (
      <div className='min-h-screen bg-black pt-16 pb-16'>
        <Navbar />
        <div className='layout-gutter mt-16'>
          <div className='h-8 w-40 bg-zinc-800 rounded-lg mb-10 animate-pulse' />
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className='min-h-screen bg-black flex flex-col items-center justify-center gap-3'>
        <p className='text-zinc-400 text-sm font-medium'>
          Something went wrong
        </p>
        <p className='text-zinc-600 text-xs'>
          Failed to load movies. Check your connection.
        </p>
        <button
          onClick={() => window.location.reload()}
          className='mt-2 px-6 py-2 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:border-white hover:text-white transition-all'
        >
          Try again
        </button>
      </div>
    );
  }

  // Main render
  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar />

      <div className='layout-gutter pt-20 pb-16 md:pt-28'>
        {/* Header */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='flex items-center gap-3'>
            <BackButton variant='inline' className='md:hidden' />
            <h1 className='text-2xl font-bold md:text-3xl'>Now Playing</h1>
          </div>
          {allMovies.length > 0 && (
            <p className='text-sm text-zinc-500 mt-5'>
              Updated weekly · {allMovies.length} movies
            </p>
          )}
        </motion.div>

        {/* Genre filter pills */}
        {genres.length > 0 && (
          <motion.div
            className='mb-6'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className='relative'>
              <GenreFilter
                genres={genres}
                selectedId={selectedGenreId}
                onSelect={setSelectedGenreId}
              />
              {/* Right fade mask */}
              <div className='pointer-events-none absolute inset-y-0 right-0 w-23 bg-gradient-to-l from-black from-5% to-transparent' />
            </div>

            {selectedGenreId !== null && (
              <div className='flex items-center justify-between mt-3'>
                <p className='text-xs text-zinc-500'>
                  Showing {movies.length} movie{movies.length !== 1 ? 's' : ''}
                </p>
                <button
                  onClick={() => setSelectedGenreId(null)}
                  className='text-xs text-red-500 hover:text-red-400 transition-colors'
                >
                  Clear filter
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Empty state */}
        {movies.length === 0 && !isFetchingNextPage && (
          <motion.div
            className='flex flex-col items-center justify-center py-24 gap-2'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className='text-4xl'>🎬</span>
            <p className='text-zinc-400 text-sm font-medium'>No results</p>
            <p className='text-zinc-600 text-xs'>
              No movies match this genre right now.
            </p>
            <button
              onClick={() => setSelectedGenreId(null)}
              className='mt-2 text-red-500 text-xs hover:text-red-400 transition-colors'
            >
              Clear filter
            </button>
          </motion.div>
        )}

        {/* Movie grid */}
        {movies.length > 0 && (
          <motion.div
            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'
            variants={gridVariants}
            initial='hidden'
            animate='visible'
          >
            {movies.map((movie) => (
              <motion.div key={movie.id} variants={cardVariants}>
                <MovieCard movie={movie} />
              </motion.div>
            ))}
            {isFetchingNextPage &&
              Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <MovieCardSkeleton key={`skeleton-${i}`} />
              ))}
          </motion.div>
        )}

        {/* Load More */}
        {hasNextPage && !isFetchingNextPage && selectedGenreId === null && (
          <div className='flex justify-center mt-12'>
            <button
              onClick={() => fetchNextPage()}
              className='flex items-center gap-2 px-8 py-3 rounded-full border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-white hover:text-white hover:bg-white/5 active:scale-95 transition-all duration-200'
            >
              Load More
              <span className='text-xs text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded'>
                pg {currentPage + 1}
              </span>
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
