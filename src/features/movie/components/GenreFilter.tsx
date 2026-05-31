import { motion } from 'framer-motion';
import { Genre } from '@/features/types/Movie';

interface GenreFilterProps {
  genres: Genre[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

/**
 * GenreFilter renders a horizontally scrollable row of genre pill buttons.
 * Includes an "All" pill to reset the filter.
 */
export default function GenreFilter({ genres, selectedId, onSelect }: GenreFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {/* All pill */}
      <motion.button
        onClick={() => onSelect(null)}
        className={`shrink-0 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          selectedId === null
            ? 'bg-red-600 text-white'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        All
      </motion.button>

      {genres.map((genre) => (
        <motion.button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedId === genre.id
              ? 'bg-red-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {genre.name}
        </motion.button>
      ))}
    </div>
  );
}