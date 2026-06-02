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

// NowPlayingPage displays currently playing movies in a responsive grid with genre filter pills and Load More pagination
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

  const allMovies = data?.pages.flatMap((page) => page.results) ?? [];

  // Dynamic browser tab title
  usePageTitle('Now Playing');

  // Filter client-side by selected genre
  const movies =
    selectedGenreId === null
      ? allMovies
      : allMovies.filter((movie) => movie.genre_ids.includes(selectedGenreId));

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

      <div className='layout-gutter pt-20 pb-16 md:pt-28'>
        {/* Header */}
        <motion.div
          className='flex items-center gap-3 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton variant='inline' className='md:hidden' />
          <h1 className='text-2xl font-bold md:text-3xl'>Now Playing</h1>
        </motion.div>

        {/* Genre filter pills */}
        {genres.length > 0 && (
          <motion.div
            className='mb-6'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <GenreFilter
              genres={genres}
              selectedId={selectedGenreId}
              onSelect={setSelectedGenreId}
            />
          </motion.div>
        )}

        {/* Empty state */}
        {movies.length === 0 && !isFetchingNextPage && (
          <motion.div
            className='flex flex-col items-center justify-center py-24 gap-3'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className='text-zinc-500 text-sm'>
              No movies found for this genre.
            </p>
            <button
              onClick={() => setSelectedGenreId(null)}
              className='text-red-500 text-sm hover:text-red-400 transition-colors'
            >
              Clear filter
            </button>
          </motion.div>
        )}

        {/* Movie grid */}
        {movies.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            {isFetchingNextPage &&
              Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <MovieCardSkeleton key={`skeleton-${i}`} />
              ))}
          </div>
        )}

        {/* Load More */}
        {hasNextPage && !isFetchingNextPage && selectedGenreId === null && (
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
