import { motion } from 'framer-motion';
import { useSimilarMovies } from '@/features/movie/hooks/useSimilarMovies';
import { useSlider } from '@/hooks/useSlider';
import { MovieCardSkeleton } from '@/features/ui/Skeleton';
import MovieCard from '@/components/movie/MovieCard';
import ArrowLeft from '@/features/ui/icons/ArrowLeft';
import ArrowRight from '@/features/ui/icons/ArrowRight';

const SKELETON_COUNT = 4;

interface SimilarMoviesProps {
  movieId: string;
}

/**
 * SimilarMovies renders a horizontal scrollable carousel of movies
 * similar to the currently viewed movie.
 * Hides entirely if no similar movies are available.
 */
export default function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const { data: movies, isLoading, isError } = useSimilarMovies(movieId);
  const { sliderRef, scrollPosition, handleScroll, slideLeft, slideRight } =
    useSlider();

  if (isLoading) {
    return (
      <section className='mt-12'>
        <div className='h-7 w-48 bg-zinc-800 rounded-lg mb-6 animate-pulse' />
        <div className='flex gap-4'>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div key={i} className='w-[140px] shrink-0 md:w-[180px]'>
              <MovieCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError || !movies?.length) return null;

  return (
    <motion.section
      className='mt-12'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className='text-2xl font-bold mb-6'>You Might Also Like</h2>

      <div className='relative'>
        {/* Slider */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className='flex gap-4 overflow-x-scroll scroll-smooth scrollbar-hide'
        >
          {movies.map((movie) => (
            <div key={movie.id} className='w-[140px] shrink-0 md:w-[180px]'>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Left fade */}
        <div
          className={`pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent transition-opacity duration-300 ${
            scrollPosition > 0 ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Right fade */}
        <div className='pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent' />

        <ArrowLeft onClick={slideLeft} visible={scrollPosition > 0} />
        <ArrowRight onClick={slideRight} />
      </div>
    </motion.section>
  );
}
