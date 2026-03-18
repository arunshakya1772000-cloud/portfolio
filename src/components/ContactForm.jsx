import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-dark relative z-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-primary uppercase tracking-[0.3em] font-semibold mb-2">CONTACT PERSON</div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold uppercase tracking-tighter mb-6">
              Let's Create <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Together</span>
            </h2>
            <p className="text-gray-400 font-sans font-light leading-relaxed mb-10 max-w-md">
              Whether you need high-end real estate visuals, a compelling advertisement, or a dynamic scroll-stopping reel—I'm ready to bring your vision to life.
            </p>

            <div className="space-y-6">
              <a href="mailto:arunshakya1772000@gmail.com" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                <div className="w-12 h-12 bg-white/5 group-hover:bg-primary/20 rounded-full flex items-center justify-center mr-4 transition-colors">
                  <FaEnvelope className="text-xl group-hover:text-primary transition-colors" />
                </div>
                <span className="font-medium tracking-wider text-sm md:text-base">arunshakya1772000@gmail.com</span>
              </a>

              <a href="tel:+916398506293" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                <div className="w-12 h-12 bg-white/5 group-hover:bg-primary/20 rounded-full flex items-center justify-center mr-4 transition-colors">
                  <FaPhone className="text-xl group-hover:text-primary transition-colors" />
                </div>
                <span className="font-medium tracking-wider text-sm md:text-base">+91 639850 6293</span>
              </a>
              
              <div className="flex items-center space-x-4 pt-4">
                <a href="https://www.instagram.com/__through_my_eye?igsh=MTB5b29raHZ0MGs1aQ==" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 hover:bg-[#E1306C] rounded-full flex items-center justify-center transition-colors group" aria-label="Instagram">
                  <FaInstagram className="text-xl text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a href="https://www.linkedin.com/in/arun-kumar-a3a80a3b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 hover:bg-[#0077b5] rounded-full flex items-center justify-center transition-colors group" aria-label="LinkedIn">
                  <FaLinkedin className="text-xl text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-effect rounded-2xl p-8 relative overflow-hidden"
          >
            {/* Cinematic background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2" htmlFor="name">Your Name</label>
                <input 
                  id="name"
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-light"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2" htmlFor="email">Your Email</label>
                <input 
                  id="email"
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-light"
                  placeholder="john@studio.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2" htmlFor="message">Message</label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-light resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit" 
                className={`w-full py-4 rounded-lg font-heading tracking-widest font-bold uppercase transition-all flex items-center justify-center ${
                  submitted 
                    ? 'bg-green-600 text-white' 
                    : 'bg-primary text-white hover:bg-red-700 hover:shadow-[0_0_20px_-5px_#dc2626]'
                }`}
              >
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
