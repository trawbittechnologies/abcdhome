import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Compass, Home as HomeIcon, Hammer, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild, staggerContainer, fadeUpStaggerVariant } from '../utils/animations';

const services = [
  {
    number: "01",
    title: "Architectural Design",
    tagline: "Visionary spatial design tailored for climate and contemporary living.",
    image: "/exterior/subhashlandscape.png",
    link: "/projects",
    scope: [
      "Solar & Climatic Site Analysis",
      "Conceptual Massing & 3D Spatial Plans",
      "Structural Engineering & Approvals",
      "Monsoon-Resilient Facades"
    ]
  },
  {
    number: "02",
    title: "Bespoke Interior Architecture",
    tagline: "Tailored interior environments with handcrafted teak joinery.",
    image: "/interior/living01.png",
    link: "/projects",
    scope: [
      "Handcrafted Teak & Hardwood Joinery",
      "Material & Natural Stone Curation",
      "Architectural Lighting & Ceiling Plans",
      "Turnkey Modular Kitchens"
    ]
  },
  {
    number: "03",
    title: "Turnkey Civil Construction",
    tagline: "End-to-end structural engineering with zero design compromises.",
    image: "/exterior/IMG_4031.JPG.jpeg",
    link: "/projects",
    scope: [
      "On-Site Engineering Supervision",
      "High-Precision RCC Structural Build",
      "Multi-Layer Waterproofing Systems",
      "Zero-Snag Key Handover"
    ]
  }
];

const simpleWorkflow = [
  { step: "01", name: "Site Consultation", desc: "Understanding your vision, topography, and budget parameters." },
  { step: "02", name: "3D Design & Planning", desc: "Architectural blueprints, realistic 3D models, and municipality clearance." },
  { step: "03", name: "Civil & Interior Build", desc: "Precision structural casting and in-house factory joinery execution." },
  { step: "04", name: "Turnkey Handover", desc: "Comprehensive quality audit and ceremonial key delivery." }
];

const Services = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFBFF] text-brand-blue selection:bg-brand-red selection:text-white">
        
        {/* Simple & Elegant Editorial Header */}
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
                  Architecture, Interiors & <br />
                  <span className="text-brand-red font-serif italic font-normal">Turnkey Engineering.</span>
                </motion.h1>
              </motion.div>

              <motion.div
                className="lg:col-span-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm md:text-base font-light text-brand-blue/70 leading-relaxed mb-4">
                  A seamless design-build practice uniting architectural innovation, structural civil engineering, and bespoke interior millwork under one unified standard.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-red hover:underline"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>

          </div>
        </section>

        {/* 3 Core Services: Creative Minimal Grid */}
        <section className="py-20 md:py-28 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              {services.map((item, idx) => (
                <motion.div
                  key={item.number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUpVariant}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-brand-blue/10 hover:border-brand-blue/30 shadow-[0_2px_12px_rgba(35,55,119,0.04)] hover:shadow-[0_12px_32px_rgba(35,55,119,0.08)] transition-all duration-500"
                >
                  {/* Service Image Canvas */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-brand-gray">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Monospace Step Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-blue/10 text-[10px] font-mono font-semibold text-brand-blue shadow-sm">
                      {item.number}
                    </div>

                    {/* Floating Action Arrow */}
                    <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-7 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-display font-semibold text-brand-blue group-hover:text-brand-red transition-colors mb-2">
                        {item.title}
                      </h2>
                      <p className="text-xs md:text-sm font-light text-brand-blue/70 leading-relaxed mb-6">
                        {item.tagline}
                      </p>

                      {/* Scope Tags */}
                      <div className="space-y-2 pt-4 border-t border-brand-blue/10">
                        {item.scope.map((tag) => (
                          <div key={tag} className="flex items-center gap-2 text-xs font-light text-brand-blue/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-red/60" />
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-brand-blue/10 flex items-center justify-between">
                      <Link
                        to="/contact"
                        className="text-xs font-semibold tracking-wider uppercase text-brand-blue group-hover:text-brand-red transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Commission Service</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* Simplified 4-Step Process Section */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-white border-y border-brand-blue/10">
          <div className="max-w-7xl mx-auto">
            
            <div className="max-w-3xl mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-brand-blue tracking-tight mb-3">
                How We Deliver Your Sanctuary.
              </h2>
              <p className="text-sm md:text-base font-light text-brand-blue/70 leading-relaxed">
                A structured, transparent pathway from preliminary sketch to key handover.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {simpleWorkflow.map((item, idx) => (
                <div 
                  key={item.step}
                  className="p-6 sm:p-7 rounded-2xl bg-[#FAFBFF] border border-brand-blue/10 flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div>
                    <span className="text-xs font-mono font-semibold text-brand-red block mb-3">
                      {item.step}
                    </span>
                    <h3 className="text-lg font-display font-semibold text-brand-blue mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs font-light text-brand-blue/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Minimal Bottom Invitation */}
        <section className="py-20 px-6 md:px-12 bg-[#FAFBFF]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-brand-blue tracking-tight">
              Have a plot or renovation in mind?
            </h2>
            <p className="text-sm md:text-base font-light text-brand-blue/70 max-w-xl mx-auto leading-relaxed">
              Consult directly with our lead architects and engineers in Kasaragod and Kanhangad to evaluate your site potential.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-brand-blue hover:bg-brand-red text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 shadow-sm flex items-center gap-2"
              >
                <span>Schedule Consultation</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/projects"
                className="px-8 py-3.5 bg-white border border-brand-blue/20 hover:border-brand-blue text-brand-blue text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300"
              >
                <span>Browse Completed Works</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Services;
