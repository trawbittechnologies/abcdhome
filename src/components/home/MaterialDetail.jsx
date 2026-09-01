import { motion } from 'framer-motion';
import { fadeUpVariant, imageReveal } from '../../utils/animations';

const materials = [
  { label: "STONE", no: "01", style: "col-span-12 md:col-span-7 aspect-[16/9] md:aspect-auto md:h-96" },
  { label: "WOOD", no: "02", style: "col-span-12 md:col-span-5 aspect-[4/3] md:aspect-auto md:h-96" },
  { label: "LIGHT", no: "03", style: "col-span-12 md:col-span-4 aspect-square md:aspect-auto md:h-[30rem]" },
  { label: "DETAIL", no: "04", style: "col-span-12 md:col-span-8 aspect-[16/9] md:aspect-auto md:h-[30rem]" }
];

const MaterialDetail = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-architectural-ivory overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <div>
            <span className="text-[10px] font-mono tracking-widest text-brand-red block mb-6">04 / MATERIAL + DETAIL</span>
            <h2 className="text-3xl md:text-5xl font-serif text-deep-navy leading-tight">
              THE DETAIL IS THE DESIGN.
            </h2>
          </div>
          <p className="max-w-md text-sm font-light text-graphite/70 mt-6 md:mt-0">
            A building is only as good as its junctions. We focus obsessively on how materials meet, ensuring durability and timeless aesthetic quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {materials.map((item) => (
            <motion.div 
              key={item.no} 
              className={`${item.style} relative group overflow-hidden bg-warm-stone/30`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={imageReveal}
            >
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-graphite/5 transition-transform duration-1000 group-hover:scale-105"></div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                <div className="self-end">
                  <span className="text-[10px] font-mono text-white/80 tracking-widest">/ {item.no}</span>
                </div>
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-white font-medium">{item.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialDetail;
