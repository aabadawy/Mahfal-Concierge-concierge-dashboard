import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Check, ArrowRight, Star, ChevronRight,
  MapPin, Users, Calendar, ShieldCheck, Clock,
  Sparkles, Coffee, Camera, Music, Lightbulb, Hexagon, Info,
  ChevronDown, Diamond, Grip
} from 'lucide-react';
import { LeadForm } from './components/LeadForm';
import { Section } from './components/Section';
import { SpaceCard } from './components/SpaceCard';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { demoSpaces, demoStories, demoTestimonials } from './data';

const experienceTypes = [
  { id: 'photoshoot', label: 'Photo shoot', img: 'https://picsum.photos/800/800?random=101' },
  { id: 'meeting', label: 'Meeting', img: 'https://picsum.photos/800/800?random=102' },
  { id: 'birthday', label: 'Birthday party', img: 'https://picsum.photos/800/800?random=103' },
  { id: 'video', label: 'Video shoot', img: 'https://picsum.photos/800/800?random=104' },
  { id: 'baby', label: 'Baby shower', img: 'https://picsum.photos/800/800?random=105' },
  { id: 'workshop', label: 'Workshop', img: 'https://picsum.photos/800/800?random=106' },
  { id: 'reception', label: 'Wedding reception', img: 'https://picsum.photos/800/800?random=107' },
  { id: 'livemusic', label: 'Live music', img: 'https://picsum.photos/800/800?random=108' },
  { id: 'party', label: 'Party', img: 'https://picsum.photos/800/800?random=109' },
  { id: 'musicvideo', label: 'Music video', img: 'https://picsum.photos/800/800?random=110' },
  { id: 'bridal', label: 'Bridal shower', img: 'https://picsum.photos/800/800?random=111' },
  { id: 'event', label: 'Event', img: 'https://picsum.photos/800/800?random=112' },
  { id: 'engagement', label: 'Engagement party', img: 'https://picsum.photos/800/800?random=113' },
  { id: 'corporate', label: 'Corporate event', img: 'https://picsum.photos/800/800?random=114' },
  { id: 'grad', label: 'Graduation party', img: 'https://picsum.photos/800/800?random=115' },
  { id: 'popup', label: 'Pop-up', img: 'https://picsum.photos/800/800?random=116' },
  { id: 'gala', label: 'Gala', img: 'https://picsum.photos/800/800?random=117' },
  { id: 'film', label: 'Film shoot', img: 'https://picsum.photos/800/800?random=118' },
];

