import { useState } from 'react';
import { useParams } from 'react-router';
import { useMovieDetail } from '@/features/movie/hooks/useMovieDetail';
import { useMovieTrailer } from '@/features/movie/hooks/useMovieTrailer';
import { useMovieCredits } from '@/features/movie/hooks/useMovieCredits';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import MovieHeroBackdrop from '@/features/movie/components/MovieHeroBackDrop';
import MoviePoster from '@/features/movie/components/MoviePoster';
import MovieInfo from '@/features/movie/components/MovieInfo';
import MovieStats from '@/features/movie/components/MovieStats';
import MovieCast from '@/features/movie/components/MovieCast';
import SimilarMovies from '@/features/movie/components/SimilarMovies';
import TrailerModal from '@/components/movie/TrailerModal';
import BackButton from '@/features/ui/BackButton';
import Footer from '@/components/layout/Footer';
import { usePageTitle } from '@/hooks/usePageTitle';
import Navbar from '@/components/layout/Navbar';

// Loading State
function LoadingScreen() {
  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <BackButton />
      <div className='w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin' />
    </div>
  );
}

// Error State
function ErrorScreen() {
  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <BackButton />
      <p className='text-zinc-500 text-sm'>Failed to load movie details.</p>
    </div>
  );
}

// Main Page

/**
 * MovieDetailPage displays full details for a single movie including
 * backdrop, poster, metadata, stats, cast, similar movies, and trailer modal.
 */
export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = id ?? '';

  const { data: movie, isLoading, isError } = useMovieDetail(movieId);
  const { data: trailer } = useMovieTrailer(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const [trailerOpen, setTrailerOpen] = useState(false);

  // Dynamic browser tab title
  usePageTitle(movie?.title);

  if (isLoading) return <LoadingScreen />;
  if (isError || !movie) return <ErrorScreen />;

  const isFavorited = isFavorite(movie.id);
  const cast = credits?.cast ?? [];

  const handleToggleFavorite = () => {
    if (isFavorited) removeFavorite(movie.id);
    else addFavorite(movie);
  };

  return (
    <div className='min-h-screen text-white bg-black'>
      {/* Navbar show on desktop only */}
      <div className='hidden md:block'>
        <Navbar />
      </div>

      {/* Back arrow show on mobile only */}
      <div className='fixed top-4 left-4 z-40 md:hidden'>
        <BackButton />
      </div>

      <MovieHeroBackdrop
        backdropPath={movie.backdrop_path ?? movie.poster_path}
        title={movie.title}
      />

      <div className='layout-gutter -mt-[20vw] relative z-10 pb-16'>
        <div className='flex flex-col md:flex-row gap-8'>
          <MoviePoster posterPath={movie.poster_path} title={movie.title} />
          <MovieInfo
            movie={movie}
            trailer={trailer}
            isFavorited={isFavorited}
            onToggleFavorite={handleToggleFavorite}
            onWatchTrailer={() => setTrailerOpen(true)}
          />
        </div>

        <div className='mt-8'>
          <h2 className='text-xl md:text-3xl font-bold mb-3'>Overview</h2>
          <p className='text-zinc-300 text-sm md:text-lg leading-relaxed'>
            {movie.overview}
          </p>
        </div>

        <MovieStats movie={movie} />
        <MovieCast cast={cast} />
        <SimilarMovies movieId={movieId} />
      </div>

      {trailerOpen && trailer && (
        <TrailerModal
          videoKey={trailer.key}
          onClose={() => setTrailerOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
}
