import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const is404Page =
    location.pathname === "/404" || location.pathname.includes("not-found");
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar hidden on 404 page */}
      {!is404Page && <Navbar />}

      <main className="flex-grow pt-24">
        {isHomePage ? (
          <Outlet />
        ) : (
          <div className="max-w-7xl w-11/12 mx-auto">
            <Outlet />
          </div>
        )}
      </main>

      {/* Footer hidden on 404 page */}
      {!is404Page && <Footer />}
    </div>
  );
};

export default Layout;
