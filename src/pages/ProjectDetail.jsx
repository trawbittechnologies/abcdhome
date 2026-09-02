import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Layers } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild, imageReveal } from '../utils/animations';
import { allProjectsData } from './Projects';

const projectGalleryMap = {
  "kbr-residence": [
    { src: "/exterior/kbr.png", caption: "Cantilevered Facade & Warm Soffit Lighting" },
    { src: "/interior/living01.png", caption: "Double Height Living Sanctuary" },
    { src: "/interior/bed02.png", caption: "Master Sanctuary & Vertical Teak Paneling" },
    { src: "/interior/kitchen03.png", caption: "Modular Kitchen & Quartz Island Counter" },
    { src: "/exterior/PHOTO-2024-05-10-17-56-20%2016.jpg.jpeg", caption: "Completed Facade Daylight" }
  ],
  "subhash-residence": [
    { src: "/exterior/subhashlandscape.png", caption: "Tropical Residence Landscape & Massing" },
    { src: "/exterior/subhash1.png", caption: "Double-Height Glass Entrance Volume" },
    { src: "/interior/ffliving01.png", caption: "First Floor Family Lounge" },
    { src: "/interior/dining.png", caption: "Teak Dining Hall & Joinery" }
  ],
  "mustafa-villa": [
    { src: "/exterior/mustafa.png", caption: "Monolithic Cuboid Villa Facade" },
    { src: "/interior/bed03.png", caption: "Modern Bedroom Interior" },
    { src: "/interior/001.jpg%20(1)%20-%20Copy.jpeg", caption: "Grand Chandelier Living Hall" },
    { src: "/exterior/IMG_4038.JPG.jpeg", caption: "Powder Coated Structural Glazing" }
  ],
  "farook-residence": [
    { src: "/exterior/farook.png", caption: "Sculptural Waterfront Elevation" },
    { src: "/interior/ffliving02.png", caption: "Veneer Paneling & TV Console" },
    { src: "/interior/bed1.png", caption: "Custom Teak Bed Joinery" }
  ],
  "ashith-berka": [
    { src: "/exterior/ashithberka.png", caption: "Dual Carport & Geometric Massing" },
    { src: "/interior/ffliving03.png", caption: "Drop Ceiling Rafters & Lighting" },
    { src: "/interior/dining.png", caption: "Formal Teak Dining Pavilion" }
  ],
  "bachi-residence": [
    { src: "/exterior/bachi.png", caption: "Front Elevation & Textured Stone Masonry" },
    { src: "/exterior/Bachi1.png", caption: "Aerial Perspective & Layered Roofline" },
    { src: "/exterior/bachiright.png", caption: "Cantilevered Master Balcony" },
    { src: "/interior/bed02.1.png", caption: "Master Fluted Woodwork & Brass Pendants" }
  ],
  "commercial-studio": [
    { src: "/exterior/commercial.png", caption: "Commercial Studio Street Elevation" },
    { src: "/exterior/IMG_4038.JPG.jpeg", caption: "Powder Coated Structural Glazing" },
    { src: "/exterior/IMG_4031.JPG.jpeg", caption: "RCC Column & Slab Framing" },
    { src: "/interior/studyroom1.png", caption: "Studio Workspace & Architectural Library" }
  ],
  "living-sanctuary": [
    { src: "/interior/living01.png", caption: "Ground Floor Living & Italian Marble" },
    { src: "/interior/ffliving01.png", caption: "Upper Family Living Lounge" },
    { src: "/interior/ffliving02.png", caption: "Veneer Paneling & TV Console" },
    { src: "/interior/001.jpg%20(1)%20-%20Copy.jpeg", caption: "Grand Chandelier Living Hall" }
  ],
  "master-suites": [
    { src: "/interior/bed02.png", caption: "Bespoke Teak Headboard Suite" },
    { src: "/interior/bed02.1.png", caption: "Brass Pendants & Fluted Detail" },
    { src: "/interior/bed1.png", caption: "Upholstered Headboard & Wardrobes" },
    { src: "/interior/007.jpg%20(1).jpeg", caption: "Walk-in Wardrobe & Smoked Glass" }
  ],
  "modular-kitchen": [
    { src: "/interior/kitchen03.png", caption: "Modular Island Countertop" },
    { src: "/interior/dining.png", caption: "Formal Teak Dining Setup" },
    { src: "/interior/PHOTO-2024-05-10-17-56-20%204.jpg%20(2).jpeg", caption: "Finished Dining Real Photo" }
  ],
  "rcc-civil-execution": [
    { src: "/exterior/IMG_4031.JPG.jpeg", caption: "Column Shuttering & Concrete Pour" },
    { src: "/exterior/IMG_4033.JPG.jpeg", caption: "Solid Block Masonry Alignment" },
    { src: "/exterior/IMG_4035.JPG.jpeg", caption: "Exterior Waterproof Plastering" },
    { src: "/exterior/IMG_4049.JPG.jpeg", caption: "Polyurethane Roof Waterproofing" }
  ]
};

// Aliases for backwards compatibility
projectGalleryMap["1"] = projectGalleryMap["kbr-residence"];
projectGalleryMap["2"] = projectGalleryMap["subhash-residence"];
projectGalleryMap["3"] = projectGalleryMap["mustafa-villa"];
projectGalleryMap["4"] = projectGalleryMap["farook-residence"];
projectGalleryMap["5"] = projectGalleryMap["ashith-berka"];
projectGalleryMap["6"] = projectGalleryMap["bachi-residence"];
projectGalleryMap["7"] = projectGalleryMap["commercial-studio"];
projectGalleryMap["8"] = projectGalleryMap["living-sanctuary"];
projectGalleryMap["9"] = projectGalleryMap["master-suites"];
projectGalleryMap["10"] = projectGalleryMap["modular-kitchen"];
projectGalleryMap["11"] = projectGalleryMap["rcc-civil-execution"];

