import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getMediaUrl } from '../utils/mediaUtils';

const VideoModal = ({ activeVideo, onClose }) => {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!activeVideo) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true"></div>
      
      <button 
        className="absolute top-6 right-6 text-white hover:text-primary transition-colors focus:outline-none z-10 p-2 bg-white/10 rounded-full backdrop-blur-md"
        onClick={onClose}
        aria-label="Close Modal"
      >
        <X size={32} />
      </button>

      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: -20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10 z-10"
      >
        {activeVideo.type === 'youtube' ? (
          <iframe 
            className="w-full h-full"
            src={`${activeVideo.url}?autoplay=1`} 
            title={activeVideo.title}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        ) : (
          <video 
            className="w-full h-full object-contain"
            src={getMediaUrl(activeVideo.url)}
            controls
            autoPlay
            aria-label={activeVideo.title}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default VideoModal;
