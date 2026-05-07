const MAX_DOTS = 8;

interface HeroDotsProps {
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function HeroDots({ total, activeIndex, onSelect }: HeroDotsProps) {
  const count = Math.min(total, MAX_DOTS);

  return (
    <div className="relative justify-center bottom-6 z-10 flex gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
          }`}
        />
      ))}
    </div>
  );
}