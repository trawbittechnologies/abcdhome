import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { fadeUpVariant } from '../../utils/animations';

const ContactCTA = () => {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-brand-blue text-white relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-brand-red/15 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          {/* Headline & Description */}
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-[1px] w-8 bg-brand-red"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">Commission ABCD Studio</span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-white leading-[1.05] tracking-tight mb-6">
              Ready to construct something<br />
              <span className="text-brand-red italic font-light">extraordinary</span>?
            </h2>

            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
              Schedule an on-site diagnostic or conceptual consultation with our lead architects in Cherkala – Kanhangad. We guide you through feasibility, blueprints, and turnkey construction.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-glass-red"
            >
              <span>Start Project Brief</span>
              <ArrowUpRight size={16} />
            </Link>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all"
            >
              <MessageSquare size={16} />
              <span>WhatsApp Us</span>
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
