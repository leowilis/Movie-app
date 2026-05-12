import { usePageTitle } from '@/hooks/usePageTitle';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * NotFoundPage renders a custom 404 screen when the user navigates
 * to a route that does not exist.
 */
export default function NotFoundPage() {
  // Dynamic browser tab title
  usePageTitle('404 - Page Not Found');

  return (
    <div className='min-h-screen bg-black text-white flex flex-col items-center justify-center px-8 text-center'>
      {/* Clapperboard icon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          width='80'
          height='80'
          viewBox='0 0 96 96'
          fill='none'
          aria-hidden='true'
        >
          <rect x='8' y='30' width='80' height='52' rx='6' fill='#1e1e1e' />
          <rect x='8' y='18' width='80' height='16' rx='4' fill='#2a2a2a' />
          <path
            d='M18 18 L26 34'
            stroke='#444'
            strokeWidth='3.5'
            strokeLinecap='round'
          />
          <path
            d='M33 18 L41 34'
            stroke='#444'
            strokeWidth='3.5'
            strokeLinecap='round'
          />
          <path
            d='M48 18 L56 34'
            stroke='#444'
            strokeWidth='3.5'
            strokeLinecap='round'
          />
          <path
            d='M63 18 L71 34'
            stroke='#444'
            strokeWidth='3.5'
            strokeLinecap='round'
          />
          <text
            x='48'
            y='68'
            textAnchor='middle'
            fill='#ef4444'
            fontSize='22'
            fontWeight='bold'
            fontFamily='monospace'
          >
            404
          </text>
        </svg>
      </motion.div>

      {/* Text */}
      <motion.div
        className='mt-6 space-y-2'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h1 className='text-2xl font-bold'>Page Not Found</h1>
        <p className='text-zinc-500 text-sm'>
          The page you're looking for doesn't exist or has been moved.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className='mt-8'
      >
        <Link
          to='/'
          className='flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 active:scale-95 text-white text-sm font-semibold transition-all duration-200'
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
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
