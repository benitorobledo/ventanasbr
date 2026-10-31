import Link from "next/link";
import { SITE_DATA, NAVIGATION } from "@/lib/constants";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { CookiePreferencesButton } from "@/components/consent/CookiePreferencesButton";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <h3 className="text-2xl font-bold mb-6">{SITE_DATA.name}</h3>
          <p className="text-gray-300 mb-6">
            Fabricación e instalación de ventanas a medida con más de 10 años de experiencia. 
            Especialistas en termopanel y eficiencia energética.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE_DATA.social.facebook}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Facebook de Ventanas BR"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent"
            >
              <Facebook size={20} />
            </a>
            <a
              href={SITE_DATA.social.instagram}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Instagram de Ventanas BR"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold mb-6">Enlaces Rápidos</h4>
          <ul className="space-y-4">
            {NAVIGATION.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold mb-6">Contacto</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-300">
              <Phone size={20} className="text-accent" />
              <a href={`tel:${SITE_DATA.phone.replace(/ /g, '')}`} className="hover:text-white transition-colors">
                {SITE_DATA.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <Mail size={20} className="text-accent" />
              <a href={`mailto:${SITE_DATA.email}`} className="hover:text-white transition-colors">
                {SITE_DATA.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <MapPin size={20} className="text-accent flex-shrink-0" />
              <a
                href={SITE_DATA.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {SITE_DATA.location}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400">
        <Link href="/politica-de-privacidad" className="transition-colors hover:text-white">
          Política de privacidad
        </Link>
        <Link href="/politica-de-cookies" className="transition-colors hover:text-white">
          Política de cookies
        </Link>
        <CookiePreferencesButton />
      </div>

      <div className="container mx-auto px-4 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} {SITE_DATA.name}. Todos los derechos reservados.</p>
        <p>
          Desarrollado con ⚡ por{" "}
          <a href="https://www.srweb.cl" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-300 hover:text-white transition-colors">
            SRweb
          </a>
        </p>
      </div>
    </footer>
  );
}
