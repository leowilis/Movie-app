import HeroSection from './HeroSection';
import TrendingSection from './TrendingSection';

export default function HomeContent() {
  return (
    <main className='relative w-full overflow-hidden'>
      <HeroSection />
      <TrendingSection />
    </main>
  );
}
