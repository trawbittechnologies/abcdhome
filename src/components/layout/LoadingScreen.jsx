import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import lottie from 'lottie-web';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    // Disable scrolling while the loading animation is active
    document.body.style.overflow = 'hidden';

    let completed = false;
    const finishLoading = () => {
      if (completed) return;
      completed = true;
      if (onComplete) onComplete();
    };

    // Safety fallback timer so visitor is never blocked if network is slow
    const safetyTimer = setTimeout(() => {
      finishLoading();
    }, 3800);

    if (containerRef.current) {
      try {
        animRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'canvas',
          loop: false,
          autoplay: true,
          path: '/hupng-mp4-to-lottie-1788250707229.json',
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
            clearCanvas: true,
          },
        });

        // Trigger the text animation towards the end of the video (at frame 170 / ~75% of video)
        animRef.current.addEventListener('enterFrame', (e) => {
          if (e.currentTime >= 170) {
            setShowTagline(true);
          }
        });

        // When video finishes, allow a brief graceful hold so the text & logo are admired, then transition
        animRef.current.addEventListener('complete', () => {
          setShowTagline(true);
          setTimeout(() => {
            finishLoading();
          }, 700);
        });

        animRef.current.addEventListener('data_failed', () => {
          console.warn('Lottie failed to load');
          finishLoading();
        });
      } catch (err) {
        console.error('Error loading Lottie animation:', err);
        finishLoading();
      }
    }

    return () => {
      clearTimeout(safetyTimer);
      document.body.style.overflow = '';
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, [onComplete]);

  // Words container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 18 },
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 1.0 } }}
      className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none"
    >
      {/* Secondary trailing architectural accent curtain for depth */}
      <motion.div
        initial={{ y: '0%' }}
        exit={{ 
          y: '-100%',
          transition: { 
            duration: 0.95, 
            delay: 0.08, 
            ease: [0.76, 0, 0.24, 1] 
          } 
        }}
        className="absolute inset-0 bg-[#121927] z-10"
      />

      {/* Primary White Canvas Shutter */}
      <motion.div
        initial={{ y: '0%' }}
        exit={{ 
          y: '-100%',
          transition: { 
            duration: 0.85, 
            ease: [0.76, 0, 0.24, 1] 
          } 
        }}
        className="absolute inset-0 bg-white z-20 flex items-center justify-center pointer-events-auto"
      >
        {/* Fixed position centered container - No zoom out / No scale change */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Centered Small Lottie Video with completely fixed position & no zoom */}
          <div className="w-64 sm:w-80 md:w-96 max-w-[90vw] aspect-video flex items-center justify-center">
            <div 
              ref={containerRef} 
              className="w-full h-full flex items-center justify-center [&>canvas]:w-full [&>canvas]:h-full [&>canvas]:object-contain"
            />
          </div>

          {/* Tagline reveals at the end of the video with animated word stagger and tight elegant gap */}
          <div className="absolute top-[calc(100%-16px)] sm:top-[calc(100%-22px)] left-1/2 -translate-x-1/2 whitespace-nowrap">
            <AnimatePresence>
              {showTagline && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, filter: 'blur(4px)', transition: { duration: 0.3 } }}
                  className="flex items-center gap-2 sm:gap-3 text-[10.5px] sm:text-[11px] font-semibold tracking-[0.28em] sm:tracking-[0.32em] uppercase text-brand-blue"
                >
                  <motion.span variants={itemVariants}>Architecture</motion.span>
                  <motion.span variants={dotVariants} className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block shadow-sm" />
                  <motion.span variants={itemVariants}>Interior</motion.span>
                  <motion.span variants={dotVariants} className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block shadow-sm" />
                  <motion.span variants={itemVariants}>Construction</motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom glowing accent line on shutter edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue opacity-90" />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
