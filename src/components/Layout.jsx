import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const is404Page = location.pathname === '/404' || location.pathname.includes('not-found');

  return (
    <div className="min-h-screen flex flex-col">
      {!is404Page && <Navbar />}
      <main className="grow pt-24">
        <Outlet />
      </main>
      {!is404Page && <Footer />}
    </div>
  );
};

export default Layout;
