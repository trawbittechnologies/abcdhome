import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Layers, Sparkles, Building2, Armchair, Compass } from 'lucide-react';
import { fadeUpVariant } from '../../utils/animations';

const curatedWorks = [
  {
    id: "1",
    name: "KBR Contemporary Residence",
    type: "ARCHITECTURE",
    category: "exterior",
    location: "Kasaragod, Kerala",
    area: "4,800 sq.ft",
    image: "/exterior/kbr.png",
    story: "Designed for breezy coastal cross-ventilation, balancing bold cantilevered concrete with warm teakwood soffits.",
    tags: ["Cantilever Facade", "Teak Soffits", "Turnkey Build"]
  },
  {
    id: "3",
    name: "Ground Floor Living Sanctuary",
    type: "INTERIOR",
    category: "interior",
    location: "Kanhangad, Kerala",
    area: "650 sq.ft",
    image: "/interior/living01.png",
    story: "Double-height Italian marble living hall detailed with custom acoustic fluted wood paneling and ambient illumination.",
    tags: ["Italian Marble", "Acoustic Millwork", "Luxe Living"]
  },
  {
    id: "2",
    name: "Subhash Residence & Landscape",
    type: "ARCHITECTURE",
    category: "exterior",
    location: "Kanhangad, Kerala",
    area: "5,200 sq.ft",
    image: "/exterior/subhashlandscape.png",
    story: "Tropical modern estate integrating layered terrace balconies, pergolas, and a lush perimeter courtyard approach.",
    tags: ["Tropical Modern", "Pergola Terrace", "Courtyard"]
  },
  {
    id: "4",
    name: "Bespoke Teak Master Suite",
    type: "INTERIOR",
    category: "interior",
    location: "Cherkala, Kasaragod",
    area: "450 sq.ft",
    image: "/interior/bed02.png",
    story: "Handcrafted in our Cherkala workshop featuring full-height teak fluted paneling and warm indirect cove backlights.",
    tags: ["Teak Joinery", "Cove Lighting", "Master Suite"]
  },
  {
    id: "5",
    name: "ABCD Commercial Landmark",
    type: "CONSTRUCTION",
    category: "exterior",
    location: "Kanhangad, Kerala",
    area: "8,500 sq.ft",
    image: "/exterior/commercial.png",
    story: "High-performance commercial architecture engineered with geometric metal fins, glass curtain walls, and iconic street presence.",
    tags: ["Glass Facade", "Steel Structure", "Commercial"]
  },
  {
    id: "6",
    name: "Executive Kitchen & Dining",
    type: "INTERIOR",
    category: "interior",
    location: "Kasaragod, Kerala",
    area: "700 sq.ft",
    image: "/interior/kitchen03.png",
    story: "Seamless modular kitchen and dining sanctuary fitted with quartz island countertops and concealed soft-close joinery.",
    tags: ["Quartz Island", "Modular Craft", "Dining Joinery"]
  },
  {
    id: "7",
    name: "Mustafa Modernist Villa",
    type: "ARCHITECTURE",
    category: "exterior",
    location: "Cherkala, Kasaragod",
    area: "4,200 sq.ft",
    image: "/exterior/mustafa.png",
    story: "Crisp white cuboid geometries framed with vertical louvers and floor-to-ceiling glass for natural daylit spaces.",
    tags: ["Cuboid Massing", "Louvered Facade", "Monsoon Architecture"]
  },
  {
    id: "8",
    name: "Sacred Prayer Sanctuary",
    type: "INTERIOR",
    category: "interior",
    location: "Cherkala, Kasaragod",
    area: "200 sq.ft",
    image: "/interior/PRAYER%20.jpg%20(1).jpeg",
    story: "Serene spiritual space detailed with precision CNC jali patterns, natural teakwood altar, and aura backlighting.",
    tags: ["CNC Jali", "Pooja Sanctuary", "Aura Lighting"]
  }
];

