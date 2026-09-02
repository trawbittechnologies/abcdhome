import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Maximize2, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { textRevealContainer, textRevealChild, fadeUpVariant } from '../utils/animations';
import { allGalleryItems, exteriorImages, interiorImages } from '../data/galleryData';

const categories = [
  { id: "all", name: "All Works" },
  { id: "exterior", name: "Exterior Architecture" },
  { id: "interior", name: "Interiors & Joinery" }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtered items
  const filteredItems = useMemo(() => {
    return allGalleryItems.filter(item => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        item.title.toLowerCase().includes(q) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
      );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, filteredItems.length]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const currentItem = filteredItems[lightboxIndex] || filteredItems[0] || allGalleryItems[0];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFBFF] text-brand-blue selection:bg-brand-red selection:text-white">
        
        {/* Minimal Hero Header */}
        <section className="pt-36 md:pt-44 pb-12 md:pb-16 px-6 md:px-12 border-b border-brand-blue/10 bg-gradient-to-b from-white via-white to-[#FAFBFF]">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <motion.div
                className="lg:col-span-8"
                variants={textRevealContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.h1 
                  className="text-4xl sm:text-6xl md:text-7xl font-display font-semibold tracking-tight text-brand-blue leading-[1.05]"
                  variants={textRevealChild}
                >
                  Visual Archive. <br />
                  <span className="text-brand-red font-serif italic font-normal">Architecture & Interior Craft.</span>
                </motion.h1>
              </motion.div>

              <motion.div
                className="lg:col-span-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm md:text-base font-light text-brand-blue/70 leading-relaxed">
                  A curated collection of contemporary villas, structural civil executions, and bespoke teak interior spaces crafted across Kerala.
                </p>
              </motion.div>
            </div>

            {/* Instant Filter Pills & Search */}
            <div className="mt-10 pt-8 border-t border-brand-blue/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const count = cat.id === "all" 
                    ? allGalleryItems.length 
                    : cat.id === "exterior" 
                    ? exteriorImages.length 
                    : interiorImages.length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                        isActive
                          ? 'bg-brand-blue text-white shadow-sm'
                          : 'bg-white text-brand-blue/70 border border-brand-blue/10 hover:border-brand-blue/30 hover:text-brand-blue'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-brand-gray-light text-brand-blue/60'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue/40" />
                <input
                  type="text"
                  placeholder="Search works..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 rounded-full text-xs bg-white border border-brand-blue/15 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none text-brand-blue transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-blue/40 hover:text-brand-red"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* Minimal Grid Showcase */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            {filteredItems.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-base text-brand-blue/60 mb-4">No matching works found.</p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="text-xs font-semibold uppercase tracking-wider text-brand-red underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                    onClick={() => openLightbox(idx)}
                    className="group relative bg-white rounded-3xl overflow-hidden border border-brand-blue/10 hover:border-brand-blue/30 shadow-[0_2px_12px_rgba(35,55,119,0.04)] hover:shadow-[0_12px_32px_rgba(35,55,119,0.08)] transition-all duration-500 cursor-pointer flex flex-col"
                  >
                    {/* Image Canvas */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray">
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Monospace Index Tag */}
                      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-blue/10 text-[10px] font-mono font-semibold text-brand-blue shadow-sm">
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      {/* Hover Fullscreen Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6 text-white">
                        <div>
                          <span className="text-[10px] font-mono text-brand-red uppercase tracking-wider block mb-1">
                            {item.category === "exterior" ? "Architecture" : "Interior Craft"}
                          </span>
                          <h3 className="text-sm sm:text-base font-display font-medium leading-snug">
                            {item.title}
                          </h3>
                        </div>

                        <div className="w-9 h-9 rounded-full bg-brand-red text-white flex items-center justify-center shadow-md flex-shrink-0 ml-3">
                          <Maximize2 size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Minimal Clean Card Footer */}
                    <div className="p-5 flex items-center justify-between border-t border-brand-blue/10 bg-white">
                      <h3 className="text-sm font-display font-semibold text-brand-blue group-hover:text-brand-red transition-colors truncate">
                        {item.title}
                      </h3>
                      <ArrowUpRight size={15} className="text-brand-blue/40 group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Minimal Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
              onClick={() => setLightboxOpen(false)}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                title="Next (Right Arrow)"
              >
                <ChevronRight size={22} />
              </button>

              {/* Main Lightbox Content */}
              <div 
                className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
                />

                {/* Lightbox Caption */}
                <div className="mt-4 text-center text-white space-y-1">
                  <h4 className="text-base sm:text-lg font-display font-medium">
                    {currentItem.title}
                  </h4>
                  <p className="text-xs font-mono text-white/50">
                    {lightboxIndex + 1} / {filteredItems.length}
                  </p>
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
