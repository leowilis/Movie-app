import { CloseIcon } from '@/features/ui/icons/CloseIcon';
import { SearchIcon } from '@/features/ui/icons/SearchIcon';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

interface NavSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function NavSearchBar({
  value,
  onChange,
  onClose,
}: NavSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      onClose();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className='flex items-center w-full gap-3 bg-white/10 rounded-full px-5 py-2'>
      <SearchIcon className='w-5 h-5 text-white/50 shrink-0' />
      <input
        ref={inputRef}
        type='text'
        placeholder='Search movies, series...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className='w-full bg-transparent text-white outline-none placeholder:text-white/40 text-base'
      />
      <button
        onClick={onClose}
        className='text-white/50 hover:text-white transition-colors shrink-0'
        aria-label='CLose search'
      >
        <CloseIcon className='w-5 h-5' />
      </button>
    </div>
  );
}
