import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer, fadeUpStaggerVariant, lineDrawHorizontal, lineDrawVertical } from '../../utils/animations';

const steps = [
  { number: "01", title: "BRIEF", desc: "Understand" },
  { number: "02", title: "CONCEPT", desc: "Define" },
  { number: "03", title: "DESIGN", desc: "Develop" },
  { number: "04", title: "EXECUTE", desc: "Build" },
  { number: "05", title: "COMPLETE", desc: "Deliver" }
];

const Process = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white border-b border-thin overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <span className="text-[10px] font-mono tracking-widest text-brand-red block mb-6">07 / PROCESS</span>
          <h2 className="text-3xl md:text-5xl font-serif text-deep-navy leading-tight">
            FROM IDEA TO BUILT FORM.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-transparent z-0 overflow-hidden">
            <motion.div 
              className="w-full h-full bg-graphite/20 origin-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={lineDrawHorizontal}
            ></motion.div>
          </div>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-between relative z-10 space-y-12 md:space-y-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={step.number} 
                className="flex flex-col items-center text-center relative group"
                variants={fadeUpStaggerVariant}
              >
                {/* Mobile connecting line */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden absolute top-[56px] left-1/2 w-[1px] h-20 bg-transparent -translate-x-1/2 overflow-hidden">
                    <motion.div 
                      className="w-full h-full bg-graphite/20 origin-top"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={lineDrawVertical}
                    ></motion.div>
                  </div>
                )}
                
                <div className="w-14 h-14 bg-white border border-graphite/20 flex items-center justify-center rounded-full mb-6 relative group-hover:border-brand-red transition-colors duration-300">
                  <span className="text-sm font-mono text-graphite group-hover:text-brand-red transition-colors duration-300">{step.number}</span>
                  {/* Subtle technical crosshair */}
                  <div className="absolute top-1/2 left-[-4px] right-[-4px] h-[1px] bg-graphite/5 hidden group-hover:block"></div>
                  <div className="absolute left-1/2 top-[-4px] bottom-[-4px] w-[1px] bg-graphite/5 hidden group-hover:block"></div>
                </div>
                
                <h3 className="text-sm font-medium tracking-widest uppercase text-deep-navy mb-2">{step.title}</h3>
                <p className="text-xs font-light text-graphite/60">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;
