import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X, Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const whatsappNumber = "7902619430";
  const callNumber = "7902519430";
  const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=Hello%20ABCD%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20an%20architectural%20%26%20construction%20project.`;
  const callUrl = `tel:+91${callNumber}`;

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none select-none"
    >
      
      {/* Variety Options Menu (Speed Dial Stack) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-end gap-3 mb-3.5 pointer-events-auto"
          >
            {/* 1. WhatsApp Action */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              className="flex items-center gap-2.5 group"
            >
              {/* Variety Label Pill */}
              <span className="px-3.5 py-1.5 rounded-full bg-brand-blue-dark/95 backdrop-blur-md text-white text-xs font-medium shadow-lg border border-white/10 flex items-center gap-1.5 group-hover:bg-[#25D366] transition-colors">
                <span>WhatsApp</span>
                <span className="font-mono text-emerald-300 group-hover:text-white font-semibold">79026 19430</span>
              </span>

              {/* Round Icon */}
              <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.69.45-.04 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29" />
                </svg>
              </div>
            </motion.a>

            {/* 2. Direct Call Action */}
            <motion.a
              href={callUrl}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="flex items-center gap-2.5 group"
            >
              {/* Variety Label Pill */}
              <span className="px-3.5 py-1.5 rounded-full bg-brand-blue-dark/95 backdrop-blur-md text-white text-xs font-medium shadow-lg border border-white/10 flex items-center gap-1.5 group-hover:bg-brand-red transition-colors">
                <span>Call Studio</span>
                <span className="font-mono text-brand-red group-hover:text-white font-semibold">79025 19430</span>
              </span>

              {/* Round Icon */}
              <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Phone size={20} strokeWidth={2.2} />
              </div>
            </motion.a>

            {/* 3. Consultation / Contact Page Option */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ delay: 0.15, duration: 0.2 }}
            >
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 group"
              >
                <span className="px-3.5 py-1.5 rounded-full bg-brand-blue-dark/95 backdrop-blur-md text-white text-xs font-medium shadow-lg border border-white/10 flex items-center gap-1.5 group-hover:bg-brand-blue transition-colors">
                  <span>Book Consultation</span>
                  <ArrowUpRight size={12} className="text-white/60 group-hover:text-white" />
                </span>

                <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-lg border border-white/15 group-hover:scale-110 transition-transform duration-300">
                  <Calendar size={18} strokeWidth={2} />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Normal Floating Trigger Button */}
      <div className="flex items-center gap-3 pointer-events-auto">
        
        {/* Variety Teaser Pill (Shows when collapsed) */}
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md text-brand-blue border border-brand-blue/15 shadow-xl text-xs font-medium hover:border-brand-red hover:text-brand-red transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Connect with ABCD</span>
          </motion.button>
        )}

        {/* Normal Round Floating Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Contact Options" : "Open Contact Options"}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'bg-brand-blue-dark text-white rotate-90'
              : 'bg-brand-blue text-white hover:bg-brand-blue-dark'
          }`}
        >
          {/* Subtle pulse wave when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-brand-blue opacity-30 animate-ping -z-10" />
          )}

          {/* Active online green badge */}
          {!isOpen && (
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
          )}

          {isOpen ? (
            <X size={24} strokeWidth={2.4} />
          ) : (
            <MessageCircle size={26} strokeWidth={2} />
          )}
        </motion.button>

      </div>

    </div>
  );
};

export default FloatingContact;
