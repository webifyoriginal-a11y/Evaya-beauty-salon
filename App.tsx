import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Background from './components/Background';
import Home from './pages/Home';
import Services from './pages/Services';
import Team from './pages/Team';
import Contact from './pages/Contact';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      {/* Added overflow-x-hidden here to strictly prevent horizontal scrolling issues */}
      <div className="relative min-h-screen text-stone-800 font-sans selection:bg-stone-300 selection:text-stone-900 overflow-x-hidden w-full">
        <Background />
        <Navigation />
        <main>
          <AnimatedRoutes />
        </main>
        
        {/* Simple Footer */}
        <footer className="py-12 text-center text-stone-400 font-sans text-xs tracking-widest uppercase border-t border-stone-200 mt-20">
          <div className="flex flex-col gap-4">
             <span>© 2024 Evaya Beauty Salon.</span>
             <span className="opacity-50">Designed with intention.</span>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;