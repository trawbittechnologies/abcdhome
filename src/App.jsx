import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/layout/LoadingScreen';
import Home from './pages/Home';

// Lazy load secondary pages for ultra-fast initial page load & route code-splitting
const Projects = lazy(() => import('./pages/Projects'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));

// Fallback loader for secondary route transitions
const RouteSuspenseFallback = () => (
  <div className="min-h-screen bg-[#FAFBFF] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-brand-blue/20 border-t-brand-red animate-spin" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteSuspenseFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="site-loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <Router>
        <AnimatedRoutes />
      </Router>
    </>
  );
}

export default App;
