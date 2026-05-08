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
import TrailerModal from '@/components/movie/TrailerModal';
import Footer from '@/components/layout/Footer';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useMovieDetail(id ?? '');
  const { data: trailer } = useMovieTrailer(id ?? '');
  const { data: credits } = useMovieCredits(id ?? '');
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const [openTrailer, setOpenTrailer] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500 text-sm">Failed to load movie details.</p>
      </div>
    );
  }

  const isFavorited = isFavorite(movie.id);

  const handleToggleFavorite = () => {
    if (isFavorited) removeFavorite(movie.id);
    else addFavorite(movie);
  };

  return (
    <div className="min-h-screen text-white bg-black">
      {/* Backdrop */}
      <MovieHeroBackdrop
        backdropPath={movie.backdrop_path}
        title={movie.title}
      />

      {/* Content — poster + info side by side */}
      <div className="layout-gutter -mt-24 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <MoviePoster posterPath={movie.poster_path} title={movie.title} />

          {/* Info */}
          <MovieInfo
            movie={movie}
            trailer={trailer}
            isFavorited={isFavorited}
            onToggleFavorite={handleToggleFavorite}
            onWatchTrailer={() => setOpenTrailer(true)}
          />
        </div>

        <MovieStats movie={movie} />
        <MovieCast cast={credits?.cast ?? []} />
      </div>

      {openTrailer && trailer && (
        <TrailerModal
          videoKey={trailer.key}
          onClose={() => setOpenTrailer(false)}
        />
      )}

      <Footer />
    </div>
  );
}