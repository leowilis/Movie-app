import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useScrollVisibility } from '@/hooks/useScrollVisibility';

interface BackButtonProps {
  variant?: 'floating' | 'inline';
}

/**
 * BackButton renders a back navigation button in two variants:
 * - 'floating' (default): fixed to top-left, with backdrop blur. For pages without Navbar.
 * - 'inline': sits inside a flex row next to a title element.
 *
 * - Is always visible when the user is near the top of the page.
 * - Smoothly hides when scrolling down past 80px.
 * - Reappears immediately when scrolling back up.
 */
export default function BackButton({ variant = 'floating' }: BackButtonProps) {
  const navigate = useNavigate();
  const { visible } = useScrollVisibility({ threshold: 80, hideDelay: 120 });

  const floatingClass =
    'fixed top-4 left-4 z-50 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 shadow-lg';

  const inlineClass = 'relative w-9 h-9 bg-white/10 hover:bg-white/20';

  return (
    <motion.button
      onClick={() => navigate(-1)}
      className={`rounded-full flex items-center justify-center text-white transition-colors duration-200 ${
        variant === 'inline' ? inlineClass : floatingClass
      }`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.9 }}
      aria-label='Go back'
    >
      <svg
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M15 18l-6-6 6-6' />
      </svg>
    </motion.button>
  );
}
