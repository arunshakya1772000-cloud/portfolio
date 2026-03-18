import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile, faGlobe, faCode, faPalette } from '@fortawesome/free-solid-svg-icons';

const WorkExperience = () => {
  const workRef = useRef(null);

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

    const elements = workRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const experiences = [
    {
      icon: faMobile,
      title: "CIB on the Mobile",
      description: "Mobile banking application with secure transactions and intuitive user interface design.",
      delay: "0.1s"
    },
    {
      icon: faGlobe,
      title: "Global Trading Platform",
      description: "Real-time trading platform with advanced charting and portfolio management features.",
      delay: "0.2s"
    },
    {
      icon: faCode,
      title: "Developer Tools Suite",
      description: "Comprehensive development tools for modern software engineering workflows.",
      delay: "0.3s"
    },
    {
      icon: faPalette,
      title: "Design System",
      description: "Component library and design system for consistent user experiences across products.",
      delay: "0.4s"
    }
  ];

  return (
    <section id="about" ref={workRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-on-scroll" style={{ opacity: 0 }}>
            Work <span className="text-glow" style={{ color: '#9333ea' }}>Experience</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="card-hover glow-border rounded-xl p-8 animate-on-scroll"
              style={{ 
                opacity: 0, 
                animationDelay: exp.delay,
                border: '1px solid rgba(147, 51, 234, 0.3)'
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="tech-icon flex-shrink-0">
                  <FontAwesomeIcon icon={exp.icon} className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">{exp.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">{exp.description}</p>
                  <button className="btn-glow">
                    View Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
