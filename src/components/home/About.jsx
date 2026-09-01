import { motion } from 'framer-motion';
import { fadeUpVariant, imageReveal } from '../../utils/animations';

const About = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-architectural-ivory overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          <motion.div 
            className="md:col-span-5 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <span className="text-[10px] font-mono tracking-widest text-brand-red block mb-6">08 / THE STUDIO</span>
            <h2 className="text-3xl md:text-5xl font-serif text-deep-navy leading-tight mb-8">
              DESIGN IS ONLY HALF THE WORK.
            </h2>
            <p className="text-sm font-light text-graphite/80 leading-relaxed mb-6">
              ABCD is a contemporary design-build studio based in Cherkala, Kanhangad. We believe that a successful project is not just well-designed, but meticulously executed.
            </p>
            <p className="text-sm font-light text-graphite/80 leading-relaxed">
              By integrating architecture, interior design, and construction, we take full responsibility for the final built form, ensuring quality at every stage.
            </p>
          </motion.div>
          
          <div className="md:col-span-7">
            <motion.div 
              className="aspect-[4/3] bg-warm-stone/20 relative overflow-hidden group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={imageReveal}
            >
              <div className="absolute inset-0 bg-graphite/5 transition-transform duration-1000 group-hover:scale-105"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
