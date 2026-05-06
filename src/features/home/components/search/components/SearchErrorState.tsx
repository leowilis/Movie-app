export default function SearchErrorState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 py-20 gap-3">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="28" fill="#1e1e1e" stroke="#3f3f3f" strokeWidth="2" />
        <path
          d="M32 20v14M32 40v2"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div className="text-center">
        <p className="text-white text-[15px] font-semibold mb-1">
          Something went wrong
        </p>
        <p className="text-zinc-500 text-sm">Please check your connection and try again</p>
      </div>
    </div>
  );
}