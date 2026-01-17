import React from 'react';
import { motion } from 'framer-motion';

const HeroGeometry: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000 overflow-visible z-0">
       
       {/* 1. The Ethereal Aura (Back glow) - WARMER NOW */}
       <motion.div
         animate={{
           scale: [1, 1.2, 1],
           opacity: [0.3, 0.5, 0.3],
         }}
         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
         className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-evaya-terracotta/20 rounded-full blur-[80px]"
         style={{ willChange: 'transform' }}
       />

       {/* 2. Primary Rotating Ring (Vertical) */}
       <motion.div
         className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full border-[0.5px] border-evaya-dark/30"
         style={{ transformStyle: "preserve-3d", willChange: 'transform' }}
         animate={{
            rotateX: [0, 360],
            rotateY: [15, 15], // Slight tilt
            rotateZ: [0, 360],
         }}
         transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
         }}
       >
          <div className="absolute inset-2 md:inset-4 rounded-full border-[0.5px] border-evaya-dark/5" />
       </motion.div>

       {/* 3. Secondary Rotating Ring (Horizontal/Gyroscope) */}
       <motion.div
         className="absolute w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full border-[0.5px] border-evaya-dark/20"
         style={{ transformStyle: "preserve-3d", willChange: 'transform' }}
         animate={{
            rotateX: [90, 450],
            rotateY: [0, 360],
         }}
         transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
         }}
       >
          {/* A small bead on the ring - GOLD */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-evaya-gold rounded-full" />
       </motion.div>

       {/* 4. The Floating Pearl (Focal Point) */}
       <motion.div
         className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full shadow-2xl z-10 overflow-hidden"
         style={{
            background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #F2E8E6 40%, #E7E5E4 100%)', // Added hint of rose
            willChange: 'transform'
         }}
         animate={{
            y: [-15, 15, -15],
            scale: [1, 1.02, 1],
         }}
         transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
         }}
       >
         {/* Pearl Luster Highlight */}
         <div className="absolute top-2 left-4 w-12 h-6 bg-white rounded-full blur-md opacity-90 rotate-[-15deg]" />
         {/* Soft underside reflection */}
         <div className="absolute bottom-2 right-4 w-8 h-8 bg-evaya-terracotta/20 rounded-full blur-md" />
       </motion.div>

       {/* 5. Orbiting Satellite (Animation Detail) */}
       <motion.div
         className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px]"
         animate={{ rotate: -360 }}
         transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
         style={{ willChange: 'transform' }}
       >
          <motion.div 
            className="w-2 h-2 md:w-3 md:h-3 bg-evaya-terracotta rounded-full absolute top-0 left-1/2 -translate-x-1/2" 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
       </motion.div>

       {/* 6. Glass Panel overlay */}
       <motion.div 
         className="absolute -bottom-10 -right-4 md:-bottom-20 md:-right-20 w-40 h-40 md:w-64 md:h-64 bg-white/5 backdrop-blur-[2px] border border-white/30 z-20 rounded-xl"
         style={{ willChange: 'transform' }}
         animate={{ 
            y: [0, -20, 0],
            rotate: [0, 8, 0],
            rotateY: [0, 10, 0]
         }}
         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
       >
         <div className="absolute inset-0 bg-gradient-to-br from-evaya-gold/20 to-transparent opacity-50" />
       </motion.div>
       
       {/* 7. Floating Dust Particles */}
       {[...Array(5)].map((_, i) => (
         <motion.div 
           key={i}
           className="absolute w-1 h-1 bg-evaya-terracotta/60 rounded-full"
           style={{
             top: `${Math.random() * 100}%`,
             left: `${Math.random() * 100}%`,
             willChange: 'transform'
           }}
           animate={{
             y: [0, -30, 0],
             opacity: [0, 1, 0]
           }}
           transition={{
             duration: 4 + Math.random() * 3,
             repeat: Infinity,
             delay: Math.random() * 2,
             ease: "easeInOut"
           }}
         />
       ))}

    </div>
  );
};

export default HeroGeometry;