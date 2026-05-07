import { useState } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'favorite' | 'outline';
type ButtonSize = 'xs' | 'sm' | 'lg';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
  isFavorite?: boolean;
  compact?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  isFavorite = false,
  compact = false,
  size = 'lg',
  disabled = false,
}: ButtonProps) {
  const [justClicked, setJustClicked] = useState(false);

  const handleFavoriteClick = () => {
    if (disabled) return;
    onClick?.();
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 600);
  };

  if (variant === 'favorite') {
    const sizeClass =
      size === 'lg' ? 'w-16 h-16' : size === 'sm' ? 'w-14 h-14' : 'w-10 h-10';
    const iconSize =
      size === 'lg' ? 'w-7 h-7' : size === 'sm' ? 'w-6 h-6' : 'w-5 h-5';

    return (
      <button
        onClick={handleFavoriteClick}
        disabled={disabled}
        className={`
          ${sizeClass} rounded-xl flex items-center justify-center
          transition-all duration-200
          ${justClicked ? 'pointer-events-none' : ''}
          ${
            isFavorite
              ? 'bg-red-500 hover:bg-red-700'
              : 'bg-transparent border-2 border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50'
          }
          disabled:opacity-40 disabled:cursor-not-allowed
          ${className}
        `}
      >
        <svg
          className={`${iconSize} ${isFavorite ? 'fill-white' : 'fill-none'} transition-colors duration-200`}
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
          />
        </svg>
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full sm:w-auto rounded-xl bg-zinc-800/50 active:scale-95 px-10 py-3 font-semibold text-white/70 hover:bg-zinc-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      >
        {children}
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center gap-2 bg-red-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-red-900 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      >
        {children}
      </button>
    );
  }

  // Primary (default)
  const padding = compact ? 'px-5 py-3 text-sm' : 'px-8 py-3';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full sm:w-auto flex items-center justify-center sm:justify-start gap-3 rounded-xl font-semibold transition-all duration-200 bg-transparent active:scale-95 active:bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed ${padding} ${className}`}
    >
      {children}
    </button>
  );
}
