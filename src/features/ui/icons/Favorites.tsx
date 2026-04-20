import { motion } from 'framer-motion';

interface Props {
  isFavorite: boolean;
  onClick: () => void;
}

export default function FavoriteButton({ isFavorite, onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 ${
        isFavorite
          ? 'bg-red-500 text-white'
          : 'bg-white/10 text-white/60 hover:bg-white/20'
      }`}
    >
      <svg
        viewBox='0 0 24 24'
        className='w-5 h-5'
        stroke='currentColor'
        strokeWidth='2'
        fill={isFavorite ? 'currentColor' : 'none'}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        />
      </svg>
    </motion.button>
  );
}