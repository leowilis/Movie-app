import { useEffect, useState } from 'react';

/**
 * A custom hook that delays updating a value until after a specified delay.
 * Primarily used to throttle high-frequency events like API calls on search inputs.
 */

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);

    // Cleanup timeout on value change or unmount to prevent memory leaks
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