const App: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeExperience, setActiveExperience] = useState(experienceTypes[12]); // Default to Engagement party

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="relative min-h-screen bg-brand-black text-brand-white overflow-x-hidden font-sans">

      {/* Navigation */}
      <Navbar scrolled={scrolled} onOpenForm={openForm} />

      {/* Hero Section */}
      <div id="hero" className="relative w-full min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/1920/1080?grayscale&blur=2"
            alt="Atmospheric event space"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-dark1/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black" />
          <div className="absolute inset-0 bg-noise mix-blend-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-stretch mb-8 md:mb-12">
              <div className="w-[1px] bg-brand-red mr-6 md:mr-8 hidden md:block"></div>
              <div>
                <span className="block text-xs md:text-sm tracking-[0.2em] text-brand-white/80 font-bold mb-4 md:mb-6 uppercase">
                  Mahfal Concierge
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6 md:mb-8 text-white">
                  For every vision,<br />
                  a curated space.
                </h1>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mb-8 md:mb-10 font-light">
                  Tell us the occasion, date, and vibe. We handpick venues and trusted suppliers, then send you a shortlist.
                </p>

                {/* Trust Mini-Row */}
                <div className="flex flex-wrap gap-6 mb-10 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} />
                    <span>Curated shortlist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} />
                    <span>Verified venues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Fast response</span>
                  </div>
                </div>

                {/* CTA Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <button
                    onClick={openForm}
                    className="group relative px-8 py-4 bg-brand-red text-white font-medium text-lg rounded-none transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get Matched <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                  <a href="#spaces" className="px-6 py-3 text-white/90 hover:text-white border-b border-transparent hover:border-white/30 transition-colors">
                    Browse spaces
                  </a>
                </div>

                <div className="mt-6 flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider text-white/40">2-minute request. No commitment.</span>
                  <span className="text-[10px] text-white/30">We only use your details to contact you about this request.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Experiences (Split Layout) */}
      <Section id="experiences" className="bg-brand-white text-brand-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start lg:items-center">

          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-semibold mb-3 tracking-tight">
              A space for <br className="hidden md:block" />every moment
            </h2>
            <p className="text-brand-black/70 text-lg mb-10">
              Book a unique space for your activity
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-12">
              {experienceTypes.map((exp) => (
                <button
                  key={exp.id}
                  onMouseEnter={() => setActiveExperience(exp)}
                  onClick={openForm}
                  className={`text-lg transition-all duration-200 cursor-pointer ${activeExperience.id === exp.id
                      ? 'text-brand-black font-semibold border-b-2 border-brand-black'
                      : 'text-brand-black/50 hover:text-brand-black'
                    }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>

            <button
              onClick={openForm}
              className="bg-brand-black text-white px-8 py-3.5 text-sm font-medium rounded-none hover:bg-brand-dark3 transition-colors"
            >
              Browse all activities
            </button>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 w-full aspect-[4/3] lg:aspect-square lg:h-[600px] relative bg-gray-100 rounded-none overflow-hidden group">
            <img
              src={activeExperience.img}
              alt={activeExperience.label}
              key={activeExperience.id} // Forces animation
              className="w-full h-full object-cover animate-in fade-in zoom-in-105 duration-500"
            />

            {/* Vertical Text Label */}
            <div className="absolute right-0 top-0 bottom-0 w-10 md:w-12 bg-white/90 backdrop-blur-sm border-l border-white/20 flex flex-col items-center justify-center py-8 z-10">
              <div className="rotate-180 flex flex-col items-center gap-8 h-full justify-between" style={{ writingMode: 'vertical-rl' }}>
                <span className="text-[10px] font-mono tracking-widest text-black/40 uppercase">Manhattan, NY, US</span>
                <span className="text-xs font-bold tracking-wider text-brand-black uppercase">{activeExperience.label}</span>
              </div>
            </div>
          </div>

        </div>
      </Section>

      {/* Spaces Gallery */}
      <Section id="spaces" className="bg-brand-dark2 border-t border-white/5">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">Explore Spaces</h2>
            <p className="text-white/50">A few examples. Your shortlist will be tailored.</p>
          </div>
          <div className="hidden md:flex gap-2">
            {/* Demo Filters */}
            {['Any Location', 'Any Capacity', 'Occasion'].map(f => (
              <button key={f} className="px-4 py-2 text-sm border border-white/10 rounded-none text-white/70 hover:border-white/30 transition-colors">
                {f} <ChevronDown className="inline w-3 h-3 ml-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory">
          {demoSpaces.map((space) => (
            <div key={space.id} className="min-w-[85vw] md:min-w-[350px] snap-center">
              <SpaceCard space={space} onSelect={() => { openForm(); }} />
            </div>
          ))}
        </div>
      </Section>

      {/* How It Works (White Background) */}
      <Section id="how-it-works" className="bg-brand-white text-brand-black relative">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-brand-black">How it works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 max-w-6xl mx-auto items-start">
          {[
            {
              num: "01",
              title: "Share your plan",
              desc: "Complete a brief intake about your occasion, guests, and preferences."
            },
            {
              num: "02",
              title: "We curate venues + suppliers",
              desc: "Our team handpicks options that match your vision and budget."
            },
            {
              num: "03",
              title: "You approve, we arrange",
              desc: "Review your shortlist, choose what resonates, and we handle the details."
            },
          ].map((step, i) => (
            <div key={i} className="flex flex-col text-left group">
              <span className="text-brand-black text-xs font-bold mb-4 tracking-widest">{step.num}</span>
              <div className="w-full h-[1px] bg-black/10 mb-6 group-hover:bg-brand-red transition-colors duration-500 origin-left"></div>
              <h3 className="text-2xl font-semibold tracking-tight mb-4 text-brand-black leading-tight">{step.title}</h3>
              <p className="text-brand-black/60 text-base leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center flex items-center justify-center gap-2 text-brand-black/40 text-sm">
          <Clock size={16} />
          <span>Typical response: within 24 hours (demo)</span>
        </div>
      </Section>

      {/* Stories */}
      <Section id="stories" className="bg-brand-dark3 border-t border-white/5">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Stories</h2>
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white">View all</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Story */}
          <div className="lg:col-span-7 group cursor-pointer">
            <div className="overflow-hidden rounded-none mb-6 aspect-video">
              <img src={demoStories[0].img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="space-y-3">
              <span className="text-xs text-brand-red font-bold uppercase tracking-wider">{demoStories[0].cat}</span>
              <h3 className="text-2xl font-medium text-white group-hover:text-white/90 transition-colors">{demoStories[0].title}</h3>
              <p className="text-white/50">{demoStories[0].desc}</p>
              <div className="pt-2">
                <span className="text-sm text-white border-b border-brand-red inline-block pb-1">Read story</span>
              </div>
            </div>
          </div>

          {/* Side Stories */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {demoStories.slice(1).map((story, i) => (
              <div key={i} className="flex gap-6 group cursor-pointer">
                <div className="w-1/3 overflow-hidden rounded-none aspect-square">
                  <img src={story.img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="w-2/3 flex flex-col justify-center">
                  <span className="text-xs text-white/40 uppercase tracking-wider mb-2">{story.cat}</span>
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-brand-red transition-colors">{story.title}</h3>
                  <span className="text-xs text-white/50 border-b border-transparent group-hover:border-white/20 self-start transition-all">Read story</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-brand-offWhite text-brand-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {demoTestimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 md:p-10 rounded-none shadow-sm border border-black/5">
              <div className="flex gap-1 text-brand-red mb-6">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
              </div>
              <blockquote className="text-xl md:text-2xl font-light leading-snug mb-6">"{t.quote}"</blockquote>
              <div>
                <cite className="not-italic font-semibold text-sm block mb-1">{t.author}</cite>
                <span className="text-xs text-black/50 uppercase tracking-wide">{t.type} • {t.loc}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center border-t border-black/10 pt-8 max-w-md mx-auto">
          <p className="text-xs text-black/40 font-mono">
            Manual curation now, automation later. We’re learning what guests truly want.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-brand-dark4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-10 text-center">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How does matching work?", a: "Submit your brief. We manually check availability with our vetted partners and send you a PDF shortlist within 24 hours." },
              { q: "Do I need to commit before seeing options?", a: "No. The shortlist is completely free and comes with no obligation." },
              { q: "Can I add suppliers?", a: "Yes. In the form, just select what you need (catering, decor, etc.) and we'll include options." },
              { q: "How do you use my details?", a: "We only use your phone/email to send you the shortlist and answer questions. No spam lists." }
            ].map((item, i) => (
              <details key={i} className="group border-b border-white/10 pb-4 cursor-pointer">
                <summary className="flex justify-between items-center text-white font-medium list-none outline-none">
                  {item.q}
                  <span className="transition-transform group-open:rotate-180">
                    <ChevronDown size={20} className="text-white/40" />
                  </span>
                </summary>
                <p className="text-white/60 mt-3 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-gradient-to-br from-brand-dark1 to-brand-black text-center border-t border-white/5">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">Get your curated shortlist.</h2>
          <p className="text-white/60 text-lg mb-10">Two minutes now. A tailored experience next.</p>
          <button
            onClick={openForm}
            className="w-full sm:w-auto px-10 py-5 bg-brand-red text-white font-medium text-lg rounded-none hover:bg-red-600 transition-colors shadow-lg shadow-red-900/20"
          >
            Get Matched
          </button>
          <p className="mt-6 text-sm text-white/30">Prefer WhatsApp? Choose it in the form.</p>
        </div>
      </Section>

      {/* Footer */}
      <Footer />

      {/* Lead Intake Form Sheet */}
      <LeadForm isOpen={isFormOpen} onClose={closeForm} />

      {/* Admin Dashboard */}


    </div>
  );
};

export default App;