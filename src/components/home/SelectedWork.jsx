import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUpVariant, imageReveal, staggerContainer, fadeUpStaggerVariant } from '../../utils/animations';

const projects = [
  { 
    id: "1", 
    name: "The Coastal Retreat", 
    type: "ARCHITECTURE", 
    year: "2024", 
    location: "Kanhangad, Kerala",
    area: "4,800 sq.ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&fm=webp&q=80",
    highlight: "Cantilevered waterfront concrete & teak villa."
  },
  { 
    id: "2", 
    name: "The Glass Pavilion", 
    type: "ARCHITECTURE", 
    year: "2023", 
    location: "Cherkala, Kasaragod",
    area: "3,600 sq.ft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&fm=webp&q=80",
    highlight: "Minimalist steel frame & panoramic double glazing."
  },
  { 
    id: "3", 
    name: "Modernist Master Suite", 
    type: "INTERIOR", 
    year: "2024", 
    location: "Kanhangad, Kerala",
    area: "1,200 sq.ft",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&fm=webp&q=80",
    highlight: "Custom acoustic teak joinery with integrated lighting."
  }
];

const SelectedWork = () => {
  return (
    <section className="py-28 md:py-40 px-6 md:px-12 bg-white relative overflow-hidden border-b border-brand-blue/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[2px] w-8 bg-brand-red"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">Selected Projects</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-brand-blue leading-[1.05] tracking-tight">
              Curated built works.
            </h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue hover:text-brand-red transition-all duration-300 pb-1 border-b border-brand-blue/20 hover:border-brand-red group"
            >
              <span>View All Projects</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 3-Column Portfolio Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeUpStaggerVariant}>
              <Link 
                to={`/projects/${project.id}`} 
                className="group flex flex-col h-full bg-[#FAFBFF] rounded-3xl overflow-hidden border border-brand-blue/10 hover:border-brand-blue/30 shadow-glass hover:shadow-glass-lg transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray">
                  <motion.div className="absolute inset-0" variants={imageReveal}>
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/40 shadow-sm">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue">
                      {project.type}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-semibold tracking-wider">
                    {project.year}
                  </div>

                  {/* Hover Arrow Button */}
                  <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-glass-red">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-brand-blue/50 font-light mb-2">
                      <span>{project.location}</span>
                      <span>{project.area}</span>
                    </div>

                    <h3 className="text-2xl font-display font-semibold text-brand-blue group-hover:text-brand-red transition-colors mb-2">
                      {project.name}
                    </h3>

                    <p className="text-sm font-light text-brand-blue/70 leading-relaxed">
                      {project.highlight}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-brand-blue/10 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-brand-blue/60 group-hover:text-brand-red transition-colors">
                    <span>View Case Study</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SelectedWork;
