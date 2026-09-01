import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Studio', path: '/about' },
    { name: 'Process', path: '/process' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative bg-[#FAFBFF] border-t border-brand-blue/10 overflow-hidden">
      
      {/* Ultra-minimal artistic background watermarking */}
      <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-[0.03] text-brand-blue font-display font-bold text-[18vw] leading-none translate-y-1/4">
        ABCD
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        
        {/* Main Minimal Showcase Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 pb-16 border-b border-brand-blue/10">
          
          {/* Brand & Origin */}
          <div className="space-y-6 max-w-md">
            <Link to="/" className="inline-block group">
              <img
                src="/abcd(logo)final (1).png"
                alt="ABCD Logo"
                className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm font-light text-brand-blue/70 leading-relaxed">
              Crafting contemporary architectural spaces, immersive interiors, and precision construction in <span className="text-brand-blue font-medium">Cherkala – Kanhangad, Kerala</span>.
            </p>
          </div>

          {/* Minimal Quick Action / Direct Line */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-10">
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-red mb-1">Inquiries & Commissions</p>
              <a 
                href="mailto:info@abcdstudio.com" 
                className="text-lg md:text-xl font-display font-medium text-brand-blue hover:text-brand-red transition-colors flex items-center gap-1.5 group"
              >
                <span>info@abcdstudio.com</span>
                <ArrowUpRight size={18} className="text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <Link
              to="/contact"
              className="bg-brand-blue text-white hover:bg-brand-red text-xs font-semibold tracking-[0.2em] uppercase px-7 py-3.5 rounded-full transition-all duration-300 shadow-glass"
            >
              Start a Project
            </Link>
          </div>

        </div>

        {/* Middle Clean Navigation & Social Ribbon */}
        <div className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-brand-blue/10">
          
          {/* Inline Navigation Links */}
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-blue/60 hover:text-brand-red transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-red group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-xs font-semibold tracking-[0.15em] uppercase text-brand-blue/50">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">Instagram</a>
            <span className="text-brand-blue/20">/</span>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">WhatsApp</a>
            <span className="text-brand-blue/20">/</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">LinkedIn</a>
          </div>

        </div>

        {/* Bottom Metadata & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-brand-blue/50">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span>
            <span>© {year} ABCD Studio. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline">Architecture · Interior · Construction</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-brand-blue hover:text-brand-red transition-colors group cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
