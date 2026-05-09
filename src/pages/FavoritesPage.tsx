import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import MovieCard from '@/components/movie/MovieCard';
import BackButton from '@/features/ui/BackButton';
import Footer from '@/components/layout/Footer';

/**
 * FavoritesPage displays all movies saved to the user's favorites.
 * Shows an empty state with a browse prompt when no favorites exist.
 */
export default function FavoritesPage() {
  const { favorites } = useFavoriteStore();

  return (
    <div className="min-h-screen bg-black text-white">
      <BackButton />

      <div className="layout-gutter pt-24 pb-16">
        <motion.h1
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Favorites
        </motion.h1>

        {favorites.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center gap-4 mt-32 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-6xl" aria-hidden="true">🎬</span>
            <p className="text-white/50 text-lg">No favorites yet.</p>
            <p className="text-white/30 text-sm">Start adding movies you love!</p>
            <Link
              to="/"
              className="mt-4 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-200"
            >
              Browse Movies
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {favorites.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}