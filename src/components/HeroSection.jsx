import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const heroRef = useRef(null);

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
                Vishal Ratan Shakya
              </h1>
              <p className="text-2xl text-purple-300 mb-6">
                Full Stack Developer
              </p>
            </div>
            
            <div className="animate-on-scroll" style={{ opacity: 0, animationDelay: '0.2s' }}>
              <p className="text-xl text-white mb-4">
                Passionate about building scalable web applications and creating exceptional user experiences.
              </p>
            </div>
            
            <div className="animate-on-scroll" style={{ opacity: 0, animationDelay: '0.4s' }}>
              <p className="text-gray-300 leading-relaxed">
                B.Tech in Computer Science with AI Specialization | 
                Experienced in Java, React.js, Spring Boot, and modern web technologies. 
                Focused on developing robust full-stack solutions with clean code and best practices.
              </p>
            </div>
          </div>
          
          {/* Right Content - Avatar */}
          <div className="flex justify-center animate-on-scroll" style={{ opacity: 0, animationDelay: '0.6s' }}>
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glow-purple">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=vishal&backgroundColor=b6e3f4,c0aede,d1d4f9&top=shortHair&hairColor=black&facialHair=beardMedium&facialHairColor=brown&clothing=blazer&clothingColor=black&eyes=happy&mouth=smile" 
                  alt="Vishal Ratan Shakya" 
                  className="w-full h-full object-cover"
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
