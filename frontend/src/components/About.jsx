import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-dark relative z-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-left space-y-6"
          >
            <div className="text-sm text-primary uppercase tracking-[0.3em] font-semibold border-l-4 border-primary pl-4">ABOUT ME</div>
            
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold pb-4 tracking-tighter">
              HELLO, I AM <br/>
              <span className="text-gray-400 font-light">ARUN KUMAR</span>
            </h2>
            
            <p className="text-gray-300 font-sans font-light leading-relaxed text-base md:text-lg">
              I am Arun Kumar, a professional Video Editor and Photo Editor with a passion for bringing stories to life. I specialize in crafting high-end, cinematic visuals spanning across various industries. 
              With over half a decade of hands-on experience, I have developed an eye for detail and pacing that leaves a lasting impact.
            </p>
            
            <p className="text-gray-400 font-sans font-light leading-relaxed">
              My core specializations include <span className="text-white font-medium">Advertisement videos</span>, <span className="text-white font-medium">Real Estate videos</span>, <span className="text-white font-medium">Luxury Interior edits</span>, dynamic <span className="text-white font-medium">Social Media Reels</span>, and high-converting <span className="text-white font-medium">Promotional videos</span>. Whether it’s setting the precise mood with a color grade, or piecing together a fast-paced dynamic montage, I am driven by the art of the edit.
            </p>
          </motion.div>

          {/* Experience/Info Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-effect rounded-2xl p-8 space-y-8"
          >
            <div>
              <h3 className="text-white text-xl font-heading tracking-widest uppercase mb-4 shrink-0">Experience</h3>
              <div className="border-t border-white/10 pt-4">
                <span className="text-primary text-sm tracking-widest block mb-1">2020 - PRESENT</span>
                <h4 className="text-lg font-medium">Freelance Video Editor</h4>
                <p className="text-gray-400 text-sm mt-2">Delivered 200+ projects for real estate agents, luxury brands, and content creators globally, securing high engagement rates.</p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-xl font-heading tracking-widest uppercase mb-4 shrink-0">Specialties</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span> Commercial Advertisements</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span> Luxury Real Estate</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span> Short-form Reels</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span> Cinematic Montages</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span> High-end Photo Retouching</li>
              </ul>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
