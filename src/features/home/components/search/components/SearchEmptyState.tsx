export default function SearchEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 py-20 gap-4">
      {/* Clapperboard + magnifier icon */}
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Board body */}
        <rect x="8" y="30" width="80" height="52" rx="6" fill="#2a2a2a" />
        {/* Clap strip */}
        <rect x="8" y="20" width="80" height="16" rx="4" fill="#3a3a3a" />
        {/* Diagonal stripes on strip */}
        <path d="M18 20 L26 36" stroke="#555" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M33 20 L41 36" stroke="#555" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M48 20 L56 36" stroke="#555" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M63 20 L71 36" stroke="#555" strokeWidth="3.5" strokeLinecap="round" />
        {/* Magnifier circle */}
        <circle cx="58" cy="62" r="15" fill="#222" stroke="#444" strokeWidth="2" />
        <circle cx="58" cy="62" r="9" fill="#1a1a1a" />
        {/* Magnifier handle */}
        <line x1="69" y1="73" x2="78" y2="82" stroke="#555" strokeWidth="4" strokeLinecap="round" />
        {/* X inside magnifier */}
        <path d="M54 58 L62 66" stroke="#666" strokeWidth="2" strokeLinecap="round" />
        <path d="M62 58 L54 66" stroke="#666" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <div className="text-center space-y-1">
        <p className="text-white text-[15px] font-semibold">Data Not Found</p>
        <p className="text-zinc-500 text-sm">Try other keywords</p>
      </div>
    </div>
  );
}