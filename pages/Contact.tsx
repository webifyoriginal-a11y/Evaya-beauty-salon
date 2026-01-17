import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Mail, Phone, Clock } from 'lucide-react';
import Reveal from '../components/Reveal';
import { api } from '../services/api';
import { BookingRequest } from '../types';

// --- BACKGROUND: ISOLINE CONTOURS (High Performance) ---
const IsolineBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw elegant, slow-moving contour lines
      ctx.lineWidth = 1.5;
      const lines = 6;
      
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        // Gradient for depth
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'rgba(168, 162, 158, 0)');
        gradient.addColorStop(0.5, `rgba(168, 162, 158, ${0.15 - (i * 0.02)})`); // Subtle stone color
        gradient.addColorStop(1, 'rgba(168, 162, 158, 0)');
        ctx.strokeStyle = gradient;

        // OPTIMIZATION: Increased step from 10 to 30 to reduce CPU load
        for (let x = 0; x <= width; x += 30) {
          // Math for organic movement: Sum of Sine waves
          const yOffset = 
            Math.sin(x * 0.002 + time * 0.5 + i) * 80 + 
            Math.cos(x * 0.005 - time * 0.3) * 30;
          
          // Spread lines vertically
          const yBase = centerY + (i * 50) - (lines * 25);
          
          const y = yBase + yOffset;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.008; // Very slow, relaxing speed
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<BookingRequest>({ name: '', email: '', date: '', notes: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await api.submitBooking(formData);
      if (response.success) {
        setStatus('success');
        setMessage("Request Received.");
        setFormData({ name: '', email: '', date: '', notes: '' });
      } else {
        setStatus('error');
        setMessage("Something went wrong.");
      }
    } catch (err) {
      setStatus('error');
      setMessage("Network error.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Input Field Component for consistency
  const InputField = ({ label, name, type = "text", value, onChange, required = false }: any) => (
    <div className="relative group">
      <input 
        type={type} 
        name={name} 
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" " // Required for peer-placeholder-shown to work
        className="block w-full py-4 px-0 text-xl text-evaya-dark bg-transparent border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-evaya-dark peer transition-colors duration-300 font-sans"
      />
      <label 
        htmlFor={name} 
        className="peer-focus:font-medium absolute text-xs font-bold tracking-[0.2em] text-stone-400 uppercase duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-evaya-dark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
      >
        {label}
      </label>
      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-evaya-dark transition-all duration-500 group-hover:w-full peer-focus:w-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent relative overflow-x-hidden">
      
      {/* Dynamic Background */}
      <IsolineBackground />

      <div className="pt-32 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen flex flex-col lg:flex-row gap-12 lg:gap-32">
        
        {/* --- LEFT COLUMN: INFO / EDITORIAL --- */}
        <div className="lg:w-5/12 pt-12 relative z-10">
          <Reveal width="100%">
            <span className="block font-sans text-xs tracking-[0.4em] uppercase text-evaya-taupe mb-8">
              New York, NY
            </span>
            <h1 className="text-6xl md:text-8xl font-serif text-evaya-dark leading-[0.9] mb-12">
              Let's Start <br/>
              <span className="italic text-stone-400">The Conversation.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2} width="100%">
             <p className="font-sans text-stone-500 text-sm md:text-base leading-loose max-w-md mb-16 font-light">
               Whether you seek a complete transformation or a moment of respite, our artisans are here to guide your journey. Bookings are by appointment only to ensure privacy and presence.
             </p>
          </Reveal>

          {/* Contact Details Grid */}
          <Reveal delay={0.3} width="100%">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-stone-200 pt-10">
               <div>
                  <div className="flex items-center gap-3 mb-4 text-evaya-dark">
                     <MapPin size={18} strokeWidth={1} />
                     <h3 className="font-serif text-xl italic">The Studio</h3>
                  </div>
                  <p className="font-sans text-xs tracking-widest text-stone-500 uppercase leading-relaxed">
                    142 Mercer Street<br/>
                    SoHo, New York<br/>
                    10012
                  </p>
               </div>
               
               <div>
                  <div className="flex items-center gap-3 mb-4 text-evaya-dark">
                     <Clock size={18} strokeWidth={1} />
                     <h3 className="font-serif text-xl italic">Hours</h3>
                  </div>
                  <p className="font-sans text-xs tracking-widest text-stone-500 uppercase leading-relaxed">
                    Tue - Sat: 10am - 7pm<br/>
                    Sun - Mon: Closed
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-4 text-evaya-dark">
                     <Phone size={18} strokeWidth={1} />
                     <h3 className="font-serif text-xl italic">Concierge</h3>
                  </div>
                  <p className="font-sans text-xs tracking-widest text-stone-500 uppercase leading-relaxed">
                    +1 212 555 0199
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-4 text-evaya-dark">
                     <Mail size={18} strokeWidth={1} />
                     <h3 className="font-serif text-xl italic">Inquiries</h3>
                  </div>
                  <p className="font-sans text-xs tracking-widest text-stone-500 uppercase leading-relaxed">
                    hello@evaya.com
                  </p>
               </div>
            </div>
          </Reveal>
        </div>

        {/* --- RIGHT COLUMN: THE FORM --- */}
        <div className="lg:w-7/12 relative z-20 bg-white/40 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent rounded-2xl lg:rounded-none p-8 lg:p-0 border border-white/20 lg:border-none shadow-xl lg:shadow-none lg:pt-24">
           <AnimatePresence mode="wait">
             {status === 'success' ? (
                <motion.div 
                   key="success"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="h-full flex flex-col items-center justify-center text-center p-12 border border-evaya-dark/5 bg-white shadow-sm"
                >
                   <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-6 text-evaya-dark">
                      <Clock size={24} />
                   </div>
                   <h3 className="text-4xl font-serif text-evaya-dark mb-4">Request Received</h3>
                   <p className="font-sans text-sm text-stone-500 mb-8 max-w-xs">
                     Thank you, {formData.name.split(' ')[0] || 'Guest'}. Our concierge will confirm your appointment shortly via email.
                   </p>
                   <button 
                      onClick={() => setStatus('idle')}
                      className="text-xs font-bold tracking-widest uppercase border-b border-evaya-dark pb-1 hover:text-evaya-taupe transition-colors"
                   >
                     Make Another Request
                   </button>
                </motion.div>
             ) : (
               <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-12 max-w-lg mx-auto lg:mx-0 lg:ml-auto"
               >
                  <Reveal width="100%" delay={0.4}>
                     <h3 className="text-2xl font-serif text-evaya-dark mb-10 border-b border-stone-200 pb-4">
                        Booking Request
                     </h3>
                  </Reveal>

                  <Reveal width="100%" delay={0.5}>
                     <InputField 
                        label="Full Name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                     />
                  </Reveal>

                  <Reveal width="100%" delay={0.6}>
                     <InputField 
                        label="Email Address" 
                        name="email" 
                        type="email"
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                     />
                  </Reveal>

                  <Reveal width="100%" delay={0.7}>
                     <InputField 
                        label="Preferred Date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        required 
                     />
                  </Reveal>

                  <Reveal width="100%" delay={0.8}>
                     <div className="relative group">
                        <textarea 
                           name="notes"
                           id="notes"
                           rows={3}
                           placeholder=" "
                           value={formData.notes}
                           onChange={handleChange}
                           className="block w-full py-4 px-0 text-xl text-evaya-dark bg-transparent border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-evaya-dark peer transition-colors duration-300 font-sans resize-none"
                        />
                        <label 
                           htmlFor="notes" 
                           className="peer-focus:font-medium absolute text-xs font-bold tracking-[0.2em] text-stone-400 uppercase duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-evaya-dark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                        >
                           Notes / Special Requests
                        </label>
                         <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-evaya-dark transition-all duration-500 group-hover:w-full peer-focus:w-full" />
                     </div>
                  </Reveal>

                  <Reveal width="100%" delay={0.9}>
                     <div className="pt-8 flex justify-end">
                        <button 
                           type="submit"
                           disabled={status === 'submitting'}
                           className="group relative inline-flex items-center gap-4 overflow-hidden px-8 py-4 bg-evaya-dark text-white rounded-sm transition-all duration-300 hover:pr-12"
                        >
                           <span className="relative z-10 font-sans text-xs font-bold tracking-[0.2em] uppercase">
                              {status === 'submitting' ? 'Sending...' : 'Send Request'}
                           </span>
                           <ArrowRight 
                              size={16} 
                              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                           />
                           
                           {/* Hover Effect Background */}
                           <div className="absolute inset-0 bg-stone-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </button>
                     </div>
                  </Reveal>
               </motion.form>
             )}
           </AnimatePresence>
        </div>

      </div>

    </div>
  );
};

export default Contact;