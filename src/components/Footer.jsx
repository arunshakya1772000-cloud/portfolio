import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-white/5 py-12 relative z-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold pb-2 uppercase tracking-[0.2em]">
            THANK YOU

          </h2>
          <div className="w-24 h-1 bg-white/10 mx-auto mt-6 mb-6 rounded-full"></div>
          <p className="text-gray-500 font-sans text-xs uppercase tracking-[0.3em] font-light">
             Arun Kumar Portfolio | © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
