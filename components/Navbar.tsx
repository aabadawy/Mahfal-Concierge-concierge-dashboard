import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
  onOpenForm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, onOpenForm }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Links ordered to match the vertical flow of the landing page
  const navLinks = [
    { label: 'Experiences', href: '#experiences' },
    { label: 'Spaces', href: '#spaces' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Stories', href: '#stories' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
        ? 'bg-brand-black/90 backdrop-blur-md border-white/10 py-4'
        : 'bg-transparent border-transparent py-6'
        }`}>
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <div className="flex flex-col">
            <a href="#hero" className="text-2xl font-bold tracking-tight text-white font-sans">
              Mahfal
            </a>
            <span className={`text-[10px] uppercase tracking-widest transition-opacity duration-300 ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-70 text-white/80'}`}>
              Curated Spaces
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">

            <a href="#spaces" className="text-sm text-white hover:text-white/80 transition-colors">Explore</a>
            <button
              onClick={onOpenForm}
              className="px-5 py-2.5 bg-brand-red text-white text-sm font-medium rounded-none hover:bg-red-600 transition-colors"
            >
              Get Matched
            </button>
          </div>

          {/* Mobile Burger */}
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-xl transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-end">
          <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
            <X size={28} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-8 mt-12 text-xl font-light text-white">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-red transition-colors"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenForm(); }}
            className="mt-8 px-8 py-4 bg-brand-red text-white rounded-none w-full max-w-xs"
          >
            Get Matched
          </button>
        </div>
      </div>
    </>
  );
};