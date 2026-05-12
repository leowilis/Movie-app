import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import FavoritesPage from '@/pages/FavoritesPage';
import NowPlayingPage from '@/pages/NowPlayingPage';
import NotFoundPage from '@/pages/NotFoundPage';

// ScrollToTop scrolls the window to the top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// RootLayout wraps all routes with ScrollToTop behavior
function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const Router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/now-playing', element: <NowPlayingPage /> },
      { path: '/movie/:id', element: <MovieDetailPage /> },
      { path: '/favorites', element: <FavoritesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default Router;
