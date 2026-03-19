import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImageView from './pages/ImageView';
import VideoPlayer from './pages/VideoPlayer';
import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
  const location = useLocation();
  const isFullscreen = location.pathname.startsWith('/video') || location.pathname.startsWith('/image');

  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden bg-dark text-white">
      {/* Ambient background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-[30%] -left-64 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      {!isFullscreen && <Navbar />}
      <main className="flex-grow z-10 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image/:id" element={<ImageView />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
        </Routes>
      </main>
      {!isFullscreen && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
