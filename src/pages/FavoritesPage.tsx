import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import BackButton from '@/features/ui/BackButton';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FavoriteMovieCard from '@/features/movie/components/FavoriteMovieCard';
import { usePageTitle } from '@/hooks/usePageTitle';

// Stagger variants for the favorites grid
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

// Per-card enter animation variant
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/**
 * FavoritesPage displays all movies saved to the user's favorites in a numbered grid with heart badges.
 * Shows an empty state with a browse prompt when no favorites exist.
 */
export default function FavoritesPage() {
  const { favorites } = useFavoriteStore();

  usePageTitle('My Favorites');

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar />

      <div className='layout-gutter pt-20 pb-16 md:pt-28'>
        {/* Header */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='flex items-center gap-3'>
            <BackButton variant='inline' className='md:hidden' />
            <h1 className='text-2xl font-bold md:text-3xl'>My Favorites</h1>
          </div>
          <p className='text-sm text-zinc-500 mt-1 flex items-center gap-1.5'>
            {favorites.length > 0 ? (
              <>
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='text-red-500'
                  aria-hidden='true'
                >
                  <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                </svg>
                {favorites.length} movie{favorites.length !== 1 ? 's' : ''}{' '}
                saved
              </>
            ) : (
              'Your personal movie collection'
            )}
          </p>
        </motion.div>

        {/* Empty state */}
        {favorites.length === 0 && (
          <motion.div
            className='flex flex-col items-center justify-center gap-4 mt-32 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center'>
              <svg
                width='28'
                height='28'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                className='text-zinc-600'
                aria-hidden='true'
              >
                <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
              </svg>
            </div>
            <div>
              <p className='text-white/60 text-base font-medium'>
                No favorites yet
              </p>
              <p className='text-white/30 text-sm mt-1'>
                Save movies you love and find them here
              </p>
            </div>
            <Link
              to='/'
              className='mt-2 px-6 py-2.5 rounded-full border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-white hover:text-white hover:bg-white/5 active:scale-95 transition-all duration-200'
            >
              Browse Movies
            </Link>
          </motion.div>
        )}

        {/* Favorites grid */}
        {favorites.length > 0 && (
          <motion.div
            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'
            variants={gridVariants}
            initial='hidden'
            animate='visible'
          >
            {favorites.map((movie, index) => (
              <motion.div key={movie.id} variants={cardVariants}>
                <FavoriteMovieCard movie={movie} index={index + 1} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
