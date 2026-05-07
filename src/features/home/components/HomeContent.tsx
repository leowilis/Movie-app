import HeroSection from './hero/HeroSection';
import TrendingSection from './TrendingSection';
import NewRelease from './NewRelease';

export default function HomeContent() {
  return (
    <main className='relative w-full overflow-hidden'>
      <HeroSection />
      <TrendingSection />
      <NewRelease />
    </main>
  );
}
