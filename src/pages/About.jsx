import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Users, Compass, Building2, CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild, imageReveal } from '../utils/animations';

const milestones = [
  { year: "2016", title: "Foundation in Kasaragod", desc: "ABCD was established with a singular vision: bringing uncompromised architectural design and turnkey construction together." },
  { year: "2019", title: "In-House Wood & Joinery Studio", desc: "Launched dedicated bespoke carpentry operations in Cherkala to craft signature teak and hardwood millwork." },
  { year: "2021", title: "100+ Completed Projects", desc: "Crossed a landmark milestone of delivering bespoke villas, modern residences, and commercial facilities across North Kerala." },
  { year: "2024", title: "The Next Era of Design-Build", desc: "Expanding into sustainable parametric architecture, intelligent spatial engineering, and luxury coastal retreats." },
];

const values = [
  {
    num: "01",
    title: "Honest Materiality",
    desc: "We celebrate the natural authenticity of raw concrete, genuine teak, textured stone, and engineered steel — building spaces that age with grace."
  },
  {
    num: "02",
    title: "Radical Precision",
    desc: "A design is only as good as its execution. We enforce millimeter-level precision across foundation pours, joinery joints, and finishing details."
  },
  {
    num: "03",
    title: "Climate-Responsive Form",
    desc: "Every villa and building is engineered for tropical Kerala weather — optimizing coastal breezes, deep shading eaves, and abundant indirect sunlight."
  },
  {
    num: "04",
    title: "Single Accountability",
    desc: "From initial concept sketches to handing over the keys, our clients work with one accountable team with transparent milestone tracking."
  }
];

const About = () => {
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
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">About ABCD Studio</span>
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
                  Architecture rooted in<br />
                  <span className="text-brand-red italic font-light">craft</span> & purpose.
                </motion.h1>
              </motion.div>

              <motion.p
                className="text-base md:text-lg font-light text-brand-blue/70 max-w-md leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Headquartered in Cherkala – Kanhangad, ABCD is a contemporary design-build studio creating timeless spaces across Kerala.
              </motion.p>
            </div>

          </div>
        </section>

        {/* Hero Studio Imagery */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Primary Visual */}
              <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-brand-blue/10 shadow-sm relative min-h-[420px] bg-brand-gray">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1600&q=80"
                  alt="ABCD Construction Site & Craft"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red mb-2">Our Foundation</p>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold">Bridging the drawing board with the construction site.</h3>
                </div>
              </div>

              {/* Studio Key Stats Column */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6">
                <div className="p-8 rounded-3xl bg-white border border-brand-blue/10 shadow-sm flex-1 flex flex-col justify-center">
                  <p className="text-4xl md:text-5xl font-display font-bold text-brand-blue">120+</p>
                  <p className="text-xs font-bold tracking-widest uppercase text-brand-red mt-2">Projects Completed</p>
                  <p className="text-xs font-light text-brand-blue/60 mt-1">Across Kasaragod, Kannur, and coastal Kerala.</p>
                </div>

                <div className="p-8 rounded-3xl bg-brand-blue text-white shadow-sm flex-1 flex flex-col justify-center">
                  <p className="text-4xl md:text-5xl font-display font-bold text-white">8+ Years</p>
                  <p className="text-xs font-bold tracking-widest uppercase text-brand-red mt-2">Design-Build Experience</p>
                  <p className="text-xs font-light text-white/70 mt-1">Refining contemporary architecture and construction standards.</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Narrative & Ethos */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-white border-y border-brand-blue/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-5">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red block mb-3">Our Story</span>
              <h2 className="text-3xl md:text-5xl font-display font-semibold leading-tight text-brand-blue mb-6">
                We believe that the built environment should elevate human life.
              </h2>
              <p className="text-base font-light text-brand-blue/70 leading-relaxed mb-6">
                Traditional architecture firms hand over blueprints to third-party contractors, resulting in compromises, cost overruns, and lost design nuances.
              </p>
              <p className="text-base font-light text-brand-blue/70 leading-relaxed">
                At ABCD, we eliminated that disconnect. Our architects and site engineers work side-by-side every single day. The result is pure creative vision realized with structural perfection.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {values.map((v) => (
                <div key={v.num} className="p-8 rounded-3xl bg-[#FAFBFF] border border-brand-blue/10 shadow-sm">
                  <span className="text-xs font-bold tracking-widest text-brand-red block mb-3">{v.num}</span>
                  <h3 className="text-xl font-display font-semibold text-brand-blue mb-3">{v.title}</h3>
                  <p className="text-sm font-light text-brand-blue/70 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Timeline Milestones */}
        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red block mb-3">Milestones</span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-brand-blue">
                The Journey of ABCD Studio
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((m, idx) => (
                <div key={m.year} className="relative p-8 rounded-3xl bg-white border border-brand-blue/10 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-3xl md:text-4xl font-display font-bold text-brand-red mb-4 block">{m.year}</span>
                    <h3 className="text-lg font-semibold text-brand-blue mb-3">{m.title}</h3>
                    <p className="text-sm font-light text-brand-blue/70 leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-brand-blue/10 flex items-center justify-between text-xs text-brand-blue/40 font-semibold">
                    <span>Phase 0{idx + 1}</span>
                    <CheckCircle2 size={16} className="text-brand-red" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Bottom Consultation Banner */}
        <section className="py-20 px-6 md:px-12 bg-brand-blue text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red mb-2">Visit Our Studio</p>
              <h3 className="text-3xl md:text-4xl font-display font-semibold text-white">
                Located in Cherkala – Kanhangad, Kerala.
              </h3>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300 shadow-sm flex-shrink-0"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default About;
