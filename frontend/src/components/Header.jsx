import React from 'react';

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="logo">
            Portfolio
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="nav-link text-lg font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('education')}
              className="nav-link text-lg font-medium"
            >
              Education
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="nav-link text-lg font-medium"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('technologies')}
              className="nav-link text-lg font-medium"
            >
              Technologies
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="nav-link text-lg font-medium"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="nav-link text-lg font-medium"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
