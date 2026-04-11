export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width='24'
      height='24'
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
    >
      <circle cx='11' cy='11' r='8' />
      <line x1='21' y1='21' x2='16.65' y2='16.65' />
    </svg>
  );
}
