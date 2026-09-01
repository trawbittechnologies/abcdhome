import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Compass, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { textRevealContainer, textRevealChild } from '../utils/animations';
import StudioIntro from '../components/home/StudioIntro';
import SelectedWork from '../components/home/SelectedWork';
import Practice from '../components/home/Practice';
import FeaturedProject from '../components/home/FeaturedProject';
import ContactCTA from '../components/home/ContactCTA';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  // Subtle fade & text parallax as the content layer scrolls over it
  const heroTextOpacity = useTransform(scrollY, [0, 450], [1, 0.2]);
  const heroTextY = useTransform(scrollY, [0, 450], [0, -35]);
  const videoOverlayOpacity = useTransform(scrollY, [0, 600], [0.65, 0.85]);

  return (
    <PageTransition>
      {/* ===== STICKY HERO SECTION (Z-0) ===== */}
      <div className="relative w-full">
        <section 
          ref={heroRef}
          className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden z-0"
        >
          {/* Full-bleed Video Background */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-brand-black">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="auto"
              disablePictureInPicture
              className="w-full h-full object-cover scale-105"
            >
              <source src="/Transform_video_into_architectur…_202609011258.mp4" type="video/mp4" />
            </video>
            {/* Dynamic dimming overlay as user scrolls down */}
            <motion.div 
              style={{ opacity: videoOverlayOpacity }}
              className="absolute inset-0 bg-black/60 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 pointer-events-none" />
          </div>

          {/* ── Main hero content with subtle upward fade ── */}
          <motion.div 
            style={{ opacity: heroTextOpacity, y: heroTextY }}
            className="relative z-10 flex-1 flex flex-col justify-between w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 sm:pt-36 md:pt-40 pb-10 sm:pb-14"
          >
            {/* Hero Content Area */}
            <div className="max-w-4xl space-y-5 sm:space-y-6">
              
              {/* Architectural Sub-header */}
              <motion.div 
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/90">
                  Architecture · Interiors · Turnkey Construction
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
                  className="text-4xl sm:text-6xl md:text-7xl xl:text-[5.2rem] font-display font-semibold leading-[1.05] tracking-tight text-white"
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
                We design and build enduring homes in Cherkala – Kanhangad with care, craft, and total dedication. From initial blueprints to the day you step inside — one trusted team by your side every step of the way.
              </motion.p>

              {/* Action Buttons Row */}
              <motion.div 
                className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1 sm:pt-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-white text-xs font-bold tracking-[0.2em] uppercase shadow-glass-red transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>START YOUR PROJECT</span>
                  <ArrowRight size={15} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>

                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                >
                  EXPLORE HOMES
                </Link>

                <a
                  href="https://wa.me/919999999999?text=Hi%20ABCD%20Studio%2C%20I%20would%20like%20to%20consult%20about%20a%20new%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] hover:text-white text-xs font-bold tracking-wider uppercase transition-all backdrop-blur-md shadow-sm"
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp Us</span>
                </a>
              </motion.div>
            </div>

            {/* Bottom row: Humanized Stats Matrix with Frosted Dividers */}
            <motion.div
              className="border-t border-white/15 pt-5 sm:pt-6 mt-6 sm:mt-8 pb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="grid grid-cols-3 gap-4 sm:gap-10 flex-1">
                  <div className="pr-3 sm:pr-6">
                    <p className="text-2xl sm:text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">120+</p>
                    <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-white/60 mt-1">Homes Delivered</p>
                  </div>
                  <div className="border-l border-white/15 pl-3 sm:pr-6 pr-3 sm:pl-6">
                    <p className="text-2xl sm:text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">8+ Yrs</p>
                    <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-white/60 mt-1">Master Craft</p>
                  </div>
                  <div className="border-l border-white/15 pl-3 sm:pl-6">
                    <p className="text-2xl sm:text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">100%</p>
                    <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-white/60 mt-1">Peace of Mind</p>
                  </div>
                </div>

                {/* Scroll prompt */}
                <div className="hidden md:flex flex-col items-center gap-2 pl-6 border-l border-white/15">
                  <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
                  <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40 rotate-90 mt-2 whitespace-nowrap">SCROLL</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </section>

        {/* ── OVERLAY LAYER SCROLLING ON TOP OF HERO (Z-10) ── */}
        <div className="relative z-10 rounded-t-[36px] sm:rounded-t-[54px] bg-[#FAFBFF] page-bg overflow-hidden shadow-[0_-30px_70px_rgba(0,0,0,0.5)] border-t border-white/60 min-h-screen">
          <StudioIntro />
          <SelectedWork />
          <FeaturedProject />
          <Practice />
          <ContactCTA />
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
