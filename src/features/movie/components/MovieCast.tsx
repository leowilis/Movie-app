import { motion } from 'framer-motion';
import { CastMember } from '@/features/types/Movie';

const CAST_LIMIT = 10;
const PROFILE_BASE = 'https://image.tmdb.org/t/p/w185';

interface MovieCastProps {
  cast: CastMember[];
}

/**
 * MovieCast renders a list of top cast members with their profile photo,
 * name, and character. Limits display to the top CAST_LIMIT entries.
 */
export default function MovieCast({ cast }: MovieCastProps) {
  if (cast.length === 0) return null;

  return (
    <motion.section
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      aria-label="Cast"
    >
      <h2 className="text-2xl font-bold mb-4">Cast & Crew</h2>
      <div className="flex flex-col">
        {cast.slice(0, CAST_LIMIT).map((person, index) => (
          <motion.div
            key={person.id}
            className="flex items-center gap-4 py-4 border-b border-white/10"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {person.profile_path ? (
              <img
                src={`${PROFILE_BASE}${person.profile_path}`}
                alt={person.name}
                className="w-[100px] h-full rounded-xl object-cover shrink-0"
              />
            ) : (
              <div className="w-[100px] h-40 rounded-xl bg-white/10 shrink-0 flex items-center justify-center text-white/30 text-xl">
                ?
              </div>
            )}
            <div>
              <p className="text-white font-semibold text-sm">{person.name}</p>
              <p className="text-white/40 text-xs mt-0.5">{person.character}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}