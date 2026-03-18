import React from 'react';
import { motion } from 'framer-motion';
import { Film, Layers, Image as ImageIcon, Aperture, MonitorPlay, Scissors, PenTool, Brain } from 'lucide-react';

const skillsData = [
  { name: 'Adobe Premiere Pro', icon: <Film className="w-10 h-10 md:w-12 md:h-12 text-[#9999FF]" /> },
  { name: 'Adobe After Effects', icon: <Layers className="w-10 h-10 md:w-12 md:h-12 text-[#9999FF]" /> },
  { name: 'DaVinci Resolve', icon: <MonitorPlay className="w-10 h-10 md:w-12 md:h-12 text-[#E74C3C]" /> },
  { name: 'Adobe Photoshop', icon: <ImageIcon className="w-10 h-10 md:w-12 md:h-12 text-[#31A8FF]" /> },
  { name: 'Adobe Lightroom', icon: <Aperture className="w-10 h-10 md:w-12 md:h-12 text-[#31A8FF]" /> },
  { name: 'CapCut', icon: <Scissors className="w-8 h-8 md:w-10 md:h-10 text-white" /> },
  { name: 'Canva', icon: <PenTool className="w-10 h-10 md:w-12 md:h-12 text-[#00C4CC]" /> },
  { name: 'Runway ML / AI Tools', icon: <Brain className="w-8 h-8 md:w-10 md:h-10 text-primary" /> },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-dark-secondary relative z-20">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-sm text-primary uppercase tracking-[0.3em] font-semibold mb-2">SOFTWARE SKILLS</div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold uppercase tracking-tighter">Tools of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Trade</span></h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12">
          {skillsData.map((skill, index) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-xl hover:bg-white/5 transition-all cursor-pointer group hover:cinematic-shadow border border-white/5 hover:border-white/20"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                {skill.icon}
              </div>
              <p className="text-gray-300 font-medium text-sm tracking-wide group-hover:text-white transition-colors">{skill.name}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
