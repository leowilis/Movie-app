import { motion } from 'framer-motion';
import { useNowPlayingPaginated } from '@/features/movie/hooks/useNowPlayingPaginated';
import { MovieCardSkeleton } from '@/features/ui/Skeleton';
import MovieCard from '@/components/movie/MovieCard';
import BackButton from '@/features/ui/BackButton';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const SKELETON_COUNT = 8;

/**
 * NowPlayingPage displays all currently playing movies in a responsive grid
 * with Load More pagination.
 */
export default function NowPlayingPage() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNowPlayingPaginated();

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  // Loading state
  if (isLoading) {
    return (
      <div className='min-h-screen bg-black pt-16 pb-16'>
        <BackButton />
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
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <BackButton />
        <p className='text-zinc-500 text-sm'>
          Failed to load now playing movies. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar />

      <div className='layout-gutter pt-20 pb-16'>
        <motion.div
          className='flex items-center gap-3 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button & Title Page */}
          <BackButton variant='inline' />
          <h1 className='text-2xl font-bold'>Now Playing</h1>
        </motion.div>

        {/* Movie grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          {isFetchingNextPage &&
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <MovieCardSkeleton key={`skeleton-${i}`} />
            ))}
        </div>

        {/* Load More */}
        {hasNextPage && !isFetchingNextPage && (
          <div className='flex justify-center mt-12'>
            <button
              onClick={() => fetchNextPage()}
              className='px-8 py-3 rounded-full border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-white hover:text-white hover:bg-white/5 active:scale-95 transition-all duration-200'
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
