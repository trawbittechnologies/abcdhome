import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import lottie from 'lottie-web';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const [showTagline, setShowTagline] = useState(false);
  const [isLottieReady, setIsLottieReady] = useState(false);

  useEffect(() => {
    // Disable scrolling while the loading animation is active
    document.body.style.overflow = 'hidden';

    let completed = false;
    const finishLoading = () => {
      if (completed) return;
      completed = true;
      if (onComplete) onComplete();
    };

    // Safety fallback timer so visitor is never stuck even on slow networks
    const safetyTimer = setTimeout(() => {
      setShowTagline(true);
      setTimeout(finishLoading, 400);
    }, 3200);

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

        // 1.25x speed makes the intro feel crisp, energetic, and avoids sluggishness
        animRef.current.setSpeed(1.25);

        // Wait until canvas actually renders before fading in container
        animRef.current.addEventListener('firstFrame', () => {
          setIsLottieReady(true);
        });

        animRef.current.addEventListener('DOMLoaded', () => {
          requestAnimationFrame(() => setIsLottieReady(true));
        });

        // Trigger the tagline animation towards the final phase
        animRef.current.addEventListener('enterFrame', (e) => {
          if (e.currentTime >= 110 || (animRef.current && animRef.current.totalFrames && e.currentTime >= animRef.current.totalFrames * 0.58)) {
            setShowTagline(true);
          }
        });

        // When animation finishes, hold very briefly then transition smoothly
        animRef.current.addEventListener('complete', () => {
          setShowTagline(true);
          setTimeout(() => {
            finishLoading();
          }, 250);
        });

        animRef.current.addEventListener('data_failed', () => {
          console.warn('Lottie data loading failed, using fallback');
          setShowTagline(true);
          setTimeout(finishLoading, 800);
        });

        animRef.current.addEventListener('error', () => {
          setShowTagline(true);
          setTimeout(finishLoading, 800);
        });
      } catch (err) {
        console.error('Error loading Lottie animation:', err);
        setShowTagline(true);
        setTimeout(finishLoading, 800);
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
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 350, damping: 20 },
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.85 } }}
      className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none"
    >
      {/* Secondary trailing architectural accent curtain for depth */}
      <motion.div
        initial={{ y: '0%' }}
        exit={{ 
          y: '-100%',
          transition: { 
            duration: 0.8, 
            delay: 0.06, 
            ease: [0.76, 0, 0.24, 1] 
          } 
        }}
        className="absolute inset-0 bg-[#121927] z-10 will-change-transform"
      />

      {/* Primary White Canvas Shutter */}
      <motion.div
        initial={{ y: '0%' }}
        exit={{ 
          y: '-100%',
          transition: { 
            duration: 0.75, 
            ease: [0.76, 0, 0.24, 1] 
          } 
        }}
        className="absolute inset-0 bg-white z-20 flex items-center justify-center pointer-events-auto will-change-transform"
      >
        {/* Fixed position centered container */}
        <div className="relative flex flex-col items-center justify-center">
          
          {/* Centered Lottie Container with instant placeholder to prevent any flash */}
          <div className="w-64 sm:w-80 md:w-96 max-w-[90vw] aspect-video flex items-center justify-center relative">
            
            {/* Smooth logo placeholder if Lottie is buffering */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isLottieReady ? 'opacity-0' : 'opacity-100'}`}>
              <img
                src="/abcd(logo)final (1).png"
                alt="ABCD Logo"
                className="h-14 sm:h-16 w-auto object-contain animate-pulse opacity-80"
              />
            </div>

            <div 
              ref={containerRef} 
              className={`w-full h-full flex items-center justify-center [&>canvas]:w-full [&>canvas]:h-full [&>canvas]:object-contain transition-opacity duration-300 ${isLottieReady ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>

          {/* Tagline reveals at the end of the animation with animated word stagger */}
          <div className="absolute top-[calc(100%-16px)] sm:top-[calc(100%-22px)] left-1/2 -translate-x-1/2 whitespace-nowrap">
            <AnimatePresence>
              {showTagline && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
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
