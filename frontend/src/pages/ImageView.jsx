import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { getMediaUrl } from '../utils/mediaUtils';

const defaultProjects = [
  { id: 1, title: 'Modern Villa Walkthrough', category: 'Real Estate', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Nike Air Max Promo', category: 'Advertisement', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Dark Moody Portrait Edit', category: 'Photo Editing', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'NYC Penthouse Tour', category: 'Luxury Interior', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Fitness Gym Hype Reel', category: 'Promotions', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Tech Gadget Launch', category: 'Promotions', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
];

const ImageView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // States for UX
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = React.useRef(null);

  useEffect(() => {
    // Prevent scrolling using CSS class for reliability
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');

    // Logic to handle project data
    if (location.state?.project) {
      setProject(location.state.project);
      setLoading(false);
    } else {
      // Fallback: try to find the project by ID from localStorage or default data
      const fetchProjectData = async () => {
        try {
          const API_URL = import.meta.env.VITE_API_URL || '';
          const res = await fetch(`${API_URL}/api/projects`);
          let savedProjects = [];
          if (res.ok) savedProjects = await res.json();
          
          const deletedProjDefaults = JSON.parse(localStorage.getItem('deletedDefaultProjects') || '[]');
          const allData = [...savedProjects, ...defaultProjects.filter(p => !deletedProjDefaults.includes(p.id))];
          setAllProjects(allData);
          
          const foundIndex = allData.findIndex(p => String(p._id || p.id) === String(id));
          if (foundIndex !== -1) {
            setProject(allData[foundIndex]);
            setCurrentIndex(foundIndex);
          } else {
            setProject(null);
            setCurrentIndex(-1);
          }
        } catch (err) {
          console.error("Failed to load project details", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProjectData();
    }

    // Cleanup always runs on unmount
    return () => {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [id, location]);

  // Handle auto-hiding controls when mouse stops moving
  const handleMouseMove = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    
    controlsTimeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 2500); // hide after 2.5 seconds of inactivity
  };

  // Handlers for Slider Navigation
  const navigatePrev = React.useCallback(() => {
    if (currentIndex > 0) {
      const prevProject = allProjects[currentIndex - 1];
      navigate(`/image/${prevProject._id || prevProject.id}`, { replace: true, state: { project: prevProject } });
    }
  }, [currentIndex, allProjects, navigate]);

  const navigateNext = React.useCallback(() => {
    if (currentIndex !== -1 && currentIndex < allProjects.length - 1) {
      const nextProject = allProjects[currentIndex + 1];
      navigate(`/image/${nextProject._id || nextProject.id}`, { replace: true, state: { project: nextProject } });
    }
  }, [currentIndex, allProjects, navigate]);

  // Handle keyboard navigation (ECS to go back, Arrows for slider)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate(-1);
      } else if (e.key === 'ArrowLeft') {
        navigatePrev();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, navigatePrev, navigateNext]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-heading mb-4">Image Not Found</h1>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-2 bg-primary rounded-full hover:bg-red-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden transition-cursor duration-300 ${!controlsVisible ? 'cursor-none' : ''}`}
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
    >
      {/* Background Gradient / Blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 pointer-events-none transition-all duration-700"
        style={{ backgroundImage: `url(${getMediaUrl(project.image)})` }}
      />
      
      {/* Dark tint over blurred background */}
      <div className="absolute inset-0 bg-black/60 z-0 mix-blend-multiply pointer-events-none" />

      {/* Header controls */}
      <AnimatePresence>
        {controlsVisible && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent"
          >
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all transform hover:-translate-x-1"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="text-right">
              <p className="text-primary text-xs uppercase tracking-widest font-bold">{project.category}</p>
              <h2 className="text-white text-xl font-heading font-medium">{project.title}</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slider Navigation Arrows */}
      <AnimatePresence>
        {controlsVisible && currentIndex > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={(e) => { e.stopPropagation(); navigatePrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-primary border border-white/10 hover:border-white/30 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110"
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {controlsVisible && currentIndex !== -1 && currentIndex < allProjects.length - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={(e) => { e.stopPropagation(); navigateNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-primary border border-white/10 hover:border-white/30 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110"
          >
            <ChevronRight size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div 
        key={`img-${project._id || project.id}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-6xl max-h-[85vh] p-4 flex justify-center items-center"
      >
        <img 
          src={getMediaUrl(project.image)} 
          alt={project.title} 
          className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
        />
      </motion.div>
    </div>
  );
};

export default ImageView;
