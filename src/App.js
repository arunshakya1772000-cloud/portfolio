import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Education from './components/Education';
import Experience from './components/Experience';
import Technologies from './components/Technologies';
import ProjectsSection from './components/ProjectsSection';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App animated-gradient">
      <Header />
      <HeroSection />
      <Education />
      <Experience />
      <Technologies />
      <ProjectsSection />
      <Contact />
    </div>
  );
}

export default App;
