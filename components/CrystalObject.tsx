import React from 'react';
import { motion } from 'framer-motion';

const CrystalObject: React.FC = () => {
  // Number of steps in the helix
  const steps = 16;
  
  return (
    <div className="w-full h-[500px] flex items-center justify-center perspective-[1000px] overflow-visible z-0 pointer-events-none select-none">
      
      {/* Container rotating slowly */}
      <motion.div
        className="relative w-[200px] h-[400px]"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {/* The Helix Structure */}
        {[...Array(steps)].map((_, i) => {
            // Calculate positions
            // Spread vertically centered
            const y = (i * 22) - ((steps * 22) / 2); 
            // Twist factor (degrees per step)
            const rotation = i * 25; 
            
            return (
                <React.Fragment key={i}>
                    {/* STRAND A: The Gold Serum Node */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full shadow-lg"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, #FDE68A 0%, #D97706 80%)', // Gold gradient
                            transform: `translate(-50%, -50%) translateY(${y}px) rotateY(${rotation}deg) translateZ(70px)`,
                            opacity: 0.9
                        }}
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                    />
                    
                    {/* The Connector Bond (Structure) */}
                     <motion.div 
                        className="absolute top-1/2 left-1/2 h-[1px] bg-stone-300"
                        style={{
                            width: '140px', // Matches the diameter created by translateZ(70px) * 2
                            transform: `translate(-50%, -50%) translateY(${y}px) rotateY(${rotation}deg)`,
                            opacity: 0.2
                        }}
                     />

                    {/* STRAND B: The Pearl Node */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full shadow-md border border-stone-100"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #E7E5E4 100%)', // Pearl gradient
                            transform: `translate(-50%, -50%) translateY(${y}px) rotateY(${rotation + 180}deg) translateZ(70px)`,
                        }}
                         animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 + 1.5, ease: "easeInOut" }}
                    />
                </React.Fragment>
            );
        })}
        
        {/* Central Core Glow (The Axis) */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-stone-300/30 to-transparent" />
         
         {/* Floating Halo Ring around the center */}
         <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-stone-200/40"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            animate={{ rotateX: [70, 110, 70], rotateY: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
         />

      </motion.div>
    </div>
  );
};

export default CrystalObject;