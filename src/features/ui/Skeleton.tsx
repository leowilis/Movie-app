import { cn } from '@/lib/utils';

// Base Skeleton Primitive
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-zinc-800', className)}
      aria-hidden='true'
    />
  );
}

// Search Result Card Skeleton
export function SearchResultCardSkeleton() {
  return (
    <div className='mx-4 mb-3 bg-[#141414] rounded-2xl overflow-hidden'>
      <div className='flex gap-3 p-3'>
        <Skeleton className='w-[72px] h-[100px] flex-shrink-0 rounded-xl' />
        <div className='flex-1 flex flex-col gap-2 py-0.5'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-3 w-1/4' />
          <Skeleton className='h-3 w-full mt-1' />
          <Skeleton className='h-3 w-5/6' />
        </div>
      </div>
      <div className='flex gap-2.5 px-3 pb-3'>
        <Skeleton className='flex-1 h-10 rounded-xl' />
        <Skeleton className='w-10 h-10 rounded-xl' />
      </div>
    </div>
  );
}

// Movie Card Skeleton (horizontal scroll — HomePage)
export function MovieCardSkeleton() {
  return (
    <div className='shrink-0 w-[200px]'>
      <Skeleton className='h-[300px] w-full rounded-xl mb-3' />
      <Skeleton className='h-4 w-3/4 mb-2' />
      <Skeleton className='h-3 w-1/3' />
    </div>
  );
}

// Hero Section Skeleton
export function HeroSkeleton() {
  return <Skeleton className='w-full h-[480px] rounded-none' />;
}
