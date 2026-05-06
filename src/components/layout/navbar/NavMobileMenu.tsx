import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { CloseIcon } from '@/features/ui/icons/CloseIcon';
import { navItems } from '@/constants/navItems';
import Logo from '@/assets/icon-logo/Logo.svg';

interface NavMobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function NavMobileMenu({ open, onClose }: NavMobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 bg-black flex flex-col px-5 pt-8 pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <img src={Logo} alt="Logo" className="h-8" />
            <button
              onClick={onClose}
              className="text-white/50 active:text-white transition-colors"
              aria-label="Close menu"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-2 mt-16">
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
                  className="flex items-center justify-between py-5 border-b border-white/10 transition-all duration-200"
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

          <div className="mt-auto">
            <p className="text-white/50 text-sm">© 2026 Movie App</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}