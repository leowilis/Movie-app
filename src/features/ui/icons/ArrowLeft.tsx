interface ArrowProps {
  onClick: () => void;
  visible?: boolean;
}

export default function ArrowLeft({ onClick, visible = true }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-black active:scale-95 transition-all duration-200 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='white'
        strokeWidth='2.5'
        strokeLinecap='round'
      >
        <path d='M15 18l-6-6 6-6' />
      </svg>
    </button>
  );
}
