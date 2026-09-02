import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  MapPin, 
  Layers, 
  Building2, 
  Compass, 
  Search, 
  LayoutGrid, 
  List, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild, imageReveal, staggerContainer, fadeUpStaggerVariant } from '../utils/animations';

export const allProjectsData = [
  {
    id: "kbr-residence",
    number: "01",
    name: "KBR Contemporary Residence",
    category: "ARCHITECTURE",
    pillar: "exterior",
    year: "2024",
    location: "Kasaragod, Kerala",
    area: "4,800 sq.ft",
    scope: "Turnkey Architecture & Civil Build",
    image: "/exterior/kbr.png",
    description: "Multi-level contemporary villa featuring bold cantilevered balconies, natural teak wood soffits, and integrated facade illumination.",
    tags: ["Residential Villa", "Cantilever", "Turnkey Build"]
  },
  {
    id: "subhash-residence",
    number: "02",
    name: "Subhash Tropical Modern Villa",
    category: "ARCHITECTURE",
    pillar: "exterior",
    year: "2024",
    location: "Kanhangad, Kerala",
    area: "5,200 sq.ft",
    scope: "Architecture & Landscape Design",
    image: "/exterior/subhashlandscape.png",
    description: "Monsoon-resilient tropical estate with double-height glass entryway, open courtyard ventilation, and tiered garden terraces.",
    tags: ["Tropical Modern", "Landscape", "Double Height"]
  },
  {
    id: "mustafa-villa",
    number: "03",
    name: "Mustafa Minimalist Residence",
    category: "ARCHITECTURE",
    pillar: "exterior",
    year: "2023",
    location: "Cherkala, Kasaragod",
    area: "4,200 sq.ft",
    scope: "Turnkey Architecture & Interior",
    image: "/exterior/mustafa.png",
    description: "Monolithic cuboid massing accented with vertical architectural louvers and expansive glazing for optimal natural cross-ventilation.",
    tags: ["Monolithic Facade", "Monsoon Architecture", "Turnkey"]
  },
  {
    id: "farook-residence",
    number: "04",
    name: "Farook Waterfront Residence",
    category: "ARCHITECTURE",
    pillar: "exterior",
    year: "2024",
    location: "Kasaragod, Kerala",
    area: "3,900 sq.ft",
    scope: "Architectural Planning & Execution",
    image: "/exterior/farook.png",
    description: "Sculptural residential elevation with deep recessed verandas, tempered glass balustrades, and natural stone veneer accents.",
    tags: ["Waterfront Residence", "Terraces", "Modernist"]
  },
  {
    id: "ashith-berka",
    number: "05",
    name: "Ashith Berka Signature Villa",
    category: "ARCHITECTURE",
    pillar: "exterior",
    year: "2023",
    location: "Berka, Kasaragod",
    area: "3,600 sq.ft",
    scope: "Turnkey Architectural Design",
    image: "/exterior/ashithberka.png",
    description: "Harmoniously proportioned modern villa with a double-height entrance porch, textured stone cladding, and warm ambient uplighting.",
    tags: ["Dual Carport", "Stone Cladding", "Residential"]
  },
  {
    id: "bachi-residence",
    number: "06",
    name: "Bachi Residence & Upper Terrace",
    category: "ARCHITECTURE",
    pillar: "exterior",
    year: "2023",
    location: "Cherkala, Kasaragod",
    area: "3,800 sq.ft",
    scope: "Architectural Design & Build",
    image: "/exterior/bachi.png",
    description: "Street-facing contemporary facade with textured grey stone finishes, cantilevered master balconies, and perimeter landscaping.",
    tags: ["Stone Masonry", "Cantilever Balcony", "Villa"]
  },
  {
    id: "commercial-studio",
    number: "07",
    name: "ABCD Commercial Studio Complex",
    category: "CONSTRUCTION",
    pillar: "exterior",
    year: "2024",
    location: "Kanhangad, Kerala",
    area: "8,500 sq.ft",
    scope: "Commercial Architecture & Civil Execution",
    image: "/exterior/commercial.png",
    description: "High-performance commercial facility engineered with structural glass curtain walls, geometric metal fins, and energy-efficient shading.",
    tags: ["Commercial Landmark", "Curtain Glazing", "RCC Frame"]
  },
  {
    id: "living-sanctuary",
    number: "08",
    name: "Grand Living & Reception Hall",
    category: "INTERIOR",
    pillar: "interior",
    year: "2024",
    location: "Kanhangad, Kerala",
    area: "1,100 sq.ft",
    scope: "Bespoke Interior & Lighting Design",
    image: "/interior/living01.png",
    description: "Luxury double-height living hall featuring imported Italian marble flooring, bespoke fluted wall paneling, and curated ambient chandelier lighting.",
    tags: ["Italian Marble", "Fluted Paneling", "Luxury Living"]
  },
  {
    id: "master-suites",
    number: "09",
    name: "Bespoke Teak Master Bedroom Suite",
    category: "INTERIOR",
    pillar: "interior",
    year: "2024",
    location: "Cherkala, Kasaragod",
    area: "650 sq.ft",
    scope: "Custom Joinery & Lighting Fitout",
    image: "/interior/bed02.png",
    description: "Custom acoustically treated master bedroom sanctuary detailed with vertical teak woodwork, floating nightstands, and concealed cove backlighting.",
    tags: ["Master Suite", "Teak Joinery", "Cove Lighting"]
  },
  {
    id: "modular-kitchen",
    number: "10",
    name: "Executive Kitchen & Dining Pavilion",
    category: "INTERIOR",
    pillar: "interior",
    year: "2024",
    location: "Kasaragod, Kerala",
    area: "850 sq.ft",
    scope: "Modular Interior & Joinery",
    image: "/interior/kitchen03.png",
    description: "Precision modular kitchen and family dining space fitted with engineered quartz countertops, soft-close hardware, and ambient accent illumination.",
    tags: ["Modular Kitchen", "Quartz Island", "Dining Joinery"]
  },
  {
    id: "rcc-civil-execution",
    number: "11",
    name: "Turnkey Structural RCC & Civil Execution",
    category: "CONSTRUCTION",
    pillar: "exterior",
    year: "2024",
    location: "Kasaragod, Kerala",
    area: "Civil Execution",
    scope: "Structural Engineering & Quality Concrete",
    image: "/exterior/IMG_4031.JPG.jpeg",
    description: "High-precision on-site reinforced concrete beam alignment, column shuttering, solid block masonry, and multi-layer waterproofing.",
    tags: ["RCC Slab", "Site Engineering", "Civil Quality"]
  }
];

