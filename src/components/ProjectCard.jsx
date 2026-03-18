import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTasks, 
  faCloud, 
  faBook, 
  faShoppingCart, 
  faTshirt, 
  faChartBar,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({ project, index }) => {
  const getIcon = (iconName) => {
    const icons = {
      tasks: faTasks,
      cloud: faCloud,
      book: faBook,
      shoppingCart: faShoppingCart,
      tshirt: faTshirt,
      chartBar: faChartBar
    };
    return icons[iconName] || faCode;
  };

  return (
    <div 
      className={`project-card bg-white rounded-xl p-6 shadow-lg animate-fade-in-up animate-delay-${index * 100}`}
      style={{ opacity: 0 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mr-4">
          <FontAwesomeIcon icon={getIcon(project.icon)} className="text-white text-xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">
        {project.description}
      </p>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Technologies:</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="tech-badge px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm cursor-pointer"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Features:</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          {project.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="feature-item flex items-center cursor-pointer">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;
