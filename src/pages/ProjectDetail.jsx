import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, MapPin, Calendar, Layers, Maximize } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild, imageReveal, staggerContainer, fadeUpStaggerVariant } from '../utils/animations';
import { allProjectsData } from './Projects';

const projectGalleryMap = {
  "1": [
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80", caption: "Main Waterfront Elevation" },
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80", caption: "Twilight Exterior Landscape" },
    { src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80", caption: "Primary Master Sanctuary" },
    { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80", caption: "Executive Private Study" },
  ],
  "2": [
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80", caption: "Steel & Glass Structural Facade" },
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80", caption: "Garden Courtyard Integration" },
    { src: "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1600&q=80", caption: "Precision Reinforced Construction" },
  ],
  "3": [
    { src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80", caption: "Bespoke Teak Headboard Joinery" },
    { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80", caption: "Secondary Suite Natural Light" },
    { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80", caption: "Meditative Sanctuary Detail" },
  ],
  "4": [
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80", caption: "Timber Cladding & Stone Masonry" },
    { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80", caption: "Site Foundation Progress" },
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80", caption: "Exterior Completed Profile" },
  ],
  "5": [
    { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80", caption: "Fluted Wall Paneling & Lighting" },
    { src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80", caption: "Material Transitions" },
    { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80", caption: "Lounge & Library View" },
  ],
  "6": [
    { src: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80", caption: "Full Facade Architecture" },
    { src: "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1600&q=80", caption: "Structural Steel Framing" },
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80", caption: "Completed Street Front" },
  ],
};

const ProjectDetail = () => {
  const { id, slug } = useParams();
  const activeId = id || slug;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeId]);

  const project = allProjectsData.find(p => p.id === activeId) || allProjectsData[0];
  const gallery = projectGalleryMap[project.id] || projectGalleryMap["1"];

  const currentIndex = allProjectsData.findIndex(p => p.id === project.id);
  const nextProject = allProjectsData[(currentIndex + 1) % allProjectsData.length];
  const prevProject = allProjectsData[(currentIndex - 1 + allProjectsData.length) % allProjectsData.length];

  return (
    <PageTransition>
      <div className="bg-[#FAFBFF] text-brand-blue min-h-screen">
        
        {/* Navigation Bar Strip */}
        <div className="pt-36 md:pt-40 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue/60 hover:text-brand-red transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to all projects</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to={`/projects/${prevProject.id}`}
              className="w-10 h-10 rounded-full border border-brand-blue/15 flex items-center justify-center text-brand-blue/60 hover:text-white hover:bg-brand-blue transition-all"
              title="Previous project"
            >
              <ArrowLeft size={16} />
            </Link>
            <Link
              to={`/projects/${nextProject.id}`}
              className="w-10 h-10 rounded-full border border-brand-blue/15 flex items-center justify-center text-brand-blue/60 hover:text-white hover:bg-brand-blue transition-all"
              title="Next project"
            >
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-8 pb-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            {/* Meta Tags */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="px-3.5 py-1.5 rounded-full bg-brand-red text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                {project.category}
              </span>
              <span className="text-xs font-light text-brand-blue/50 flex items-center gap-1.5">
                <MapPin size={14} className="text-brand-red" />
                {project.location}
              </span>
              <span className="text-xs font-light text-brand-blue/50">·</span>
              <span className="text-xs font-light text-brand-blue/50 flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-red" />
                Completed {project.year}
              </span>
            </motion.div>
            
            {/* Title */}
            <motion.div 
              className="overflow-hidden mb-12"
              variants={textRevealContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold leading-[1.0] tracking-tight"
                variants={textRevealChild}
              >
                {project.name}
              </motion.h1>
            </motion.div>
            
            {/* Hero Main Image */}
            <motion.div 
              className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-sm border border-brand-blue/10 relative bg-brand-gray"
              initial="hidden"
              animate="visible"
            >
              <motion.div className="absolute inset-0" variants={imageReveal}>
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* Project Specs & Narrative */}
        <section className="py-16 md:py-24 px-6 md:px-12 border-y border-brand-blue/10 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left: Project Specs Matrix */}
            <div className="lg:col-span-4 space-y-8">
              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-red">Project Data</h2>
              
              <div className="space-y-6">
                {[
                  { label: "Typology", val: `${project.category} Design & Build` },
                  { label: "Location", val: project.location },
                  { label: "Built Area", val: project.area },
                  { label: "Completion Year", val: project.year },
                  { label: "Scope of Work", val: "Architecture, Interior Architecture, Turnkey Engineering" },
                  { label: "Materials", val: "Exposed Concrete, Teak Wood, Structural Steel, Double Glazing" },
                ].map((spec) => (
                  <div key={spec.label} className="pb-4 border-b border-brand-blue/10">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue/40 mb-1">{spec.label}</p>
                    <p className="text-base font-medium text-brand-blue">{spec.val}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue text-white hover:bg-brand-red py-4 px-6 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-sm"
              >
                <span>Inquire About Similar Project</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-blue/40 block mb-4">The Vision</span>
                <h2 className="text-3xl md:text-4xl font-display font-semibold leading-tight text-brand-blue mb-6">
                  Balancing tropical climate considerations with bold contemporary minimalism.
                </h2>
                <p className="text-lg font-light text-brand-blue/70 leading-relaxed mb-6">
                  {project.description} The design emphasizes open-plan volume, cross-ventilation, and intentional daylight harvesting to ensure an environment that feels serene and grounded throughout the day.
                </p>
                <p className="text-lg font-light text-brand-blue/70 leading-relaxed">
                  Through ABCD’s integrated design-build methodology, every custom joint, recessed cove, and engineered structural beam was executed with millimeter precision directly by our dedicated on-site team.
                </p>
              </div>

              {/* Highlights 3-col */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-brand-blue/10">
                {[
                  { title: "Material Truth", desc: "Honest expression of authentic wood and structural elements." },
                  { title: "Spatial Flow", desc: "Seamless transition between living zones and outdoor landscapes." },
                  { title: "Turnkey Quality", desc: "Zero compromise from sketch to final structural handover." },
                ].map((item) => (
                  <div key={item.title} className="p-6 rounded-2xl bg-brand-gray-light/60 border border-brand-blue/10">
                    <CheckCircle2 size={20} className="text-brand-red mb-3" />
                    <h3 className="text-base font-semibold text-brand-blue mb-1">{item.title}</h3>
                    <p className="text-xs font-light text-brand-blue/70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Gallery Grid Showcase */}
        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red block mb-2">Visual Documentation</span>
                <h2 className="text-4xl md:text-5xl font-display font-semibold text-brand-blue">
                  Project Gallery
                </h2>
              </div>
              <p className="text-sm font-light text-brand-blue/60 max-w-sm">
                High-resolution documentation capturing both structural massing and intimate interior details.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {gallery.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`group rounded-3xl overflow-hidden border border-brand-blue/10 shadow-sm bg-white flex flex-col ${
                    idx === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden ${idx === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                    <img 
                      src={img.src} 
                      alt={img.caption} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 md:p-6 flex items-center justify-between border-t border-brand-blue/10">
                    <p className="text-sm font-display font-semibold text-brand-blue">{img.caption}</p>
                    <span className="text-[10px] font-bold tracking-widest text-brand-blue/40 uppercase">0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Next Project Footer Bar */}
        <section className="py-20 px-6 md:px-12 border-t border-brand-blue/10 bg-[#F4F6FC]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red block mb-2">Next Project</span>
              <Link 
                to={`/projects/${nextProject.id}`}
                className="text-3xl md:text-5xl font-display font-semibold text-brand-blue hover:text-brand-red transition-colors inline-flex items-center gap-4 group"
              >
                <span>{nextProject.name}</span>
                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <Link
              to="/projects"
              className="px-8 py-3.5 rounded-full border border-brand-blue/20 text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue hover:bg-brand-blue hover:text-white transition-all"
            >
              All Projects
            </Link>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default ProjectDetail;
