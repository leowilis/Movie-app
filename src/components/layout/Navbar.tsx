import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '@/features/ui/icons/SearchIcon';
import { MenuIcon } from '@/features/ui/icons/MenuIcon';
import { CloseIcon } from '@/features/ui/icons/CloseIcon';
import NavSearchBar from './navbar/NavSearchBar';
import NavDesktopLinks from './navbar/NavDesktopLinks';
import NavMobileMenu from './navbar/NavMobileMenu';
import Logo from '@/assets/icon-logo/Logo.svg';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300`}>
      <div className='flex h-15 items-center justify-between px-3'>
        {searchOpen ? (
          <NavSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClose={handleCloseSearch}
          />
        ) : (
          <>
            {/* Logo */}
            <img
              src={Logo}
              alt='Movie Logo'
              className='h-8 w-auto md:h-12 cursor-pointer'
              onClick={() => navigate('/')}
            />

            {/* Right actions */}
            <div className='flex items-center gap-4'>
              <button
                onClick={() => setSearchOpen(true)}
                className='text-white/70 hover:text-white transition-colors'
                aria-label='Open search'
              >
                <SearchIcon className='w-6 h-6' />
              </button>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className='text-white/70 hover:text-white transition-colors md:hidden'
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? (
                  <CloseIcon className='w-6 h-6' />
                ) : (
                  <MenuIcon className='w-6 h-6' />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      <NavDesktopLinks />

      <NavMobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
