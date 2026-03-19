import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faRocket } from '@fortawesome/free-solid-svg-icons';

const ExampleProjects = () => {
  const projectsRef = useRef(null);

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

    const elements = projectsRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with real-time inventory management, secure payment processing, and responsive design. Built with React and Node.js.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      icon: faPaw,
      delay: "0.1s"
    },
    {
      title: "Task Management System",
      description: "Collaborative task management platform with real-time updates, team collaboration features, and advanced analytics dashboard.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      icon: faRocket,
      delay: "0.2s"
    }
  ];

  return (
    <section id="lab" ref={projectsRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-on-scroll" style={{ opacity: 0 }}>
            Example <span className="text-glow" style={{ color: '#9333ea' }}>Project</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card-new animate-on-scroll"
              style={{ 
                opacity: 0, 
                animationDelay: project.delay
              }}
            >
              {/* Project Image */}
              <div className="mb-6 rounded-lg overflow-hidden glow-purple">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
                
                {/* Project Icons */}
                <div className="flex items-center space-x-4 pt-4">
                  <div className="tech-icon">
                    <FontAwesomeIcon icon={project.icon} className="text-white" />
                  </div>
                  <div className="tech-icon">
                    <FontAwesomeIcon icon={faRocket} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExampleProjects;
