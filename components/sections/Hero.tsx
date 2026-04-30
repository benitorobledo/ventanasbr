"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Common";
import { SITE_DATA } from "@/lib/constants";

const heroImages = [
  "/images/hero/Whisk_68698a190044b609ea84d9fb36a70262eg.png",
  "/images/hero/Whisk_8057ed7134f2e109f0647ff42809af6cdr.png",
  "/images/hero/Whisk_dbaeaadb2b7f2b682dd4754d421caa38dr.png",
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Ken Burns Effect Container */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.15, x: 10, y: 10 }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentIndex]}
                alt={`Proyecto Ventanas BR ${currentIndex + 1}`}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {/* Much Darker Overlay for maximum contrast */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/80 z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Badge from Print */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block bg-accent/20 backdrop-blur-md px-8 py-2 rounded-full text-accent font-bold mb-10 border border-accent/30"
          >
            Ventanas de Aluminio, PVC y Termopanel
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal mb-12 tracking-tight leading-[1.2] max-w-6xl mx-auto px-4">
            Fábrica de <span className="text-accent font-bold drop-shadow-[0_0_20px_rgba(0,174,239,0.3)]">Ventanas de PVC y Aluminio</span> <br className="hidden md:block" /> a medida en Coquimbo.
          </h1>
          
          <p className="text-lg md:text-2xl mb-16 max-w-3xl mx-auto text-white/90 font-medium leading-relaxed drop-shadow-md">
            Desde Pan de Azúcar, Coquimbo fabricamos e instalamos ventanas a medida para Casas, Departamentos, Cabañas u Oficinas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-4">
            <Button 
              href="#contacto" 
              className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent shadow-2xl px-12 py-5 text-lg uppercase tracking-widest border-none"
            >
              Solicita una Cotización
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Modern Circular Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="group relative flex items-center justify-center p-2"
            aria-label={`Ir a slide ${idx + 1}`}
          >
            <motion.div
              animate={{
                scale: currentIndex === idx ? 1.2 : 1,
                backgroundColor: currentIndex === idx ? "#2E86C1" : "rgba(255, 255, 255, 0.3)",
              }}
              className="w-3 h-3 rounded-full transition-colors duration-300 shadow-lg"
            />
            {currentIndex === idx && (
              <motion.div
                layoutId="active-dot"
                className="absolute w-6 h-6 border border-accent rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
