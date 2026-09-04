import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { reelsData } from '../../data/reelsData';

const AdvancedReelCard = memo(({ 
  reel, 
  index, 
  isGlobalMuted, 
  onToggleMute, 
  hoveredIndex, 
  setHoveredIndex 
}) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  // 3D Parallax Tilt Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredIndex(null);
  };

  const handleMouseEnter = () => {
    setHoveredIndex(index);
  };

  // Sync mute state on video DOM
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isGlobalMuted;
    }
  }, [isGlobalMuted]);

  // Viewport Autoplay - only load and play when scrolled near viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = "auto";
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.15, rootMargin: "80px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration && progressBarRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      progressBarRef.current.style.width = `${(cur / dur) * 100}%`;
    }
  };

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    setShowPulse(true);
    setTimeout(() => setShowPulse(false), 400);
  };

  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlayPause}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08, 
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      className={`group relative w-[76vw] sm:w-[48vw] md:w-[42vw] lg:w-full aspect-[9/16] rounded-3xl overflow-hidden bg-brand-black cursor-pointer select-none flex-shrink-0 snap-center border border-brand-blue/10 hover:border-brand-red/40 transition-all duration-500 ${
        isDimmed ? 'opacity-65 lg:scale-[0.98]' : 'opacity-100 lg:hover:scale-[1.02] shadow-[0_4px_24px_rgba(35,55,119,0.06)] hover:shadow-[0_24px_50px_rgba(35,55,119,0.16)]'
      }`}
    >
      {/* ── Native Local Reel Video ── */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.poster}
        loop
        muted={isGlobalMuted}
        playsInline
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover scale-[1.02] group-hover:scale-108 transition-transform duration-700 ease-out"
      />

      {/* ── Dynamic Ambient Shadow Layer ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none transition-opacity duration-300 group-hover:opacity-75" />

      {/* ── Interactive Shimmer Edge on Hover ── */}
      <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/25 pointer-events-none transition-colors duration-500" />

      {/* ── Sound Toggle Pill ── */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.88 }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleMute();
        }}
        title={isGlobalMuted ? "Unmute Sound" : "Mute Sound"}
        className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-lg ${
          isGlobalMuted 
            ? 'bg-black/40 text-white/90 hover:bg-brand-red hover:text-white' 
            : 'bg-brand-red text-white shadow-glass-red'
        }`}
      >
        {isGlobalMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </motion.button>

      {/* ── Center Animated Play / Pause Ripple ── */}
      <AnimatePresence>
        {showPulse && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.15, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <div className="w-14 h-14 rounded-full bg-brand-red text-white flex items-center justify-center shadow-2xl backdrop-blur-md">
              {isPlaying ? <Play size={22} className="ml-0.5 fill-white" /> : <Pause size={22} className="fill-white" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Center Play Icon when Paused ── */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-13 h-13 rounded-full bg-brand-red text-white flex items-center justify-center shadow-2xl"
          >
            <Play size={20} className="ml-0.5 fill-white" />
          </motion.div>
        </div>
      )}

      {/* ── Sleek Bottom Progress Bar ── */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 overflow-hidden z-20">
        <div 
          ref={progressBarRef}
          className="h-full bg-brand-red w-0 transition-all duration-75 ease-linear"
        />
      </div>
    </motion.div>
  );
});

AdvancedReelCard.displayName = 'AdvancedReelCard';

const ReelSection = () => {
  const [isGlobalMuted, setIsGlobalMuted] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleGlobalMute = () => {
    setIsGlobalMuted(prev => !prev);
  };

  return (
    <section 
      style={{ backgroundColor: '#FAFBFF' }}
      className="py-16 md:py-24 bg-[#FAFBFF] relative overflow-hidden border-b border-brand-blue/10 select-none z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* 
          Responsive Container:
          - Mobile / Tablet: Smooth horizontal sideways scroll (`overflow-x-auto flex snap-x snap-mandatory no-scrollbar`)
          - Desktop (lg+): Balanced 4-column perspective grid (`lg:grid lg:grid-cols-4`)
        */}
        <div 
          className="flex lg:grid lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 pt-2 px-1 snap-x snap-mandatory no-scrollbar items-center"
          style={{ 
            perspective: 1200,
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {reelsData.map((reel, idx) => (
            <AdvancedReelCard 
              key={reel.id} 
              reel={reel} 
              index={idx}
              isGlobalMuted={isGlobalMuted}
              onToggleMute={toggleGlobalMute}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelSection;