const categories = ["ALL", "ARCHITECTURE", "INTERIOR", "CONSTRUCTION"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtered dataset based on category & search query
  const filteredProjects = useMemo(() => {
    return allProjectsData.filter((project) => {
      const matchesCategory = activeCategory === "ALL" || project.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFBFF] text-brand-blue selection:bg-brand-red selection:text-white">
        
        {/* Editorial Minimal Header */}
        <section className="pt-36 md:pt-44 pb-12 md:pb-16 px-6 md:px-12 border-b border-brand-blue/10 bg-gradient-to-b from-white via-white to-[#FAFBFF]">
          <div className="max-w-7xl mx-auto">
            
            {/* Main Title & Narrative */}
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
                  Architecture, Interiors & <br className="hidden sm:inline" />
                  <span className="text-brand-red font-serif italic font-normal">Turnkey Civil Builds.</span>
                </motion.h1>
              </motion.div>

              <motion.div
                className="lg:col-span-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm md:text-base font-light text-brand-blue/70 leading-relaxed mb-4">
                  A curated record of residential architecture, bespoke interior woodwork, and structural construction delivered with end-to-end design precision.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-brand-blue/50">
                  <span>{allProjectsData.length} Selected Works</span>
                  <span>·</span>
                  <span>Turnkey Design & Build</span>
                </div>
              </motion.div>
            </div>

            {/* Filter, Search & View Toolbar */}
            <div className="mt-12 pt-8 border-t border-brand-blue/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const count = cat === "ALL" 
                    ? allProjectsData.length 
                    : allProjectsData.filter(p => p.category === cat).length;
                  const isActive = activeCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? 'bg-brand-blue text-white shadow-sm'
                          : 'bg-white border border-brand-blue/15 text-brand-blue/70 hover:border-brand-blue/40 hover:text-brand-blue'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-brand-blue/5 text-brand-blue/60'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search & Layout View Toggle */}
              <div className="flex items-center gap-3">
                {/* Search Box */}
                <div className="relative flex-1 md:w-64">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-blue/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search works..."
                    className="w-full bg-white border border-brand-blue/15 rounded-full pl-9 pr-8 py-2 text-xs text-brand-blue placeholder:text-brand-blue/40 focus:outline-none focus:border-brand-blue transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-brand-blue/40 hover:text-brand-red cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* View Switcher */}
                <div className="flex items-center bg-white border border-brand-blue/15 rounded-full p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      viewMode === "grid" ? 'bg-brand-blue text-white' : 'text-brand-blue/50 hover:text-brand-blue'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      viewMode === "list" ? 'bg-brand-blue text-white' : 'text-brand-blue/50 hover:text-brand-blue'
                    }`}
                    title="Editorial Index View"
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Projects Display Section */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            {filteredProjects.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-brand-blue/10 p-8 max-w-md mx-auto">
                <Search size={28} className="mx-auto text-brand-blue/30 mb-4" />
                <h3 className="text-lg font-semibold text-brand-blue mb-1">No matching projects found</h3>
                <p className="text-xs text-brand-blue/60 mb-6 font-light">
                  Try adjusting your filter or search query.
                </p>
                <button
                  onClick={() => { setActiveCategory("ALL"); setSearchQuery(""); }}
                  className="px-5 py-2 bg-brand-blue text-white text-xs font-semibold rounded-full hover:bg-brand-red transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* GRID VIEW */
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${searchQuery}-grid`}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                >
                  {filteredProjects.map((project) => (
                    <motion.div 
                      key={project.id} 
                      variants={fadeUpStaggerVariant}
                      className="group flex flex-col"
                    >
                      <Link
                        to={`/projects/${project.id}`}
                        className="flex flex-col h-full bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-brand-blue/10 hover:border-brand-blue/30 shadow-[0_2px_12px_rgba(35,55,119,0.04)] hover:shadow-[0_12px_32px_rgba(35,55,119,0.08)] transition-all duration-500"
                      >
                        {/* Image Canvas */}
                        <div className="relative aspect-[16/11] overflow-hidden bg-brand-gray">
                          <img
                            src={project.image}
                            alt={project.name}
                            loading="lazy"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          
                          {/* Dark subtle gradient on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Index Badge */}
                          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-blue/10 text-[10px] font-mono font-semibold text-brand-blue shadow-sm">
                            {project.number}
                          </div>

                          {/* Category Pill */}
                          <div className="absolute top-4 right-4 z-10 bg-brand-blue/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase shadow-sm">
                            {project.category}
                          </div>

                          {/* Floating Arrow on Hover */}
                          <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                            <ArrowUpRight size={18} />
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Meta row: Scope & Year */}
                            <div className="flex items-center justify-between text-xs text-brand-blue/60 font-light mb-2.5">
                              <span className="text-[11px] font-mono uppercase tracking-wider text-brand-red">
                                {project.category}
                              </span>
                              <span className="font-mono text-[11px] shrink-0 text-brand-blue/50">
                                {project.year}
                              </span>
                            </div>

                            {/* Project Name */}
                            <h3 className="text-xl md:text-2xl font-display font-semibold text-brand-blue group-hover:text-brand-red transition-colors duration-200 mb-2.5 leading-snug">
                              {project.name}
                            </h3>

                            {/* Concise Architecture Summary */}
                            <p className="text-xs md:text-sm font-light text-brand-blue/70 line-clamp-2 leading-relaxed mb-5">
                              {project.description}
                            </p>
                          </div>

                          {/* Minimal Footer */}
                          <div className="pt-4 border-t border-brand-blue/10 flex items-center justify-between text-xs">
                            <span className="text-[11px] font-light text-brand-blue/60">
                              {project.scope}
                            </span>
                            <span className="inline-flex items-center gap-1 font-semibold text-[11px] tracking-wider uppercase text-brand-blue group-hover:text-brand-red transition-colors">
                              <span>Explore</span>
                              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              /* MINIMAL EDITORIAL INDEX / LIST VIEW */
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${searchQuery}-list`}
                  className="bg-white rounded-3xl border border-brand-blue/10 overflow-hidden shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-4 border-b border-brand-blue/10 text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-brand-blue/50">
                    <span className="col-span-1">#</span>
                    <span className="col-span-5">Project / Work</span>
                    <span className="col-span-3">Typology</span>
                    <span className="col-span-2">Year</span>
                    <span className="col-span-1 text-right">View</span>
                  </div>

                  <div className="divide-y divide-brand-blue/10">
                    {filteredProjects.map((project) => (
                      <Link
                        key={project.id}
                        to={`/projects/${project.id}`}
                        className="group grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-6 lg:px-8 py-5 hover:bg-[#FAFBFF] transition-colors"
                      >
                        {/* Monospace Index */}
                        <div className="hidden lg:block col-span-1 font-mono text-xs text-brand-blue/40 group-hover:text-brand-red transition-colors">
                          {project.number}
                        </div>

                        {/* Title & Preview Thumbnail */}
                        <div className="col-span-1 lg:col-span-5 flex items-center gap-4">
                          <img 
                            src={project.image} 
                            alt={project.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-brand-blue/10"
                          />
                          <div>
                            <h3 className="font-display font-semibold text-base md:text-lg text-brand-blue group-hover:text-brand-red transition-colors">
                              {project.name}
                            </h3>
                            <span className="text-xs text-brand-blue/50 lg:hidden">
                              {project.category} · {project.year}
                            </span>
                          </div>
                        </div>

                        {/* Typology */}
                        <div className="hidden lg:block col-span-3">
                          <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-md bg-brand-gray-light text-brand-blue">
                            {project.category}
                          </span>
                        </div>

                        {/* Year */}
                        <div className="hidden lg:block col-span-2 text-xs font-mono text-brand-blue/60">
                          {project.year}
                        </div>

                        {/* Action Arrow */}
                        <div className="col-span-1 flex justify-end">
                          <div className="w-8 h-8 rounded-full border border-brand-blue/15 flex items-center justify-center text-brand-blue/60 group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white transition-all">
                            <ArrowUpRight size={14} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

          </div>
        </section>

        {/* Minimal Bottom Invitation */}
        <section className="py-20 px-6 md:px-12 border-t border-brand-blue/10 bg-white">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-brand-red font-semibold">
              Turnkey Design & Build
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-brand-blue tracking-tight">
              Ready to create your sanctuary?
            </h2>
            <p className="text-sm md:text-base font-light text-brand-blue/70 max-w-xl mx-auto leading-relaxed">
              From architectural planning and structural engineering to bespoke teak interior joinery, our studio manages every detail with complete accountability.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-brand-blue hover:bg-brand-red text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 shadow-sm flex items-center gap-2"
              >
                <span>Consult Our Architects</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/gallery"
                className="px-8 py-3.5 bg-white border border-brand-blue/20 hover:border-brand-blue text-brand-blue text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300"
              >
                <span>Browse Full Gallery</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Projects;

