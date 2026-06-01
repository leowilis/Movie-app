import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchMovie } from '@/features/home/components/search/hooks/useSearchMovie';
import { useMovieGenres } from '@/features/movie/hooks/useMovieGenres';
import SearchBar from '@/features/home/components/search/components/SearchBar';
import GenreFilter from '@/features/movie/components/GenreFilter';
import { SearchResultCardSkeleton } from '@/features/ui/Skeleton';
import SearchErrorState from '@/features/home/components/search/components/SearchErrorState';
import SearchResultCard from '@/features/home/components/search/components/SearchResultCard';
import SearchEmptyState from '@/features/home/components/search/components/SearchEmptyState';
import { usePageTitle } from '@/hooks/usePageTitle';
import Navbar from '@/components/layout/Navbar';

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
 * - Client-side genre filtering on search results
 * - Derived UI states for Loading, Error, Empty, and Success results
 */
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const debouncedQuery = useDebounce(query, 400);

  // Dynamic browser tab title
  usePageTitle(debouncedQuery ? `Search: ${debouncedQuery}` : 'Search');

  // Sync internal state when browser navigation occurs
  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setQuery(q);
  }, [searchParams]);

  // Reset genre filter when query changes
  useEffect(() => {
    setSelectedGenreId(null);
  }, [debouncedQuery]);

  const { data: results, isLoading, isError } = useSearchMovie(debouncedQuery);
  const { data: genres = [] } = useMovieGenres();

  const handleClear = useCallback(() => setQuery(''), []);

  // Filter results client-side by selected genre
  const filteredResults =
    selectedGenreId === null
      ? results
      : results?.filter((movie) => movie.genre_ids.includes(selectedGenreId));

  // Derived UI state — mutually exclusive rendering
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

      <div className='layout-gutter flex flex-col flex-1 pt-2 pb-8 md:pt-28'>
        {/* Genre filter — only visible when results exist */}
        {!isInit && !isLoading && !isError && (results?.length ?? 0) > 0 && (
          <div className='pb-4'>
            <GenreFilter
              genres={genres}
              selectedId={selectedGenreId}
              onSelect={setSelectedGenreId}
            />
          </div>
        )}

        {/* Loading state */}
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SearchResultCardSkeleton key={i} />
          ))}

        {/* Error state */}
        {isError && <SearchErrorState />}

        {/* Success state */}
        {hasResults &&
          filteredResults!.map((movie) => (
            <SearchResultCard key={movie.id} movie={movie} />
          ))}

        {/* Empty state */}
        {isNotFound && <SearchEmptyState />}
      </div>
    </div>
  );
}
