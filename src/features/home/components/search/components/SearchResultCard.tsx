import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Movie } from '@/features/types/Movie';
import StarRating from '@/features/ui/icons/StarRating';
import FavoriteButton from '@/features/ui/icons/Favorites';
import { useFavoriteStore } from '@/store/useFavoriteStore';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

interface SearchResultCardProps {
  movie: Movie;
}

export default function SearchResultCard({ movie }: SearchResultCardProps) {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const favorite = isFavorite(movie.id);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const handleNavigate = () => navigate(`/movie/${movie.id}`);

  const handleTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleFavorite();
  };

  return (
    <div
      onClick={handleNavigate}
      className="mx-4 mb-3 bg-[#141414] rounded-2xl overflow-hidden active:scale-[0.99] transition-transform duration-150 cursor-pointer"
    >
      {/* Top: poster + info */}
      <div className="flex gap-3 p-3">
        {/* Poster */}
        <div className="w-[72px] h-[100px] flex-shrink-0 rounded-xl overflow-hidden bg-zinc-800 relative">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-zinc-700 animate-pulse" />
          )}
          {movie.poster_path ? (
            <img
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs text-center px-1">
              No Image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
          <div>
            <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 mb-1.5">
              {movie.title}
            </h3>
            <StarRating rating={movie.vote_average} />
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 mt-2">
            {movie.overview || 'No description available.'}
          </p>
        </div>
      </div>

      {/* Bottom: watch trailer + favorite */}
      <div className="flex items-center gap-2.5 px-3 pb-3">
        <button
          onClick={handleTrailer}
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-xl py-2.5 transition-colors duration-150"
        >
          <span className="text-white text-xs font-semibold tracking-wide">
            Watch Trailer
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)" />
            <path d="M10 8.5L15.5 12L10 15.5V8.5Z" fill="white" />
          </svg>
        </button>

        {/* Wrapper div to stop click propagation from parent card */}
        <div onClick={handleFavoriteClick}>
          <FavoriteButton
            isFavorite={favorite}
            onClick={handleToggleFavorite}
          />
        </div>
      </div>
    </div>
  );
}