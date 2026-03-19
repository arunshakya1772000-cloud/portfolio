import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Videos', href: '#videos' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, id) => {
    if (location.pathname !== '/') {
      return;
    }
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="text-lg md:text-2xl font-heading font-bold tracking-wider relative group">
          <span className="text-white">Arun</span>
          <span className="text-primary ml-1">Kumar</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Home link */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-sm transition-colors uppercase tracking-widest font-medium ${
              location.pathname === '/'
                ? 'text-primary'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Home
          </Link>

          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={location.pathname === '/' ? link.href : `/${link.href}`}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm text-gray-300 hover:text-white transition-colors uppercase tracking-widest font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-secondary border-b border-white/10"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {/* Mobile Home link */}
              <Link
                to="/"
                onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`uppercase tracking-wider text-sm ${
                  location.pathname === '/'
                    ? 'text-primary font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </Link>

              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={location.pathname === '/' ? link.href : `/${link.href}`}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-gray-300 hover:text-white uppercase tracking-wider text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
