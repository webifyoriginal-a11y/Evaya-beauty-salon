import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';

// Enhanced data for the editorial layout
const artisans = [
  {
    id: '01',
    name: "Elena Vaya",
    role: "Founder & Creative Director",
    quote: "Structure dictates flow.",
    bio: "Elena’s philosophy is rooted in architectural precision. With 15 years of editorial experience in Paris and New York, she treats every cut as a sculpture, tailored to the unique bone structure of the client. She believes that hair should not just be styled, but designed to evolve.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: '02',
    name: "Julian K.",
    role: "Color Director",
    quote: "Light is a medium, not just a finish.",
    bio: "Specializing in lived-in dimensional color, Julian uses a painterly balayage technique that mimics the natural effects of the sun. His work focuses on preserving the integrity of the hair fiber while achieving prismatic depth that grows out seamlessly.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: '03',
    name: "Sasha Min",
    role: "Senior Esthetician",
    quote: "The skin listens to what you feed it.",
    bio: "Sasha combines holistic facial massage with clinical-grade actives. Her somatic approach releases facial tension patterns, resulting in a lift that is as much physical as it is energetic. She specializes in barrier repair and lymphatic drainage.",
    image: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: '04',
    name: "David Ross",
    role: "Texture Specialist",
    quote: "Embrace the inherent movement.",
    bio: "A master of curls and texture, David believes in working with the hair's natural inclination rather than against it. His dry-cutting method enhances volume and definition without the need for excessive styling products.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200"
  }
];

// --- SILK STRANDS BACKGROUND (OPTIMIZED) ---
const SilkStrandsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    
    // Mouse State
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // OPTIMIZATION: Reduced strand count slightly for performance
    const strands = 18; 
    
    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.008; 

      const width = canvas.width;
      const height = canvas.height;
      const spacing = width / strands;

      ctx.lineWidth = 1.5;
      
      // OPTIMIZATION: Define gradient outside the loop if possible, 
      // but since x position varies, we keep it simple but optimized drawing path.
      
      // Draw each strand
      for (let i = 0; i <= strands; i++) {
        const xBase = i * spacing + (spacing / 2);
        
        ctx.beginPath();
        
        // Gradient for the line
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(166, 127, 112, 0)'); 
        gradient.addColorStop(0.2, 'rgba(166, 127, 112, 0.1)'); 
        gradient.addColorStop(0.5, 'rgba(166, 127, 112, 0.3)'); 
        gradient.addColorStop(0.8, 'rgba(166, 127, 112, 0.1)');
        gradient.addColorStop(1, 'rgba(166, 127, 112, 0)');
        ctx.strokeStyle = gradient;

        // OPTIMIZATION: Increased step from 10 to 30. 
        // Drastically reduces the number of sin/cos calculations per frame.
        for (let y = 0; y <= height; y += 30) {
           const macroWave = Math.sin(y * 0.002 + time + i * 0.5) * 25;
           const microWave = Math.cos(y * 0.01 - time * 2 + i) * 5;
           
           let x = xBase + macroWave + microWave;

           // Mouse Interaction
           const dx = x - mouseX;
           const dy = y - mouseY;
           const dist = Math.sqrt(dx * dx + dy * dy);
           const interactionRadius = 250;
           
           if (dist < interactionRadius) {
             const force = (interactionRadius - dist) / interactionRadius;
             const direction = dx > 0 ? 1 : -1;
             x += direction * force * 40; 
           }

           if (y === 0) ctx.moveTo(x, y);
           else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
};

const Team: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      
      {/* New Silk Strands Background */}
      <SilkStrandsBackground />

      {/* --- HEADER --- */}
      <div className="pt-40 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto text-center relative z-10">
        <Reveal width="100%">
          <div className="flex flex-col items-center">
            <span className="block font-sans text-xs tracking-[0.4em] uppercase text-evaya-terracotta mb-6">The Collective</span>
            <h1 className="text-7xl md:text-[10vw] font-serif text-evaya-dark leading-[0.9] tracking-tight">
              Our Artisans
            </h1>
            <div className="w-[1px] h-24 bg-evaya-terracotta/30 mx-auto mt-12" />
          </div>
        </Reveal>
      </div>

      {/* --- MEMBER LIST (Editorial Layout) --- */}
      <div className="flex flex-col gap-32 md:gap-48 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">
        {artisans.map((member, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={member.id} 
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* IMAGE COLUMN */}
              <div className="w-full md:w-1/2">
                <Reveal width="100%" delay={0.2}>
                  <div className="relative group overflow-hidden">
                     {/* Decorative Number */}
                     <span className={`absolute -top-10 ${isEven ? '-left-6' : '-right-6'} text-[120px] font-serif text-stone-200/50 z-0 select-none`}>
                       {member.id}
                     </span>
                     
                     <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden relative z-10 bg-stone-100">
                        {/* Image Animation */}
                        <motion.img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                          initial={{ filter: "grayscale(100%) contrast(95%)" }}
                          whileHover={{ filter: "grayscale(0%) contrast(100%)", scale: 1.03 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                     </div>
                  </div>
                </Reveal>
              </div>

              {/* TEXT COLUMN */}
              <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-10' : 'md:pr-10'}`}>
                 <Reveal width="100%" delay={0.4}>
                    <h2 className="text-5xl md:text-7xl font-serif text-evaya-dark mb-2">
                       {member.name}
                    </h2>
                    <p className="font-sans text-xs tracking-[0.2em] uppercase text-evaya-terracotta mb-8 border-b border-stone-200 pb-8 inline-block">
                       {member.role}
                    </p>
                    
                    <blockquote className="font-serif text-2xl md:text-3xl italic text-stone-600 mb-8 leading-snug">
                       "{member.quote}"
                    </blockquote>
                    
                    <p className="font-sans text-sm md:text-base text-stone-500 leading-loose font-light max-w-md">
                       {member.bio}
                    </p>
                 </Reveal>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- FOOTER CTA (Centered) --- */}
      <div className="py-32 border-t border-evaya-dark/5 bg-white/40 backdrop-blur-md relative z-10">
         <Reveal width="100%">
             <div className="flex flex-col items-center justify-center text-center w-full px-6">
                 <h3 className="text-4xl md:text-5xl font-serif text-evaya-dark mb-6">Join the Collective</h3>
                 <p className="font-sans text-xs tracking-widest text-stone-500 uppercase mb-10">We are always looking for exceptional talent.</p>
                 <a href="mailto:careers@evaya.com" className="group inline-block border border-evaya-dark px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-evaya-dark hover:text-white transition-all duration-300 relative overflow-hidden">
                    <span className="relative z-10">Apply Now</span>
                    <div className="absolute inset-0 bg-evaya-terracotta transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out z-0" />
                 </a>
             </div>
         </Reveal>
      </div>

    </div>
  );
};

export default Team;