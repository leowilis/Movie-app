import { useRef, useState } from 'react';
import { useNewRelease } from './hooks/useNewRelease';
import { motion } from 'framer-motion';

export default function NewRelease() {
  const { data: movies, isLoading } = useNewRelease();
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      className='py-8'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
    >
      <div className='layout-gutter'>
        <h2 className='text-white text-3xl font-bold mb-12 px-2'>
          New Release
        </h2>

        <div>
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className='flex gap-6 overflow-x-scroll scroll-smooth scrollbar-hide px-6'
          ></div>
        </div>
      </div>
    </motion.section>
  );
}
