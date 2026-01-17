import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import HeroGeometry from '../components/HeroGeometry';
import CrystalObject from '../components/CrystalObject';

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F9F8]">
      
      {/* --- SECTION 1: HERO --- */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative z-10">
            <Reveal width="100%">
               <h1 className="text-[13vw] lg:text-[8vw] font-serif leading-[0.8] text-evaya-dark tracking-tighter mix-blend-darken">
                Beyond <br />
                <span className="italic font-light text-evaya-terracotta ml-8">Beauty.</span>
              </h1>
            </Reveal>
            <div className="mt-12 pl-2 border-l border-evaya-terracotta/30">
               <Reveal delay={0.2}>
                 <p className="font-sans text-xs md:text-sm text-evaya-taupe leading-loose tracking-[0.2em] uppercase max-w-sm">
                   A holistic salon sanctuary in SoHo.<br/>
                   Where science meets silence.
                 </p>
               </Reveal>
            </div>
          </div>
          
          {/* Hero Geometry - Immediate load, no scroll trigger */}
          <div className="order-1 lg:order-2 flex items-center justify-center h-[50vh] lg:h-auto">
             <motion.div 
               className="w-full h-full flex items-center justify-center"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
             >
               <HeroGeometry />
             </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[1px] h-12 bg-evaya-terracotta/40" />
          <span className="font-sans text-[10px] tracking-widest text-evaya-terracotta uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* --- SECTION 2: PHILOSOPHY (3D Element) --- */}
      <section className="relative min-h-[80vh] flex items-center py-20 bg-white border-t border-stone-100">
         <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
               <CrystalObject />
            </div>
            <div className="order-1 md:order-2">
               <Reveal>
                  <span className="font-sans text-[10px] tracking-[0.4em] text-evaya-terracotta uppercase mb-6 block">The Alchemy</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-evaya-dark leading-tight mb-8">
                    "We sculpt with light, shadow, and <span className="italic text-evaya-gold">form</span>."
                  </h2>
                  <p className="font-sans text-stone-500 leading-relaxed text-sm md:text-base font-light">
                    Evaya is not just a salon; it is a laboratory of aesthetics. We believe that true style is an extension of your inner architecture. Our approach combines precision cutting with organic treatments to reveal your most authentic self.
                  </p>
                  <Link to="/team" className="inline-block mt-10 text-xs font-bold tracking-[0.2em] uppercase border-b border-evaya-dark pb-1 hover:text-evaya-terracotta hover:border-evaya-terracotta transition-colors">
                    Meet the Artisans
                  </Link>
               </Reveal>
            </div>
         </div>
      </section>

      {/* --- SECTION 3: CURATED RITUALS (Images) --- */}
      <section className="py-32 px-6 md:px-12 bg-[#F5F5F4]">
        <div className="max-w-[1400px] mx-auto mb-20 flex justify-between items-end">
           <Reveal>
             <h2 className="text-6xl font-serif text-evaya-dark">Selected Rituals</h2>
           </Reveal>
           <Reveal delay={0.2}>
             <Link to="/services" className="hidden md:block font-sans text-xs tracking-widest uppercase hover:text-evaya-terracotta transition-colors">View Full Menu</Link>
           </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { 
               title: "Hair Architecture", 
               img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200", 
               desc: "Precision Cutting & Color" 
             },
             { 
               title: "Dermal Therapy", 
               img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1200", 
               desc: "Facials & Resurfacing" 
             },
             { 
               title: "Body Work", 
               img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200", 
               desc: "Massage & Energy" 
             }
           ].map((item, i) => (
             <Reveal key={i} delay={i * 0.15}>
               <div className="group cursor-pointer relative overflow-hidden">
                 <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                    <div className="absolute inset-0 bg-evaya-terracotta/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500" />
                    <img 
                      src={item.img} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                    />
                 </div>
                 <h3 className="text-2xl font-serif text-evaya-dark mb-2 group-hover:text-evaya-terracotta transition-colors">{item.title}</h3>
                 <p className="font-sans text-xs tracking-widest text-stone-500 uppercase">{item.desc}</p>
               </div>
             </Reveal>
           ))}
        </div>
      </section>

      {/* --- SECTION 4: MARQUEE --- */}
      <section className="py-24 overflow-hidden bg-evaya-moss text-stone-200 w-full">
        <div className="flex w-full">
          <motion.div 
            className="whitespace-nowrap flex gap-12 flex-shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[10vw] font-display font-light tracking-widest opacity-80 text-evaya-sage">
                CALM • RESTORE • RENEW • EVAYA •
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 5: CTA --- */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 bg-[#F9F9F8] relative">
         <Reveal>
           <p className="font-sans text-xs tracking-[0.4em] uppercase text-evaya-terracotta mb-8 text-center">Your Appointment Awaits</p>
           <Link to="/contact" className="group relative inline-block">
             <span className="text-6xl md:text-9xl font-serif text-evaya-dark group-hover:text-evaya-terracotta group-hover:italic transition-all duration-500 z-10 relative">
               Begin Journey
             </span>
             <motion.div 
               className="absolute -bottom-2 left-0 w-full h-[2px] bg-evaya-terracotta origin-left"
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.5 }}
             />
           </Link>
         </Reveal>
         
         <div className="absolute bottom-12 left-0 w-full text-center">
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-widest">
              Est. 2024 — New York City
            </p>
         </div>
      </section>

    </div>
  );
};

export default Home;