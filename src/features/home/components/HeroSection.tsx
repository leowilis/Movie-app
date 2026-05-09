import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useNowPlaying } from '@/features/home/components/hooks/useNowPlaying';
import { useMovieTrailer } from '@/features/movie/hooks/useMovieTrailer';
import HeroBackdrop from '@/features/home/components/hero/HeroBackDrop';
import HeroContent from '@/features/home/components/hero/HeroContent';
import HeroDots from '@/features/home/components/hero/HeroDots';
import TrailerModal from '@/components/movie/TrailerModal';

const AUTO_SLIDE_INTERVAL = 6000;

/**
 * HeroSection is the main hero carousel on the home page.
 * Displays now-playing movies with auto-slide, trailer modal,
 * and pause-on-hover behavior.
 */
export default function HeroSection() {
  const navigate = useNavigate();
  const { data: movies, isLoading, isError } = useNowPlaying();

  const [activeIndex, setActiveIndex] = useState(0);
  const [openTrailer, setOpenTrailer] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const movie = movies?.[activeIndex];
  const { data: trailer } = useMovieTrailer(movie?.id ? String(movie.id) : '');

  // Auto-slide — pauses on hover
  useEffect(() => {
    if (!movies?.length || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % movies.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [movies, isPaused]);

  // Reset trailer modal on slide change
  useEffect(() => {
    setOpenTrailer(false);
  }, [activeIndex]);

  const handleWatchTrailer = useCallback(() => {
    if (trailer) setOpenTrailer(true);
  }, [trailer]);

  const handleSeeDetail = useCallback(() => {
    if (movie) navigate(`/movie/${movie.id}`);
  }, [movie, navigate]);

  // Loading state
  if (isLoading) {
    return <section className='h-[82vh] w-full bg-zinc-900 animate-pulse' />;
  }

  // Error state
  if (isError || !movie) {
    return (
      <section className='h-[82vh] w-full bg-zinc-900 flex items-center justify-center'>
        <p className='text-zinc-500 text-sm'>Failed to load featured movies.</p>
      </section>
    );
  }

  return (
    <section
      className='relative h-[82vh] w-full overflow-hidden'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <HeroBackdrop
        movieId={movie.id}
        backdropPath={movie.backdrop_path}
        title={movie.title}
      />

      <HeroContent
        movie={movie}
        trailer={trailer}
        onWatchTrailer={handleWatchTrailer}
        onSeeDetail={handleSeeDetail}
      />

      <HeroDots
        total={movies.length}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />

      {openTrailer && trailer && (
        <TrailerModal
          videoKey={trailer.key}
          onClose={() => setOpenTrailer(false)}
        />
      )}
    </section>
  );
}
