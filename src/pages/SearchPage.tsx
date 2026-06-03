import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchMovie } from '@/features/home/components/search/hooks/useSearchMovie';
import { useMovieGenres } from '@/features/movie/hooks/useMovieGenres';
import SearchBar from '@/features/home/components/search/components/SearchBar';
import GenreFilter from '@/features/movie/components/GenreFilter';
import { MovieCardSkeleton } from '@/features/ui/Skeleton';
import SearchErrorState from '@/features/home/components/search/components/SearchErrorState';
import SearchEmptyState from '@/features/home/components/search/components/SearchEmptyState';
import MovieCard from '@/components/movie/MovieCard';
import { usePageTitle } from '@/hooks/usePageTitle';
import Navbar from '@/components/layout/Navbar';

const SKELETON_COUNT = 8;

// Stagger variants for the search result grid
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
 * SearchPage orchestrates the movie search experience.
 *
 * Features:
 * - URL query param sync for deep-linking support
 * - Debounced API calls to reduce request volume
 * - Client-side genre filtering on search results
 * - Mutually exclusive UI states: init, loading, error, empty, results
 */
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const debouncedQuery = useDebounce(query, 400);

  usePageTitle(debouncedQuery ? `Search: ${debouncedQuery}` : 'Search');

  // Sync input state when browser navigation changes URL params
  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setQuery(q);
  }, [searchParams]);

  // Reset genre filter when search query changes
  useEffect(() => {
    setSelectedGenreId(null);
  }, [debouncedQuery]);

  const { data: results, isLoading, isError } = useSearchMovie(debouncedQuery);
  const { data: genres = [] } = useMovieGenres();

  const handleClear = useCallback(() => setQuery(''), []);

  /** Client-side genre filter applied on top of search results. */
  const filteredResults =
    selectedGenreId === null
      ? results
      : results?.filter((movie) => movie.genre_ids.includes(selectedGenreId));

  const isInit = debouncedQuery.trim().length === 0;
  const isNotFound =
    !isInit && !isLoading && !isError && (filteredResults?.length ?? 0) === 0;
  const hasResults =
    !isInit && !isLoading && !isError && (filteredResults?.length ?? 0) > 0;

  return (
    <div className='min-h-screen bg-black text-white flex flex-col'>
      {/* Desktop navbar */}
      <div className='hidden md:block'>
        <Navbar />
      </div>

      {/* Mobile search bar */}
      <div className='md:hidden'>
        <SearchBar value={query} onChange={setQuery} onClear={handleClear} />
      </div>

      <div className='layout-gutter pt-4 pb-16 md:pt-28'>
        {/* Init state */}
        {isInit && (
          <div className='flex flex-col items-center justify-center py-32 gap-3'>
            <span className='text-5xl'>🎬</span>
            <p className='text-zinc-400 text-sm font-medium'>
              Find your next movie
            </p>
            <p className='text-zinc-600 text-xs'>
              Search by title, genre, or keyword
            </p>
          </div>
        )}

        {/* Genre filter — only shown when results exist */}
        {!isInit && !isLoading && !isError && (results?.length ?? 0) > 0 && (
          <motion.div
            className='mb-6'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className='relative'>
              <GenreFilter
                genres={genres}
                selectedId={selectedGenreId}
                onSelect={setSelectedGenreId}
              />
              <div className='pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black from-30% to-transparent' />
            </div>

            {selectedGenreId !== null && (
              <div className='flex items-center justify-between mt-3'>
                <p className='text-xs text-zinc-500'>
                  Showing {filteredResults?.length ?? 0} result
                  {(filteredResults?.length ?? 0) !== 1 ? 's' : ''}
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

        {/* Result count + query label */}
        {hasResults && (
          <motion.div
            className='mb-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className='text-zinc-500 text-sm'>
              {filteredResults!.length} result
              {filteredResults!.length !== 1 ? 's' : ''} for{' '}
              <span className='text-white font-medium'>"{debouncedQuery}"</span>
            </p>
          </motion.div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && <SearchErrorState />}

        {/* Results grid */}
        {hasResults && (
          <motion.div
            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'
            variants={gridVariants}
            initial='hidden'
            animate='visible'
          >
            {filteredResults!.map((movie) => (
              <motion.div key={movie.id} variants={cardVariants}>
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {isNotFound && <SearchEmptyState />}
      </div>
    </div>
  );
}
