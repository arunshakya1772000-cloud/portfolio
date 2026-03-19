import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faCloud, faBook, faShoppingCart, faTshirt, faChartBar } from '@fortawesome/free-solid-svg-icons';

const ProjectsSection = () => {
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
      title: "Task Tracker Application",
      description: "Built a task management system using Java, Spring Boot, Spring Security, REST APIs, and MongoDB with authentication and role-based access.",
      icon: faTasks,
      tech: ["Java", "Spring Boot", "Spring Security", "REST APIs", "MongoDB"],
      delay: "0.1s"
    },
    {
      title: "Cloud-Native Inventory Management Platform",
      description: "Developed a cloud-based inventory system using Spring Boot, Microservices, MongoDB, Kafka/RabbitMQ, and Google Cloud for scalable architecture.",
      icon: faCloud,
      tech: ["Spring Boot", "Microservices", "MongoDB", "Kafka/RabbitMQ", "Google Cloud"],
      delay: "0.2s"
    },
    {
      title: "Digital Book Shelf",
      description: "Created a full-stack web application using React, Node.js, Express.js, MongoDB, and Tailwind CSS for managing digital books.",
      icon: faBook,
      tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      link: "https://digitalbook-shelf.vercel.app",
      delay: "0.3s"
    },
    {
      title: "Urban Cart",
      description: "Developed an e-commerce platform using Next.js, React.js, MongoDB, and Tailwind CSS with product catalog and cart functionality.",
      icon: faShoppingCart,
      tech: ["Next.js", "React.js", "MongoDB", "Tailwind CSS"],
      delay: "0.4s"
    },
    {
      title: "Clothify",
      description: "Built a fashion e-commerce website using React.js, Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript.",
      icon: faTshirt,
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "HTML/CSS"],
      delay: "0.5s"
    },
    {
      title: "Admin Dashboard",
      description: "Developed a responsive dashboard interface using React.js, Tailwind CSS, Chart.js, and MongoDB for analytics and management.",
      icon: faChartBar,
      tech: ["React.js", "Tailwind CSS", "Chart.js", "MongoDB"],
      delay: "0.6s"
    }
  ];

  return (
    <section id="projects" ref={projectsRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-on-scroll" style={{ opacity: 0 }}>
            <span className="text-glow" style={{ color: '#9333ea' }}>Projects</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card-new animate-on-scroll"
              style={{ 
                opacity: 0, 
                animationDelay: project.delay
              }}
            >
              <div className="flex items-center mb-4">
                <div className="tech-icon mr-3">
                  <FontAwesomeIcon icon={project.icon} className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-300 hover:text-purple-400 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  View Live Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
