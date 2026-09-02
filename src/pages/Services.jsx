import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Home as HomeIcon, Hammer, CheckCircle2, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild, imageReveal, staggerContainer, fadeUpStaggerVariant } from '../utils/animations';

const servicesList = [
  {
    id: "architecture",
    number: "01",
    title: "Architectural Design",
    tagline: "Visionary spatial concepts grounded in contextual intelligence.",
    icon: Compass,
    image: "/exterior/subhashlandscape.png",
    description: "From master planning and conceptual site layouts to complete structural drawings and local municipal approvals. We design structures that elevate the human condition, maximize natural light, and withstand coastal climate demands.",
    deliverables: [
      "Site Analysis & Solar Orientation",
      "Conceptual Massing & 3D Spatial Visualization",
      "Comprehensive Architectural Working Drawings",
      "Structural Engineering & Municipality Approvals",
      "Landscape & Courtyard Integration"
    ]
  },
  {
    id: "interior",
    number: "02",
    title: "Interior Architecture",
    tagline: "Immersive, tailored interiors with bespoke craftsmanship.",
    icon: HomeIcon,
    image: "/interior/living01.png",
    description: "Every interior environment is conceived as a seamless continuation of the architecture. We custom-design bespoke joinery, source premium natural stones and hardwoods, and plan precision lighting to create spaces of enduring luxury.",
    deliverables: [
      "Custom Teak & Hardwood Joinery",
      "Material, Stone & Finish Palette Curation",
      "Architectural Lighting & Ceiling Design",
      "Modular Kitchens & Luxury Bath Environments",
      "Acoustic Planning & Custom Furniture"
    ]
  },
  {
    id: "construction",
    number: "03",
    title: "Turnkey Construction",
    tagline: "Precision execution with zero compromise on design intent.",
    icon: Hammer,
    image: "/exterior/IMG_4031.JPG.jpeg",
    description: "We eliminate the friction between architect and contractor by managing the entire build in-house. Our experienced site engineers and master craftsmen execute every foundation, slab, and finish to strict international tolerances.",
    deliverables: [
      "Dedicated On-Site Engineering Supervision",
      "Rigorous Material Testing & Quality Snagging",
      "Transparent Milestone-Based Billing & Timeline",
      "Complete MEP (Mechanical, Electrical, Plumbing)",
      "Turnkey Key-Handover & Post-Completion Support"
    ]
  }
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Single-Point Accountability",
    desc: "No finger-pointing between architects and contractors. We own the entire lifecycle from blueprint to key handover."
  },
  {
    icon: Clock,
    title: "On-Time Milestones",
    desc: "Structured project planning ensures strict adherence to schedules with zero unmonitored delays."
  },
  {
    icon: Sparkles,
    title: "Bespoke Materiality",
    desc: "Direct sourcing of high-grade teak, structural steel, and curated tiles for unmatched longevity."
  },
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFBFF] text-brand-blue">
        
        {/* Hero Section */}
        <section className="pt-40 md:pt-48 pb-16 px-6 md:px-12 border-b border-brand-blue/10">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-[1px] w-8 bg-brand-red"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">Our Capabilities</span>
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
                  Unified design &<br />
                  <span className="text-brand-red italic font-light">flawless</span> execution.
                </motion.h1>
              </motion.div>

              <motion.p
                className="text-base md:text-lg font-light text-brand-blue/70 max-w-md leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                We offer a complete multidisciplinary ecosystem — bringing architecture, interior design, and turnkey engineering under one unified roof.
              </motion.p>
            </div>

          </div>
        </section>

        {/* Core Services Breakdown */}
        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto space-y-24">
            
            {servicesList.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 1;

              return (
                <motion.div
                  key={service.id}
                  className="bg-white rounded-3xl border border-brand-blue/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUpVariant}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Media Column */}
                    <div className={`lg:col-span-5 relative min-h-[380px] lg:min-h-full overflow-hidden ${isEven ? 'lg:order-2' : ''}`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 via-transparent to-transparent"></div>
                      
                      {/* Badge in image */}
                      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center text-white shadow-sm">
                            <Icon size={20} />
                          </div>
                          <div>
                            <p className="text-xs font-bold tracking-widest uppercase">{service.title}</p>
                            <p className="text-[10px] text-white/70">ABCD Discipline {service.number}</p>
                          </div>
                        </div>
                        <span className="text-2xl font-display font-bold text-white/40">{service.number}</span>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={`lg:col-span-7 p-8 md:p-14 flex flex-col justify-between ${isEven ? 'lg:order-1' : ''}`}>
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-bold tracking-[0.25em] text-brand-red uppercase">DISCIPLINE {service.number}</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-display font-semibold text-brand-blue mb-4">
                          {service.title}
                        </h2>

                        <p className="text-base md:text-lg font-light text-brand-blue/80 italic mb-6">
                          "{service.tagline}"
                        </p>

                        <p className="text-sm md:text-base font-light text-brand-blue/70 leading-relaxed mb-8">
                          {service.description}
                        </p>

                        {/* Deliverables Checklist */}
                        <div>
                          <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue/50 mb-4">Key Deliverables</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.deliverables.map((item) => (
                              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-gray-light/80 border border-brand-blue/5">
                                <CheckCircle2 size={16} className="text-brand-red flex-shrink-0 mt-0.5" />
                                <span className="text-xs font-medium text-brand-blue/80 leading-snug">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-8 mt-8 border-t border-brand-blue/10 flex items-center justify-between">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue hover:text-brand-red transition-colors group"
                        >
                          <span>Commission {service.title}</span>
                          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}

          </div>
        </section>

        {/* Why Design-Build Architecture */}
        <section className="py-24 px-6 md:px-12 bg-white border-y border-brand-blue/10">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red block mb-3">The ABCD Advantage</span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-brand-blue mb-4">
                Why our integrated method works.
              </h2>
              <p className="text-base font-light text-brand-blue/70 leading-relaxed">
                By taking responsibility for both design creation and physical construction, we eliminate budget surprises, miscommunication, and design compromises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="p-8 md:p-10 rounded-3xl bg-[#FAFBFF] border border-brand-blue/10 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center mb-6 shadow-sm">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-brand-blue mb-3">{pillar.title}</h3>
                    <p className="text-sm font-light text-brand-blue/70 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Bottom Action CTA Strip */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-brand-blue mb-6">
              Have a site in mind? Let’s evaluate its potential.
            </h2>
            <p className="text-base font-light text-brand-blue/70 max-w-lg mx-auto mb-10 leading-relaxed">
              Schedule an introductory design consultation with our lead architects in Cherkala – Kanhangad.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white text-xs font-semibold tracking-[0.2em] uppercase px-9 py-4 rounded-full transition-all duration-300 shadow-sm"
            >
              <span>Schedule Consultation</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Services;
