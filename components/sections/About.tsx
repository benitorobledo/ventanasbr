"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/Common";
import { Award, ShieldCheck, Clock, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Award className="text-secondary" size={24} />,
    title: "Experiencia Líder",
    description: "Trayectoria fabricando e instalando soluciones de alta calidad en toda la región de Coquimbo."
  },
  {
    icon: <ShieldCheck className="text-accent" size={24} />,
    title: "Calidad Certificada",
    description: "Materiales premium que aseguran durabilidad y máxima eficiencia energética en cada proyecto."
  },
  {
    icon: <Clock className="text-secondary" size={24} />,
    title: "Compromiso de Plazos",
    description: "Respetamos los tiempos acordados para que tu obra avance con la fluidez que necesitas."
  },
  {
    icon: <Sparkles className="text-accent" size={24} />,
    title: "Diseño a Medida",
    description: "Cada solución es fabricada pensando en las necesidades específicas de tu espacio."
  }
];

export function About() {
  return (
    <section id="nosotros" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Image Side - Now on the left for a fresh look */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <Image 
                src="/images/WhatsApp Image 2026-04-04 at 14.21.20.jpeg"
                alt="Fábrica Benito Robledo Ventanas BR"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-full -z-10 blur-2xl opacity-20" />
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-10"
          >
            <div className="space-y-4">
              <span className="text-accent font-bold uppercase tracking-[0.2em] text-xs px-4 py-1 bg-accent/10 rounded-full inline-block">
                Más que una fábrica
              </span>
              <h2 className="text-4xl md:text-5xl font-normal text-primary leading-[1.2] tracking-tight">
                Expertos que <br />
                <span className="text-accent font-bold italic">Transforman Espacios</span>
              </h2>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              En <span className="font-bold text-primary">Ventanas BR</span>, fusionamos la precisión técnica con un diseño de vanguardia. 
              Como especialistas locales en Coquimbo, fabricamos soluciones en <span className="text-secondary font-bold underline decoration-secondary/20 underline-offset-4">PVC y Aluminio</span> que elevan el estándar de confort.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-gray-100">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold text-primary">{feature.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
