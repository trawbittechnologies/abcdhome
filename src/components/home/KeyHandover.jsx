import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const handoverMoments = [
  {
    number: "01",
    title: "Official Key Handover Ceremony",
    src: "/key handover/PHOTO-2024-05-10-18-05-17.jpg (1).jpeg",
  },
  {
    number: "02",
    title: "Family Celebration & Warm Welcome",
    src: "/key handover/PHOTO-2024-05-10-18-05-37.jpg (1).jpeg",
  },
  {
    number: "03",
    title: "The Finished Living Sanctuary",
    src: "/key handover/PHOTO-2024-05-10-18-06-06.jpg.jpeg",
  }
];

const KeyHandover = () => {
  return (
    <section className="py-24 md:py-36 bg-[#FAFBFF] relative overflow-hidden border-b border-brand-blue/10 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Minimal Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-semibold text-brand-blue tracking-tight leading-[1.08]">
              The Handover Milestone. <br />
              <span className="text-brand-red font-serif italic font-normal">From blueprint to living reality.</span>
            </h2>
          </div>

          <Link
            to="/contact"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue/70 hover:text-brand-red transition-colors inline-flex items-center gap-1.5 self-start lg:self-end"
          >
            <span>Consult Our Architects</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3-Panel Grid with Full Natural Landscape Aspect Ratio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {handoverMoments.map((item, idx) => (
            <Link
              key={idx}
              to="/contact"
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-brand-blue/10 hover:border-brand-blue/30 shadow-[0_2px_12px_rgba(35,55,119,0.04)] hover:shadow-[0_12px_32px_rgba(35,55,119,0.08)] transition-all duration-500"
            >
              {/* Full Image Canvas (aspect-[4/3] captures the full width & all people) */}
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Index Monospace Tag */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-blue/10 text-[10px] font-mono font-semibold text-brand-blue shadow-sm">
                  {item.number}
                </div>

                {/* Floating Action Arrow on Hover */}
                <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Minimal Clean Card Footer */}
              <div className="p-5 flex items-center justify-between border-t border-brand-blue/10 bg-white">
                <h3 className="text-sm font-display font-semibold text-brand-blue group-hover:text-brand-red transition-colors truncate">
                  {item.title}
                </h3>
                <ArrowUpRight size={15} className="text-brand-blue/40 group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-2" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default KeyHandover;
