import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const Experience = () => {
  const experienceRef = useRef(null);

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

    const elements = experienceRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="experience" ref={experienceRef} className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-on-scroll" style={{ opacity: 0 }}>
            Work <span className="text-glow" style={{ color: '#9333ea' }}>Experience</span>
          </h2>
        </div>
        
        <div className="space-y-8">
          {/* Java Intern Experience */}
          <div className="card-hover glow-border rounded-xl p-8 animate-on-scroll" style={{ opacity: 0 }}>
            <div className="flex items-start space-x-6">
              <div className="tech-icon flex-shrink-0">
                <FontAwesomeIcon icon={faBriefcase} className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Java Intern
                </h3>
                <p className="text-xl text-purple-300 mb-4">
                  AppSquadz Software Pvt. Ltd.
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  Jun 2024 – Aug 2024
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">
                      Gained hands-on experience with <span className="text-purple-300 font-semibold">Java basics, OOP concepts, and debugging</span>
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">
                      Worked on small Java modules and practiced <span className="text-purple-300 font-semibold">logical problem-solving</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trainee Experience */}
          <div className="card-hover glow-border rounded-xl p-8 animate-on-scroll" style={{ opacity: 0, animationDelay: '0.2s' }}>
            <div className="flex items-start space-x-6">
              <div className="tech-icon flex-shrink-0">
                <FontAwesomeIcon icon={faBriefcase} className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Trainee
                </h3>
                <p className="text-xl text-purple-300 mb-4">
                  TradesFolks Pvt. Ltd., Noida
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  Jan 2025 – Apr 2025
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">
                      Worked on frontend development using <span className="text-purple-300 font-semibold">HTML, CSS, JavaScript, and React.js</span>
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">
                      Collaborated with backend developers to integrate <span className="text-purple-300 font-semibold">REST APIs</span> and improve UI performance
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">
                      Followed <span className="text-purple-300 font-semibold">Agile development practices</span> and helped debug frontend issues
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
