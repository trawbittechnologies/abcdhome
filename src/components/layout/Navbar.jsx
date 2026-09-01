import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Determine if we're on the dark video hero (home page at top)
  const isHero = location.pathname === '/' && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Studio', path: '/about' },
    { name: 'Process', path: '/process' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`fixed z-50 w-full flex justify-center transition-all duration-500 ${scrolled ? 'top-3' : 'top-6'}`}>
        <div className={`
          flex items-center justify-between gap-8 px-5 py-3 rounded-full border transition-all duration-500
          w-[96%] md:w-auto md:px-6
          ${isHero
            ? 'bg-white/8 backdrop-blur-xl border-white/15'
            : 'bg-white/80 backdrop-blur-xl border-white/80 shadow-glass'
          }
        `}>

          {/* Logo image inside navbar */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/abcd(logo)final (1).png"
              alt="ABCD Logo"
              className="h-10 md:h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  relative px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300
                  ${isActive(link.path)
                    ? isHero
                      ? 'text-white bg-white/15'
                      : 'text-brand-blue bg-brand-blue/8'
                    : isHero
                      ? 'text-white/60 hover:text-white hover:bg-white/10'
                      : 'text-brand-blue/60 hover:text-brand-blue hover:bg-brand-blue/5'
                  }
                `}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isHero ? 'bg-brand-red' : 'bg-brand-red'}`}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 bg-brand-blue text-white text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 rounded-full hover:bg-brand-red transition-all duration-300"
            >
              Contact
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${isHero ? 'text-white hover:bg-white/10' : 'text-brand-blue hover:bg-brand-blue/8'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-6 pt-8">
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-brand-blue/5 text-brand-blue">
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-10 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-5 border-b border-brand-blue/8 group ${isActive(link.path) ? 'text-brand-red' : 'text-brand-blue hover:text-brand-red'} transition-colors`}
                  >
                    <span className="text-4xl font-display font-semibold tracking-tight">{link.name}</span>
                    <span className="text-2xl opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all">→</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.07 }}
                className="pt-8"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-3 bg-brand-blue text-white text-sm font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-full hover:bg-brand-red transition-colors"
                >
                  START A PROJECT →
                </Link>
              </motion.div>
            </nav>

            {/* Bottom info */}
            <div className="px-10 pb-10">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-brand-blue/30">ABCD · Cherkala, Kanhangad</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
