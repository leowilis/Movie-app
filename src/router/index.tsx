import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import FavoritesPage from '@/pages/FavoritesPage';
import NowPlayingPage from '@/pages/NowPlayingPage';

const Router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/search', element: <SearchPage /> },
  { path: '/now-playing', element: <NowPlayingPage /> },
  { path: '/movie/:id', element: <MovieDetailPage /> },
  { path: '/favorites', element: <FavoritesPage /> },
]);

export default Router;
