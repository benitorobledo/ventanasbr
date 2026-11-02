"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_DATA, NAVIGATION } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/90 backdrop-blur-md text-primary shadow-lg py-3" : "bg-transparent text-white py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="relative h-14 w-44 transition-transform duration-300 hover:scale-105">
          <Image 
            src="/images/logo-br.webp" 
            alt={SITE_DATA.name} 
            fill 
            className={`object-contain transition-all duration-500 ${isScrolled ? "brightness-100" : "brightness-0 invert"}`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 items-center">
          {NAVIGATION.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="group relative text-sm font-black uppercase tracking-[0.2em] transition-colors hover:text-accent"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <a
            href={SITE_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            onClick={() => trackEvent("whatsapp_click", { location: "header" })}
            className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 ${
              isScrolled ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-primary hover:bg-gray-100"
            }`}
          >
            Cotizar
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white text-primary flex flex-col shadow-2xl border-t border-gray-100 overflow-hidden"
          >
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-8 py-5 border-b border-gray-50 text-sm font-black uppercase tracking-widest hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
