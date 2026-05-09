import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchMovie } from '@/features/home/components/search/hooks/useSearchMovie';
import SearchBar from '@/features/home/components/search/components/SearchBar';
import { SearchResultCardSkeleton } from '@/features/ui/Skeleton';
import SearchErrorState from '@/features/home/components/search/components/SearchErrorState';
import SearchResultCard from '@/features/home/components/search/components/SearchResultCard';
import SearchEmptyState from '@/features/home/components/search/components/SearchEmptyState';

const SKELETON_COUNT = 5;

/**
 * SearchPage Component
 *
 * Orchestrates the movie discovery experience by synchronizing URL parameters,
 * local input state, and throttled API fetching.
 *
 * Features:
 * - URL-to-State synchronization (Deep-linking support)
 * - Debounced API calls (Performance optimization)
 * - Derived UI states for Loading, Error, Empty, and Success results
 */
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const debouncedQuery = useDebounce(query, 400);

  // Effect to synchronize internal state when browser navigation occurs
  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setQuery(q);
  }, [searchParams]);

  // TanStack Query hook to fetch movie data based on the debounced input
  const { data: results, isLoading, isError } = useSearchMovie(debouncedQuery);

  // Memoized handler to reset search input
  const handleClear = useCallback(() => setQuery(''), []);

  // Derived UI state logic to ensure mutually exclusive rendering
  const isInit = debouncedQuery.trim().length === 0;
  const isNotFound = !isInit && !isLoading && !isError && results?.length === 0;
  const hasResults =
    !isInit && !isLoading && !isError && (results?.length ?? 0) > 0;

  return (
    <div className='min-h-screen bg-black flex flex-col'>
      <SearchBar value={query} onChange={setQuery} onClear={handleClear} />

      <div className='flex flex-col flex-1 pt-2 pb-8 overflow-y-auto'>
        {/* Loading State: Renders a fixed number of skeletons to maintain layout stability */}
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SearchResultCardSkeleton key={i} />
          ))}

        {/* Error State: Replaces results with a resilient error UI */}
        {isError && <SearchErrorState />}

        {/* Success State: Maps through movie results into SearchResultCards */}
        {hasResults &&
          results!.map((movie) => (
            <SearchResultCard key={movie.id} movie={movie} />
          ))}

        {/* Empty State: Shown only when a search has been completed with no results */}
        {isNotFound && <SearchEmptyState />}
      </div>
    </div>
  );
}
