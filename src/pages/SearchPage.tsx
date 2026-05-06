import { useSearchMovie } from '@/features/home/components/hooks/useSearchMovie';
import { SearchResultCardSkeleton } from '@/features/ui/Skeleton';
import { useDebounce } from '@/hooks/useDebounce';
import { useCallback, useState } from 'react';
import SearchBar from '@/features/home/components/search/components/SearchBar';
import SearchEmptyState from '@/features/home/components/search/components/SearchEmptyState';
import SearchErrorState from '@/features/home/components/search/components/SearchErrorState';
import SearchResultCard from '@/features/home/components/search/components/SearchResultCard';

const SKELETON_COUNT = 5;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  const { data: results, isLoading, isError } = useSearchMovie(debouncedQuery);

  const handleClear = useCallback(() => setQuery(''), []);

  // Derived UI State
  const isInit = debouncedQuery.trim().length === 0;
  const isNotFound = !isInit && !isLoading && (results?.length ?? 0) === 0;
  const hasResults = !isInit && !isLoading && (results?.length ?? 0) > 0;

  return (
    <div className='min-h-screen bg-black flex flex-col'>
      <SearchBar value={query} onChange={setQuery} onClear={handleClear} />

      <div className='flex flex-col flex-1 pt-2 pb-8 overflow-y-auto'>
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SearchResultCardSkeleton key={i} />
          ))}

        {isError && <SearchErrorState />}

        {hasResults &&
          results!.map((movie) => (
            <SearchResultCard key={movie.id} movie={movie} />
          ))}

        {isNotFound && <SearchEmptyState />}
      </div>
    </div>
  );
}
