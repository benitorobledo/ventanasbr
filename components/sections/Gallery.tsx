"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  {
    src: "/images/pvc/WhatsApp Image 2026-04-04 at 14.02.05.jpeg",
    title: "Ventanas de PVC",
    description: "Termopaneles con la mejor aislación termoacústica del mercado."
  },
  {
    src: "/images/Aluminio/WhatsApp Image 2026-04-03 at 21.39.17.jpeg",
    title: "Estructuras de Aluminio",
    description: "Diseño elegante, duradero y de bajo mantenimiento."
  },
  {
    src: "/images/puertas-mamparas/WhatsApp Image 2026-04-04 at 14.03.07.jpeg",
    title: "Puertas y Mamparas",
    description: "Divisiones modernas para oficinas y accesos de cristal."
  },
  {
    src: "/images/muebles/WhatsApp Image 2026-04-04 at 14.20.47.jpeg",
    title: "Muebles a Medida",
    description: "Optimizamos tu espacio con diseños funcionales y modernos."
  },
  {
    src: "/images/obras-menores/WhatsApp Image 2026-04-04 at 14.21.20.jpeg",
    title: "Obras Menores",
    description: "Soluciones integrales para la mejora de tu hogar."
  }
];

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, []);

  return (
    <section id="trabajos" className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-bold uppercase tracking-[0.4em] text-xs"
          >
            Portafolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-normal text-primary tracking-tight">
            Nuestros <span className="text-accent font-bold italic">Trabajos Recientes</span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel Area */}
          <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-900">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={galleryItems[currentIndex].src}
                  alt={galleryItems[currentIndex].title}
                  fill
                  className="object-contain"
                  priority
                />
                {/* Info Overlay - Moved to Bottom to NOT cover the image center */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-8 md:p-12 text-center text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl md:text-4xl font-bold mb-2 tracking-tight">
                      {galleryItems[currentIndex].title}
                    </h3>
                    <p className="text-gray-200 text-lg md:text-xl font-light">
                      {galleryItems[currentIndex].description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 z-20">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all border border-white/30"
                aria-label="Anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all border border-white/30"
                aria-label="Siguiente"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Traditional Circular Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {galleryItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? "bg-accent scale-125 shadow-[0_0_10px_rgba(0,174,239,0.5)]" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ver slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
