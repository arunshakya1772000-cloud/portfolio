import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, CheckCircle, Image as ImageIcon, Film, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { compressImage } from '../utils/compression';

const categories = ['Advertisement', 'Real Estate', 'Luxury Interior', 'Reels', 'Promotions', 'Photo Editing'];

const UploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0],
    type: 'youtube', // or 'local'
    url: '', // for youtube
  });
  
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [mediaType, setMediaType] = useState('video'); // video | image
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);

      let response;

      if (mediaType === 'image') {
        if (thumbnailFile) {
          formDataToSend.append('image', thumbnailFile);
        }
        
        response = await fetch(`${API_URL}/api/projects`, {
          method: 'POST',
          body: formDataToSend,
        });
      } else {
        formDataToSend.append('type', formData.type);
        
        if (formData.type === 'local' && videoFile) {
          formDataToSend.append('video', videoFile);
        } else if (formData.type === 'youtube') {
          let finalUrl = formData.url;
          if (finalUrl.includes('watch?v=')) {
            const videoId = finalUrl.split('v=')[1]?.split('&')[0];
            if (videoId) finalUrl = `https://www.youtube.com/embed/${videoId}`;
          }
          formDataToSend.append('url', finalUrl);
        }

        if (thumbnailFile) {
          formDataToSend.append('thumbnail', thumbnailFile);
        }
        
        response = await fetch(`${API_URL}/api/videos`, {
          method: 'POST',
          body: formDataToSend,
        });
      }

      const responseData = await response.json();

      if (!response.ok) {
         throw new Error(responseData.error || 'Failed to upload');
      }

      setSuccessMsg('Portfolio item added successfully!');
      
      setTimeout(() => {
        navigate('/profile');
      }, 2000);

    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg(err.message || 'An error occurred during upload. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative z-20">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-8 border border-white/10 relative overflow-hidden"
        >
          {successMsg && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 bg-green-900/90 z-20 flex flex-col items-center justify-center backdrop-blur-md rounded-2xl"
            >
              <CheckCircle size={64} className="text-white mb-4" />
              <h3 className="text-2xl font-bold font-heading">{successMsg}</h3>
              <p className="text-gray-300 mt-2 text-center text-sm">Redirecting to portfolio...</p>
            </motion.div>
          )}

          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-900/40 border border-red-500/50 rounded-xl flex items-start gap-3"
            >
              <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <p className="text-red-200 text-sm">{errorMsg}</p>
            </motion.div>
          )}

          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-3xl font-heading font-extrabold uppercase tracking-widest text-white">Upload Media</h2>
              <p className="text-gray-400 text-sm tracking-wider mt-1">Admin Dashboard (Mockup)</p>
            </div>
            <button onClick={() => navigate('/')} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Media Type Switcher */}
            <div className="flex gap-4 p-1 bg-white/5 rounded-xl border border-white/10 mb-8">
              <button
                type="button"
                onClick={() => setMediaType('video')}
                className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${mediaType === 'video' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <Film size={14} className="inline mr-2" /> Video Project
              </button>
              <button
                type="button"
                onClick={() => setMediaType('image')}
                className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${mediaType === 'image' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <ImageIcon size={14} className="inline mr-2" /> Photo Project
              </button>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">{mediaType === 'video' ? 'Video' : 'Photo'} Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-light"
                placeholder="E.g., Cinematic Real Estate Tour"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none font-light"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-dark text-white">{cat}</option>
                ))}
              </select>
            </div>

            {mediaType === 'video' ? (
              <>
                {/* Video Source Type */}
                <div className="pt-4 border-t border-white/5">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-4">Video Source</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, type: 'youtube'})}
                      className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 border transition-all text-xs font-bold uppercase tracking-widest ${
                        formData.type === 'youtube' 
                          ? 'border-primary bg-primary/10 text-white' 
                          : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      <Film size={16} /> YouTube
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, type: 'local'})}
                      className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 border transition-all text-xs font-bold uppercase tracking-widest ${
                        formData.type === 'local' 
                          ? 'border-primary bg-primary/10 text-white' 
                          : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      <Upload size={16} /> MP4 File
                    </button>
                  </div>
                </div>

                {/* Video Source Input */}
                <motion.div layout>
                  {formData.type === 'youtube' ? (
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">YouTube URL</label>
                      <input 
                        type="url" 
                        required={formData.type === 'youtube' && mediaType === 'video'}
                        value={formData.url}
                        onChange={(e) => setFormData({...formData, url: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-light"
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Upload MP4</label>
                      <div className="relative border-2 border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group">
                        <input 
                          type="file" 
                          accept="video/mp4,video/webm"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleVideoChange}
                          required={formData.type === 'local' && mediaType === 'video' && !videoFile}
                        />
                        <Film className="w-10 h-10 text-gray-500 group-hover:text-primary transition-colors mb-2" />
                        {videoFile ? (
                          <span className="text-white text-sm font-medium">{videoFile.name}</span>
                        ) : (
                          <span className="text-gray-400 text-sm">Select MP4 Video</span>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Thumbnail Upload */}
                <div className="pt-4 border-t border-white/5">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Video Thumbnail</label>
                  <div className="flex items-center gap-6">
                    <div className="flex-1 relative border-2 border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleThumbnailChange}
                      />
                      <ImageIcon className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors mb-2" />
                      <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">Select Image</span>
                    </div>
                    {thumbnailPreview && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/20 shrink-0">
                        <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-white/5">
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Project Image</label>
                <div className="flex flex-col gap-4">
                  <div className="relative border-2 border-dashed border-white/20 rounded-lg p-12 flex flex-col items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleThumbnailChange}
                      required={mediaType === 'image' && !thumbnailPreview}
                    />
                    <ImageIcon className="w-16 h-16 text-gray-500 group-hover:text-primary transition-colors mb-4" />
                    <p className="text-white text-sm font-bold uppercase tracking-widest"> {thumbnailPreview ? 'Change Image' : 'Select Project Image'} </p>
                  </div>
                  {thumbnailPreview && (
                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/20">
                      <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 mt-8 rounded-lg font-heading tracking-widest font-bold uppercase transition-all bg-primary flex items-center justify-center gap-2 text-white hover:bg-red-700 hover:shadow-[0_0_20px_-5px_#dc2626] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Processing...
                </>
              ) : (
                'Upload Portfolio Item'
              )}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadForm;
