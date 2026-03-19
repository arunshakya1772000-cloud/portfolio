import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoCard from './VideoCard';
import FilterButtons from './FilterButtons';

const defaultVideos = [
  {
    id: 'v1',
    title: 'Epic Cinematic B-Roll Sequence',
    category: 'Promotions',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.youtube.com/embed/jfKfPfyJRdk',
    type: 'youtube'
  },
  {
    id: 'v2',
    title: 'Luxury Car Ad',
    category: 'Advertisement',
    thumbnail: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.youtube.com/embed/MhN-m57a8jE',
    type: 'youtube'
  },
  {
    id: 'v3',
    title: 'Real Estate Drone Tour',
    category: 'Real Estate',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.youtube.com/embed/5aC4j4y2m30',
    type: 'youtube'
  }
];

const categories = ['All', 'Advertisement', 'Real Estate', 'Luxury Interior', 'Reels', 'Promotions', 'Photo Editing'];

const VideoSection = () => {
  const [videos, setVideos] = useState(defaultVideos);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredVideos = videos.filter((vid) => {
    const matchCategory = activeCategory === 'All' || vid.category === activeCategory;
    const matchSearch = vid.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section id="videos" className="py-24 bg-dark-secondary relative z-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-sm text-primary uppercase tracking-[0.3em] font-semibold mb-2">PORTFOLIO</div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold uppercase tracking-tighter">
            Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Showcase</span>
          </h2>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col items-center mb-12 space-y-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search videos by title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors focus:bg-black/50"
            />
          </div>
          <FilterButtons 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </div>

        {/* Grid Display */}
        {filteredVideos.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No videos found.</div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            <AnimatePresence>
              {filteredVideos.map((vid, index) => (
                <VideoCard 
                  key={vid._id || vid.id || index} 
                  video={vid} 
                  index={index} 
                  onClick={() => navigate(`/video/${vid._id || vid.id}`, { state: { video: vid } })} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      
    </section>
  );
};

export default VideoSection;
