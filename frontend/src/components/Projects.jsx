import React, { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

const projectsData = [
  {
    title: "Task Tracker Application",
    description: "A secure multi-user task management system designed to help users organize tasks efficiently.",
    icon: "tasks",
    technologies: ["Java 17", "Spring Boot", "Spring Security", "REST APIs", "MongoDB", "Docker"],
    features: [
      "Secure authentication",
      "Role-based authorization",
      "Task creation and management",
      "Logging and exception handling",
      "Email notifications"
    ]
  },
  {
    title: "Cloud-Native Inventory Platform",
    description: "A distributed cloud-based inventory management system designed for scalability and reliability using microservices architecture.",
    icon: "cloud",
    technologies: ["Java", "Spring Boot", "Microservices", "MongoDB", "Kafka/RabbitMQ", "Google Cloud"],
    features: [
      "Service registry",
      "API gateway",
      "Config server",
      "Centralized logging",
      "Auto-scaling deployment",
      "Secure role-based authentication"
    ]
  },
  {
    title: "Digital Book Shelf",
    description: "A full-stack web application that allows users to search books, manage their collection, and store favorite books.",
    icon: "book",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    features: [
      "Book search functionality",
      "Favorite book management",
      "Responsive UI",
      "Fast data retrieval using MongoDB"
    ]
  },
  {
    title: "Urban Cart",
    description: "A modern e-commerce web application with product browsing and cart functionality.",
    icon: "shoppingCart",
    technologies: ["Next.js", "React.js", "MongoDB", "Tailwind CSS", "JavaScript"],
    features: [
      "Product catalog",
      "Shopping cart",
      "Server-side rendering",
      "Responsive design"
    ]
  },
  {
    title: "Clothify",
    description: "A fashion-based e-commerce website where users can browse clothing products and manage their cart.",
    icon: "tshirt",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JavaScript"],
    features: [
      "Product listing",
      "Cart functionality",
      "Responsive UI"
    ]
  },
  {
    title: "Admin Dashboard",
    description: "A responsive admin panel for managing system data and analytics.",
    icon: "chartBar",
    technologies: ["React.js", "Tailwind CSS", "Chart.js", "MongoDB"],
    features: [
      "Data visualization",
      "User management",
      "Dashboard analytics"
    ]
  }
];

const Projects = () => {
  const projectsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = projectsRef.current?.querySelectorAll('.project-card');
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <section id="projects" ref={projectsRef} className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
