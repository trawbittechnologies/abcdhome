import { useState, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadingScreen from './components/layout/LoadingScreen';
import Home from './pages/Home';

// Lazy load secondary pages for ultra-fast initial page load & route code-splitting
const Projects = lazy(() => import('./pages/Projects'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Show cinematic intro once per session, instant for subsequent navigations
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return !sessionStorage.getItem('abcd_intro_shown');
    }
    return true;
  });

  const handleLoadingComplete = () => {
    try {
      sessionStorage.setItem('abcd_intro_shown', 'true');
    } catch {}
    setIsLoading(false);
  };

  // Prefetch secondary route chunks in idle time for instantaneous route switching
  useEffect(() => {
    const prefetchRoutes = () => {
      import('./pages/Projects');
      import('./pages/Services');
      import('./pages/About');
      import('./pages/ProcessPage');
      import('./pages/Gallery');
      import('./pages/Contact');
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(prefetchRoutes);
    } else {
      setTimeout(prefetchRoutes, 1800);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="site-loader" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <Router>
        <ScrollToTop />
        <Routes>
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
      </Router>
    </>
  );
}

export default App;

