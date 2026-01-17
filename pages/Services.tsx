import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '01',
    name: "The Signature Glow",
    description: "Bespoke oxygen infusion with micro-current lifting. A luminous awakening for tired skin.",
    duration: "60 MIN",
    price: "$210",
    image: "" 
  },
  {
    id: '02',
    name: "Somatic Sculpt",
    description: "Deep tissue release and fascia realignment. Restoring harmony to the body's architecture.",
    duration: "90 MIN",
    price: "$240",
    image: ""
  },
  {
    id: '03',
    name: "Architectural Cut",
    description: "Precision dry-shearing tailored to your bone structure. An effortless, enduring silhouette.",
    duration: "75 MIN",
    price: "$150",
    image: ""
  },
  {
    id: '04',
    name: "Liquid Silk",
    description: "High-gloss mineral glaze and deep hydration mask. Prismatic shine for thirsty strands.",
    duration: "45 MIN",
    price: "$120",
    image: ""
  },
];

// --- ORGANIC SPLASH SVGs (Optimized) ---
const SplashRadiance = () => (
  <motion.svg viewBox="0 0 200 200" className="w-full h-full opacity-40"
    animate={{ rotate: 360, scale: [1, 1.05, 1] }}
    transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
    style={{ willChange: 'transform' }}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#fdba74', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#fca5a5', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path fill="url(#grad1)" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,71.2,32.7C60.2,43.9,49.5,53.4,37.6,61.7C25.7,70,12.6,77.1,-1.2,79.2C-15,81.3,-29.4,78.3,-41.8,70.5C-54.2,62.7,-64.6,50.1,-72.6,36.2C-80.6,22.3,-86.2,7.1,-84.3,-7.1C-82.4,-21.3,-73,-34.5,-62.4,-44.6C-51.8,-54.7,-40,-61.7,-27.6,-69.9C-15.2,-78.1,-2.2,-87.5,12.2,-89.6C26.6,-91.7,53.2,-86.4,44.7,-76.4Z" transform="translate(100 100)" />
  </motion.svg>
);

