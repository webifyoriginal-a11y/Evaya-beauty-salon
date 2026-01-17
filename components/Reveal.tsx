import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0, 
  direction = 'up',
  duration = 0.9 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const getVariants = () => {
    const distance = 40; // Slightly larger movement for more drama
    switch (direction) {
      case 'up': return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };
      case 'down': return { hidden: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } };
      case 'left': return { hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } };
      case 'right': return { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } };
      case 'none': return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
      default: return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <div ref={ref} style={{ width, position: 'relative' }}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ 
          duration: duration, 
          delay: delay, 
          ease: [0.16, 1, 0.3, 1] // Custom Bezier for "Top Class" feel (OutQuart/OutExpo hybrid)
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;