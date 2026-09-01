import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild, imageReveal, staggerContainer, fadeUpStaggerVariant } from '../utils/animations';

export const allProjectsData = [
  {
    id: "1",
    name: "The Coastal Retreat",
    category: "ARCHITECTURE",
    year: "2024",
    location: "Kanhangad, Kerala",
    area: "4,800 sq.ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    description: "A cantilevered waterfront villa blending raw concrete with warm teak elements to frame expansive tropical sea views.",
    tags: ["Residential", "Waterfront", "Turnkey"]
  },
  {
    id: "2",
    name: "The Glass Pavilion",
    category: "ARCHITECTURE",
    year: "2023",
    location: "Cherkala, Kasaragod",
    area: "3,600 sq.ft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    description: "Floor-to-ceiling panoramic glass architecture maximizing natural sunlight and seamless indoor-outdoor living.",
    tags: ["Minimalist", "Daylight", "Steel Frame"]
  },
  {
    id: "3",
    name: "Modernist Master Suite",
    category: "INTERIOR",
    year: "2024",
    location: "Kanhangad, Kerala",
    area: "1,200 sq.ft",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80",
    description: "Custom acoustically treated master sanctuary featuring bespoke teak headboards, cove lighting, and fluted paneling.",
    tags: ["Bespoke Joinery", "Lighting", "Luxury"]
  },
  {
    id: "4",
    name: "Timber & Stone Residence",
    category: "CONSTRUCTION",
    year: "2023",
    location: "Kasaragod, Kerala",
    area: "5,400 sq.ft",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    description: "Multi-level contemporary structure constructed with locally sourced stone, engineered timber, and reinforced concrete.",
    tags: ["Turnkey Build", "Sustainable", "Custom Craft"]
  },
  {
    id: "5",
    name: "Executive Study & Library",
    category: "INTERIOR",
    year: "2023",
    location: "Cherkala, Kasaragod",
    area: "850 sq.ft",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    description: "A focused private workspace detailed with minimalist brass accents, matte dark veneer, and ergonomic architectural layout.",
    tags: ["Interior Architecture", "Millwork"]
  },
  {
    id: "6",
    name: "Commercial Studio Landmark",
    category: "CONSTRUCTION",
    year: "2024",
    location: "Kanhangad, Kerala",
    area: "8,200 sq.ft",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80",
    description: "High-performance commercial facility engineered for maximum spatial flexibility, thermal efficiency, and striking street presence.",
    tags: ["Commercial", "Structure", "Facade"]
  },
];

const filters = ["ALL", "ARCHITECTURE", "INTERIOR", "CONSTRUCTION"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [filteredProjects, setFilteredProjects] = useState(allProjectsData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setFilteredProjects(
      activeFilter === "ALL" 
        ? allProjectsData 
        : allProjectsData.filter(p => p.category === activeFilter)
    );
  }, [activeFilter]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFBFF] text-brand-blue">
        
        {/* Editorial Header */}
        <section className="pt-40 md:pt-48 pb-16 px-6 md:px-12 border-b border-brand-blue/10">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-[1px] w-8 bg-brand-red"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">Curated Portfolio</span>
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
                  Spaces built with<br />
                  <span className="text-brand-red italic font-light">intent</span> & precision.
                </motion.h1>
              </motion.div>

              <motion.p
                className="text-base md:text-lg font-light text-brand-blue/70 max-w-md leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Explore our selection of completed and ongoing residential, interior, and commercial commissions across Kerala.
              </motion.p>
            </div>

            {/* Filter Pills */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mt-14"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'bg-white border border-brand-blue/15 text-brand-blue/70 hover:text-brand-blue hover:border-brand-blue/40'
                  }`}
                >
                  {filter}
                  <span className="ml-2 text-[10px] opacity-60">
                    ({filter === "ALL" ? allProjectsData.length : allProjectsData.filter(p => p.category === filter).length})
                  </span>
                </button>
              ))}
            </motion.div>

          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 md:py-28 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {filteredProjects.map((project, idx) => (
                  <motion.div key={project.id} variants={fadeUpStaggerVariant}>
                    <Link
                      to={`/projects/${project.id}`}
                      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-brand-blue/10 hover:border-brand-blue/30 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Image container */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray">
                        <motion.div className="absolute inset-0" variants={imageReveal}>
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                        </motion.div>

                        {/* Category badge */}
                        <div className="absolute top-4 left-4 z-10 bg-white px-3.5 py-1.5 rounded-full border border-brand-blue/10 shadow-sm">
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue">
                            {project.category}
                          </span>
                        </div>

                        {/* Year pill */}
                        <div className="absolute top-4 right-4 z-10 bg-brand-blue px-3 py-1 rounded-full text-white text-[10px] font-semibold tracking-wider">
                          {project.year}
                        </div>

                        {/* Hover Arrow Icon */}
                        <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs text-brand-blue/50 font-light mb-2">
                            <span>{project.location}</span>
                            <span>{project.area}</span>
                          </div>
                          
                          <h3 className="text-2xl font-display font-semibold text-brand-blue group-hover:text-brand-red transition-colors mb-3">
                            {project.name}
                          </h3>

                          <p className="text-sm font-light text-brand-blue/70 line-clamp-2 leading-relaxed mb-6">
                            {project.description}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-brand-blue/10">
                          {project.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-md bg-brand-gray-light text-brand-blue/70">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Projects;
