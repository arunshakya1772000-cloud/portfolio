import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import GalleryGrid from '../components/GalleryGrid';
import VideoSection from '../components/VideoSection';
import ContactForm from '../components/ContactForm';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <GalleryGrid />
      <VideoSection />
      <ContactForm />
    </>
  );
};

export default Home;
