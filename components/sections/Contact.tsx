"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { SectionTitle, Button } from "@/components/ui/Common";
import { SITE_DATA } from "@/lib/constants";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Teléfono inválido"),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // @ts-ignore - grecaptcha is injected by Google script
      window.grecaptcha.ready(async () => {
        try {
          // @ts-ignore
          const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' });
          
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, recaptchaToken: token }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Error al enviar el mensaje");
          }

          alert("¡Mensaje enviado con éxito! Te contactaremos a la brevedad.");
          reset();
        } catch (error: any) {
          console.error("Error submitting form:", error);
          alert(`Hubo un error al enviar el mensaje: ${error.message || "Por favor, intenta nuevamente."}`);
        }
      });
    } catch (error: any) {
      console.error("Error initializing recaptcha:", error);
      alert("Hubo un problema de seguridad. Por favor, intenta de nuevo.");
    }
  };

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Contáctanos" 
          subtitle="¿Tienes un proyecto en mente? Solicita tu presupuesto gratuito hoy mismo."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gray-50 p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-primary mb-4">Información de Contacto</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Llámanos</p>
                  <a href={`tel:${SITE_DATA.phoneFull}`} className="text-lg font-bold text-primary hover:text-accent transition-colors">
                    {SITE_DATA.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Email</p>
                  <a href={`mailto:${SITE_DATA.email}`} className="text-lg font-bold text-primary hover:text-accent transition-colors">
                    {SITE_DATA.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Ubicación</p>
                  <p className="text-lg font-bold text-primary">{SITE_DATA.location}</p>
                </div>
              </div>
            </div>

            <Button 
              variant="whatsapp" 
              className="w-full py-4 text-lg"
              href={`https://wa.me/${SITE_DATA.phoneFull}`}
            >
              Contactar por WhatsApp
            </Button>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Nombre Completo</label>
                  <input
                    {...register("name")}
                    placeholder="Ej: Juan Pérez"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all`}
                  />
                  {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Teléfono</label>
                  <input
                    {...register("phone")}
                    placeholder="Ej: +56 9 1234 5678"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                <input
                  {...register("email")}
                  placeholder="ejemplo@correo.com"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all`}
                />
                {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Mensaje o Requerimiento</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Cuéntanos sobre tus medidas o tipo de ventana..."
                  className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all`}
                />
                {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message.message}</p>}
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full py-4 text-lg"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                {!isSubmitting && <Send size={20} />}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
