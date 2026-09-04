import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { reelsData } from '../../data/reelsData';

const AdvancedReelCard = memo(({ 
  reel, 
  index, 
  isGlobalMuted, 
  onToggleMute 
}) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Sync mute state on video DOM
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isGlobalMuted;
    }
  }, [isGlobalMuted]);

  // Viewport Autoplay - stable hysteresis to prevent play/pause jitter
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isBuffering = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isBuffering) {
            video.preload = "auto";
            isBuffering = true;
          }
          video.play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              // If browser blocks autoplay with audio, ensure muted and retry
              if (videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
              }
            });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.25, rootMargin: "60px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current && videoRef.current.duration && progressBarRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      progressBarRef.current.style.width = `${(cur / dur) * 100}%`;
    }
  }, []);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    setHasInteracted(true);
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    setShowPulse(true);
    setTimeout(() => setShowPulse(false), 350);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={togglePlayPause}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ 
        duration: 0.45, 
        delay: index * 0.05, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group relative w-[76vw] sm:w-[48vw] md:w-[42vw] lg:w-full aspect-[9/16] rounded-3xl overflow-hidden bg-brand-black cursor-pointer select-none flex-shrink-0 snap-center border border-brand-blue/10 hover:border-brand-red/40 shadow-[0_4px_24px_rgba(35,55,119,0.06)] hover:shadow-[0_20px_40px_rgba(35,55,119,0.14)] hover:-translate-y-1.5 transition-all duration-300 will-change-transform"
    >
      {/* ── Native Local Reel Video (Hardware composited, no 3D matrix flickering) ── */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.poster}
        loop
        muted={isGlobalMuted}
        playsInline
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
        className="w-full h-full object-cover scale-[1.01] group-hover:scale-105 transition-transform duration-500 ease-out"
      />

      {/* ── Dynamic Ambient Shadow Layer ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-80" />

      {/* ── Interactive Shimmer Edge on Hover ── */}
      <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/20 pointer-events-none transition-colors duration-300" />

      {/* ── Sound Toggle Pill ── */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleMute();
        }}
        title={isGlobalMuted ? "Unmute Sound" : "Mute Sound"}
        className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md ${
          isGlobalMuted 
            ? 'bg-black/50 text-white/90 hover:bg-brand-red hover:text-white' 
            : 'bg-brand-red text-white shadow-glass-red'
        }`}
      >
        {isGlobalMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>

      {/* ── Center Animated Play / Pause Ripple on Tap ── */}
      <AnimatePresence>
        {showPulse && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <div className="w-13 h-13 rounded-full bg-brand-red text-white flex items-center justify-center shadow-2xl backdrop-blur-md">
              {isPlaying ? <Play size={20} className="ml-0.5 fill-white" /> : <Pause size={20} className="fill-white" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Subtle Manual Pause Overlay Indicator (Only visible if user paused or on hover) ── */}
      <div 
        className={`absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-opacity duration-300 ${
          !isPlaying && hasInteracted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-brand-red/90 text-white flex items-center justify-center shadow-xl backdrop-blur-sm">
          <Play size={18} className="ml-0.5 fill-white" />
        </div>
      </div>

      {/* ── Title & Index Tag on Hover / Mobile ── */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
        <span className="text-[10px] font-mono font-semibold tracking-wider text-brand-red uppercase block mb-1">
          Reel {reel.number}
        </span>
        <h4 className="text-xs font-display font-medium text-white line-clamp-1">
          {reel.title}
        </h4>
      </div>

      {/* ── Sleek Bottom Progress Bar ── */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 overflow-hidden z-20">
        <div 
          ref={progressBarRef}
          className="h-full bg-brand-red w-0 transition-all duration-100 ease-linear"
        />
      </div>
    </motion.div>
  );
});

AdvancedReelCard.displayName = 'AdvancedReelCard';

const ReelSection = () => {
  const [isGlobalMuted, setIsGlobalMuted] = useState(true);

  const toggleGlobalMute = useCallback(() => {
    setIsGlobalMuted(prev => !prev);
  }, []);

  return (
    <section 
      style={{ backgroundColor: '#FAFBFF' }}
      className="py-16 md:py-24 bg-[#FAFBFF] relative overflow-hidden border-b border-brand-blue/10 select-none z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* 
          Responsive Container:
          - Mobile / Tablet: Smooth horizontal sideways scroll (`overflow-x-auto flex snap-x snap-mandatory no-scrollbar`)
          - Desktop (lg+): Clean balanced 4-column grid (`lg:grid lg:grid-cols-4`)
        */}
        <div 
          className="flex lg:grid lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 pt-2 px-1 snap-x snap-mandatory no-scrollbar items-center"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {reelsData.map((reel, idx) => (
            <AdvancedReelCard 
              key={reel.id} 
              reel={reel} 
              index={idx}
              isGlobalMuted={isGlobalMuted}
              onToggleMute={toggleGlobalMute}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelSection;
