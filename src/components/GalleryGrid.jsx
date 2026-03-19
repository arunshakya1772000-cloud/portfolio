import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FilterButtons from './FilterButtons';
import { getMediaUrl } from '../utils/mediaUtils';

const categories = ['All', 'Advertisement', 'Real Estate', 'Luxury Interior', 'Promotions', 'Photo Editing'];

const defaultProjects = [
  {
    id: 1,
    title: 'Modern Villa Walkthrough',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Nike Air Max Promo',
    category: 'Advertisement',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Dark Moody Portrait Edit',
    category: 'Photo Editing',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'NYC Penthouse Tour',
    category: 'Luxury Interior',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Fitness Gym Hype Reel',
    category: 'Promotions',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Tech Gadget Launch',
    category: 'Promotions',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
];

const GalleryGrid = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${API_URL}/api/projects`);
        let projs = [];
        if (res.ok) projs = await res.json();
        
        const deletedProjDefaults = JSON.parse(localStorage.getItem('deletedDefaultProjects') || '[]');
        setProjects([...projs, ...defaultProjects.filter(p => !deletedProjDefaults.includes(p.id))]);
      } catch (err) {
        console.error("Failed to fetch projects", err);
        setProjects(defaultProjects);
      }
    };
    fetchProjects();
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-dark relative z-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-sm text-primary uppercase tracking-[0.3em] font-semibold mb-2">RECAP PROJECT</div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold uppercase tracking-tighter">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Gallery</span>
          </h2>
        </motion.div>

        {/* Filter Buttons Component */}
        <FilterButtons categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Image Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project._id || project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-black/50 aspect-square cursor-pointer"
                tabIndex={0}
                aria-label={`View ${project.title}`}
                onClick={() => navigate(`/image/${project._id || project.id}`, { state: { project } })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/image/${project._id || project.id}`, { state: { project } });
                  }
                }}
              >
                <img 
                  src={getMediaUrl(project.image)} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-50"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 pointer-events-none">
                  <span className="text-primary font-semibold tracking-wider uppercase text-xs mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-white text-lg md:text-xl font-heading font-bold">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default GalleryGrid;
