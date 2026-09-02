import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Sliders, 
  Columns, 
  Maximize2, 
  Search, 
  X, 
  MapPin, 
  Calendar, 
  Layers, 
  Sparkles, 
  Building2, 
  Armchair, 
  ZoomIn, 
  ZoomOut,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild, staggerContainer, fadeUpStaggerVariant } from '../utils/animations';
import { 
  exteriorImages, 
  interiorImages, 
  allGalleryItems, 
  galleryCategoryPillars, 
  subCategoryFilters 
} from '../data/galleryData';

const Gallery = () => {
  const [activePillar, setActivePillar] = useState("all"); // "all" | "exterior" | "interior"
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "slider" | "split"
  const [sliderIndex, setSliderIndex] = useState(0);
  
  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtered items computation
  const filteredItems = useMemo(() => {
    return allGalleryItems.filter(item => {
      // Primary pillar filter
      const matchesPillar = activePillar === "all" || item.category === activePillar;
      
      // Subcategory filter
      const matchesSubCategory = activeSubCategory === "All" || item.subCategory === activeSubCategory;
      
      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.subCategory.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
      );

      return matchesPillar && matchesSubCategory && matchesSearch;
    });
  }, [activePillar, activeSubCategory, searchQuery]);

  // Keep slider index within bounds
  useEffect(() => {
    if (sliderIndex >= filteredItems.length && filteredItems.length > 0) {
      setSliderIndex(0);
    }
  }, [filteredItems.length, sliderIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setIsZoomed(false);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, filteredItems.length]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setIsZoomed(false);
  };

  const handleNextSlider = () => {
    if (filteredItems.length === 0) return;
    setSliderIndex((i) => (i + 1) % filteredItems.length);
  };

  const handlePrevSlider = () => {
    if (filteredItems.length === 0) return;
    setSliderIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentSliderItem = filteredItems[sliderIndex] || filteredItems[0] || allGalleryItems[0];
  const currentLightboxItem = filteredItems[lightboxIndex] || filteredItems[0] || allGalleryItems[0];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFBFF] text-brand-blue">
        
        {/* ================= HERO HEADER ================= */}
        <section className="pt-36 sm:pt-44 md:pt-48 pb-12 sm:pb-16 px-6 md:px-12 border-b border-brand-blue/10 bg-gradient-to-b from-white to-[#FAFBFF]">
          <div className="max-w-7xl mx-auto">
            
            {/* Top Label */}
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="h-[2px] w-8 bg-brand-red"></div>
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-brand-red">
                Architectural Visual Archive
              </span>
            </motion.div>

            {/* Title & View Mode Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8">
              <motion.div
                className="overflow-hidden max-w-3xl"
                variants={textRevealContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.h1 
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-semibold leading-[1.02] tracking-tight"
                  variants={textRevealChild}
                >
                  Exterior & Interior<br />
                  <span className="text-brand-red italic font-serif font-normal">Curated</span> Portfolio.
                </motion.h1>
                <motion.p
                  className="text-sm sm:text-base md:text-lg font-light text-brand-blue/70 mt-4 max-w-2xl leading-relaxed"
                  variants={textRevealChild}
                >
                  Explore our dual-pillar visual showcase: 40+ monumental exterior elevations & turnkey civil projects, alongside 50+ bespoke handcrafted interiors and architectural joinery across Kerala.
                </motion.p>
              </motion.div>

              {/* View mode toggle pill */}
              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-brand-blue/15 shadow-sm self-start lg:self-end">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    viewMode === "grid" ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue/60 hover:text-brand-blue'
                  }`}
                  title="Grid Archive View"
                >
                  <LayoutGrid size={15} />
                  <span className="hidden sm:inline">Grid Archive</span>
                </button>
                <button
                  onClick={() => setViewMode("slider")}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    viewMode === "slider" ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue/60 hover:text-brand-blue'
                  }`}
                  title="Cinematic Showcase View"
                >
                  <Sliders size={15} />
                  <span className="hidden sm:inline">Cinematic View</span>
                </button>
                <button
                  onClick={() => setViewMode("split")}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    viewMode === "split" ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue/60 hover:text-brand-blue'
                  }`}
                  title="Dual Pillar Split View"
                >
                  <Columns size={15} />
                  <span className="hidden sm:inline">Split Explorer</span>
                </button>
              </div>
            </div>

            {/* ================= PRIMARY CATEGORY PILLARS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              
              {/* Pillar 1: Complete Archive */}
              <button
                onClick={() => {
                  setActivePillar("all");
                  setActiveSubCategory("All");
                }}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activePillar === "all"
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md transform -translate-y-0.5'
                    : 'bg-white border-brand-blue/10 text-brand-blue/80 hover:border-brand-blue/30 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Compass size={18} className={activePillar === "all" ? 'text-brand-red' : 'text-brand-blue/60'} />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">All Works</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    activePillar === "all" ? 'bg-white/20 text-white' : 'bg-brand-gray-light text-brand-blue/70'
                  }`}>
                    {allGalleryItems.length}
                  </span>
                </div>
                <p className={`text-xs font-light line-clamp-2 ${activePillar === "all" ? 'text-white/80' : 'text-brand-blue/60'}`}>
                  Complete portfolio spanning all exterior elevations, construction phases & bespoke interior suites.
                </p>
              </button>

              {/* Pillar 2: Exterior Architecture */}
              <button
                onClick={() => {
                  setActivePillar("exterior");
                  setActiveSubCategory("All");
                }}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activePillar === "exterior"
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md transform -translate-y-0.5'
                    : 'bg-white border-brand-blue/10 text-brand-blue/80 hover:border-brand-blue/30 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building2 size={18} className={activePillar === "exterior" ? 'text-brand-red' : 'text-brand-blue/60'} />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Exterior Architecture</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    activePillar === "exterior" ? 'bg-white/20 text-white' : 'bg-brand-gray-light text-brand-blue/70'
                  }`}>
                    {exteriorImages.length}
                  </span>
                </div>
                <p className={`text-xs font-light line-clamp-2 ${activePillar === "exterior" ? 'text-white/80' : 'text-brand-blue/60'}`}>
                  3D massing, cantilevered villas, modern facades, commercial landmarks & turnkey civil execution.
                </p>
              </button>

              {/* Pillar 3: Interior Design */}
              <button
                onClick={() => {
                  setActivePillar("interior");
                  setActiveSubCategory("All");
                }}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activePillar === "interior"
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md transform -translate-y-0.5'
                    : 'bg-white border-brand-blue/10 text-brand-blue/80 hover:border-brand-blue/30 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Armchair size={18} className={activePillar === "interior" ? 'text-brand-red' : 'text-brand-blue/60'} />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Interior & Joinery</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    activePillar === "interior" ? 'bg-white/20 text-white' : 'bg-brand-gray-light text-brand-blue/70'
                  }`}>
                    {interiorImages.length}
                  </span>
                </div>
                <p className={`text-xs font-light line-clamp-2 ${activePillar === "interior" ? 'text-white/80' : 'text-brand-blue/60'}`}>
                  Living halls, teak millwork, master suites, modular kitchens, gyms & sacred pooja spaces.
                </p>
              </button>

            </div>

            {/* ================= SEARCH & SUB-FILTERS ================= */}
            <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6 border-t border-brand-blue/10">
              
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue/40" />
                <input
                  type="text"
                  placeholder="Search elevation, bedroom, kitchen, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-2.5 rounded-full text-xs bg-white border border-brand-blue/15 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none text-brand-blue transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-blue/40 hover:text-brand-red"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Sub-Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {subCategoryFilters.map((subCat) => {
                  // Count matches for this subcategory
                  const count = allGalleryItems.filter(item => {
                    const matchesPillar = activePillar === "all" || item.category === activePillar;
                    const matchesSub = subCat === "All" || item.subCategory === subCat;
                    return matchesPillar && matchesSub;
                  }).length;

                  if (count === 0 && subCat !== "All") return null;

                  return (
                    <button
                      key={subCat}
                      onClick={() => setActiveSubCategory(subCat)}
                      className={`px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                        activeSubCategory === subCat
                          ? 'bg-brand-red text-white shadow-sm'
                          : 'bg-white border border-brand-blue/15 text-brand-blue/70 hover:border-brand-blue/40 hover:text-brand-blue'
                      }`}
                    >
                      {subCat}
                      <span className="ml-1.5 opacity-70 text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>
        </section>


        {/* ================= MAIN CONTENT VIEWS ================= */}
        
        {/* VIEW 1: CINEMATIC SLIDER SHOWCASE */}
        {viewMode === "slider" && (
          <section className="py-12 md:py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              
              {filteredItems.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-brand-blue/10">
                  <p className="text-lg font-display text-brand-blue">No visual records matched your search criteria.</p>
                  <button 
                    onClick={() => { setActivePillar("all"); setActiveSubCategory("All"); setSearchQuery(""); }}
                    className="mt-4 px-6 py-2.5 bg-brand-blue text-white text-xs font-semibold rounded-full"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Main Showcase Hero Frame */}
                  <div className="relative aspect-[16/10] md:aspect-[21/10] rounded-3xl overflow-hidden shadow-glass-lg border border-brand-blue/10 bg-brand-gray mb-8 group">
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSliderItem.id}
                        className="absolute inset-0 cursor-pointer"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => openLightbox(sliderIndex)}
                      >
                        <img
                          src={currentSliderItem.src}
                          alt={currentSliderItem.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/95 via-brand-blue/30 to-transparent pointer-events-none"></div>

                    {/* Top Floating Badges */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-[0.25em] uppercase bg-brand-red text-white px-3.5 py-1.5 rounded-full shadow-sm">
                          {currentSliderItem.category === "exterior" ? "Exterior Architecture" : "Interior Design"}
                        </span>
                        <span className="text-[10px] font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-md text-brand-blue px-3 py-1.5 rounded-full shadow-sm">
                          {currentSliderItem.subCategory}
                        </span>
                      </div>

                      <button
                        onClick={() => openLightbox(sliderIndex)}
                        className="flex items-center gap-2 bg-white/90 hover:bg-white text-brand-blue px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer backdrop-blur-md"
                        title="View Fullscreen Lightbox"
                      >
                        <Maximize2 size={14} />
                        <span className="hidden sm:inline">Expand High-Res</span>
                      </button>
                    </div>

                    {/* Bottom Caption & Meta */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-white z-10 pointer-events-none">
                      <div className="max-w-3xl">
                        <div className="flex items-center gap-4 text-xs font-light text-white/70 mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-brand-red" />
                            {currentSliderItem.location}
                          </span>
                          <span>•</span>
                          <span>{currentSliderItem.area}</span>
                        </div>

                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-semibold text-white leading-tight">
                          {currentSliderItem.title}
                        </h2>

                        <p className="text-xs sm:text-sm font-light text-white/80 mt-2 line-clamp-2 max-w-2xl leading-relaxed">
                          {currentSliderItem.description}
                        </p>

                        {/* Tags */}
                        {currentSliderItem.tags && (
                          <div className="flex flex-wrap gap-2 mt-4 pointer-events-auto">
                            {currentSliderItem.tags.map(t => (
                              <span key={t} className="text-[10px] font-medium tracking-wider uppercase bg-white/15 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Indicator Counter */}
                      <div className="bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-widest text-white self-end md:self-auto">
                        <span className="text-brand-red font-bold">{sliderIndex + 1}</span>
                        <span className="text-white/60"> / {filteredItems.length}</span>
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={handlePrevSlider}
                      className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-brand-red text-brand-blue hover:text-white backdrop-blur-md border border-white/40 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg z-20"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      onClick={handleNextSlider}
                      className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-brand-red text-brand-blue hover:text-white backdrop-blur-md border border-white/40 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg z-20"
                      aria-label="Next image"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </div>

                  {/* Horizontal Thumbnail Strip */}
                  <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin">
                    {filteredItems.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setSliderIndex(idx)}
                        className={`relative flex-shrink-0 w-28 sm:w-36 aspect-[16/10] rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                          idx === sliderIndex
                            ? 'border-brand-red ring-2 ring-brand-red shadow-md scale-105 opacity-100'
                            : 'border-brand-blue/15 opacity-60 hover:opacity-100 hover:border-brand-blue/40'
                        }`}
                      >
                        <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-1 left-1.5 right-1.5 text-[9px] text-white font-medium truncate text-left">
                          {item.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

            </div>
          </section>
        )}


        {/* VIEW 2: MASONRY / BENTO GRID ARCHIVE */}
        {viewMode === "grid" && (
          <section className="py-12 md:py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              
              {filteredItems.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-brand-blue/10">
                  <p className="text-lg font-display text-brand-blue">No visual records matched your search criteria.</p>
                  <button 
                    onClick={() => { setActivePillar("all"); setActiveSubCategory("All"); setSearchQuery(""); }}
                    className="mt-4 px-6 py-2.5 bg-brand-blue text-white text-xs font-semibold rounded-full"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredItems.map((item, idx) => (
                    <motion.div 
                      key={item.id} 
                      variants={fadeUpStaggerVariant}
                      className="group bg-white rounded-3xl overflow-hidden border border-brand-blue/10 hover:border-brand-blue/30 shadow-sm hover:shadow-glass-lg transition-all duration-500 flex flex-col"
                    >
                      {/* Image Frame with Overlay */}
                      <div 
                        className="relative aspect-[4/3] overflow-hidden bg-brand-gray cursor-pointer"
                        onClick={() => openLightbox(idx)}
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                        />

                        {/* Gradient tint on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Top Category Badge */}
                        <div className="absolute top-3.5 left-3.5 z-10">
                          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full shadow-sm ${
                            item.category === "exterior" 
                              ? 'bg-brand-red text-white' 
                              : 'bg-brand-blue text-white'
                          }`}>
                            {item.category === "exterior" ? "Exterior" : "Interior"}
                          </span>
                        </div>

                        {/* Subcategory Pill */}
                        <div className="absolute top-3.5 right-3.5 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-brand-blue border border-white/40 shadow-sm">
                          {item.subCategory}
                        </div>

                        {/* Hover Quick Zoom Button */}
                        <div className="absolute bottom-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white text-brand-blue hover:bg-brand-red hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                          <Maximize2 size={16} />
                        </div>
                      </div>

                      {/* Card Meta Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs text-brand-blue/50 font-light mb-1.5">
                            <span className="flex items-center gap-1">
                              <MapPin size={12} className="text-brand-red" />
                              {item.location}
                            </span>
                            <span>{item.area}</span>
                          </div>

                          <h3 
                            onClick={() => openLightbox(idx)}
                            className="text-lg font-display font-semibold text-brand-blue group-hover:text-brand-red transition-colors cursor-pointer leading-snug"
                          >
                            {item.title}
                          </h3>

                          {item.description && (
                            <p className="text-xs font-light text-brand-blue/70 mt-2 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Bottom Tag Bar */}
                        <div className="pt-4 mt-4 border-t border-brand-blue/10 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags && item.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-[9px] font-medium tracking-wider uppercase px-2 py-0.5 rounded bg-brand-gray-light text-brand-blue/70">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => openLightbox(idx)}
                            className="text-xs font-semibold text-brand-blue/60 group-hover:text-brand-red flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <span>Inspect</span>
                            <ArrowUpRight size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

            </div>
          </section>
        )}


        {/* VIEW 3: DUAL PILLAR SPLIT EXPLORER */}
        {viewMode === "split" && (
          <section className="py-12 md:py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Column 1: Exterior Pillar Stream */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-blue/15 shadow-sm">
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-brand-blue/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-semibold text-brand-blue">Exterior Architecture</h3>
                        <p className="text-xs text-brand-blue/60">Elevations, 3D Renders & Site Execution</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-red text-white">
                      {exteriorImages.length} Projects
                    </span>
                  </div>

                  <div className="space-y-6 max-h-[1200px] overflow-y-auto pr-2 scrollbar-thin">
                    {exteriorImages.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          const globalIdx = allGalleryItems.findIndex(i => i.id === item.id);
                          openLightbox(globalIdx >= 0 ? globalIdx : 0);
                        }}
                        className="group flex flex-col sm:flex-row gap-4 p-3 rounded-2xl border border-brand-blue/10 hover:border-brand-blue/30 hover:bg-brand-gray-light/50 transition-all cursor-pointer"
                      >
                        <div className="w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-brand-gray flex-shrink-0">
                          <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex items-center gap-2 text-[10px] text-brand-blue/50 font-light mb-1">
                              <span>{item.subCategory}</span>
                              <span>•</span>
                              <span>{item.location}</span>
                            </div>
                            <h4 className="text-sm font-semibold text-brand-blue group-hover:text-brand-red transition-colors leading-snug">
                              {item.title}
                            </h4>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-brand-blue/60 pt-2">
                            <span>{item.area}</span>
                            <span className="text-brand-red font-medium">Click to inspect →</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Interior Pillar Stream */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-blue/15 shadow-sm">
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-brand-blue/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                        <Armchair size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-semibold text-brand-blue">Interior Design & Joinery</h3>
                        <p className="text-xs text-brand-blue/60">Living Sanctuaries, Suites & Millwork</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-blue text-white">
                      {interiorImages.length} Spaces
                    </span>
                  </div>

                  <div className="space-y-6 max-h-[1200px] overflow-y-auto pr-2 scrollbar-thin">
                    {interiorImages.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          const globalIdx = allGalleryItems.findIndex(i => i.id === item.id);
                          openLightbox(globalIdx >= 0 ? globalIdx : 0);
                        }}
                        className="group flex flex-col sm:flex-row gap-4 p-3 rounded-2xl border border-brand-blue/10 hover:border-brand-blue/30 hover:bg-brand-gray-light/50 transition-all cursor-pointer"
                      >
                        <div className="w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-brand-gray flex-shrink-0">
                          <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex items-center gap-2 text-[10px] text-brand-blue/50 font-light mb-1">
                              <span>{item.subCategory}</span>
                              <span>•</span>
                              <span>{item.location}</span>
                            </div>
                            <h4 className="text-sm font-semibold text-brand-blue group-hover:text-brand-red transition-colors leading-snug">
                              {item.title}
                            </h4>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-brand-blue/60 pt-2">
                            <span>{item.area}</span>
                            <span className="text-brand-red font-medium">Click to inspect →</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}


        {/* ================= ULTRA-LUXE LIGHTBOX MODAL ================= */}
        <AnimatePresence>
          {lightboxOpen && currentLightboxItem && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Modal Container */}
              <div className="relative w-full h-full max-w-7xl flex flex-col justify-between select-none">
                
                {/* Modal Top Bar */}
                <div className="flex items-center justify-between py-3 px-4 sm:px-6 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/15 z-30">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${
                      currentLightboxItem.category === "exterior" ? 'bg-brand-red text-white' : 'bg-brand-blue text-white'
                    }`}>
                      {currentLightboxItem.category === "exterior" ? "Exterior Architecture" : "Interior Design"}
                    </span>
                    <span className="hidden sm:inline text-xs font-light text-white/70">
                      {currentLightboxItem.subCategory} • {currentLightboxItem.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Zoom Toggle */}
                    <button
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                      title={isZoomed ? "Zoom Out" : "Zoom In"}
                    >
                      {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                    </button>

                    {/* Counter */}
                    <div className="text-xs font-mono text-white/70 px-2">
                      <span className="text-white font-bold">{lightboxIndex + 1}</span> / {filteredItems.length}
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => {
                        setLightboxOpen(false);
                        setIsZoomed(false);
                      }}
                      className="p-2 rounded-full bg-white/20 hover:bg-brand-red text-white transition-colors cursor-pointer"
                      title="Close (Esc)"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Main Media Showcase Center */}
                <div className="relative flex-1 flex items-center justify-center my-3 overflow-hidden rounded-2xl bg-black/40 border border-white/10">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentLightboxItem.id}
                      className={`relative max-w-full max-h-full flex items-center justify-center ${
                        isZoomed ? 'cursor-zoom-out scale-125 transition-transform duration-300' : 'cursor-zoom-in'
                      }`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: isZoomed ? 1.25 : 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      <img
                        src={currentLightboxItem.src}
                        alt={currentLightboxItem.title}
                        className="max-h-[60vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Nav Left Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
                      setIsZoomed(false);
                    }}
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-brand-red text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg z-20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  {/* Nav Right Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
                      setIsZoomed(false);
                    }}
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-brand-red text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg z-20"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Caption Card Floater */}
                  <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl p-4 sm:p-5 rounded-2xl bg-black/75 backdrop-blur-md text-white border border-white/15 z-20 pointer-events-none">
                    <h3 className="text-base sm:text-lg font-display font-semibold text-white mb-1">
                      {currentLightboxItem.title}
                    </h3>
                    <p className="text-xs font-light text-white/80 line-clamp-2">
                      {currentLightboxItem.description}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-white/60 mt-2">
                      <span>Area: {currentLightboxItem.area}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Thumbnail Strip for Fast Nav */}
                <div className="flex items-center gap-2 overflow-x-auto p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 scrollbar-none z-30">
                  {filteredItems.map((thumb, idx) => (
                    <button
                      key={thumb.id}
                      onClick={() => {
                        setLightboxIndex(idx);
                        setIsZoomed(false);
                      }}
                      className={`relative flex-shrink-0 w-16 sm:w-20 aspect-video rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        idx === lightboxIndex
                          ? 'border-brand-red ring-2 ring-brand-red scale-105'
                          : 'border-white/20 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={thumb.src} alt={thumb.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};

export default Gallery;