// Exterior stream for creative dual-lane slide
const exteriorLane = [
  { src: "/exterior/kbr.png", title: "KBR Residence Facade" },
  { src: "/exterior/subhashlandscape.png", title: "Subhash Landscape" },
  { src: "/exterior/mustafa.png", title: "Mustafa Villa" },
  { src: "/exterior/commercial.png", title: "Commercial Landmark" },
  { src: "/exterior/farook.png", title: "Farook Waterfront" },
  { src: "/exterior/ashithberka.png", title: "Berka Residence" },
  { src: "/exterior/jidhu.png", title: "Jidhu Home" },
  { src: "/exterior/sasidharan.png", title: "Sasidharan Estate" }
];

// Interior stream for creative dual-lane slide
const interiorLane = [
  { src: "/interior/living01.png", title: "Italian Marble Living" },
  { src: "/interior/bed02.png", title: "Teak Master Suite" },
  { src: "/interior/kitchen03.png", title: "Modular Quartz Kitchen" },
  { src: "/interior/dining.png", title: "Family Dining Hall" },
  { src: "/interior/PRAYER%20.jpg%20(1).jpeg", title: "Sacred Prayer Sanctuary" },
  { src: "/interior/studyroom1.png", title: "Executive Study" },
  { src: "/interior/gym.png", title: "Fitness & Wellness Lounge" },
  { src: "/interior/ffliving01.png", title: "First Floor Lounge" }
];

