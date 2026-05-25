import { motion } from 'framer-motion';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

interface MovieHeroBackdropProps {
  backdropPath: string;
  title: string;
}

// MovieHeroBackdrop renders the full-width backdrop image with gradient overlays
export default function MovieHeroBackdrop({
  backdropPath,
  title,
}: MovieHeroBackdropProps) {
  return (
    <div className='relative h-[50vh] md:h-[85vh] w-full overflow-hidden'>
      <motion.img
        src={`${IMAGE_BASE}${backdropPath}`}
        alt={title}
        className='w-full h-full object-cover object-top'
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      {/* Mobile gradient */}
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent md:hidden' />

      {/* Desktop gradient */}
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent' />
      <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent' />
    </div>
  );
}
