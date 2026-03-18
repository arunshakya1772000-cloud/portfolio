import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ZoomIn, ZoomOut, Check, Move } from 'lucide-react';

/* ─── Constants ───────────────────────────────────────────────── */
const CROP_SIZE   = 280;   // visible crop circle diameter (px)
const OUTPUT_SIZE = 420;   // final saved image size (px)

/* ═══════════════════════════════════════════════════════════════ */
const ProfileImage = ({
  defaultImage = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  size         = 'w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96',
  showControls = true,
  className    = '',
}) => {
  /* ── persistent state ── */
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [showSuccess,  setShowSuccess]  = useState(false);
  const [isHovered,    setIsHovered]    = useState(false);

  /* ── crop-modal state ── */
  const [cropOpen,    setCropOpen]    = useState(false);
  const [objUrl,      setObjUrl]      = useState(null);
  const [imgSize,     setImgSize]     = useState({ w: 0, h: 0 });
  const [zoom,        setZoom]        = useState(1);
  const [offset,      setOffset]      = useState({ x: 0, y: 0 });
  const [isDragging,  setIsDragging]  = useState(false);
  const [dragOrigin,  setDragOrigin]  = useState({ x: 0, y: 0 });
  const [error,       setError]       = useState('');

  const fileInputRef = useRef(null);
  const cropImgRef   = useRef(null);

  /* ── load saved profile on mount ── */
  useEffect(() => {
    const saved = localStorage.getItem('profileImage');
    if (saved) setProfileImage(saved);
  }, []);

  /* ── cleanup object URLs ── */
  useEffect(() => {
    return () => { if (objUrl) URL.revokeObjectURL(objUrl); };
  }, [objUrl]);

  /* ── math helpers ── */
  const baseScale = useCallback(() => {
    if (!imgSize.w || !imgSize.h) return 1;
    return Math.max(CROP_SIZE / imgSize.w, CROP_SIZE / imgSize.h);
  }, [imgSize]);

  const clampOffset = useCallback((ox, oy, z) => {
    const bs  = baseScale();
    const ts  = bs * z;
    const dw  = imgSize.w * ts;
    const dh  = imgSize.h * ts;
    const mx  = Math.max(0, (dw - CROP_SIZE) / 2);
    const my  = Math.max(0, (dh - CROP_SIZE) / 2);
    return {
      x: Math.max(-mx, Math.min(mx, ox)),
      y: Math.max(-my, Math.min(my, oy)),
    };
  }, [baseScale, imgSize]);

  /* ── file selected → open crop modal ── */
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WEBP)');
      setTimeout(() => setError(''), 3500);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10 MB');
      setTimeout(() => setError(''), 3500);
      return;
    }
    setError('');

    const url = URL.createObjectURL(file);
    setObjUrl(url);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setCropOpen(true);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ── image natural size known ── */
  const handleImgLoad = () => {
    const img = cropImgRef.current;
    if (img) setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
  };

  /* ── zoom slider ── */
  const handleZoomSlider = (v) => {
    const clamped = clampOffset(offset.x, offset.y, v);
    setZoom(v);
    setOffset(clamped);
  };

  /* ── drag (mouse) ── */
  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragOrigin({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };
  const onMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const nx = e.clientX - dragOrigin.x;
    const ny = e.clientY - dragOrigin.y;
    setOffset(clampOffset(nx, ny, zoom));
  }, [isDragging, dragOrigin, zoom, clampOffset]);
  const stopDrag = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup',   stopDrag);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   stopDrag);
    };
  }, [isDragging, onMouseMove, stopDrag]);

  /* ── drag (touch) ── */
  const startTouch = (e) => {
    const t = e.touches[0];
    setIsDragging(true);
    setDragOrigin({ x: t.clientX - offset.x, y: t.clientY - offset.y });
  };
  const onTouchMove = (e) => {
    if (!isDragging) return;
    const t = e.touches[0];
    setOffset(clampOffset(t.clientX - dragOrigin.x, t.clientY - dragOrigin.y, zoom));
  };

  /* ── save crop ── */
  const handleSave = () => {
    const img = cropImgRef.current;
    if (!img || !imgSize.w) return;

    const bs    = baseScale();
    const ts    = bs * zoom;
    const half  = CROP_SIZE / 2;

    /* source rectangle in natural-image coordinates */
    const sx    = imgSize.w / 2 - (half + offset.x) / ts;
    const sy    = imgSize.h / 2 - (half + offset.y) / ts;
    const sSize = CROP_SIZE / ts;

    const canvas = document.createElement('canvas');
    canvas.width  = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext('2d');

    /* circular clip */
    ctx.beginPath();
    ctx.arc(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(img, sx, sy, sSize, sSize, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);

    try {
      localStorage.setItem('profileImage', dataUrl);
    } catch (_) {
      /* quota exceeded — still update UI */
    }

    setProfileImage(dataUrl);

    /* notify Navbar (same-tab) */
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'profileImage', newValue: dataUrl })
    );

    setCropOpen(false);
    URL.revokeObjectURL(objUrl);
    setObjUrl(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  /* ── cancel crop ── */
  const handleCancel = () => {
    setCropOpen(false);
    if (objUrl) { URL.revokeObjectURL(objUrl); setObjUrl(null); }
  };

  /* ── remove custom image ── */
  const handleRemove = (e) => {
    e.stopPropagation();
    localStorage.removeItem('profileImage');
    setProfileImage(defaultImage);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'profileImage', newValue: null })
    );
  };

  const hasCustom = profileImage !== defaultImage;
  const ts = (baseScale() * zoom).toFixed(4);

  /* ════════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── Profile Circle ── */}
      <div className={`relative inline-block ${className}`}>

        {/* Success toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0,   scale: 1   }}
              exit   ={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 bg-green-500 text-white px-5 py-2 rounded-full shadow-lg z-50 whitespace-nowrap text-xs font-semibold tracking-wide"
            >
              ✓ Profile photo updated
            </motion.div>
          )}
          {error && (
            <motion.div
              key="err"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0   }}
              exit   ={{ opacity: 0         }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 bg-red-600 text-white px-5 py-2 rounded-full shadow-lg z-50 whitespace-nowrap text-xs font-semibold tracking-wide"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image circle */}
        <div
          className={`relative ${size} rounded-full border-4 border-white/10 overflow-hidden cinematic-shadow cursor-pointer`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => showControls && fileInputRef.current?.click()}
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-500"
            style={{ filter: isHovered && showControls ? 'brightness(0.5) contrast(1.1) saturate(0.4)' : 'contrast(1.25) saturate(0.5)' }}
          />
          {showControls && (
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <Camera size={30} className="text-white mb-1 drop-shadow-lg" />
              <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-lg">
                Change Photo
              </span>
            </motion.div>
          )}
        </div>

        {/* Glow */}
        <div className="absolute w-full h-full bg-gradient-to-r from-red-600 to-transparent opacity-20 rounded-full blur-2xl top-0 left-0 -z-10 scale-110 pointer-events-none" />

        {/* Camera button (bottom-right) */}
        {showControls && (
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => fileInputRef.current?.click()}
            title="Change profile photo"
            className="absolute bottom-1 right-1 w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center shadow-xl border-2 border-black/60 z-30 transition-colors duration-200"
          >
            <Camera size={17} className="text-white" />
          </motion.button>
        )}

        {/* Remove button (top-right, only when custom) */}
        <AnimatePresence>
          {showControls && hasCustom && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1   }}
              exit   ={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              title="Remove custom photo"
              className="absolute top-1 right-1 w-7 h-7 bg-black/70 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg border border-white/20 z-30 transition-colors duration-200"
            >
              <X size={13} className="text-white" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── Crop / Zoom Modal ── */}
      <AnimatePresence>
        {cropOpen && objUrl && (
          <motion.div
            key="crop-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit   ={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            style={{ backdropFilter: 'blur(18px)', background: 'rgba(0,0,0,0.82)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit   ={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative w-full max-w-sm rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div>
                  <h2 className="text-white font-bold text-base uppercase tracking-widest">Adjust Photo</h2>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-0.5 flex items-center gap-1">
                    <Move size={10} /> Drag · Zoom with slider
                  </p>
                </div>
                <button
                  onClick={handleCancel}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                >
                  <X size={15} className="text-white" />
                </button>
              </div>

              {/* ── Crop Preview Area ── */}
              <div className="flex flex-col items-center px-6 pb-4">
                {/* Circular clip container */}
                <div
                  className="relative select-none"
                  style={{
                    width:        CROP_SIZE,
                    height:       CROP_SIZE,
                    borderRadius: '50%',
                    overflow:     'hidden',
                    border:       '3px solid rgba(220,38,38,0.7)',
                    boxShadow:    '0 0 0 4px rgba(220,38,38,0.15), 0 0 40px rgba(220,38,38,0.2)',
                    cursor:       isDragging ? 'grabbing' : 'grab',
                    background:   '#111',
                  }}
                  onMouseDown={startDrag}
                  onTouchStart={startTouch}
                  onTouchMove={onTouchMove}
                  onTouchEnd={stopDrag}
                >
                  <img
                    ref={cropImgRef}
                    src={objUrl}
                    alt="Crop preview"
                    onLoad={handleImgLoad}
                    draggable={false}
                    style={{
                      position:        'absolute',
                      left:            '50%',
                      top:             '50%',
                      transform:       `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${ts})`,
                      transformOrigin: 'center center',
                      maxWidth:        'none',
                      userSelect:      'none',
                      pointerEvents:   'none',
                      transition:      isDragging ? 'none' : 'transform 0.05s',
                    }}
                  />

                  {/* Grid crosshair overlay */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: `
                      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: `${CROP_SIZE/3}px ${CROP_SIZE/3}px`,
                  }} />
                </div>

                {/* ── Zoom Slider ── */}
                <div className="w-full mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-[10px] uppercase tracking-widest">Zoom</span>
                    <span className="text-red-400 text-[10px] font-mono">{zoom.toFixed(2)}×</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleZoomSlider(Math.max(1, zoom - 0.1))}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <ZoomOut size={14} className="text-gray-300" />
                    </button>

                    <div className="relative flex-1">
                      {/* Track */}
                      <div className="w-full h-1.5 rounded-full bg-white/10 relative">
                        <div
                          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-red-700 to-red-400 transition-all"
                          style={{ width: `${((zoom - 1) / 2) * 100}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.01"
                        value={zoom}
                        onChange={(e) => handleZoomSlider(parseFloat(e.target.value))}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                        style={{ margin: 0 }}
                      />
                      {/* Thumb dot */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-lg pointer-events-none transition-all"
                        style={{ left: `calc(${((zoom - 1) / 2) * 100}% - 8px)` }}
                      />
                    </div>

                    <button
                      onClick={() => handleZoomSlider(Math.min(3, zoom + 0.1))}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <ZoomIn size={14} className="text-gray-300" />
                    </button>
                  </div>

                  {/* Zoom preset pills */}
                  <div className="flex justify-center gap-2 mt-3">
                    {[1, 1.5, 2, 2.5].map(z => (
                      <button
                        key={z}
                        onClick={() => handleZoomSlider(z)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${
                          Math.abs(zoom - z) < 0.05
                            ? 'bg-red-600 text-white shadow-sm'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {z}×
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Action Buttons ── */}
              <div className="flex gap-3 px-6 pb-6 pt-2">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-all border border-white/10"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
                >
                  <Check size={15} /> Save Photo
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileImage;
