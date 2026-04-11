type IconProps = {
  className?: string;
};

export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      className={className}
    >
      <line x1='3' y1='6' x2='21' y2='6' />
      <line x1='3' y1='12' x2='21' y2='12' />
      <line x1='3' y1='18' x2='21' y2='18' />
    </svg>
  );
}
