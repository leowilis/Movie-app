import { useState, useRef, useCallback } from 'react';

interface PopupPosition {
  top: number;
  left: number;
  width: number;
  transformOrigin: string;
}

/**
 * Manages hover popup open state and viewport-aware positioning.
 * Uses fixed coordinates from getBoundingClientRect for correct placement.
 */
export function useCardPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PopupPosition | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);

    enterTimer.current = setTimeout(() => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const POPUP_WIDTH = 280;
      const viewportWidth = window.innerWidth;

      let left = rect.left + window.scrollX + rect.width / 2 - POPUP_WIDTH / 2;
      let transformOrigin = 'center top';

      if (left < 8) {
        left = rect.left + window.scrollX;
        transformOrigin = 'left top';
      } else if (left + POPUP_WIDTH > viewportWidth - 8) {
        left = rect.right + window.scrollX - POPUP_WIDTH;
        transformOrigin = 'right top';
      }

      setPosition({
        top: rect.top + window.scrollY - 8,
        left,
        width: POPUP_WIDTH,
        transformOrigin,
      });
      setIsOpen(true);
    }, 500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    leaveTimer.current = setTimeout(() => setIsOpen(false), 300);
  }, []);

  const handlePopupMouseEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const handlePopupMouseLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setIsOpen(false), 300);
  }, []);

  return {
    cardRef,
    isOpen,
    position,
    handleMouseEnter,
    handleMouseLeave,
    handlePopupMouseEnter,
    handlePopupMouseLeave,
  };
}