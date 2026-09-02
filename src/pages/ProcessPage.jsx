import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, PenTool, FileText, Hammer, Key, CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild, imageReveal } from '../utils/animations';

const processSteps = [
  {
    step: "01",
    phase: "Phase 1: Discovery & Site Diagnostics",
    title: "Understanding Context, Sunlight & Client Vision",
    icon: Search,
    image: "/exterior/subhash1.png",
    description: "We initiate every project with rigorous site diagnostics — analyzing sun path diagrams, coastal wind dynamics, soil characteristics, and local zoning laws. We conduct in-depth interviews with the client to understand daily spatial rituals and lifestyle needs.",
    deliverables: ["Site Microclimate Report", "Spatial Brief Document", "Budget Range & Feasibility Assessment"]
  },
  {
    step: "02",
    phase: "Phase 2: Schematic Architecture & 3D Spatial Renders",
    title: "Translating Intent into Volume, Light & Flow",
    icon: PenTool,
    image: "/exterior/kbr.png",
    description: "Our design team translates functional requirements into bold 3D forms. We explore multiple massing options, courtyard configurations, and natural ventilation channels. The client reviews photorealistic visualizations to experience every room before a single brick is laid.",
    deliverables: ["Conceptual Floor Plans & Massing", "Photorealistic 3D Visualizations", "Initial Material & Texture Board"]
  },
  {
    step: "03",
    phase: "Phase 3: Working Drawings & Structural Blueprinting",
    title: "Precision Engineering & Statutory Approvals",
    icon: FileText,
    image: "/exterior/IMG_4031.JPG.jpeg",
    description: "Once the concept is frozen, our engineers draft millimeter-accurate architectural, structural, and MEP working blueprints. We handle all local municipal filings, structural safety certifications, and generate transparent itemized BOQs (Bill of Quantities).",
    deliverables: ["Structural & RCC Engineering Blueprints", "Complete MEP Layouts (Electrical & Plumbing)", "Municipal Sanctions & Transparent BOQ"]
  },
  {
    step: "04",
    phase: "Phase 4: Turnkey On-Site Execution & Craftsmanship",
    title: "Building What We Draw Under Strict Quality Control",
    icon: Hammer,
    image: "/interior/living01.png",
    description: "Our dedicated site engineers take physical charge of the construction. From concrete cube testing to custom teak wood joinery in our Cherkala workshop, every component is rigorously tested against architectural tolerances.",
    deliverables: ["Dedicated Daily Site Engineering Supervision", "Bi-Weekly Progress Milestone Reports", "Bespoke In-House Woodwork & Joinery Fabrication"]
  },
  {
    step: "05",
    phase: "Phase 5: Quality Snagging & Turnkey Handover",
    title: "Flawless Delivery with Enduring Support",
    icon: Key,
    image: "/exterior/PHOTO-2024-05-10-17-56-20%2016.jpg.jpeg",
    description: "Prior to client handover, our lead architects perform a multi-point quality snagging inspection across lighting, plumbing pressure, waterproofing, and surface finishes. We hand over the keys alongside comprehensive warranty documentation.",
    deliverables: ["Comprehensive As-Built Documentation", "Multi-Point Snagging Certification", "Turnkey Key Handover & Post-Occupancy Support"]
  }
];

const ProcessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFBFF] text-brand-blue">
        
        {/* Header */}
        <section className="pt-40 md:pt-48 pb-16 px-6 md:px-12 border-b border-brand-blue/10">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-[1px] w-8 bg-brand-red"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">The ABCD Method</span>
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
                  From concept sketch to<br />
                  <span className="text-brand-red italic font-light">turnkey</span> reality.
                </motion.h1>
              </motion.div>

              <motion.p
                className="text-base md:text-lg font-light text-brand-blue/70 max-w-md leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Our 5-phase design-build methodology guarantees architectural integrity, strict budget adherence, and flawless execution.
              </motion.p>
            </div>

          </div>
        </section>

        {/* Process Phases Roadmap */}
        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto space-y-20">
            
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 1;

              return (
                <motion.div
                  key={step.step}
                  className="bg-white rounded-3xl border border-brand-blue/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUpVariant}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Media */}
                    <div className={`lg:col-span-5 relative min-h-[360px] lg:min-h-full overflow-hidden ${isEven ? 'lg:order-2' : ''}`}>
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/70 via-transparent to-transparent"></div>
                      
                      <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-brand-red text-white flex items-center justify-center font-display font-bold text-xl shadow-sm">
                        {step.step}
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue bg-white px-3.5 py-1.5 rounded-full shadow-sm">
                          {step.phase}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`lg:col-span-7 p-8 md:p-14 flex flex-col justify-between ${isEven ? 'lg:order-1' : ''}`}>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <Icon size={18} className="text-brand-red" />
                          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-blue/50">{step.phase}</span>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-display font-semibold text-brand-blue mb-4 leading-tight">
                          {step.title}
                        </h2>

                        <p className="text-sm md:text-base font-light text-brand-blue/70 leading-relaxed mb-8">
                          {step.description}
                        </p>

                        <div>
                          <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue/40 mb-3">Deliverables & Milestones</h3>
                          <div className="space-y-2.5">
                            {step.deliverables.map((item) => (
                              <div key={item} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAFBFF] border border-brand-blue/10">
                                <CheckCircle2 size={16} className="text-brand-red flex-shrink-0" />
                                <span className="text-xs font-medium text-brand-blue/80">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 mt-8 border-t border-brand-blue/10 flex items-center justify-between text-xs text-brand-blue/40 font-semibold">
                        <span>ABCD Method Quality Standard</span>
                        <span className="text-brand-red font-bold">Step {step.step} of 05</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}

          </div>
        </section>

        {/* Action Banner */}
        <section className="py-24 px-6 md:px-12 bg-brand-blue text-white">
          <div className="max-w-7xl mx-auto text-center">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red block mb-3">Ready to Begin?</span>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-white mb-6">
              Let's initiate Phase 1 for your property.
            </h2>
            <p className="text-base font-light text-white/70 max-w-lg mx-auto mb-10 leading-relaxed">
              Book an on-site feasibility evaluation and spatial consultation with our senior architectural team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white text-xs font-semibold tracking-[0.2em] uppercase px-9 py-4 rounded-full transition-all duration-300 shadow-sm"
            >
              <span>Initiate Project Consultation</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default ProcessPage;
