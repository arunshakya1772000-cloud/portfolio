import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { getMediaUrl, getVideoThumbnail } from '../utils/mediaUtils';

const VideoCard = ({ video, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-black/40 border border-white/5 hover:border-white/20 transition-all hover:cinematic-shadow relative"
      onClick={() => onClick(video)}
      role="button"
      tabIndex={0}
      aria-label={`Play ${video.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(video);
        }
      }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={getVideoThumbnail(video)} 
          alt={video.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:bg-black/20 transition-all">
          <div className="w-16 h-16 bg-primary/90 text-white rounded-full flex items-center justify-center transform group-hover:scale-110 shadow-lg transition-transform duration-300">
            <Play className="ml-1 w-8 h-8" fill="currentColor" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <span className="text-primary font-semibold tracking-wider uppercase text-[10px] md:text-xs">
          {video.category}
        </span>
        <h3 className="text-white text-base md:text-lg font-heading font-bold mt-2 truncate">{video.title}</h3>
      </div>
    </motion.div>
  );
};

export default VideoCard;