const ProjectDetail = () => {
  const { id, slug } = useParams();
  const activeId = id || slug;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeId]);

  const project = allProjectsData.find((p, idx) =>
    p.id === activeId ||
    p.number === activeId ||
    String(idx + 1) === activeId
  ) || allProjectsData[0];
  const gallery = projectGalleryMap[project.id] || projectGalleryMap["kbr-residence"];

  const currentIndex = allProjectsData.findIndex(p => p.id === project.id);
  const nextProject = allProjectsData[(currentIndex + 1) % allProjectsData.length];
  const prevProject = allProjectsData[(currentIndex - 1 + allProjectsData.length) % allProjectsData.length];

  return (
    <PageTransition>
      <div className="bg-[#FAFBFF] text-brand-blue min-h-screen">

        {/* Minimal Navigation Bar Strip */}
        <div className="pt-36 md:pt-40 px-6 md:px-12 max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue/60 hover:text-brand-red transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>All Projects</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to={`/projects/${prevProject.id}`}
              className="w-9 h-9 rounded-full border border-brand-blue/15 flex items-center justify-center text-brand-blue/60 hover:text-white hover:bg-brand-blue transition-all"
              title="Previous project"
            >
              <ArrowLeft size={15} />
            </Link>
            <Link
              to={`/projects/${nextProject.id}`}
              className="w-9 h-9 rounded-full border border-brand-blue/15 flex items-center justify-center text-brand-blue/60 hover:text-white hover:bg-brand-blue transition-all"
              title="Next project"
            >
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Minimal Hero Header */}
        <section className="pt-6 pb-12 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">

            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-brand-red text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                {project.category}
              </span>
              <span className="text-xs text-brand-blue/60 flex items-center gap-1 font-light">
                <MapPin size={13} className="text-brand-red" />
                {project.location}
              </span>
              <span className="text-brand-blue/30">·</span>
              <span className="text-xs text-brand-blue/60 flex items-center gap-1 font-light">
                <Layers size={13} className="text-brand-red" />
                {project.area}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-semibold text-brand-blue tracking-tight leading-[1.05] mb-8">
              {project.name}
            </h1>

            {/* Hero Main Image */}
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-sm border border-brand-blue/10 bg-brand-gray">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </section>

        {/* Minimal Narrative & Clean Data */}
        <section className="py-12 md:py-16 px-6 md:px-12 bg-white border-y border-brand-blue/10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

            {/* Left: Design Narrative */}
            <div className="md:col-span-8 space-y-4">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-red block">
                Overview
              </span>
              <p className="text-lg sm:text-xl font-light text-brand-blue/90 leading-relaxed">
                {project.description}
              </p>
              <p className="text-sm font-light text-brand-blue/60 leading-relaxed pt-2">
                Executed with end-to-end design-build precision by ABCD Studio in Cherkala – Kanhangad, ensuring seamless harmony between structural architecture, natural daylight, and bespoke handcrafted joinery.
              </p>
            </div>

            {/* Right: Minimal Specs Column */}
            <div className="md:col-span-4 bg-[#FAFBFF] p-6 rounded-2xl border border-brand-blue/10 space-y-4">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-blue/50 block">
                Specifications
              </span>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-brand-blue/10">
                  <span className="text-brand-blue/50">Typology</span>
                  <span className="font-semibold text-brand-blue">{project.category}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-brand-blue/10">
                  <span className="text-brand-blue/50">Location</span>
                  <span className="font-semibold text-brand-blue">{project.location}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-brand-blue/10">
                  <span className="text-brand-blue/50">Built Area</span>
                  <span className="font-semibold text-brand-blue">{project.area}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-blue/50">Execution</span>
                  <span className="font-semibold text-brand-red">Turnkey Build</span>
                </div>
              </div>

              <Link
                to="/contact"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-red text-white py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300"
              >
                <span>Inquire About Project</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

          </div>
        </section>

        {/* Minimal Photo Stream Gallery */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto space-y-8">

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-red">
                Visual Documentation
              </span>
              <span className="text-xs font-light text-brand-blue/50">
                {gallery.length} Photographs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {gallery.map((img, idx) => (
                <div
                  key={idx}
                  className={`group rounded-2xl overflow-hidden border border-brand-blue/10 bg-white shadow-sm flex flex-col ${idx === 0 ? 'md:col-span-2' : ''
                    }`}
                >
                  <div className={`relative overflow-hidden bg-brand-gray ${idx === 0 ? 'aspect-[21/10]' : 'aspect-[4/3]'}`}>
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between border-t border-brand-blue/10 text-xs">
                    <span className="font-medium text-brand-blue">{img.caption}</span>
                    <span className="text-brand-blue/40 font-mono text-[11px]">0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Minimal Footer Navigation Bar */}
        <section className="py-14 px-6 md:px-12 border-t border-brand-blue/10 bg-white">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link
              to={`/projects/${prevProject.id}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-blue/70 hover:text-brand-red uppercase tracking-wider transition-colors"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Previous:</span> {prevProject.name}
            </Link>

            <Link
              to={`/projects/${nextProject.id}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-blue/70 hover:text-brand-red uppercase tracking-wider transition-colors"
            >
              <span className="hidden sm:inline">Next:</span> {nextProject.name}
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default ProjectDetail;
