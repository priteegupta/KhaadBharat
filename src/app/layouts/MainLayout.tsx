import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";



export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-beige-cream text-brand-text">
      {/* Premium responsive sticky navbar */}
      <Navbar />

      {/* Main Route Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <Outlet />
      </main>

      {/* Premium responsive footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
