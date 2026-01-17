import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Sparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; top: number; left: number; size: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random sparkles
    const count = 30;
    const newSparkles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 4 + 1, // Random size between 1px and 5px
      delay: Math.random() * 5,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-evaya-gold/60 blur-[1px]"
          style={{
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Add a few "Star" shaped sparkles */}
      {sparkles.slice(0, 5).map((sparkle) => (
         <motion.svg
            key={`star-${sparkle.id}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute text-evaya-gold/80"
            style={{
               top: `${sparkle.top + 5}%`,
               left: `${sparkle.left + 5}%`,
            }}
            animate={{
               opacity: [0, 1, 0],
               rotate: [0, 45, 90],
               scale: [0.5, 1, 0.5]
            }}
            transition={{
               duration: 4,
               repeat: Infinity,
               delay: sparkle.delay + 1,
            }}
         >
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
         </motion.svg>
      ))}
    </div>
  );
};

export default Sparkles;