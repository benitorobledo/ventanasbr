"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "accent" | "outline" | "whatsapp";
  className?: string;
  href?: string;
  disabled?: boolean;
}

export function Button({ children, onClick, type = "button", variant = "primary", className = "", href, disabled }: ButtonProps) {
  const baseStyles = "px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-center";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    accent: "bg-accent text-white hover:bg-accent/90",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    whatsapp: "bg-whatsapp text-white hover:bg-whatsapp/90",
  };

  const Component = href ? "a" : motion.button;
  const combinedClassName = `${baseStyles} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
  const props = href 
    ? { href, onClick, className: combinedClassName } 
    : { onClick, type, disabled, className: combinedClassName, whileHover: disabled ? {} : { scale: 1.05 }, whileTap: disabled ? {} : { scale: 0.95 } };

  return <Component {...(props as any)}>{children}</Component>;
}

export function SectionTitle({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`text-3xl md:text-4xl font-bold mb-4 ${light ? "text-white" : "text-primary"}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`text-lg max-w-2xl mx-auto ${light ? "text-gray-300" : "text-gray-600"}`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        className="h-1 bg-accent mx-auto mt-6"
      />
    </div>
  );
}
