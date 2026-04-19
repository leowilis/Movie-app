import { Link } from 'react-router-dom';
import { navItems } from '@/constants/navItems';
import Logo from '@/assets/icon-logo/Logo.svg';

export default function Footer() {
  return (
    <footer className='relative mt-16 overflow-hidden'>
      {/* Background with gradient cinematic */}
      <div className='absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent' />

      <div className='relative layout-gutter py-14'>
        {/* Main Content */}
        <div className='flex flex-col items-center text-center gap-8'>
          {/* Brand */}
          <div className='flex flex-col items-center gap-3'>
            <div className='flex items-center gap-2'>
              <img src={Logo} alt='logo' />
            </div>
            <p className='text-white/30 text-sm max-w-xs leading-relaxed'>
              Your ultimate destination for discovering films, trailers, and
              cinematic experiences.
            </p>
          </div>

          {/* Nav Links horizontal */}
          <nav className='flex flex-wrap justify-center gap-x-8 gap-y-3'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className='text-white/50 text-sm hover:text-white transition-colors duration-200 relative group'
              >
                {item.label}
                <span className='absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300' />
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className='w-full border-t border-white/5' />

          {/* Bottom */}
          <p className='text-white/20 text-xs'>
            © {new Date().getFullYear()} Movie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
