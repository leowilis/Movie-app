import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '../../features/ui/icons/SearchIcon';
import { CloseIcon } from '../../features/ui/icons/CloseIcon';
import { MenuIcon } from '../../features/ui/icons/MenuIcon';
import { navItems } from '@/constants/navItems';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/assets/icon-logo/Logo.svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl bg-black/50' : 'bg-transparent'
      }`}
    >
      <div className='flex h-15 items-center justify-between px-3'>
        {/* Search bar mode */}
        {searchOpen ? (
          <div className='flex items-center w-full gap-3 bg-white/10 rounded-full px-5 py-2'>
            <SearchIcon className='w-5 h-5 text-white/50 shrink-0' />
            <input
              ref={inputRef}
              type='text'
              placeholder='Search movies, series...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className='w-full bg-transparent text-white outline-none placeholder:text-white/40 text-base'
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
              }}
              className='text-white/50 hover:text-white transition-colors bg-transparent border-none shrink-0'
            >
              <CloseIcon className='w-5 h-5' />
            </button>
          </div>
        ) : (
          <>
            {/* Left Side */}
            <div className='flex items-center md:gap-20'>
              {/* Logo */}
              <img
                src={Logo}
                alt='Movie Logo'
                className='h-8 w-auto md:h-12 cursor-pointer'
                onClick={() => navigate('/')}
              />
            </div>

            {/* Right */}
            <div className='flex items-center gap-4'>
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className='text-white/70 hover:text-white transition-colors border-none bg-transparent'
              >
                <SearchIcon className='w-6 h-6' />
              </button>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className='text-white/70 hover:text-white transition-colors border-none bg-transparent md:hidden'
              >
                {open ? (
                  <CloseIcon className='w-6 h-6' />
                ) : (
                  <MenuIcon className='w-6 h-6' />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Desktop Header */}
      <nav className='hidden md:flex gap-12 text-xl'>
        <a
          href='/'
          className='group relative inline-block text-gray-300 hover:text-white transition-colors duration-300'
        >
          <span className='block transition-transform duration-300 group-hover:-translate-y-[1px]'>
            Home
          </span>
          <span className='absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-red-500 transition-transform duration-300 group-hover:scale-x-100' />
        </a>
        <a
          href='/favorites'
          className='group relative inline-block text-gray-300 hover:text-white transition-colors duration-300'
        >
          <span className='block transition-transform duration-300 group-hover:-translate-y-[1px]'>
            Favorites
          </span>
          <span className='absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-red-500 transition-transform duration-300 group-hover:scale-x-100' />
        </a>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className='fixed inset-0 z-40 bg-black flex flex-col px-5 pt-8 pb-12'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className='flex items-center justify-between'>
              <img src={Logo} alt='Logo' className='h-8' />
              <button
                onClick={() => setOpen(false)}
                className='text-white/50 active:text-white transition-colors'
              >
                <CloseIcon className='w-6 h-6' />
              </button>
            </div>

            <nav className='flex flex-col gap-2 mt-16'>
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className='flex items-center justify-between py-5 border-b border-white/10 transition-all duration-200'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  whileTap={{ x: 8, color: '#ef4444' }}
                >
                  <span className='text-2xl font-bold text-white'>
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className='mt-auto'>
              <p className='text-white/50 text-sm'>© 2026 Movie App</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
