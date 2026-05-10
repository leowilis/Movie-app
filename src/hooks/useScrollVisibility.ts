import { useState, useEffect, useRef } from 'react';

interface UseScrollVisibilityOptions {
  // Scroll position (px) below which the element hides. Default: 80
  threshold?: number;
  // Delay before hiding starts after scrolling down (ms). Default: 120
  hideDelay?: number;
}

/**
 * Custom hook to manage the visibility of UI elements (like Navbars or FABs)
 * based on the user's scroll direction and vertical position.
 *
 * Logic:
 * -Remains visible at the top of the page (below threshold).
 * -Hides after a delay when scrolling down.
 * -Re-appears immediately when any upward scroll is detected.
 */
export function useScrollVisibility({
  threshold = 80,
  hideDelay = 120,
}: UseScrollVisibilityOptions = {}) {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastScrollY.current;

      lastScrollY.current = currentY;

      if (timerRef.current) clearTimeout(timerRef.current);

      if (currentY <= threshold || scrollingUp) {
        // Show immediately when near top or scrolling up
        setVisible(true);
      } else {
        // Hide after a short delay when scrolling down past threshold
        timerRef.current = setTimeout(() => {
          setVisible(false);
        }, hideDelay);
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [threshold, hideDelay]);

  return { visible };
}
