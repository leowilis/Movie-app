import { useRef, useState } from 'react';

const SCROLL_DISTANCE = 300;

/**
 * Custom hook to orchestrate horizontal slider/carousel functionality.
 * Manages scroll position tracking and provides programmatic smooth-scrolling methods for navigation controls.
 *
 * - sliderRef: React ref to be attached to the scrollable container.
 * - scrollPosition: The current horizontal scroll offset.
 * - handleScroll: Event handler to sync the internal state with the DOM scroll.
 * - slideLeft: Function to scroll the container to the left by SCROLL_DISTANCE.
 * - slideRight: Function to scroll the container to the right by SCROLL_DISTANCE.
 */
export function useSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Synchronizes the internal scrollPosition state with the actual DOM scroll offset
  const handleScroll = () => {
    if (sliderRef.current) {
      setScrollPosition(sliderRef.current.scrollLeft);
    }
  };

  // Triggers a smooth horizontal scroll to the left
  const slideLeft = () => {
    sliderRef.current?.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
  };

  // Triggers a smooth horizontal scroll to the right
  const slideRight = () => {
    sliderRef.current?.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
  };

  return {
    sliderRef,
    scrollPosition,
    handleScroll,
    slideLeft,
    slideRight,
  };
}
