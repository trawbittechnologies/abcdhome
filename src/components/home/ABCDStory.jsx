import { motion } from 'framer-motion';
import { textRevealContainer, fadeUpVariant, smoothTransition } from '../../utils/animations';

const ABCDStory = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-deep-navy text-architectural-ivory relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      ></motion.div>
      
      <div className="container mx-auto flex flex-col items-center justify-center text-center relative z-10">
        <motion.h2 
          className="text-[15vw] md:text-[12vw] font-serif leading-none tracking-tight mb-8 overflow-hidden py-4"
          variants={textRevealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {['A', '/', 'B', '/', 'C', '/', 'D'].map((char, index) => (
            <motion.span 
              key={index}
              className={`inline-block ${char === '/' ? 'text-brand-red font-light mx-2 md:mx-4' : ''}`}
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: "0%", opacity: 1, transition: { ...smoothTransition, duration: 1 } }
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>
        
        <motion.p 
          className="max-w-2xl text-lg md:text-xl font-light text-warm-stone text-balance leading-relaxed"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5 }}
        >
          More than letters. A continuous process of thinking, refining, and building. 
          We bring an integrated approach to every project, ensuring the original intent 
          carries through to the final constructed detail.
        </motion.p>
      </div>
    </section>
  );
};

export default ABCDStory;
