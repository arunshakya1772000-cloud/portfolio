export const getMediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) return path;
  const API_URL = import.meta.env.VITE_API_URL || '';
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

export const getVideoThumbnail = (video) => {
  if (video.thumbnail) return getMediaUrl(video.thumbnail);
  
  if (video.type === 'youtube' && video.url) {
    const embedMatch = video.url.match(/embed\/([^?&]+)/);
    if (embedMatch && embedMatch[1]) {
      return `https://img.youtube.com/vi/${embedMatch[1]}/hqdefault.jpg`;
    }
    const watchMatch = video.url.match(/watch\?v=([^?&]+)/);
    if (watchMatch && watchMatch[1]) {
      return `https://img.youtube.com/vi/${watchMatch[1]}/hqdefault.jpg`;
    }
    const shortMatch = video.url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch && shortMatch[1]) {
      return `https://img.youtube.com/vi/${shortMatch[1]}/hqdefault.jpg`;
    }
  }
  
  // Generic placeholder for videos without thumbnail
  return 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80';
};
