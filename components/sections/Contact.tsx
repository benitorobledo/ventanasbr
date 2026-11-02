"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle, Button } from "@/components/ui/Common";
import { BusinessMap } from "@/components/sections/BusinessMap";
import { SITE_DATA } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Teléfono inválido"),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("idle");
    setErrorMessage("");
    try {
      const grecaptcha = window.grecaptcha;
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (!grecaptcha || !siteKey) {
        throw new Error("reCAPTCHA no está disponible");
      }

      grecaptcha.enterprise.ready(async () => {
        try {
          const token = await grecaptcha.enterprise.execute(siteKey, { action: 'submit' });
          
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

          setSubmitStatus("success");
          trackEvent("generate_lead", { form: "contacto" });
          reset();
        } catch (error: any) {
          console.error("Error submitting form:", error);
          setErrorMessage(error.message || "Por favor, intenta nuevamente.");
          setSubmitStatus("error");
        }
      });
    } catch (error: any) {
      console.error("Error initializing recaptcha:", error);
      setErrorMessage("Hubo un problema de seguridad. Por favor, intenta de nuevo.");
      setSubmitStatus("error");
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
                  <a
                    href={`tel:${SITE_DATA.phoneFull}`}
                    onClick={() => trackEvent("phone_click", { location: "contacto" })}
                    className="text-lg font-bold text-primary hover:text-accent transition-colors"
                  >
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
                  <a
                    href={`mailto:${SITE_DATA.email}`}
                    onClick={() => trackEvent("email_click", { location: "contacto" })}
                    className="text-lg font-bold text-primary hover:text-accent transition-colors"
                  >
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

            <BusinessMap />

            <Button 
              variant="whatsapp" 
              className="w-full py-4 text-lg"
              href={SITE_DATA.whatsappUrl}
              onClick={() => trackEvent("whatsapp_click", { location: "contacto" })}
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
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center space-y-4 shadow-sm"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6 shadow-inner">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">¡Mensaje enviado con éxito!</h3>
                  <p className="text-green-700 text-lg">
                    Hemos recibido tu requerimiento. Nuestro equipo lo revisará y te contactaremos a la brevedad posible.
                  </p>
                  <Button onClick={() => setSubmitStatus("idle")} variant="outline" className="mt-8 mx-auto">
                    Enviar otro mensaje
                  </Button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)} 
                  className="space-y-6"
                >
                  {submitStatus === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-red-700"
                    >
                      <AlertCircle className="shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="font-semibold">Hubo un error al enviar el mensaje:</p>
                        <p className="text-sm">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-semibold text-gray-700 ml-1">Nombre Completo</label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        aria-invalid={errors.name ? true : undefined}
                        {...register("name")}
                        placeholder="Ej: Juan Pérez"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all`}
                      />
                      {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="text-sm font-semibold text-gray-700 ml-1">Teléfono</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        aria-invalid={errors.phone ? true : undefined}
                        {...register("phone")}
                        placeholder="Ej: +56 9 1234 5678"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={errors.email ? true : undefined}
                      {...register("email")}
                      placeholder="ejemplo@correo.com"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all`}
                    />
                    {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-semibold text-gray-700 ml-1">Mensaje o Requerimiento</label>
                    <textarea
                      id="contact-message"
                      aria-invalid={errors.message ? true : undefined}
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    {!isSubmitting && <Send size={20} />}
                  </Button>
                  
                  <div className="text-xs text-gray-500 text-center pt-2">
                    Al enviar tus datos aceptas nuestra{" "}
                    <Link href="/politica-de-privacidad" className="underline hover:text-gray-700">
                      Política de Privacidad
                    </Link>{" "}
                    y nuestra{" "}
                    <Link href="/politica-de-cookies" className="underline hover:text-gray-700">
                      Política de Cookies
                    </Link>
                    .
                  </div>

                  <div className="text-xs text-gray-400 text-center pt-2">
                    Este sitio está protegido por reCAPTCHA y se aplican la{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline hover:text-gray-600">Política de Privacidad</a> y los{" "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline hover:text-gray-600">Términos de Servicio</a> de Google.
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
