import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#F9F9F8]">
      
      {/* PERFORMANCE FIX: Removed the SVG feTurbulence grain filter. 
          It causes significant GPU/CPU load on full-screen renders. 
          The background is now a clean, high-performance editorial paper tone. 
      */}
      
      {/* 2. Soft Light Orbs - Optimized with will-change */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-25 animate-float"
        style={{ 
            background: 'radial-gradient(circle, #A67F70 0%, rgba(249, 249, 248, 0) 70%)', // evaya-terracotta
            willChange: 'transform',
            transform: 'translateZ(0)' // Force GPU layer
        }}
      />
      
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-20 animate-float"
        style={{ 
            animationDelay: '2s', 
            background: 'radial-gradient(circle, #C5CDC4 0%, rgba(249, 249, 248, 0) 70%)', // evaya-sage
            willChange: 'transform',
            transform: 'translateZ(0)'
        }}
      />
    </div>
  );
};

export default Background;