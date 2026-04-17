import { useTrendingMovies } from '@/features/home/components/hooks/useTrendingMovie';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import MovieCard from '@/components/movie/MovieCard';
import ArrowLeft from '@/features/ui/icons/ArrowLeft';
import ArrowRight from '@/features/ui/icons/ArrowRight';

export default function TrendingSection() {
  const { data: movies, isLoading, isError } = useTrendingMovies();
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (sliderRef.current) {
      setScrollPosition(sliderRef.current.scrollLeft);
    }
  };

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section className='py-8'>
        <div className='h-6 w-32 bg-white/10 rounded-lg mb-4 mx-6 animate-pulse' />
        <div className='flex gap-6 px-6'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className='shrink-0 w-32 h-48 bg-white/10 rounded-xl animate-pulse'
            />
          ))}
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
          Trending Now
        </h2>

        <div className='relative'>
          {/* Slider */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className='flex gap-6 overflow-x-scroll scroll-smooth scrollbar-hide'
          >
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Left Fade */}
          <div
            className={`pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent transition-opacity duration-300 ${
              scrollPosition > 0 ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Right Fade */}
          <div className='pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent' />

          {/* Arrows */}
          <ArrowLeft onClick={slideLeft} visible={scrollPosition > 0} />
          <ArrowRight onClick={slideRight} />
        </div>
      </div>
    </motion.section>
  );
}
