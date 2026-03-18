import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const Education = () => {
  const educationRef = useRef(null);

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

    const elements = educationRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="education" ref={educationRef} className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-on-scroll" style={{ opacity: 0 }}>
            <span className="text-glow" style={{ color: '#9333ea' }}>Education</span>
          </h2>
        </div>
        
        <div className="card-hover glow-border rounded-xl p-8 animate-on-scroll" style={{ opacity: 0 }}>
          <div className="flex items-start space-x-6">
            <div className="tech-icon flex-shrink-0">
              <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                B.Tech in Computer Science (AI Specialization)
              </h3>
              <p className="text-xl text-purple-300 mb-4">
                ABES Institute of Technology, Ghaziabad
              </p>
              <p className="text-lg text-gray-300 mb-4">
                2022 – 2025
              </p>
              <p className="text-gray-300 leading-relaxed">
                Specializing in Artificial Intelligence with a strong foundation in computer science fundamentals, 
                algorithms, data structures, and modern software development practices. 
                Focused on building intelligent systems and scalable applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
