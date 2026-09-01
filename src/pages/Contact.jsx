import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ArrowUpRight, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { fadeUpVariant, textRevealContainer, textRevealChild } from '../utils/animations';

const projectTypes = ["Residential Villa", "Interior Architecture", "Commercial Landmark", "Turnkey Construction"];
const budgetRanges = ["₹25L – ₹50L", "₹50L – ₹1 Cr", "₹1 Cr – ₹2.5 Cr", "₹2.5 Cr+"];

const Contact = () => {
  const [selectedType, setSelectedType] = useState(projectTypes[0]);
  const [selectedBudget, setSelectedBudget] = useState(budgetRanges[1]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });

  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', location: '', message: '' });
      setTimeout(() => setStatus('idle'), 7000);
    }, 1200);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFBFF] text-brand-blue">
        
        {/* Header */}
        <section className="pt-40 md:pt-48 pb-16 px-6 md:px-12 border-b border-brand-blue/10">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-[1px] w-8 bg-brand-red"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">Initiate a Conversation</span>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <motion.div
                className="overflow-hidden max-w-3xl"
                variants={textRevealContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold leading-[1.0] tracking-tight"
                  variants={textRevealChild}
                >
                  Let's bring your<br />
                  <span className="text-brand-red italic font-light">vision</span> to life.
                </motion.h1>
              </motion.div>

              <motion.p
                className="text-base md:text-lg font-light text-brand-blue/70 max-w-md leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Whether you have an empty site ready for architectural blueprints or an interior sanctuary to transform, we are ready to collaborate.
              </motion.p>
            </div>

          </div>
        </section>

        {/* Main Form & Studio Details Matrix */}
        <section className="py-20 md:py-28 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Studio Direct Lines & Location */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red block mb-3">Direct Studio Access</span>
                <h2 className="text-3xl font-display font-semibold text-brand-blue mb-4">
                  Visit our office or schedule a site inspection.
                </h2>
                <p className="text-sm md:text-base font-light text-brand-blue/70 leading-relaxed">
                  Our core studio is situated strategically in Cherkala – Kanhangad, serving clients throughout Kasaragod, Kannur, and coastal Kerala.
                </p>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-white border border-brand-blue/10 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 text-brand-red flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wider uppercase text-brand-blue mb-1">Studio Headquarters</h3>
                    <p className="text-sm font-light text-brand-blue/70 leading-relaxed">
                      Cherkala – Kanhangad Highway,<br />Kasaragod District, Kerala 671315
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-brand-blue/10 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 text-brand-red flex items-center justify-center flex-shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wider uppercase text-brand-blue mb-1">Direct Inquiries</h3>
                    <a href="mailto:info@abcdstudio.com" className="text-sm font-medium text-brand-blue hover:text-brand-red transition-colors block">
                      info@abcdstudio.com
                    </a>
                    <span className="text-xs font-light text-brand-blue/50">Response within 24 business hours</span>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-brand-blue/10 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 text-brand-red flex items-center justify-center flex-shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wider uppercase text-brand-blue mb-1">Call / WhatsApp</h3>
                    <a href="tel:+910000000000" className="text-sm font-medium text-brand-blue hover:text-brand-red transition-colors block">
                      +91 (0) 000 000 0000
                    </a>
                    <span className="text-xs font-light text-brand-blue/50">Mon – Sat from 9:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Action */}
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-7 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-sm"
              >
                <MessageSquare size={16} />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>

            {/* Right: Interactive Project Planner Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-14 border border-brand-blue/10 shadow-sm">
              
              {status === 'success' ? (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-display font-semibold text-brand-blue">Inquiry Received</h3>
                  <p className="text-base font-light text-brand-blue/70 max-w-md mx-auto leading-relaxed">
                    Thank you for sharing your project details. Our lead architectural consultant will review your site specifications and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-brand-blue mb-1">Project Brief Planner</h3>
                    <p className="text-xs font-light text-brand-blue/60">Select your preferences to help us tailor our initial diagnostic review.</p>
                  </div>

                  {/* 1. Project Typology selector */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue/50 mb-3">
                      1. Project Typology
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {projectTypes.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`p-3 rounded-2xl text-xs font-semibold tracking-wider transition-all text-left cursor-pointer border ${
                            selectedType === type
                              ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                              : 'bg-[#FAFBFF] border-brand-blue/10 text-brand-blue/70 hover:border-brand-blue/30'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Budget Range */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue/50 mb-3">
                      2. Approximate Investment Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {budgetRanges.map((range) => (
                        <button
                          type="button"
                          key={range}
                          onClick={() => setSelectedBudget(range)}
                          className={`p-3 rounded-2xl text-xs font-semibold text-center transition-all cursor-pointer border ${
                            selectedBudget === range
                              ? 'bg-brand-red text-white border-brand-red shadow-sm'
                              : 'bg-[#FAFBFF] border-brand-blue/10 text-brand-blue/70 hover:border-brand-blue/30'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Personal & Site Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-brand-blue/10">
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-bold tracking-wider uppercase text-brand-blue/60 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Nair"
                        className="w-full bg-[#FAFBFF] border border-brand-blue/15 rounded-2xl px-4 py-3.5 text-sm text-brand-blue focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-bold tracking-wider uppercase text-brand-blue/60 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAFBFF] border border-brand-blue/15 rounded-2xl px-4 py-3.5 text-sm text-brand-blue focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-bold tracking-wider uppercase text-brand-blue/60 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rahul@example.com"
                        className="w-full bg-[#FAFBFF] border border-brand-blue/15 rounded-2xl px-4 py-3.5 text-sm text-brand-blue focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-[10px] font-bold tracking-wider uppercase text-brand-blue/60 mb-2">
                        Site Location / City *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Kanhangad, Kasaragod"
                        className="w-full bg-[#FAFBFF] border border-brand-blue/15 rounded-2xl px-4 py-3.5 text-sm text-brand-blue focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[10px] font-bold tracking-wider uppercase text-brand-blue/60 mb-2">
                      Tell us about your spatial requirements & plot size
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="e.g., 4 BHK contemporary tropical villa on 15 cents land facing waterbody..."
                      className="w-full bg-[#FAFBFF] border border-brand-blue/15 rounded-2xl p-4 text-sm text-brand-blue focus:outline-none focus:border-brand-blue focus:bg-white transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-3 bg-brand-blue hover:bg-brand-red text-white py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    <Send size={16} />
                    <span>{status === 'submitting' ? 'Submitting Brief...' : 'Submit Project Brief'}</span>
                  </button>

                </form>
              )}

            </div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Contact;
