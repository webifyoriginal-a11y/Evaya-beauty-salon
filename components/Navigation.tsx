import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/team', label: 'Team' },
  { path: '/contact', label: 'Contact' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-6 flex justify-between items-center ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent'
        }`}
      >
        <NavLink 
          to="/" 
          className="text-3xl font-display font-semibold tracking-wider text-evaya-dark uppercase hover:text-evaya-terracotta transition-colors"
        >
          Evaya
        </NavLink>

        <div className="hidden md:flex space-x-12">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group ${
                  isActive ? 'text-evaya-terracotta' : 'text-stone-500 hover:text-evaya-terracotta'
                }`
              }
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-evaya-terracotta transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-evaya-dark focus:outline-none z-50 relative"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-evaya-rose flex flex-col justify-center items-center"
          >
            <div className="flex flex-col space-y-10 text-center">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-4xl font-serif text-evaya-dark hover:text-evaya-terracotta transition-colors ${
                      isActive ? 'italic text-evaya-terracotta' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;