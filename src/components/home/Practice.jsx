import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Home as HomeIcon, Hammer, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { fadeUpVariant, staggerContainer, fadeUpStaggerVariant } from '../../utils/animations';

const disciplines = [
  {
    number: "01",
    name: "Architectural Design",
    icon: Compass,
    desc: "From conceptual massing and sun-path optimization to complete municipal blueprints and structural approvals.",
    highlights: ["Solar Orientation & 3D Massing", "Structural & MEP Blueprints", "Permits & Approvals"]
  },
  {
    number: "02",
    name: "Interior Architecture",
    icon: HomeIcon,
    desc: "Curating raw materiality, bespoke in-house teak millwork, acoustic planning, and bespoke architectural lighting.",
    highlights: ["Custom Teak Millwork", "Natural Stone & Flooring", "Architectural Lighting Design"]
  },
  {
    number: "03",
    name: "Turnkey Construction",
    icon: Hammer,
    desc: "Rigorous daily engineering supervision, quality material testing, and single-point accountability from foundation to keys.",
    highlights: ["Dedicated Site Engineers", "Milestone Progress Tracking", "Zero Disconnect Execution"]
  }
];

const Practice = () => {
  return (
    <section className="py-28 md:py-40 px-6 md:px-12 bg-white relative overflow-hidden border-b border-brand-blue/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end mb-20">
          <motion.div
            className="lg:col-span-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-8 bg-brand-red"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">Our Disciplines</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-brand-blue leading-[1.05] tracking-tight">
              The complete<br />
              <span className="text-brand-red italic font-light">design-build</span> spectrum.
            </h2>
          </motion.div>

          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <p className="text-base font-light text-brand-blue/70 leading-relaxed mb-6">
              Three distinct disciplines unified under one collaborative roof in Cherkala – Kanhangad to guarantee aesthetic and structural coherence.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue hover:text-brand-red transition-colors group"
            >
              <span>Explore All Capabilities</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 3-Column Interactive Discipline Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {disciplines.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                className="group p-8 md:p-10 rounded-3xl bg-[#FAFBFF] border border-brand-blue/10 hover:border-brand-blue/30 shadow-glass hover:shadow-glass-lg transition-all duration-500 flex flex-col justify-between"
                variants={fadeUpStaggerVariant}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white group-hover:bg-brand-red flex items-center justify-center transition-colors shadow-glass">
                      <Icon size={22} />
                    </div>
                    <span className="text-3xl font-display font-bold text-brand-blue/20 group-hover:text-brand-red/40 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-semibold text-brand-blue mb-4 group-hover:text-brand-red transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-sm font-light text-brand-blue/70 leading-relaxed mb-8">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-brand-blue/10 space-y-2">
                  {item.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs font-medium text-brand-blue/80">
                      <CheckCircle2 size={14} className="text-brand-red flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Practice;