const SelectedWork = () => {
  const [filter, setFilter] = useState("all"); // "all" | "exterior" | "interior"
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const scrollContainerRef = useRef(null);

  const displayedWorks = filter === "all"
    ? curatedWorks
    : curatedWorks.filter(w => w.category === filter);

  const total = displayedWorks.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  // Auto-slide effect every 5 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, total]);

  // Scroll active slide into view smoothly on horizontal track
  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = 420;
      scrollContainerRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <section
      className="py-24 md:py-36 bg-gradient-to-b from-[#FAFBFF] via-white to-[#FAFBFF] relative overflow-hidden border-b border-brand-blue/10 select-none"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ================= EDITORIAL HEADER & HUMANIZED TABS ================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-16 gap-8">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="max-w-2xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[2px] w-8 bg-brand-red"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">Selected Works</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-semibold text-brand-blue leading-[1.04] tracking-tight">
              Spaces shaped by life & context.
            </h2>

            <p className="text-sm font-light text-brand-blue/70 mt-3 leading-relaxed">
              Every residence and interior is conceived around sunlight rituals, natural breezes, and bespoke woodwork crafted with single accountability.
            </p>
          </motion.div>

          {/* Filter Pills & Slide Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto justify-between">

            {/* Variety Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-brand-blue/15 shadow-sm">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${filter === "all" ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue/60 hover:text-brand-blue'
                  }`}
              >
                All Works
              </button>
              <button
                onClick={() => setFilter("exterior")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${filter === "exterior" ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue/60 hover:text-brand-blue'
                  }`}
              >
                <Building2 size={13} />
                <span>Exterior</span>
              </button>
              <button
                onClick={() => setFilter("interior")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${filter === "interior" ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue/60 hover:text-brand-blue'
                  }`}
              >
                <Armchair size={13} />
                <span>Interior</span>
              </button>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-full bg-white hover:bg-brand-red border border-brand-blue/15 hover:border-brand-red text-brand-blue hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Previous Project"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="w-11 h-11 rounded-full bg-white hover:bg-brand-red border border-brand-blue/15 hover:border-brand-red text-brand-blue hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Next Project"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>

        </div>

        {/* ================= MAIN INTERACTIVE SLIDE CAROUSEL ================= */}
        <div className="relative">

          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-6 md:gap-8 overflow-x-auto scrollbar-none pb-6 pt-2 snap-x snap-mandatory"
          >
            {displayedWorks.map((project, idx) => {
              const isActive = idx === currentIndex;

              return (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-[310px] sm:w-[400px] md:w-[440px] snap-start"
                >
                  <Link
                    to="/projects"
                    className={`group flex flex-col h-full bg-white rounded-3xl overflow-hidden border transition-all duration-500 ${isActive
                        ? 'border-brand-blue/30 shadow-glass-lg ring-1 ring-brand-blue/20 -translate-y-1.5'
                        : 'border-brand-blue/10 hover:border-brand-blue/30 shadow-glass hover:shadow-glass-lg'
                      }`}
                  >
                    {/* Image Showcase Frame with Varied Aspect */}
                    <div className="relative aspect-[16/11] overflow-hidden bg-brand-gray">
                      <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                      />

                      {/* Top Floating Glass Badge */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className={`text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full shadow-sm ${project.category === "exterior" ? 'bg-brand-red text-white' : 'bg-brand-blue text-white'
                          }`}>
                          {project.type}
                        </span>
                      </div>

                      {/* Location Chip */}
                      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-brand-blue text-[10px] font-medium border border-white/50 shadow-sm flex items-center gap-1">
                        <MapPin size={11} className="text-brand-red" />
                        <span>{project.location}</span>
                      </div>

                      {/* Hover Expand Arrow */}
                      <div className="absolute bottom-4 right-4 z-10 w-11 h-11 rounded-full bg-brand-red text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-glass-red">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                    {/* Humanized Story & Specs */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-brand-blue/50 font-light mb-2">
                          <span>{project.area}</span>
                          <span className="font-mono text-[11px] text-brand-red font-medium">0{idx + 1}</span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-display font-semibold text-brand-blue group-hover:text-brand-red transition-colors mb-2.5 leading-snug">
                          {project.name}
                        </h3>

                        {/* Human Story Quote */}
                        <p className="text-xs sm:text-sm font-light text-brand-blue/75 line-clamp-2 leading-relaxed italic mb-4">
                          "{project.story}"
                        </p>
                      </div>

                      {/* Tags & Action */}
                      <div className="pt-4 border-t border-brand-blue/10 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 2).map((t) => (
                            <span key={t} className="text-[9px] font-medium tracking-wider uppercase bg-[#F4F6FC] text-brand-blue/70 px-2 py-0.5 rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>

                        <span className="text-xs font-semibold text-brand-blue/70 group-hover:text-brand-red transition-colors inline-flex items-center gap-1">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Slide Progress Indicator Bar & Dots */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              {displayedWorks.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${dotIdx === currentIndex
                      ? 'w-9 bg-brand-red'
                      : 'w-2 bg-brand-blue/20 hover:bg-brand-blue/40'
                    }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <span className="text-xs font-mono font-medium text-brand-blue/50">
              0{currentIndex + 1} / 0{total}
            </span>
          </div>

        </div>

      </div>

      {/* ================= CREATIVE DUAL-LANE INFINITE SLIDE RIBBONS ================= */}
      <div className="mt-16 md:mt-20 pt-8 border-t border-brand-blue/10 space-y-4 overflow-hidden">

        {/* Lane 1: Exterior Elevations (Flowing Left) */}
        <div className="relative flex overflow-x-hidden">
          <div className="flex gap-4 animate-marquee whitespace-nowrap will-change-transform">
            {exteriorLane.concat(exteriorLane).map((item, i) => (
              <div
                key={`ext-${i}`}
                className="relative w-56 sm:w-64 md:w-72 aspect-[16/10] rounded-2xl overflow-hidden bg-brand-gray border border-brand-blue/10 shadow-sm flex-shrink-0 group cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-[11px] font-medium text-white tracking-wide truncate">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lane 2: Interior Sanctuaries (Flowing Right in Reverse) */}
        <div className="relative flex overflow-x-hidden">
          <div
            className="flex gap-4 whitespace-nowrap will-change-transform"
            style={{
              animation: 'marquee 40s linear infinite reverse'
            }}
          >
            {interiorLane.concat(interiorLane).map((item, i) => (
              <div
                key={`int-${i}`}
                className="relative w-56 sm:w-64 md:w-72 aspect-[16/10] rounded-2xl overflow-hidden bg-brand-gray border border-brand-blue/10 shadow-sm flex-shrink-0 group cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-[11px] font-medium text-white tracking-wide truncate">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};

export default SelectedWork;