const SplashStructure = () => (
  <motion.svg viewBox="0 0 200 200" className="w-full h-full opacity-30"
    animate={{ rotate: -360, scale: [1, 1.1, 1] }}
    transition={{ rotate: { duration: 35, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
    style={{ willChange: 'transform' }}
  >
    <defs>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#93c5fd', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#c4b5fd', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path fill="url(#grad2)" d="M42.7,-72.2C54.6,-66.5,63.1,-52.7,69.5,-39.3C75.9,-25.9,80.2,-12.9,78.2,-0.9C76.2,11.2,67.9,22.4,59.3,33.1C50.7,43.8,41.8,54.1,30.9,62.2C20,70.3,7.1,76.2,-4.8,78.1C-16.7,80,-27.5,77.9,-38.3,70.6C-49.1,63.3,-59.9,50.8,-66.6,37.1C-73.3,23.4,-75.9,8.5,-73.4,-5.2C-70.9,-18.9,-63.3,-31.4,-53.6,-41.8C-43.9,-52.2,-32.1,-60.5,-19.7,-64.9C-7.3,-69.3,5.7,-69.8,19.2,-68.8C32.7,-67.8,46.7,-65.3,42.7,-72.2Z" transform="translate(100 100)" />
  </motion.svg>
);

const SplashForm = () => (
  <motion.svg viewBox="0 0 200 200" className="w-full h-full opacity-30"
    animate={{ rotate: 360, scale: [1, 1.05, 1] }}
    transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, scale: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
    style={{ willChange: 'transform' }}
  >
    <defs>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6ee7b7', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d6d3d1', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path fill="url(#grad3)" d="M36.2,-63.8C47.4,-56.3,57.3,-47.9,65.3,-37.7C73.3,-27.5,79.4,-15.5,78.3,-3.9C77.2,7.7,68.9,18.9,59.9,29.1C50.9,39.3,41.2,48.5,30.5,55.9C19.8,63.3,8.1,68.9,-2.6,73.4C-13.3,77.9,-23,81.3,-32.2,76.7C-41.4,72.1,-50.1,59.5,-57.6,47.4C-65.1,35.3,-71.4,23.7,-73.3,11.3C-75.2,-1.1,-72.7,-14.3,-66,-25.1C-59.3,-35.9,-48.4,-44.3,-37.2,-51.7C-26,-59.1,-14.5,-65.5,-1.9,-62.2C10.7,-58.9,25,-68.8,36.2,-63.8Z" transform="translate(100 100)" />
  </motion.svg>
);

const SplashGloss = () => (
  <motion.svg viewBox="0 0 200 200" className="w-full h-full opacity-40"
    animate={{ rotate: -360, scale: [1, 1.1, 1] }}
    transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
    style={{ willChange: 'transform' }}
  >
    <defs>
      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f0abfc', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#a5b4fc', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path fill="url(#grad4)" d="M49.3,-71.7C62.6,-65.6,71.5,-51.9,76.6,-37.8C81.7,-23.7,83,-9.2,80.1,4.1C77.2,17.4,70.1,29.5,61.4,40.1C52.7,50.7,42.4,59.8,30.8,66.3C19.2,72.8,6.3,76.7,-5.7,78.5C-17.7,80.3,-28.8,80,-38.4,74.5C-48,69,-56.1,58.3,-62.7,47.1C-69.3,35.9,-74.4,24.2,-76.1,11.9C-77.8,-0.4,-76.1,-13.3,-69.3,-23.8C-62.5,-34.3,-50.6,-42.4,-39.2,-49.6C-27.8,-56.8,-16.9,-63.1,-3.9,-57.1C9.1,-51.1,36,-67.8,49.3,-71.7Z" transform="translate(100 100)" />
  </motion.svg>
);

const getSplash = (id: string) => {
    switch(id) {
        case '01': return <SplashRadiance />;
        case '02': return <SplashStructure />;
        case '03': return <SplashForm />;
        case '04': return <SplashGloss />;
        default: return null;
    }
};

// --- ADDITIONAL BACKGROUND ANIMATIONS (Fluid Gradients) ---
const AmbientBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
    {/* Replaced particles with large, smooth drifting gradient orbs */}
    
    {/* 1. Warm Rose - Top Left */}
    <motion.div 
      className="absolute -top-[10%] -left-[10%] w-[80vw] h-[80vw] md:w-[45vw] md:h-[45vw] rounded-full opacity-50"
      style={{ 
        background: 'radial-gradient(circle, #FECDD3 0%, rgba(249, 249, 248, 0) 70%)',
        willChange: 'transform'
      }}
      animate={{ 
        x: [0, 80, 0],
        y: [0, 40, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* 2. Soft Lavender - Bottom Left */}
    <motion.div 
      className="absolute top-[30%] -left-[20%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] rounded-full opacity-40"
      style={{ 
        background: 'radial-gradient(circle, #DDD6FE 0%, rgba(249, 249, 248, 0) 70%)',
        willChange: 'transform'
      }}
      animate={{ 
        x: [0, 60, 0],
        y: [0, -60, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
    
    {/* 3. Muted Gold - Center Right */}
    <motion.div 
      className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full opacity-40"
      style={{ 
        background: 'radial-gradient(circle, #FDE68A 0%, rgba(249, 249, 248, 0) 70%)',
        willChange: 'transform'
      }}
      animate={{ 
        x: [0, -80, 0],
        y: [0, 40, 0],
        scale: [1, 1.15, 1]
      }}
      transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
    
    {/* 4. Cool Blue - Bottom Right */}
    <motion.div 
      className="absolute -bottom-[10%] -right-[10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] rounded-full opacity-40"
      style={{ 
        background: 'radial-gradient(circle, #BAE6FD 0%, rgba(249, 249, 248, 0) 70%)',
        willChange: 'transform'
      }}
      animate={{ 
        x: [0, -60, 0],
        y: [0, -50, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    />
  </div>
);

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden relative">
      
      <AmbientBackground />

      {/* Header */}
      <div className="mb-24 relative z-10">
         <Reveal>
             <h1 className="text-6xl md:text-9xl font-serif text-evaya-dark mb-4">Menu</h1>
             <p className="font-sans text-xs tracking-[0.2em] text-stone-500 uppercase">Curated Rituals for Hair & Skin.</p>
         </Reveal>
      </div>

      {/* Service List */}
      <div className="flex flex-col relative z-10">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 0.1} width="100%">
            <Link to="/contact" className="block w-full group relative">
              
              {/* Container for the row */}
              <div className="relative w-full border-t border-stone-200 py-16 md:py-24 flex items-center overflow-visible">
                 
                 {/* ABSOLUTE SPLASH BACKGROUND - Positioned to be clearly visible */}
                 <div className="absolute right-[-10%] md:right-[5%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] pointer-events-none z-0">
                    {getSplash(service.id)}
                 </div>

                 {/* Content - z-10 to stay above splash */}
                 <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-center">
                    
                    {/* ID */}
                    <div className="md:col-span-1 hidden md:block">
                       <span className="font-sans text-xs font-bold tracking-widest text-stone-400">
                          /{service.id}
                       </span>
                    </div>

                    {/* Title */}
                    <div className="md:col-span-5">
                       <h2 className="text-5xl md:text-8xl font-serif text-evaya-dark transition-all duration-500 group-hover:scale-105 origin-left">
                          {service.name}
                       </h2>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-4 pl-2 border-l-2 border-transparent group-hover:border-evaya-dark/10 transition-colors duration-300">
                       <p className="font-sans text-sm md:text-base text-stone-600 font-medium leading-relaxed max-w-xs mb-4">
                          {service.description}
                       </p>
                       <div className="flex gap-4 text-[10px] tracking-[0.2em] uppercase text-stone-500">
                          <span className="bg-white/40 px-2 py-1 rounded">{service.duration}</span>
                          <span className="bg-white/40 px-2 py-1 rounded font-bold">{service.price}</span>
                       </div>
                    </div>

                    {/* Arrow CTA */}
                    <div className="md:col-span-2 flex justify-end">
                        <motion.div 
                           className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-evaya-dark shadow-sm"
                           whileHover={{ scale: 1.1, backgroundColor: "#FFF" }}
                        >
                            <ArrowUpRight size={24} />
                        </motion.div>
                    </div>

                 </div>
              </div>
            </Link>
          </Reveal>
        ))}
        {/* Final border */}
        <div className="w-full h-[1px] bg-stone-200" />
      </div>

    </div>
  );
};

export default Services;