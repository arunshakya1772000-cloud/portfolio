import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedin, 
  faGithub, 
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = contactRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const socialLinks = [
    { icon: faLinkedin, url: '#', name: 'LinkedIn' },
    { icon: faGithub, url: '#', name: 'GitHub' },
    { icon: faTwitter, url: '#', name: 'Twitter' }
  ];

  return (
    <section ref={contactRef} className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-on-scroll" style={{ opacity: 0 }}>
            <span className="text-glow" style={{ color: '#9333ea' }}>Contact</span>
          </h2>
          
          <div className="space-y-6 mb-12">
            <p className="text-xl text-gray-300 leading-relaxed animate-on-scroll" style={{ opacity: 0, animationDelay: '0.2s' }}>
              I'm always open to discussing new opportunities, interesting projects, or potential collaborations.
              Feel free to reach out if you'd like to connect!
            </p>
            
            <div className="space-y-4 animate-on-scroll" style={{ opacity: 0, animationDelay: '0.4s' }}>
              <div className="flex items-center justify-center space-x-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-purple-400" />
                <a 
                  href="mailto:vishal.shakya@example.com" 
                  className="text-xl text-purple-300 hover:text-purple-400 transition-colors"
                >
                  vishal.shakya@example.com
                </a>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <FontAwesomeIcon icon={faPhone} className="text-purple-400" />
                <span className="text-xl text-purple-300">
                  +91 XXXXX XXXXX
                </span>
              </div>
            </div>
          </div>
          
          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-12 animate-on-scroll" style={{ opacity: 0, animationDelay: '0.6s' }}>
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                className="social-icon"
                title={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={social.icon} className="text-white text-lg" />
              </a>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-white/20 pt-8 mt-16">
          <p className="text-gray-400 animate-on-scroll" style={{ opacity: 0, animationDelay: '0.8s' }}>
            © 2024 Vishal Ratan Shakya. Built with passion and modern technologies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
