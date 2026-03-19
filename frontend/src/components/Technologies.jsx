import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Technologies = () => {
  const techRef = useRef(null);

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

    const elements = techRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const technologies = [
    "Java", "C++", "JavaScript", "SQL",
    "React.js", "Next.js", "Spring Boot", "Spring Security",
    "Node.js", "Express.js", "MongoDB", "Tailwind CSS",
    "Git", "Docker", "Postman", "Kafka", "RabbitMQ", "Google Cloud"
  ];

  return (
    <section id="technologies" ref={techRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-on-scroll" style={{ opacity: 0 }}>
            <span className="text-glow" style={{ color: '#9333ea' }}>Technologies</span>
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="tech-icon animate-on-scroll px-6 py-3 min-w-[120px]"
              style={{ 
                opacity: 0, 
                animationDelay: `${index * 0.05}s`
              }}
            >
              <span className="text-white font-medium text-sm">{tech}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="animate-on-scroll" style={{ opacity: 0, animationDelay: '1s' }}>
            <p className="text-gray-300 text-lg">
              <FontAwesomeIcon icon={faCode} className="mr-2" />
              Proficient in modern web development technologies and tools
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
