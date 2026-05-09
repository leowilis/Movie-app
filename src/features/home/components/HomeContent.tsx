import HeroSection from '@/features/home/components/HeroSection';
import NewRelease from '@/features/home/components/NewRelease';
import TrendingSection from '@/features/home/components/TrendingSection';

export default function HomeContent() {
  return (
    <main className='relative w-full overflow-hidden'>
      <HeroSection />
      <TrendingSection />
      <NewRelease />
    </main>
  );
}
