import { motion } from 'framer-motion';
import { useNewRelease } from './hooks/useNewRelease';
import { MovieCardSkeleton } from '@/features/ui/Skeleton';
import MovieCard from '@/components/movie/MovieCard';

const INITIAL_SKELETON_COUNT = 4;

/**
 * NewRelease Component
 *
 * Renders a responsive grid of movies currently in theaters.
 * Orchestrates multiple data states (Loading, Error, Success) and manages
 * infinite pagination via a "Load More" strategy.
 *
 * Features:
 * - Animated entry on scroll (Framer Motion)
 * - Standardized Skeleton hydration to prevent Layout Shift
 * - Paginated results flattening for seamless rendering
 */
export default function NewRelease() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNewRelease();

  // Flattens multi-page data from TanStack Query into a single array for efficient grid mapping.
  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  // Loading state
  if (isLoading) {
    return (
      <section className='py-8'>
        <div className='layout-gutter'>
          <div className='h-8 w-36 bg-zinc-800 rounded-lg mb-12 mx-2 animate-pulse' />
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {Array.from({ length: INITIAL_SKELETON_COUNT }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className='py-8'>
        <div className='layout-gutter px-2'>
          <p className='text-zinc-500 text-sm'>
            Failed to load new releases. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className='py-8'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
    >
      <div className='layout-gutter'>
        <h2 className='text-white text-3xl font-bold mb-12 px-2'>
          New Release
        </h2>

        {/* Movie Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}

          {/* Load More skeletons */}
          {isFetchingNextPage &&
            Array.from({ length: INITIAL_SKELETON_COUNT }).map((_, i) => (
              <MovieCardSkeleton key={`skeleton-${i}`} />
            ))}
        </div>

        {/* Load More button */}
        {hasNextPage && !isFetchingNextPage && (
          <div className='flex justify-center mt-10'>
            <button
              onClick={() => fetchNextPage()}
              className='px-8 py-3 rounded-full border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-white hover:text-white hover:bg-white/5 active:scale-95 transition-all duration-200'
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
