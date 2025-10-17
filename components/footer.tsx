"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "Política", slug: "politica" },
    { name: "Economía", slug: "economia" },
    { name: "Sociedad", slug: "sociedad" },
    { name: "Internacional", slug: "internacional" },
    { name: "Deportes", slug: "deportes" },
    { name: "Tecnología", slug: "tecnologia" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { name: "Youtube", icon: Youtube, href: "#", color: "hover:text-red-500" },
  ];

  return (
    <footer className="bg-gradient-to-b from-zinc-950 to-black border-t border-zinc-800 mt-24">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">PA</span>
              </div>
              <h3 className="font-black text-xl">POLÍTICA ARGENTINA</h3>
            </div>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              El portal de noticias más completo de Argentina. Información verificada y actualizada las 24 horas del día.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-bold mb-6 text-lg">Categorías</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="text-sm text-zinc-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-bold mb-6 text-lg">Legal & Contacto</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <Link href="/terminos" className="text-sm text-zinc-400 hover:text-white transition">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-sm text-zinc-400 hover:text-white transition">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-zinc-400 hover:text-white transition">
                  Contacto
                </Link>
              </li>
            </ul>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contacto@politica-argentina.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Buenos Aires, Argentina</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
            <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
              Suscríbete y recibe las noticias más importantes directamente en tu bandeja de entrada.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="bg-zinc-900 border-zinc-800 focus:border-red-600 transition"
              />
              <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all">
                <Send className="w-4 h-4 mr-2" />
                Suscribirme
              </Button>
            </form>
            <p className="text-xs text-zinc-500 mt-3">
              Al suscribirte aceptas nuestra política de privacidad
            </p>
          </motion.div>
        </div>

        <Separator className="bg-zinc-900" />

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} POLÍTICA ARGENTINA.</span>
            <span className="hidden md:inline">Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/sitemap.xml" className="hover:text-white transition">
              Sitemap
            </Link>
            <Link href="/rss" className="hover:text-white transition">
              RSS
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
