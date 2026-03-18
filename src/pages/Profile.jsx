import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Video, Image, ArrowLeft, ExternalLink, Settings, Camera, Check, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileImage from '../components/ProfileImage';
import { getMediaUrl, getVideoThumbnail } from '../utils/mediaUtils';

// Import defaults (replicated here or ideally shared in a separate data/constants.js in real app)
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

const defaultProjects = [
  { id: 1, title: 'Modern Villa Walkthrough', category: 'Real Estate', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Nike Air Max Promo', category: 'Advertisement', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Dark Moody Portrait Edit', category: 'Photo Editing', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'NYC Penthouse Tour', category: 'Luxury Interior', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Fitness Gym Hype Reel', category: 'Promotions', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Tech Gadget Launch', category: 'Promotions', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
];

const Profile = () => {
  const [tab, setTab] = useState('videos'); // videos | photos

  // Media loading logic matches home components
  const [videos, setVideos] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        // Fetch videos
        const vidRes = await fetch(`${API_URL}/api/videos`);
        let vids = [];
        if (vidRes.ok) vids = await vidRes.json();
        
        const deletedVidDefaults = JSON.parse(localStorage.getItem('deletedDefaultVideos') || '[]');
        setVideos([...vids, ...defaultVideos.filter(v => !deletedVidDefaults.includes(v.id))]);
        
        // Fetch projects
        const projRes = await fetch(`${API_URL}/api/projects`);
        let projs = [];
        if (projRes.ok) projs = await projRes.json();
        
        const deletedProjDefaults = JSON.parse(localStorage.getItem('deletedDefaultProjects') || '[]');
        setProjects([...projs, ...defaultProjects.filter(p => !deletedProjDefaults.includes(p.id))]);
        
      } catch (err) {
        console.error("Failed to fetch media", err);
        setVideos(defaultVideos);
        setProjects(defaultProjects);
      }
    };
    fetchMedia();
  }, []);

  const handleDeleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    
    if (defaultVideos.find(v => v.id === id)) {
      const deletedDefaults = JSON.parse(localStorage.getItem('deletedDefaultVideos') || '[]');
      if (!deletedDefaults.includes(id)) {
        localStorage.setItem('deletedDefaultVideos', JSON.stringify([...deletedDefaults, id]));
      }
      setVideos(prev => prev.filter(v => v.id !== id && v._id !== id));
    } else {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/videos/${id}`, { method: 'DELETE' });
        if (res.ok) setVideos(prev => prev.filter(v => v._id !== id && v.id !== id));
      } catch (err) {
        console.error("Failed to delete video", err);
      }
    }
  };

  const handleDeletePhoto = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    if (defaultProjects.find(p => p.id === id)) {
      const deletedDefaults = JSON.parse(localStorage.getItem('deletedDefaultProjects') || '[]');
      if (!deletedDefaults.includes(id)) {
        localStorage.setItem('deletedDefaultProjects', JSON.stringify([...deletedDefaults, id]));
      }
      setProjects(prev => prev.filter(p => p.id !== id && p._id !== id));
    } else {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE' });
        if (res.ok) setProjects(prev => prev.filter(p => p._id !== id && p.id !== id));
      } catch (err) {
        console.error("Failed to delete project", err);
      }
    }
  };

  const [profileImgInPage, setProfileImgInPage] = useState(
    localStorage.getItem('profileImage') || 
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
  );

  // Sync profile image if it changes elsewhere
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'profileImage') {
        setProfileImgInPage(e.newValue || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80");
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative z-20">
      <div className="container mx-auto max-w-6xl">
        
        <div className="glass-effect rounded-2xl p-6 md:p-10 mb-12 flex flex-col md:flex-row items-center gap-10 border border-white/10 relative">
          <ProfileImage 
            defaultImage="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
            size="w-40 h-40 md:w-52 md:h-52"
            showControls={true}
            className="flex-shrink-0"
          />

          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">
               Video Editor and Photo Editor
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-tight text-white mb-2">My Profile</h1>
            <p className="text-gray-400 font-sans tracking-[0.2em] text-sm uppercase mb-8">Professional Portfolio</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 items-center">
              <Link to="/upload" className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                Manage Media
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-6 mb-12 border-b border-white/10 overflow-x-auto">
          <button 
            onClick={() => setTab('videos')}
            className={`flex items-center gap-2 pb-4 px-2 uppercase tracking-widest text-sm font-bold transition-all relative ${tab === 'videos' ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
          >
            <Video size={18} /> Videos ({videos.length})
            {tab === 'videos' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
          </button>
          <button 
            onClick={() => setTab('photos')}
            className={`flex items-center gap-2 pb-4 px-2 uppercase tracking-widest text-sm font-bold transition-all relative ${tab === 'photos' ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
          >
            <Image size={18} /> Photos ({projects.length})
            {tab === 'photos' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
          </button>
        </div>

        {/* Content Section */}
        <div className="glass-effect rounded-2xl p-6 md:p-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {tab === 'videos' ? (
              <motion.div 
                key="v-grid"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {videos.map((vid) => (
                  <div key={vid._id || vid.id} className="bg-black/40 border border-white/5 rounded-xl overflow-hidden group hover:border-white/20 transition-all">
                    <div className="aspect-video relative rounded-t-xl overflow-hidden">
                      <img src={getVideoThumbnail(vid)} alt={vid.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-primary">{vid.category}</span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                      <h3 className="text-white font-medium text-xs md:text-sm truncate mb-4">{vid.title}</h3>
                      <div className="flex justify-center">
                        <button 
                          onClick={() => handleDeleteVideo(vid._id || vid.id)}
                          className="px-4 py-2 bg-red-600/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-600 hover:text-white transition-all text-[10px] uppercase font-bold flex items-center justify-center gap-1"
                        >
                          <Trash2 size={12} /> Delete Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="p-grid"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects.map((proj) => (
                  <div key={proj._id || proj.id} className="bg-black/40 border border-white/5 rounded-xl overflow-hidden group hover:border-white/20 transition-all">
                    <div className="aspect-square relative rounded-t-xl overflow-hidden">
                      <img src={getMediaUrl(proj.image)} alt={proj.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-primary">{proj.category}</span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                      <h3 className="text-white font-medium text-xs md:text-sm truncate mb-4">{proj.title}</h3>
                      <div className="flex justify-center">
                        <button 
                          onClick={() => handleDeletePhoto(proj._id || proj.id)}
                          className="px-4 py-2 bg-red-600/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-600 hover:text-white transition-all text-[10px] uppercase font-bold flex items-center justify-center gap-1"
                        >
                          <Trash2 size={12} /> Delete Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {(tab === 'videos' ? videos.length : projects.length) === 0 && (
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
              <Settings size={48} className="mb-4 opacity-20 animate-spin-slow" />
              <p className="uppercase tracking-widest text-xs">No media items found in this category.</p>
              <Link to="/upload" className="text-primary text-xs uppercase mt-4 underline">Upload something now</Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
