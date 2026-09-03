import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar, Layers } from 'lucide-react';
import { fadeUpVariant, imageReveal } from '../../utils/animations';

const FeaturedProject = () => {
  return (
    <section className="py-28 md:py-40 px-6 md:px-12 bg-[#FAFBFF] relative overflow-hidden border-b border-brand-blue/10">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-8 bg-brand-red"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">Spotlight Build</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-brand-blue leading-[1.05] tracking-tight">
              KBR Contemporary Residence.
            </h2>
          </div>

          <div className="flex items-center gap-6 text-sm font-light text-brand-blue/60">
            <span className="flex items-center gap-1.5">
              <MapPin size={16} className="text-brand-red" />
              Kasaragod, Kerala
            </span>
            <span>·</span>
            <span>4,800 sq.ft Turnkey Villa</span>
          </div>
        </motion.div>

        {/* Cinematic Master Visual Card */}
        <motion.div
          className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-glass-lg border border-brand-blue/10 bg-brand-gray group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="absolute inset-0" variants={imageReveal}>
            <img
              src="/exterior/kbr.png"
              alt="KBR Contemporary Residence by ABCD Home"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
          
          {/* Subtle vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/95 via-brand-blue/30 to-transparent pointer-events-none"></div>

          {/* Floating Data & Specs Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 text-white z-10">
            
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-brand-red text-white px-3.5 py-1 rounded-full">
                  Architecture & Turnkey Build
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-white">
                  Signature Residence
                </span>
              </div>
              
              <h3 className="text-2xl md:text-4xl font-display font-semibold text-white mb-2 leading-tight">
                Cantilevered concrete massing engineered for coastal monsoon resilience.
              </h3>

              <p className="text-xs md:text-sm font-light text-white/70 line-clamp-2 leading-relaxed">
                Featuring dynamic geometric overhangs, warm wood soffits, custom in-house teak woodwork, and ambient facade illumination.
              </p>
            </div>

            <Link
              to="/projects"
              className="flex-shrink-0 inline-flex items-center gap-3 bg-white hover:bg-brand-red text-brand-blue hover:text-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-glass"
            >
              <span>View All Projects</span>
              <ArrowUpRight size={16} />
            </Link>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedProject;
