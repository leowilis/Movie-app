import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import './index.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Toaster position='top-center' theme='dark' />
      <HomePage />
    </>
  );
}

export default App;
