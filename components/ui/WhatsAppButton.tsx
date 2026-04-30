"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SITE_DATA } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${SITE_DATA.phoneFull}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 bg-whatsapp text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-whatsapp/90 transition-colors"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} fill="currentColor" className="text-white" />
      <span className="absolute right-full mr-4 bg-white text-primary px-3 py-1 rounded-lg text-sm font-bold shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
        ¿Necesitas ayuda?
      </span>
    </motion.a>
  );
}
