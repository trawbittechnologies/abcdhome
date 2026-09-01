import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild } from '../utils/animations';
import StudioIntro from '../components/home/StudioIntro';
import SelectedWork from '../components/home/SelectedWork';
import Practice from '../components/home/Practice';
import FeaturedProject from '../components/home/FeaturedProject';
import ContactCTA from '../components/home/ContactCTA';

const stats = [
  { value: '120+', label: 'Projects' },
  { value: '8+', label: 'Years' },
  { value: '100%', label: 'Client Satisfaction' },
];

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen w-full flex flex-col overflow-hidden">
        
        {/* Video Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.12, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <video 
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
          >
            <source src="/Transform_video_into_architectur…_202609011258.mp4" type="video/mp4" />
          </video>
          {/* Dark black cinematic overlay */}
          <div className="absolute inset-0 bg-black/65"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
        </motion.div>


        {/* ── Main hero content ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-between w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 sm:pt-40 md:pt-44 pb-10 sm:pb-12">

          {/* Hero Content Area */}
          <div className="max-w-4xl space-y-6 sm:space-y-7 py-4 sm:py-6">
            
            {/* Architectural Sub-header */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-8 h-[2px] bg-brand-red"></div>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/80">
                Architecture · Interiors · Construction
              </span>
            </motion.div>

            {/* Monumental Humanized Headline */}
            <motion.div
              className="overflow-hidden"
              variants={textRevealContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-4xl sm:text-6xl md:text-7xl xl:text-[5.4rem] font-display font-semibold leading-[1.05] tracking-tight text-white"
                variants={textRevealChild}
              >
                <span>Building Modern Spaces</span>
                <span className="block mt-1 sm:mt-2">
                  <span className="font-light text-white/90">From Concept to </span>
                  <span className="text-brand-red font-serif italic font-normal tracking-normal">Completion.</span>
                </span>
              </motion.h1>
            </motion.div>

            {/* Humanized, Warm Value Proposition */}
            <motion.p
              className="text-base sm:text-lg md:text-xl font-light text-white/85 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              We design and build enduring homes with care, craft, and total dedication. From initial sketches to the day you step inside — one trusted team by your side every step of the way.
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div 
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-white text-xs font-bold tracking-[0.2em] uppercase shadow-glass-red transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>START YOUR PROJECT</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
              >
                EXPLORE HOMES
              </Link>

              <a
                href="https://wa.me/919000000000?text=Hi%20ABCD%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/35 text-[#25D366] hover:text-white text-xs font-bold tracking-wider uppercase transition-all backdrop-blur-md"
              >
                <span>💬 WhatsApp Us</span>
              </a>
            </motion.div>
          </div>

          {/* Bottom row: Humanized Stats Matrix with Frosted Dividers */}
          <motion.div
            className="border-t border-white/15 pt-6 sm:pt-8 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="grid grid-cols-3 gap-6 sm:gap-12 flex-1">
                <div className="pr-4 sm:pr-8">
                  <p className="text-2xl sm:text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">120+</p>
                  <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-white/60 mt-1">Homes Delivered</p>
                </div>
                <div className="border-l border-white/15 pl-4 sm:pl-8 pr-4 sm:pr-8">
                  <p className="text-2xl sm:text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">8+ Yrs</p>
                  <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-white/60 mt-1">Master Craft</p>
                </div>
                <div className="border-l border-white/15 pl-4 sm:pl-8">
                  <p className="text-2xl sm:text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">100%</p>
                  <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-white/60 mt-1">Peace of Mind</p>
                </div>
              </div>

              {/* Scroll prompt */}
              <div className="hidden md:flex flex-col items-center gap-2 pl-8 border-l border-white/15">
                <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-pulse"></div>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40 rotate-90 mt-2 whitespace-nowrap">SCROLL</span>
              </div>
            </div>
          </motion.div>

        </div>

      </section>

      {/* Rest of sections */}
      <div className="page-bg">
        <StudioIntro />
        <SelectedWork />
        <FeaturedProject />
        <Practice />
        <ContactCTA />
      </div>
    </PageTransition>
  );
};

export default Home;
