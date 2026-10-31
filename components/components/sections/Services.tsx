"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { ChevronRight, Plus, X } from "lucide-react";

export function Services() {
  const [activeService, setActiveService] = useState<null | number>(null);

  return (
    <section id="servicios" className="py-32 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Header - More Balanced UX */}
        <div className="max-w-4xl mx-auto text-center mb-24 space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-bold uppercase tracking-[0.4em] text-xs"
          >
            Servicios Profesionales
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-normal text-primary tracking-tight leading-tight">
            Ofrecemos soluciones <br />
            <span className="text-secondary font-bold italic">Integrales para tu Hogar</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Desde la fabricación de ventanas de alta tecnología hasta obras menores y muebles a medida con terminaciones de lujo.
          </p>
        </div>

        {/* Services Grid - Horizontal Cards for Better Readability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gray-50 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row h-full border border-gray-100 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Image Container */}
              <div className="md:w-2/5 relative min-h-[300px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Text Content */}
              <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-px bg-accent" />
                    <span className="text-accent font-bold text-xs uppercase tracking-widest">0{index + 1}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {service.summary}
                  </p>
                </div>

                <button 
                  type="button"
                  onClick={() => setActiveService(index)}
                  className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest hover:text-accent transition-colors group/btn"
                >
                  <span className="bg-primary text-white p-2 rounded-full group-hover/btn:bg-accent transition-colors">
                    <Plus size={16} />
                  </span>
                  Ver Detalles
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modern Detail Overlay (Modal) */}
      <AnimatePresence>
        {activeService !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={() => setActiveService(null)} />
            
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative bg-white w-full max-w-5xl h-fit max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                type="button"
                onClick={() => setActiveService(null)}
                aria-label="Cerrar detalles del servicio"
                className="absolute top-6 right-6 z-20 bg-white/90 p-3 rounded-full text-primary hover:bg-secondary hover:text-white transition-all shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="md:w-1/2 relative h-[300px] md:h-auto">
                <Image 
                  src={SERVICES[activeService].image}
                  alt={SERVICES[activeService].title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="md:w-1/2 p-10 md:p-16 overflow-y-auto">
                <div className="space-y-8">
                  <div>
                    <span className="text-accent font-black uppercase tracking-widest text-xs mb-4 block">Detalles del Servicio</span>
                    <h4 className="text-3xl md:text-5xl font-black text-primary tracking-tighter leading-none mb-6">
                      {SERVICES[activeService].title}
                    </h4>
                  </div>
                  
                  <div className="prose prose-lg">
                    <p className="text-gray-600 leading-relaxed text-lg font-medium">
                      {SERVICES[activeService].description}
                    </p>
                  </div>

                  <div className="pt-8 flex flex-col sm:flex-row gap-4">
                    <a 
                      href={`https://wa.me/56977443314?text=Hola, me gustaría cotizar: ${SERVICES[activeService].title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("whatsapp_click", { location: "servicio", service: SERVICES[activeService].title })}
                      className="bg-accent text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest text-center hover:bg-primary transition-all shadow-xl shadow-accent/20"
                    >
                      Cotizar este servicio
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
