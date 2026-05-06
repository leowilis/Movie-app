import { NavLink } from 'react-router';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Favorite', href: '/favorites' },
];

export default function NavDesktopLinks() {
  return (
    <nav className='hidden md:flex gap-12 text-xl'>
      {links.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          end
          className='group relative inline-block text-gray-300 hover:text-white transition-colors duration-300'
        >
          <span className='block transition-transform duration-300 group-hover:-translate-y-[1px]'>
            {link.label}
          </span>
          <span className='absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-red-500 transition-transform duration-300 group-hover:scale-x-100' />
        </NavLink>
      ))}
    </nav>
  );
}
