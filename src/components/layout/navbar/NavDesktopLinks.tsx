import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Search', href: '/search' },
  { label: 'Favorites', href: '/favorites' },
  { label: 'Now Playing', href: '/now-playing' },
];

/**
 * NavDesktopLinks renders horizontal navigation links for desktop screens.
 * Hidden on mobile — mobile navigation is handled by NavMobileMenu.
 * Shows an animated red underline on hover and active state.
 */
export default function NavDesktopLinks() {
  return (
    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
      {links.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          end={link.href === '/'}
          className={({ isActive }) =>
            `group relative inline-block transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-white/60 hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className="block transition-transform duration-300 group-hover:-translate-y-[1px]">
                {link.label}
              </span>
              <span
                className={`absolute -bottom-1 left-0 h-[1.5px] w-full origin-left bg-red-500 transition-transform duration-300 ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}