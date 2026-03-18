import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { getMediaUrl } from '../utils/mediaUtils';

const defaultVideos = [
  { id: 'v1', title: 'Epic Cinematic B-Roll Sequence', category: 'Promotions', thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80', url: 'https://www.youtube.com/embed/jfKfPfyJRdk', type: 'youtube' },
  { id: 'v2', title: 'Luxury Car Ad', category: 'Advertisement', thumbnail: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80', url: 'https://www.youtube.com/embed/MhN-m57a8jE', type: 'youtube' },
  { id: 'v3', title: 'Real Estate Drone Tour', category: 'Real Estate', thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', url: 'https://www.youtube.com/embed/5aC4j4y2m30', type: 'youtube' }
];

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allVideos, setAllVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  
  // States for UX
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling using CSS class for reliability
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
    
    // Logic to handle video data
    if (location.state?.video) {
      setVideo(location.state.video);
      setLoading(false);
    } else {
      const fetchVideoData = async () => {
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          const res = await fetch(`${API_URL}/api/videos`);
          let savedVideos = [];
          if (res.ok) savedVideos = await res.json();
          
          const deletedVidDefaults = JSON.parse(localStorage.getItem('deletedDefaultVideos') || '[]');
          const allData = [...savedVideos, ...defaultVideos.filter(v => !deletedVidDefaults.includes(v.id))];
          setAllVideos(allData);
          
          const foundIndex = allData.findIndex(v => String(v._id || v.id) === String(id));
          if (foundIndex !== -1) {
            setVideo(allData[foundIndex]);
            setCurrentIndex(foundIndex);
          } else {
            setVideo(null);
            setCurrentIndex(-1);
          }
        } catch (err) {
          console.error("Failed to load video details", err);
        } finally {
          setLoading(false);
        }
      };
      fetchVideoData();
    }

    // Cleanup ensures scrolling is restored when leaving the page
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
      const prevVideo = allVideos[currentIndex - 1];
      navigate(`/video/${prevVideo._id || prevVideo.id}`, { replace: true, state: { video: prevVideo } });
    }
  }, [currentIndex, allVideos, navigate]);

  const navigateNext = React.useCallback(() => {
    if (currentIndex !== -1 && currentIndex < allVideos.length - 1) {
      const nextVideo = allVideos[currentIndex + 1];
      navigate(`/video/${nextVideo._id || nextVideo.id}`, { replace: true, state: { video: nextVideo } });
    }
  }, [currentIndex, allVideos, navigate]);

  // Handle keyboard navigation
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

  if (!video) {
    return (
      <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-heading mb-4">Video Not Found</h1>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-2 bg-primary rounded-full hover:bg-red-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Format the video URL to autoplay
  let playUrl = video.url;
  if (playUrl.includes('youtube.com/embed/')) {
    playUrl = playUrl.includes('?') ? `${playUrl}&autoplay=1` : `${playUrl}?autoplay=1`;
  }

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center transition-cursor duration-300 ${!controlsVisible ? 'cursor-none' : ''}`}
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
    >
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
              className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/80 border border-white/10 hover:border-white/30 backdrop-blur-md rounded-full text-white transition-all transform hover:-translate-x-1"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="text-right">
              <h2 className="text-white text-lg font-heading font-medium tracking-wide drop-shadow-md">
                {video.title}
              </h2>
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
        {controlsVisible && currentIndex !== -1 && currentIndex < allVideos.length - 1 && (
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
        key={`vid-${video._id || video.id}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-full relative z-10 p-4 pb-20 md:p-12 pb-24 flex justify-center items-center"
      >
        {video.type === 'youtube' ? (
          <iframe
            src={playUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[80vh] border-none outline-none rounded-xl shadow-2xl"
          ></iframe>
        ) : (
          <video
            src={getMediaUrl(playUrl)}
            controls
            autoPlay
            className="w-full h-[80vh] object-contain rounded-xl shadow-2xl"
            aria-label={video.title}
          />
        )}
      </motion.div>
    </div>
  );
};

export default VideoPlayer;
