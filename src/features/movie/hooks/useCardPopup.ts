import { useState, useRef, useCallback } from 'react';

interface PopupPosition {
  top: number;
  left: number;
  width: number;
  transformOrigin: string;
}

/**
 * Manages hover popup positioning relative to the hovered card.
 * Calculates left/right/center alignment to prevent viewport overflow.
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
      const popupWidth = 280;
      const viewportWidth = window.innerWidth;

      let left = rect.left + rect.width / 2 - popupWidth / 2;
      let transformOrigin = 'center top';

      if (left < 8) {
        left = rect.left;
        transformOrigin = 'left top';
      } else if (left + popupWidth > viewportWidth - 8) {
        left = rect.right - popupWidth;
        transformOrigin = 'right top';
      }

      setPosition({
        top: rect.top + window.scrollY - 8,
        left,
        width: popupWidth,
        transformOrigin,
      });
      setIsOpen(true);
    }, 500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    leaveTimer.current = setTimeout(() => setIsOpen(false), 200);
  }, []);

  const handlePopupMouseEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const handlePopupMouseLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setIsOpen(false), 200);
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
