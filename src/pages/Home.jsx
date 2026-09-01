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
        <div className="relative z-10 flex-1 flex flex-col justify-between w-full max-w-7xl mx-auto px-6 md:px-12 pt-36 sm:pt-44 md:pt-48 pb-12">

          {/* Headline */}
          <div className="py-6 sm:py-10">
            <motion.div
              className="overflow-hidden mb-6"
              variants={textRevealContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-5xl sm:text-7xl md:text-8xl xl:text-[8.5rem] font-display font-semibold leading-[1.0] tracking-tight"
                variants={textRevealChild}
              >
                <span className="text-white block">We build</span>
                <span className="text-brand-red block italic font-light">what we</span>
                <span className="text-brand-blue block">envision.</span>
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-base sm:text-lg font-light text-white/70 max-w-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              A premium design-build studio — architecture, interiors, and construction delivered as one seamless experience in Cherkala – Kanhangad, Kerala.
            </motion.p>
          </div>

          {/* Bottom row: Streamlined CTAs + Stats */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {/* Streamlined CTA buttons: Primary project inquiry + Secondary explore */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark px-8 py-4 rounded-full text-white text-xs font-bold tracking-[0.2em] uppercase shadow-glass-red transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>START A PROJECT</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:border-white/40"
              >
                EXPLORE WORK
              </Link>
            </div>

            {/* Stats — horizontal dividers */}
            <div className="flex items-center gap-0 border-t border-white/10 pt-8">
              {stats.map((s, i) => (
                <div key={s.label} className={`flex-1 ${i !== 0 ? 'border-l border-white/10 pl-6 sm:pl-8' : ''} ${i !== stats.length - 1 ? 'pr-6 sm:pr-8' : ''}`}>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-white mb-1">{s.value}</p>
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/50">{s.label}</p>
                </div>
              ))}
              {/* Scroll indicator */}
              <div className="hidden md:flex flex-col items-center gap-2 pl-8 border-l border-white/10">
                <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/40 rotate-90 mt-2 whitespace-nowrap">SCROLL</span>
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
