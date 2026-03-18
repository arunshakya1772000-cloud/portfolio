import React from 'react';
import { motion } from 'framer-motion';
import ProfileImage from './ProfileImage';

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center pt-20 overflow-hidden" id="hero">
      {/* Background layer */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Profile Image (Left) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 md:order-1 flex justify-center md:justify-end relative"
        >
          <ProfileImage 
            defaultImage="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
            size="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            showControls={false}
          />
        </motion.div>

        {/* Text content (Right) */}
        <div className="order-1 md:order-2 flex flex-col items-center justify-center text-center md:items-start md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <span className="text-sm md:text-md uppercase tracking-[0.3em] text-gray-400 font-semibold border border-white/10 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm shadow-lg">
              Video Editor
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl md:text-7xl lg:text-8xl font-heading font-extrabold uppercase mb-4 leading-none"
          >
            ARUN KUMAR
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 font-light max-w-lg mb-10 leading-relaxed font-sans"
          >
            Crafting cinematic visuals and impactful stories through meticulous photo and video editing.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <a 
              href="#videos" 
              className="px-8 py-3 bg-primary text-white font-medium uppercase tracking-widest text-[10px] md:text-sm text-center transform hover:scale-105 transition-all shadow-[0_0_30px_-5px_#dc2626]"
            >
              View Portfolio
            </a>
            <a 
              href="#about" 
              className="px-8 py-3 border border-white/20 text-white font-medium uppercase tracking-widest text-[10px] md:text-sm text-center hover:bg-white hover:text-black transition-all"
            >
              About Me
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
