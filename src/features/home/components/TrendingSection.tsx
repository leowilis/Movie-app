import { motion } from 'framer-motion';
import { useTrendingMovies } from './hooks/useTrendingMovie';
import { useSlider } from '@/hooks/useSlider';
import { MovieCardSkeleton } from '@/features/ui/Skeleton';
import MovieCard from '@/components/movie/MovieCard';
import ArrowLeft from '@/features/ui/icons/ArrowLeft';
import ArrowRight from '@/features/ui/icons/ArrowRight';

const SKELETON_COUNT = 4;

/**
 * TrendingSection Component
 *
 * Orchestrates the "Trending Now" cinematic slider.
 * Integrates custom horizontal navigation primitives, standardized loading states and resilient error boundaries.
 *
 * Features:
 * - Dynamic scroll orchestration via `useSlider` hook.
 * - Intersection-aware entrance animations using Framer Motion.
 * - Gradient mask overlays for enhanced visual depth on horizontal overflow.
 */
export default function TrendingSection() {
  const { data: movies, isLoading, isError } = useTrendingMovies();
  const { sliderRef, scrollPosition, handleScroll, slideLeft, slideRight } =
    useSlider();

  // Loading state
  if (isLoading) {
    return (
      <section className='py-8'>
        <div className='layout-gutter'>
          <div className='h-8 w-36 bg-zinc-800 rounded-lg mb-12 mx-2 animate-pulse' />
          <div className='flex gap-6'>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
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
            Failed to load trending movies. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className='py-8 md:py-12'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
    >
      <div className='layout-gutter'>
        <h2 className='text-white text-3xl font-bold mb-8 px-2 md:text-4xl md:mb-12'>
          Trending Now
        </h2>

        <div className='relative'>
          {/* Slider */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className='flex gap-4 overflow-x-scroll scroll-smooth scrollbar-hide'
          >
            {movies?.map((movie) => (
              <div key={movie.id} className='w-[140px] shrink-0 md:w-[180px]'>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {/* Left fade */}
          <div
            className={`pointer-events-none absolute left-0 top-0 h-full w-24 md:w-32 bg-gradient-to-r from-black to-transparent transition-opacity duration-300 ${
              scrollPosition > 0 ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Right fade */}
          <div className='pointer-events-none absolute right-0 top-0 h-full w-24 md:w-32 bg-gradient-to-l from-black to-transparent' />

          <ArrowLeft onClick={slideLeft} visible={scrollPosition > 0} />
          <ArrowRight onClick={slideRight} />
        </div>
      </div>
    </motion.section>
  );
}
