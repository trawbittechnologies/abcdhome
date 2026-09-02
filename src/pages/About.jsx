import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild } from '../utils/animations';

const corePrinciples = [
  {
    num: "01",
    title: "Honest Materiality",
    desc: "We celebrate the natural authenticity of raw concrete, genuine teakwood, local stone, and structural steel — creating spaces that age with dignity."
  },
  {
    num: "02",
    title: "Climate-Responsive Form",
    desc: "Every villa is engineered for coastal Kerala weather — optimizing natural monsoon ventilation, deep shading cantilevers, and generous daylight."
  },
  {
    num: "03",
    title: "Single Accountability",
    desc: "From initial concept sketches to handing over the keys, our clients work with one accountable team with complete design and build precision."
  }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFBFF] text-brand-blue selection:bg-brand-red selection:text-white">
        
        {/* Minimal Hero Header */}
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
                  Architecture Rooted in <br />
                  <span className="text-brand-red font-serif italic font-normal">Craft, Precision & Purpose.</span>
                </motion.h1>
              </motion.div>

              <motion.div
                className="lg:col-span-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm md:text-base font-light text-brand-blue/70 leading-relaxed mb-4">
                  Headquartered in Kasaragod and Kanhangad, ABCD Home is a multidisciplinary design-build studio creating timeless residential and commercial spaces across Kerala.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-red hover:underline"
                >
                  <span>Connect With Our Team</span>
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Studio Visual Highlight & Metrics */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUpVariant}
              className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-brand-gray border border-brand-blue/10 shadow-sm mb-12"
            >
              <img
                src="/exterior/kbr.png"
                alt="ABCD Studio Architecture in Kerala"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-black/20 to-transparent flex items-end p-6 sm:p-10 md:p-14 text-white">
                <div className="max-w-2xl">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold leading-snug text-white">
                    Bridging the drawing board with the construction site.
                  </h2>
                </div>
              </div>
            </motion.div>

            {/* Clean Metric Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-brand-blue/10">
              <div className="p-6 rounded-2xl bg-white border border-brand-blue/10">
                <span className="text-3xl sm:text-4xl font-display font-semibold text-brand-blue block mb-1">
                  120+
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-red block mb-1">
                  Completed Projects
                </span>
                <p className="text-xs font-light text-brand-blue/60">
                  Residential villas, bespoke interiors, and commercial landmarks across Kerala.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-brand-blue/10">
                <span className="text-3xl sm:text-4xl font-display font-semibold text-brand-blue block mb-1">
                  8+ Years
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-red block mb-1">
                  Design-Build Practice
                </span>
                <p className="text-xs font-light text-brand-blue/60">
                  Proven turnkey methodology ensuring zero compromise on design intent.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-brand-blue/10">
                <span className="text-3xl sm:text-4xl font-display font-semibold text-brand-blue block mb-1">
                  100%
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-red block mb-1">
                  In-House Execution
                </span>
                <p className="text-xs font-light text-brand-blue/60">
                  Architectural planning, structural civil build, and teak joinery under one roof.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 3 Core Principles */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-white border-y border-brand-blue/10">
          <div className="max-w-7xl mx-auto">
            
            <div className="max-w-3xl mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-brand-blue tracking-tight mb-3">
                Our Guiding Principles.
              </h2>
              <p className="text-sm md:text-base font-light text-brand-blue/70 leading-relaxed">
                How we approach space, materiality, and client collaboration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {corePrinciples.map((item) => (
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

        {/* Minimal Bottom CTA */}
        <section className="py-20 px-6 md:px-12 bg-white border-t border-brand-blue/10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-brand-blue tracking-tight">
              Let's create something lasting together.
            </h2>
            <p className="text-sm md:text-base font-light text-brand-blue/70 max-w-xl mx-auto leading-relaxed">
              Visit our studio in Kasaragod – Kanhangad or schedule a design consultation with our architects.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-brand-blue hover:bg-brand-red text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 shadow-sm flex items-center gap-2"
              >
                <span>Get in Touch</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/projects"
                className="px-8 py-3.5 bg-white border border-brand-blue/20 hover:border-brand-blue text-brand-blue text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300"
              >
                <span>Explore Portfolio</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default About;
