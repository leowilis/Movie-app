import { createBrowserRouter } from 'react-router-dom';
import Home from '../App';
import SearchPage from '../components/pages/SearchPage';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
]);

export default Router;
