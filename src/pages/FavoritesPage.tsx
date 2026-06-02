import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import BackButton from '@/features/ui/BackButton';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchResultCard from '@/features/home/components/search/components/SearchResultCard';
import { usePageTitle } from '@/hooks/usePageTitle';

/**
 * FavoritesPage displays all movies saved to the user's favorites.
 * Shows an empty state with a browse prompt when no favorites exist.
 */
export default function FavoritesPage() {
  const { favorites } = useFavoriteStore();
  // Dynamic browser tab title
  usePageTitle('My Favorites');

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar />

      <div className='layout-gutter pt-20 pb-16 md:pt-28'>
        {/* Header */}
        <motion.div
          className='flex items-center gap-3 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button & Title Page */}
          <BackButton variant='inline' className='md:hidden' />
          <h1 className='text-2xl font-bold md:text-3xl'>My Favorites</h1>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            className='flex flex-col items-center justify-center gap-4 mt-32 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className='text-6xl' aria-hidden='true'>
              🎬
            </span>
            <p className='text-white/50 text-lg'>No favorites yet.</p>
            <p className='text-white/30 text-sm'>
              Start adding movies you love!
            </p>
            <Link
              to='/'
              className='mt-4 flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 active:scale-95 text-white text-sm font-semibold transition-all duration-200'
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M3 12h18M3 6h18M3 18h18' />
              </svg>
              Browse Movies
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className='flex flex-col md:grid md:grid-cols-1 md:gap-x-8'
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
                <SearchResultCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
