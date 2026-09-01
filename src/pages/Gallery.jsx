import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, LayoutGrid, Sliders, Maximize2 } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild } from '../utils/animations';

const galleryCategories = [
  {
    id: "architecture",
    name: "Architecture",
    subtitle: "Built Elevations, Facades & Massing",
    items: [
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80", title: "Cantilevered Waterfront Villa", location: "Kanhangad, Kerala" },
      { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80", title: "Glass Pavilion Facade", location: "Cherkala, Kasaragod" },
      { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80", title: "Timber & Stone Estate", location: "Kasaragod, Kerala" },
      { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80", title: "Contemporary Residence Elevation", location: "Kanhangad, Kerala" },
      { src: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80", title: "Commercial Studio Facade", location: "Kanhangad, Kerala" },
      { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80", title: "Structural Modern Villa Form", location: "Cherkala, Kasaragod" },
    ]
  },
  {
    id: "interior",
    name: "Interiors & Joinery",
    subtitle: "Living Sanctuaries, Suites & Custom Millwork",
    items: [
      { src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80", title: "Master Suite & Teak Joinery", location: "Kanhangad, Kerala" },
      { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80", title: "Secondary Guest Suite", location: "Kanhangad, Kerala" },
      { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80", title: "Executive Study & Library", location: "Cherkala, Kasaragod" },
      { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80", title: "Natural Sanctuary Detail", location: "Kasaragod, Kerala" },
      { src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80", title: "Open-Plan Living & Dining", location: "Kanhangad, Kerala" },
      { src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80", title: "Fluted Woodwork & Ambient Lighting", location: "Cherkala, Kasaragod" },
    ]
  },
  {
    id: "construction",
    name: "Construction & Site Craft",
    subtitle: "Foundations, RCC Framing & Turnkey Progress",
    items: [
      { src: "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1600&q=80", title: "RCC Slab Pour & Structural Curing", location: "Kasaragod, Kerala" },
      { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80", title: "Foundation Diagnostics & Groundwork", location: "Kanhangad, Kerala" },
      { src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80", title: "Precision Framework Alignment", location: "Cherkala, Kasaragod" },
      { src: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1600&q=80", title: "Structural Steel Erection", location: "Kanhangad, Kerala" },
      { src: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1600&q=80", title: "Masonry Quality Inspection", location: "Kasaragod, Kerala" },
      { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80", title: "Final Snagging & Surface Preparation", location: "Cherkala, Kasaragod" },
    ]
  }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("architecture");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("slider"); // "slider" or "grid"

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentCategoryData = galleryCategories.find(c => c.id === activeCategory) || galleryCategories[0];
  const total = currentCategoryData.items.length;
  const currentItem = currentCategoryData.items[currentIndex];

  const handleNext = () => setCurrentIndex((i) => (i + 1) % total);
  const handlePrev = () => setCurrentIndex((i) => (i - 1 + total) % total);
  const changeCategory = (id) => {
    setActiveCategory(id);
    setCurrentIndex(0);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFBFF] text-brand-blue">
        
        {/* Header */}
        <section className="pt-40 md:pt-48 pb-14 px-6 md:px-12 border-b border-brand-blue/10">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-[1px] w-8 bg-brand-red"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">Visual Archive</span>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <motion.div
                className="overflow-hidden max-w-3xl"
                variants={textRevealContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold leading-[1.0] tracking-tight"
                  variants={textRevealChild}
                >
                  Documenting the<br />
                  <span className="text-brand-red italic font-light">built</span> journey.
                </motion.h1>
              </motion.div>

              {/* View mode toggle */}
              <div className="flex items-center gap-3 bg-white p-1.5 rounded-full border border-brand-blue/10 shadow-sm self-start lg:self-end">
                <button
                  onClick={() => setViewMode("slider")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    viewMode === "slider" ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue/60 hover:text-brand-blue'
                  }`}
                >
                  <Sliders size={14} />
                  <span>Cinematic View</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    viewMode === "grid" ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue/60 hover:text-brand-blue'
                  }`}
                >
                  <LayoutGrid size={14} />
                  <span>Grid Archive</span>
                </button>
              </div>
            </div>

            {/* Category Selector Pills */}
            <div className="flex flex-wrap items-center gap-3 mt-12">
              {galleryCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => changeCategory(c.id)}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                    activeCategory === c.id
                      ? 'bg-brand-red text-white shadow-sm'
                      : 'bg-white border border-brand-blue/10 text-brand-blue/70 hover:border-brand-blue/30'
                  }`}
                >
                  {c.name}
                  <span className="ml-2 text-[10px] opacity-70">({c.items.length})</span>
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* View Mode 1: Interactive Slider */}
        {viewMode === "slider" ? (
          <section className="py-16 md:py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              
              {/* Main Showcase Frame */}
              <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-sm border border-brand-blue/10 bg-brand-gray mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${currentIndex}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={currentItem.src}
                      alt={currentItem.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Gradient overlay on bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-black/20 to-transparent pointer-events-none"></div>

                {/* Caption Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 text-white z-10">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-blue bg-white px-3.5 py-1 rounded-full mb-3 inline-block shadow-sm">
                      {currentCategoryData.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-display font-semibold text-white">
                      {currentItem.title}
                    </h3>
                    <p className="text-xs font-light text-white/70 mt-1">{currentItem.location}</p>
                  </div>

                  {/* Indicator counter */}
                  <div className="bg-white/20 border border-white/30 px-5 py-2 rounded-full text-xs font-semibold tracking-widest text-white">
                    <span>{currentIndex + 1}</span>
                    <span className="text-white/60"> / {total}</span>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-brand-blue hover:bg-brand-red hover:text-white border border-brand-blue/10 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-brand-blue hover:bg-brand-red hover:text-white border border-brand-blue/10 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md z-20"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4">
                {currentCategoryData.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative aspect-video rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                      idx === currentIndex
                        ? 'border-brand-red ring-2 ring-brand-red shadow-sm scale-105'
                        : 'border-brand-blue/10 opacity-60 hover:opacity-100 hover:border-brand-blue/30'
                    }`}
                  >
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

            </div>
          </section>
        ) : (
          /* View Mode 2: Masonry / Grid Archive */
          <section className="py-16 md:py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentCategoryData.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group bg-white rounded-3xl overflow-hidden border border-brand-blue/10 shadow-sm flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-display font-semibold text-brand-blue mb-1">{item.title}</h4>
                      <p className="text-xs font-light text-brand-blue/60">{item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
    </PageTransition>
  );
};

export default Gallery;
