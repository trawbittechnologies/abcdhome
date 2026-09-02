import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// Layer 1: Architecture & Civil Construction (Sliding Left ←)
const layerOneWorks = [
  { src: "/exterior/kbr.png", title: "KBR Contemporary Residence", link: "/projects/kbr-residence" },
  { src: "/exterior/IMG_4031.JPG.jpeg", title: "RCC Structural Framing & Casting", link: "/projects/rcc-civil-execution" },
  { src: "/exterior/subhashlandscape.png", title: "Subhash Tropical Modern Villa", link: "/projects/subhash-residence" },
  { src: "/exterior/commercial.png", title: "ABCD Commercial Landmark", link: "/projects/commercial-studio" },
  { src: "/exterior/IMG_4033.JPG.jpeg", title: "Solid Block Structural Masonry", link: "/projects/rcc-civil-execution" },
  { src: "/exterior/mustafa.png", title: "Mustafa Monolithic Residence", link: "/projects/mustafa-villa" },
  { src: "/exterior/IMG_4038.JPG.jpeg", title: "Powder-Coated Structural Glazing", link: "/projects/commercial-studio" },
  { src: "/exterior/farook.png", title: "Farook Waterfront Residence", link: "/projects/farook-residence" },
  { src: "/exterior/IMG_4049.JPG.jpeg", title: "Multi-Layer Terrace Waterproofing", link: "/projects/rcc-civil-execution" },
  { src: "/exterior/ashithberka.png", title: "Ashith Berka Signature Villa", link: "/projects/ashith-berka" },
  { src: "/exterior/bachi.png", title: "Bachi Residence Elevation", link: "/projects/bachi-residence" },
  { src: "/exterior/IMG_4035.JPG.jpeg", title: "Weatherproof Exterior Plastering", link: "/projects/rcc-civil-execution" }
];

// Layer 2: Bespoke Interiors & Joinery Craft (Sliding Right →)
const layerTwoWorks = [
  { src: "/interior/living01.png", title: "Grand Living Sanctuary", link: "/projects/living-sanctuary" },
  { src: "/interior/bed02.png", title: "Bespoke Teak Master Suite", link: "/projects/master-suites" },
  { src: "/interior/kitchen03.png", title: "Modular Quartz Island Kitchen", link: "/projects/modular-kitchen" },
  { src: "/interior/dining.png", title: "Solid Teak Dining Pavilion", link: "/projects/modular-kitchen" },
  { src: "/interior/bed02.1.png", title: "Fluted Woodwork & Brass Accents", link: "/projects/master-suites" },
  { src: "/interior/ffliving01.png", title: "First Floor Family Lounge", link: "/projects/living-sanctuary" },
  { src: "/interior/001.jpg%20(1)%20-%20Copy.jpeg", title: "Grand Chandelier Living Hall", link: "/projects/living-sanctuary" },
  { src: "/interior/007.jpg%20(1).jpeg", title: "Walk-In Dressing Suite", link: "/projects/master-suites" },
  { src: "/interior/studyroom1.png", title: "Executive Study & Library", link: "/projects/commercial-studio" },
  { src: "/interior/bed03.png", title: "Modern Minimalist Bedroom", link: "/projects/mustafa-villa" }
];

const WorkSlider = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAFBFF] relative overflow-hidden border-b border-brand-blue/10 select-none">
      
      {/* Main Section Heading */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-10">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-semibold text-brand-blue tracking-tight leading-[1.08]">
              Crafted with Precision. <br className="hidden sm:inline" />
              <span className="text-brand-red font-serif italic font-normal">Built for Generations.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 lg:pb-1">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue hover:bg-brand-red text-white text-xs font-semibold tracking-[0.15em] uppercase shadow-sm transition-all duration-300 group"
            >
              <span>Explore All Works</span>
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>

      {/* Creative Modern 2-Layer Marquee Streams */}
      <div className="space-y-4 md:space-y-6 group-hover-pause">
        
        {/* Layer 1: Architecture & Construction Execution (Sliding Left ←) */}
        <div className="relative flex overflow-x-hidden">
          <div className="flex gap-4 md:gap-6 animate-marquee whitespace-nowrap will-change-transform">
            {layerOneWorks.concat(layerOneWorks).map((item, i) => (
              <Link
                key={`layer1-${i}`}
                to={item.link}
                className="relative w-72 sm:w-84 md:w-96 aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden bg-brand-gray border border-brand-blue/10 shadow-sm flex-shrink-0 group cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Minimal Overlay with only Title */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5 text-white">
                  <h4 className="text-xs sm:text-sm font-display font-medium tracking-wide truncate">
                    {item.title}
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shadow-md flex-shrink-0 ml-3">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Layer 2: Bespoke Interiors & Joinery Craft (Sliding Right → Reverse) */}
        <div className="relative flex overflow-x-hidden">
          <div className="flex gap-4 md:gap-6 animate-marquee-reverse whitespace-nowrap will-change-transform">
            {layerTwoWorks.concat(layerTwoWorks).map((item, i) => (
              <Link
                key={`layer2-${i}`}
                to={item.link}
                className="relative w-72 sm:w-84 md:w-96 aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden bg-brand-gray border border-brand-blue/10 shadow-sm flex-shrink-0 group cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Minimal Overlay with only Title */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5 text-white">
                  <h4 className="text-xs sm:text-sm font-display font-medium tracking-wide truncate">
                    {item.title}
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shadow-md flex-shrink-0 ml-3">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};

export default WorkSlider;


