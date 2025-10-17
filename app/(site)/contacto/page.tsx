import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto | POLÍTICA ARGENTINA",
  description: "Ponte en contacto con POLÍTICA ARGENTINA. Envianos tus consultas, sugerencias o reporta una noticia.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="bg-gradient-to-r from-red-950/30 to-blue-950/30 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-6 text-red-600" />
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Contáctanos
            </h1>
            <p className="text-xl text-zinc-300">
              Estamos aquí para escucharte. Envianos tus consultas, sugerencias o reporta una noticia.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:contacto@politica-argentina.com" className="text-zinc-400 hover:text-red-400 transition">
                        contacto@politica-argentina.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Teléfono</h3>
                      <a href="tel:+541155551234" className="text-zinc-400 hover:text-blue-400 transition">
                        +54 11 5555-1234
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Dirección</h3>
                      <p className="text-zinc-400">
                        Av. Corrientes 1234<br />
                        C1043 CABA, Argentina
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Horario de Atención</h3>
                <div className="space-y-2 text-zinc-400">
                  <p><span className="text-white font-semibold">Lunes a Viernes:</span> 9:00 - 18:00</p>
                  <p><span className="text-white font-semibold">Sábados:</span> 10:00 - 14:00</p>
                  <p><span className="text-white font-semibold">Domingos:</span> Cerrado</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-10">
                <h2 className="text-3xl font-bold mb-8">Envianos un Mensaje</h2>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nombre *</label>
                      <Input 
                        type="text" 
                        placeholder="Tu nombre"
                        className="bg-zinc-800 border-zinc-700"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input 
                        type="email" 
                        placeholder="tu@email.com"
                        className="bg-zinc-800 border-zinc-700"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Teléfono</label>
                    <Input 
                      type="tel" 
                      placeholder="+54 11 1234-5678"
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Asunto *</label>
                    <Input 
                      type="text" 
                      placeholder="¿En qué podemos ayudarte?"
                      className="bg-zinc-800 border-zinc-700"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Mensaje *</label>
                    <Textarea 
                      placeholder="Escribe tu mensaje aquí..."
                      rows={6}
                      className="bg-zinc-800 border-zinc-700 resize-none"
                      required
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="privacy" 
                      className="mt-1"
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-zinc-400">
                      Acepto la <a href="/privacidad" className="text-red-400 hover:underline">Política de Privacidad</a> y 
                      los <a href="/terminos" className="text-red-400 hover:underline">Términos y Condiciones</a>
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-lg py-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Alternative Contacts */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-colors">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold mb-2">Reportar Noticia</h3>
                  <a href="mailto:redaccion@politica-argentina.com" className="text-sm text-zinc-400 hover:text-red-400">
                    redaccion@politica-argentina.com
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 hover:border-blue-600 transition-colors">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold mb-2">Publicidad</h3>
                  <a href="mailto:publicidad@politica-argentina.com" className="text-sm text-zinc-400 hover:text-blue-400">
                    publicidad@politica-argentina.com
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 hover:border-green-600 transition-colors">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold mb-2">Soporte Técnico</h3>
                  <a href="mailto:soporte@politica-argentina.com" className="text-sm text-zinc-400 hover:text-green-400">
                    soporte@politica-argentina.com
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

