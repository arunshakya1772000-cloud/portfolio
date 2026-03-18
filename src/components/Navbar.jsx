import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80";

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
  const [profileImage, setProfileImage] = useState(null);
  const location = useLocation();

  // Load profile image from localStorage and listen for updates
  useEffect(() => {
    const loadImage = () => {
      const saved = localStorage.getItem('profileImage');
      setProfileImage(saved || null);
    };
    loadImage();

    // Listen for storage changes (e.g., after saving in Profile page)
    const handleStorage = (e) => {
      if (e.key === 'profileImage') {
        setProfileImage(e.newValue || null);
      }
    };
    window.addEventListener('storage', handleStorage);

    // Poll every second to catch same-tab updates
    const interval = setInterval(loadImage, 1000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

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

          {/* Profile Button with Avatar + Name */}
          <Link 
            to="/profile" 
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all group"
          >
            {/* Avatar circle */}
            <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-primary transition-colors flex-shrink-0 bg-gray-800">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={14} className="text-gray-400" />
                </div>
              )}
            </div>
            {/* Name */}
            <span className="text-xs font-semibold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors pr-1">
              Arun Kumar
            </span>
          </Link>
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
              {/* Mobile Profile Button */}
              <Link 
                onClick={() => setIsOpen(false)} 
                to="/profile" 
                className="flex items-center gap-3 text-gray-300 hover:text-white uppercase tracking-wider text-sm"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 bg-gray-800">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={14} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <span>Arun Kumar</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
