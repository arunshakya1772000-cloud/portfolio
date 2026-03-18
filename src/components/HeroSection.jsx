import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const heroRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem('profileImage') || 
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
  );

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'profileImage') {
        setProfileImage(e.newValue || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80");
      }
    };

    window.addEventListener('storage', handleStorage);
    // Poll to keep in sync in same tab if needed
    const interval = setInterval(() => {
      const current = localStorage.getItem('profileImage');
      if (current !== profileImage && !(current === null && profileImage.startsWith('https://images.unsplash.com'))) {
        setProfileImage(current || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80");
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [profileImage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left space-y-6">
            <div className="animate-on-scroll" style={{ opacity: 0 }}>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Arun Kumar
              </h1>
              <p className="text-2xl text-purple-300 mb-6">
                Video & Photo Editor
              </p>
            </div>
            
            <div className="animate-on-scroll" style={{ opacity: 0, animationDelay: '0.2s' }}>
              <p className="text-xl text-white mb-4">
                Passionate about building scalable web applications and creating exceptional user experiences.
              </p>
            </div>
            
            <div className="animate-on-scroll" style={{ opacity: 0, animationDelay: '0.4s' }}>
              <p className="text-gray-300 leading-relaxed">
                Professional Video Editor and Photo Editor with over 5 years of experience. 
                Specializing in Advertisements, Real Estate, Luxury Interior, and Social Media Reels.
                Focused on delivering cinematic results that capture and hold attention.
              </p>
            </div>
          </div>
          
          {/* Right Content - Avatar */}
          <div className="flex justify-center animate-on-scroll" style={{ opacity: 0, animationDelay: '0.6s' }}>
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glow-purple">
                <img 
                  src={profileImage} 
                  alt="Arun Kumar" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              {/* Glowing ring effect */}
              <div className="absolute inset-0 rounded-full pulse-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
