import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingContact from './FloatingContact';

const RouteSuspenseFallback = () => (
  <div className="min-h-[70vh] bg-[#FAFBFF] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-brand-blue/20 border-t-brand-red animate-spin" />
  </div>
);

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#FAFBFF]">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<RouteSuspenseFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <FloatingContact />
      <Footer />
    </div>
  );
};

export default Layout;

