import { useState, useEffect } from 'react';

interface UseScrollVisibilityOptions {
  threshold?: number;
}

/**
 * Returns `visible: true` ONLY when the page is scrolled at or near the very top.
 * Hides immediately once the user scrolls past `threshold` px.
 * Does NOT re-show on scroll-up — only when back at the top.
 */
export function useScrollVisibility({
  threshold = 10,
}: UseScrollVisibilityOptions = {}) {
  const [visible, setVisible] = useState(window.scrollY <= threshold);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY <= threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { visible };
}
