import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { fadeUpVariant, imageReveal } from '../../utils/animations';

const StudioIntro = () => {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-transparent relative overflow-hidden border-b border-brand-blue/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="h-[2px] w-8 bg-brand-red"></div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">The Studio Philosophy</span>
        </div>

        {/* Big Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          <motion.div 
            className="lg:col-span-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-brand-blue leading-[1.05] tracking-tight">
              We eliminate the gap between<br />
              <span className="text-brand-red italic font-light">visionary design</span> and physical craft.
            </h2>
          </motion.div>

          <motion.div 
            className="lg:col-span-4 lg:pt-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <p className="text-base md:text-lg font-light text-brand-blue/70 leading-relaxed mb-6">
              ABCD is a contemporary design-build practice in <strong className="font-semibold text-brand-blue">Cherkala – Kanhangad</strong>. By housing architectural drafting, custom woodwork, and on-site engineering under one accountable team, we ensure what is envisioned on paper is built with millimeter precision.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue hover:text-brand-red transition-colors group"
            >
              <span>Explore Our Studio Ethos</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Visual Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Visual Frame */}
          <motion.div 
            className="lg:col-span-7 relative min-h-[440px] md:min-h-[520px] rounded-3xl overflow-hidden shadow-glass border border-brand-blue/10 bg-brand-gray group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="absolute inset-0" variants={imageReveal}>
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&fm=webp&q=80" 
                alt="ABCD Contemporary Architecture in Kerala"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/85 via-black/15 to-transparent"></div>
            
            {/* Studio Location Overlay Pill */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white z-10">
              <div>
                <div className="flex items-center gap-2 mb-1 text-brand-red">
                  <MapPin size={14} />
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white">Cherkala – Kanhangad</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-semibold text-white">Architecture · Interior · Turnkey</h3>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/75 hidden sm:block">Kerala, India</span>
            </div>
          </motion.div>

          {/* Secondary Visual + 3 Key Metrics Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Secondary Teak Wood / Joinery Visual */}
            <div className="relative h-60 rounded-3xl overflow-hidden shadow-glass border border-brand-blue/10 bg-brand-gray group">
              <img 
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&fm=webp&q=80" 
                alt="Bespoke Joinery & Interior Craft"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/70 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider">In-House Teak Joinery Studio</span>
                <Sparkles size={16} className="text-brand-red" />
              </div>
            </div>

            {/* Metric Tiles 2-Col */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-brand-blue/10 shadow-glass flex flex-col justify-center transition-all hover:border-brand-blue/30">
                <p className="text-4xl md:text-5xl font-display font-bold text-brand-blue">120+</p>
                <p className="text-xs font-bold tracking-widest uppercase text-brand-red mt-2">Projects Built</p>
                <p className="text-[11px] font-light text-brand-blue/60 mt-1">Across North Kerala.</p>
              </div>

              <div className="p-6 md:p-8 rounded-3xl bg-brand-blue text-white shadow-glass flex flex-col justify-center transition-all hover:bg-brand-blue-dark">
                <p className="text-4xl md:text-5xl font-display font-bold text-white">8+ Yrs</p>
                <p className="text-xs font-bold tracking-widest uppercase text-brand-red mt-2">Design-Build</p>
                <p className="text-[11px] font-light text-white/70 mt-1">Single accountability.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default StudioIntro;
