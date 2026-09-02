import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { textRevealContainer, textRevealChild } from '../utils/animations';
import StudioIntro from '../components/home/StudioIntro';
import WorkSlider from '../components/home/WorkSlider';
import FeaturedProject from '../components/home/FeaturedProject';
import KeyHandover from '../components/home/KeyHandover';
import Practice from '../components/home/Practice';
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
            {/* 65% Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-black/65 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/45 pointer-events-none" />
            
            {/* Dynamic scroll dimming overlay */}
            <motion.div 
              style={{ opacity: videoOverlayOpacity }}
              className="absolute inset-0 bg-black/40 pointer-events-none"
            />
          </div>

          {/* ── Main hero content with subtle upward fade ── */}
          <motion.div 
            style={{ opacity: heroTextOpacity, y: heroTextY }}
            className="relative z-10 flex-1 flex flex-col justify-between w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 sm:pt-36 md:pt-40 pb-8 sm:pb-12"
          >
            {/* Split Grid: Left Headline/CTAs, Right Luxury Stats Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
              
              {/* Left Column: Headline & CTAs */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                {/* Monumental Architectural Headline */}
                <motion.div
                  className="overflow-hidden"
                  variants={textRevealContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h1
                    className="text-4xl sm:text-6xl md:text-7xl xl:text-[5.4rem] font-display font-semibold leading-[1.04] tracking-tight text-white"
                    variants={textRevealChild}
                  >
                    <span>Building Modern Spaces</span>
                    <span className="block mt-1 sm:mt-2">
                      <span className="font-light text-white/90">From Concept to </span>
                      <span className="text-brand-red font-serif italic font-normal tracking-normal">Completion.</span>
                    </span>
                  </motion.h1>
                </motion.div>

                {/* Action Buttons Row */}
                <motion.div 
                  className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
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
                </motion.div>
              </div>

              {/* Right Column: Classic Architectural Editorial Statistics */}
              <motion.div 
                className="lg:col-span-5 flex justify-start lg:justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="w-full max-w-sm lg:border-l border-white/20 lg:pl-8 xl:pl-10 space-y-7 sm:space-y-8 py-1">
                  
                  {/* Metric 01 */}
                  <div className="group">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-serif italic text-white/40 text-xs sm:text-sm select-none">01</span>
                      <p className="text-4xl sm:text-5xl font-display font-light text-white tracking-tight">
                        120<span className="font-serif italic font-normal text-brand-red ml-0.5">+</span>
                      </p>
                    </div>
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-white/75 mt-1">
                      Completed Residences
                    </p>
                  </div>

                  {/* Metric 02 */}
                  <div className="group">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-serif italic text-white/40 text-xs sm:text-sm select-none">02</span>
                      <p className="text-4xl sm:text-5xl font-display font-light text-white tracking-tight">
                        08<span className="font-serif italic font-normal text-brand-red ml-0.5">+</span> <span className="text-xl sm:text-2xl font-light text-white/60">Years</span>
                      </p>
                    </div>
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-white/75 mt-1">
                      Architectural Practice
                    </p>
                  </div>

                  {/* Metric 03 */}
                  <div className="group">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-serif italic text-white/40 text-xs sm:text-sm select-none">03</span>
                      <p className="text-4xl sm:text-5xl font-display font-light text-white tracking-tight">
                        100<span className="font-serif italic font-normal text-brand-red ml-0.5">%</span>
                      </p>
                    </div>
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-white/75 mt-1">
                      Turnkey Delivery
                    </p>
                  </div>

                </div>
              </motion.div>

            </div>

            {/* Bottom row: Clean minimal studio coordinates & scroll prompt */}
            <motion.div
              className="border-t border-white/15 pt-4 sm:pt-5 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <p className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-white/60">
                  KASARAGOD · CHERKALA · KANHANGAD
                </p>
              </div>

              {/* Scroll prompt */}
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/50">SCROLL</span>
                <div className="w-8 h-px bg-gradient-to-r from-white/60 to-transparent" />
              </div>
            </motion.div>

          </motion.div>
        </section>

        {/* ── OVERLAY LAYER SCROLLING ON TOP OF HERO (Z-10) ── */}
        <div className="relative z-10 rounded-t-[36px] sm:rounded-t-[54px] bg-[#FAFBFF] page-bg overflow-hidden shadow-[0_-30px_70px_rgba(0,0,0,0.5)] border-t border-white/60 min-h-screen">
          <StudioIntro />
          <WorkSlider />
          <FeaturedProject />
          <KeyHandover />
          <Practice />
          <ContactCTA />
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
