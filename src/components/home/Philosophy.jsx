import { motion } from 'framer-motion';
import { textRevealContainer, textRevealChild, lineDrawVertical } from '../../utils/animations';

const Philosophy = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-deep-navy text-architectural-ivory relative overflow-hidden">
      <motion.div 
        className="absolute top-0 left-12 w-[1px] bg-brand-red hidden md:block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={lineDrawVertical}
      ></motion.div>
      
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <motion.span 
          className="text-[10px] font-mono tracking-widest text-brand-red block mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          06 / THINKING
        </motion.span>
        
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight max-w-5xl overflow-hidden py-4"
          variants={textRevealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={textRevealChild}>WE DON'T JUST DRAW SPACES.</motion.div>
          <motion.div variants={textRevealChild}>WE RESOLVE THEM.</motion.div>
        </motion.h2>
      </div>
    </section>
  );
};

export default Philosophy;
