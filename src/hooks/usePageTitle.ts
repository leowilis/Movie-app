import { useEffect } from 'react';

const APP_NAME = 'Movie App';

/**
 * usePageTitle sets the browser tab title for each page.
 * Falls back to the app name if no title is provided.
 */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${APP_NAME}` : APP_NAME;
    return () => {
      document.title = APP_NAME;
    };
  }, [title]);
}
