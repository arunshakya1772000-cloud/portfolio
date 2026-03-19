import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faReact, 
  faNodeJs, 
  faPython, 
  faDocker, 
  faAws, 
  faGitAlt
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCloud } from '@fortawesome/free-solid-svg-icons';

const CrossFunctional = () => {
  const crossRef = useRef(null);

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

    const elements = crossRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const techIcons = [
    { icon: faReact, name: 'React' },
    { icon: faNodeJs, name: 'Node.js' },
    { icon: faPython, name: 'Python' },
    { icon: faDocker, name: 'Docker' },
    { icon: faAws, name: 'AWS' },
    { icon: faGitAlt, name: 'Git' },
    { icon: faDatabase, name: 'Database' },
    { icon: faCloud, name: 'Cloud' }
  ];

  return (
    <section ref={crossRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-16">
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 animate-on-scroll" style={{ opacity: 0 }}>
            I'm currently looking to join a <span className="text-glow font-bold" style={{ color: '#9333ea' }}>cross-functional team</span>
          </p>
          
          {/* Tech Icons Row */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {techIcons.map((tech, index) => (
              <div 
                key={index}
                className="tech-icon animate-on-scroll"
                style={{ 
                  opacity: 0, 
                  animationDelay: `${index * 0.1}s`
                }}
                title={tech.name}
              >
                <FontAwesomeIcon icon={tech.icon} className="text-white text-xl" />
              </div>
            ))}
          </div>
          
          {/* Central Logo with Glow */}
          <div className="flex justify-center animate-on-scroll" style={{ opacity: 0, animationDelay: '0.8s' }}>
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 logo pulse-glow flex items-center justify-center text-4xl md:text-5xl">
                K
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-500 opacity-30 pulse-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrossFunctional;
