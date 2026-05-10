import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { CloseIcon } from '@/features/ui/icons/CloseIcon';
import { navItems } from '@/constants/navItems';
import Logo from '@/assets/icon-logo/Logo.svg';

interface NavMobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * NavMobileMenu Component
 *
 * An immersive, full-screen mobile navigation overlay.
 *
 * Technical Orchestration:
 * -React Portal**: Renders to `document.body` to avoid Z-index fighting and parent overflow clipping.
 * -Scroll Management**: Implements a 'Scroll Lock' on the body element to maintain focus and prevent background movement.
 * -Choreographed Motion**: Utilizes staggered entry animations for menu items to create a premium feel.
 * -Route Awareness**: Uses `NavLink` for automatic active-state detection and closes the menu upon navigation.
 */
export default function NavMobileMenu({ open, onClose }: NavMobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Portals are used to ensure the menu sits at the top level of the DOM
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-[100] flex flex-col px-3 pt-3.5 pb-12 overflow-hidden'
          style={{ backgroundColor: '#000000' }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          {/* Menu Header */}
          <div className='flex items-center justify-between'>
            <img src={Logo} alt='Logo' className='h-8' />
            <button
              onClick={onClose}
              className='text-white/50 active:text-white transition-colors'
              aria-label='Close menu'
            >
              <CloseIcon className='w-6 h-6' />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className='flex flex-col gap-2 mt-16'>
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <NavLink
                  to={item.href}
                  end={item.href === '/'}
                  onClick={onClose}
                  className='flex items-center justify-between py-5 border-b border-white/10'
                >
                  {({ isActive }) => (
                    <span
                      className={`text-2xl font-bold transition-colors ${
                        isActive ? 'text-red-500' : 'text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Menu Footer: Metadata / Copyright */}
          <div className='mt-auto'>
            <p className='text-white/50 text-sm'>© 2026 Movie App</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
