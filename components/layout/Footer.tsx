import Link from "next/link";
import { SITE_DATA, NAVIGATION } from "@/lib/constants";
import { Phone, Mail, MapPin } from "lucide-react";

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
              <span>{SITE_DATA.location}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-8 border-t border-white/10 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} {SITE_DATA.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
