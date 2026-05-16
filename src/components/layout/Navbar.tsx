import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '@/features/ui/icons/SearchIcon';
import { MenuIcon } from '@/features/ui/icons/MenuIcon';
import { CloseIcon } from '@/features/ui/icons/CloseIcon';
import NavSearchBar from './navbar/NavSearchBar';
import NavDesktopLinks from './navbar/NavDesktopLinks';
import NavMobileMenu from './navbar/NavMobileMenu';
import Logo from '@/assets/icon-logo/Logo.svg';

/**
 * Navbar renders the top navigation bar.
 *
 * Mobile: Logo + hamburger menu + search icon
 * Desktop: Logo + nav links (center) + search icon (right), all in one row
 */
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
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl bg-black/50' : 'bg-transparent'
      }`}
    >
      <div className='flex h-15 items-center justify-between px-3'>
        {/* Mobile: replace entire bar when search open */}
        {searchOpen && (
          <div className='flex md:hidden w-full'>
            <NavSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClose={handleCloseSearch}
            />
          </div>
        )}

        {/* Logo */}
        <img
          src={Logo}
          alt='Movie Logo'
          className={`h-8 w-auto md:h-10 cursor-pointer shrink-0 ${
            searchOpen ? 'hidden md:block' : 'block'
          }`}
          onClick={() => navigate('/')}
        />

        {/* Desktop center nav links */}
        <NavDesktopLinks />

        {/* Right actions */}
        <div
          className={`items-center gap-4 ${searchOpen ? 'hidden md:flex' : 'flex'}`}
        >
          {/* Desktop: inline search bar */}
          <div className='hidden md:flex w-64'>
            <NavSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClose={() => setSearchQuery('')}
            />
          </div>

          {/* Mobile: search icon toggle */}
          <button
            onClick={() => setSearchOpen(true)}
            className='text-white/70 hover:text-white transition-colors md:hidden'
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
      </div>

      <NavMobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
