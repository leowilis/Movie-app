interface Props {
  rating: number;
}

export default function StarRating({ rating }: Props) {
  return (
    <span className='flex items-center gap-1 text-sm text-white/70'>
      <span className='text-yellow-400'>★</span>
      {rating.toFixed(1)}/10
    </span>
  );
}
