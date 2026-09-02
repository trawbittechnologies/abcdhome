import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Layers, ShieldCheck, Hammer, KeyRound } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { textRevealContainer, textRevealChild } from '../utils/animations';

const constructionMilestones = [
  {
    step: "01",
    phase: "Groundwork & Site Study",
    stageName: "The Foundation",
    title: "Understanding Your Land & Family Needs",
    icon: Compass,
    story: "Every building starts with the soil. We walk your plot together to inspect soil quality, natural water flow, wind direction, and solar angles while discussing your family's budget and daily routine.",
    deliverables: [
      "On-site soil & contour study",
      "Sunlight and cross-ventilation analysis",
      "Honest initial budget guidance"
    ]
  },
  {
    step: "02",
    phase: "Architectural Planning",
    stageName: "The Blueprint",
    title: "Crafting 3D Spaces Before We Break Ground",
    icon: Layers,
    story: "We design custom floor layouts and realistic 3D walkthroughs. You can see how rooms connect, adjust ceiling heights, and choose authentic materials so you feel completely confident before construction starts.",
    deliverables: [
      "Custom architectural floor plans",
      "Photorealistic 3D exterior & room views",
      "Material, texture, and stone selection"
    ]
  },
  {
    step: "03",
    phase: "Structural Engineering",
    stageName: "The Structure",
    title: "Engineered RCC Strength & Government Approvals",
    icon: ShieldCheck,
    story: "Our licensed structural engineers calculate beam loads, column placements, and electrical conduits to handle coastal Kerala weather. We handle all municipal paperwork and building permits directly.",
    deliverables: [
      "RCC structural engineering blueprints",
      "Complete electrical and plumbing layouts",
      "Local municipality permit clearances"
    ]
  },
  {
    step: "04",
    phase: "On-Site Civil Build",
    stageName: "The Craftsmanship",
    title: "Daily Engineering Supervision & Teak Joinery",
    icon: Hammer,
    story: "Our site engineers are on your plot every day overseeing foundation pouring, brick masonry, and waterproofing. Custom teak doors, windows, and modular cabinetry are handcrafted in our in-house carpentry workshop.",
    deliverables: [
      "Daily on-site engineering supervision",
      "Regular photo & progress milestone updates",
      "Handcrafted teak wood joinery"
    ]
  },
  {
    step: "05",
    phase: "Final Snagging & Delivery",
    stageName: "The Key Handover",
    title: "Thorough Quality Check & Welcoming You Home",
    icon: KeyRound,
    story: "Before moving day, our team inspects every electrical switch, water pressure valve, tile alignment, and paint surface. We hand over the keys to your move-in ready home with full warranty documentation.",
    deliverables: [
      "Multi-point quality snagging inspection",
      "Complete warranty dossier & as-built drawings",
      "Official key handover ceremony"
    ]
  }
];

const constructionPillars = [
  {
    num: "01",
    title: "Architect-Led Civil Build",
    desc: "We don't hand off designs to external contractors. The same team that draws your blueprints builds your walls."
  },
  {
    num: "02",
    title: "Milestone-Linked Payments",
    desc: "You pay stage-by-stage only after verified physical milestones (foundation, slab casting, masonry, finishing) are completed."
  },
  {
    num: "03",
    title: "Engineered for Kerala Rains",
    desc: "Specialized multi-layer waterproofing, deep shading overhangs, and corrosion-resistant steel designed for coastal monsoons."
  }
];

const ProcessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFBFF] text-brand-blue selection:bg-brand-red selection:text-white">
        
        {/* Editorial Minimal Header */}
        <section className="pt-36 md:pt-44 pb-14 md:pb-18 px-6 md:px-12 border-b border-brand-blue/10 bg-gradient-to-b from-white via-white to-[#FAFBFF]">
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
                  From Groundwork to <br />
                  <span className="text-brand-red font-serif italic font-normal">Living Sanctuary.</span>
                </motion.h1>
              </motion.div>

              <motion.div
                className="lg:col-span-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm md:text-base font-light text-brand-blue/70 leading-relaxed mb-4">
                  How we construct your home step by step—combining structural engineering, daily supervision, and handcrafted teak woodwork under one accountable team.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-red hover:underline"
                >
                  <span>Start with Step 01</span>
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Clean, Humanized Construction Roadmap Flow */}
        <section className="py-20 md:py-28 px-6 md:px-12 relative">
          <div className="max-w-4xl mx-auto relative">
            
            {/* Structural Axis Line (Continuous vertical connecting line) */}
            <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-red via-brand-blue/25 to-brand-red" />

            <div className="space-y-12 md:space-y-16 relative z-10">
              {constructionMilestones.map((milestone, idx) => {
                const Icon = milestone.icon;

                return (
                  <motion.div
                    key={milestone.step}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: idx * 0.04 }}
                    className="relative pl-16 md:pl-20"
                  >
                    {/* Structural Node Pin */}
                    <div className="absolute left-0 top-1.5 w-12 md:w-16 flex items-center justify-center">
                      <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-white border-2 border-brand-red shadow-sm flex items-center justify-center text-brand-blue font-mono text-xs font-bold group-hover:bg-brand-red group-hover:text-white transition-colors">
                        {milestone.step}
                      </div>
                    </div>

                    {/* Milestone Card */}
                    <div className="group bg-white rounded-3xl border border-brand-blue/10 hover:border-brand-blue/30 p-7 sm:p-9 md:p-10 shadow-[0_2px_12px_rgba(35,55,119,0.04)] hover:shadow-[0_10px_30px_rgba(35,55,119,0.08)] transition-all duration-300">
                      
                      {/* Top Phase Header */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-brand-red font-semibold">
                            Phase {milestone.step} · {milestone.phase}
                          </span>
                          <span className="hidden sm:inline-block text-[10px] font-mono text-brand-blue/40 bg-brand-gray-light px-2.5 py-0.5 rounded-full">
                            {milestone.stageName}
                          </span>
                        </div>
                        
                        <div className="w-8 h-8 rounded-xl bg-[#FAFBFF] border border-brand-blue/10 flex items-center justify-center text-brand-red shrink-0">
                          <Icon size={15} />
                        </div>
                      </div>

                      {/* Main Title */}
                      <h2 className="text-xl sm:text-2xl font-display font-semibold text-brand-blue mb-3 leading-snug">
                        {milestone.title}
                      </h2>

                      {/* Story Narrative */}
                      <p className="text-sm font-light text-brand-blue/75 leading-relaxed mb-6">
                        {milestone.story}
                      </p>

                      {/* Clear Milestone Deliverables */}
                      <div className="pt-4 border-t border-brand-blue/10">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {milestone.deliverables.map((item) => (
                            <div
                              key={item}
                              className="p-3 rounded-xl bg-[#FAFBFF] border border-brand-blue/5 text-xs font-light text-brand-blue/80 flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 shrink-0" />
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 3 Core Guarantees */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-white border-y border-brand-blue/10">
          <div className="max-w-7xl mx-auto">
            
            <div className="max-w-3xl mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-brand-blue tracking-tight mb-3">
                Built on Honest Accountability.
              </h2>
              <p className="text-sm md:text-base font-light text-brand-blue/70 leading-relaxed">
                Clear milestones, daily engineering supervision, and spaces crafted to last.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {constructionPillars.map((item) => (
                <div 
                  key={item.num}
                  className="p-8 rounded-3xl bg-[#FAFBFF] border border-brand-blue/10 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <span className="text-xs font-mono font-semibold text-brand-red block mb-3">
                      {item.num}
                    </span>
                    <h3 className="text-xl font-display font-semibold text-brand-blue mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light text-brand-blue/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Bottom Friendly Consultation CTA */}
        <section className="py-20 px-6 md:px-12 bg-[#FAFBFF]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-brand-blue tracking-tight">
              Ready to break ground on your property?
            </h2>
            <p className="text-sm md:text-base font-light text-brand-blue/70 max-w-xl mx-auto leading-relaxed">
              Let's discuss your land and floor plan ideas over a friendly consultation in Cherkala – Kanhangad.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-brand-blue hover:bg-brand-red text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 shadow-sm flex items-center gap-2"
              >
                <span>Talk With Our Architects</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/projects"
                className="px-8 py-3.5 bg-white border border-brand-blue/20 hover:border-brand-blue text-brand-blue text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300"
              >
                <span>View Completed Homes</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default ProcessPage;
