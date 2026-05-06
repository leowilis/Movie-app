import BackIcon from '@/features/ui/icons/BackIcon';
import { CloseIcon } from '@/features/ui/icons/CloseIcon';
import { SearchIcon } from '@/features/ui/icons/SearchIcon';
import { useNavigate } from 'react-router';

// Interface defining the operational contract for the SearchBar component
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

/**
 * A highly interactive search header component.
 * Features a hardware-like back navigation, auto-focusing input,
 * and a conditional clear button for optimal mobile discovery UX.
 */
export default function SearchBar({
  value,
  onChange,
  onClear,
}: SearchBarProps) {
  const navigate = useNavigate();

  return (
    <div className='flex items-center gap-3 px-4 py-3 bg-black'>
      {/* Back button */}
      <button onClick={() => navigate(-1)}>
        <BackIcon className='w-5 h-5' />
      </button>

      {/* Input wrapper */}
      <div className='flex-1 flex items-center gap-2 bg-[#1e1e1e] border border-zinc-800 rounded-xl px-3 py-2'>
        <SearchIcon className='w-4 h-4 text-zinc-500 flex-shrink-0' />
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder='Search Movie'
          autoFocus
          className='flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none'
        />
        {value.length > 0 && (
          <button
            onClick={onClear}
            className='flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-zinc-700 active:opacity-60 transition-opacity'
            aria-label='Clear search'
          >
            <CloseIcon className='w-3 h-3 text-white' />
          </button>
        )}
      </div>
    </div>
  );
}
