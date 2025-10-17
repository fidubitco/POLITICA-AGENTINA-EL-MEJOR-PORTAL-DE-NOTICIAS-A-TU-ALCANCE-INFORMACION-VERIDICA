import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad | POLÍTICA ARGENTINA",
  description: "Política de privacidad y protección de datos de POLÍTICA ARGENTINA. Conoce cómo protegemos tu información personal.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="bg-gradient-to-r from-red-950/30 to-blue-950/30 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-red-600" />
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Política de Privacidad
            </h1>
            <p className="text-xl text-zinc-300">
              Tu privacidad es nuestra prioridad. Última actualización: Octubre 2025
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-12 prose prose-invert prose-lg max-w-none">
              <h2>1. Introducción</h2>
              <p>
                POLÍTICA ARGENTINA respeta la privacidad de sus usuarios y se compromete a proteger
                sus datos personales. Esta política explica cómo recopilamos, usamos y protegemos
                su información de acuerdo con la Ley 25.326 de Protección de Datos Personales de Argentina.
              </p>

              <h2>2. Información que Recopilamos</h2>
              
              <h3>2.1 Información proporcionada voluntariamente</h3>
              <ul>
                <li>Nombre y apellido</li>
                <li>Dirección de correo electrónico</li>
                <li>Comentarios y opiniones</li>
                <li>Suscripciones al newsletter</li>
              </ul>

              <h3>2.2 Información recopilada automáticamente</h3>
              <ul>
                <li>Dirección IP</li>
                <li>Tipo de navegador</li>
                <li>Páginas visitadas</li>
                <li>Tiempo de permanencia</li>
                <li>Cookies y tecnologías similares</li>
              </ul>

              <h2>3. Uso de la Información</h2>
              <p>Utilizamos su información para:</p>
              <ul>
                <li>Enviar newsletters y actualizaciones</li>
                <li>Personalizar su experiencia en el sitio</li>
                <li>Analizar el uso del sitio y mejorar nuestros servicios</li>
                <li>Responder a sus consultas</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>

              <h2>4. Cookies</h2>
              <p>
                Utilizamos cookies para mejorar su experiencia de navegación. Las cookies son pequeños
                archivos de texto que se almacenan en su dispositivo. Puede configurar su navegador
                para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
              </p>

              <h3>Tipos de cookies que utilizamos:</h3>
              <ul>
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio</li>
                <li><strong>Cookies de análisis:</strong> Nos ayudan a entender cómo usan el sitio</li>
                <li><strong>Cookies de preferencia:</strong> Recuerdan sus configuraciones</li>
              </ul>

              <h2>5. Compartir Información</h2>
              <p>
                NO vendemos, alquilamos ni compartimos su información personal con terceros con fines
                comerciales. Podemos compartir información en los siguientes casos:
              </p>
              <ul>
                <li>Con proveedores de servicios que nos ayudan a operar el sitio</li>
                <li>Cuando sea requerido por ley o autoridades competentes</li>
                <li>Para proteger nuestros derechos legales</li>
              </ul>

              <h2>6. Seguridad</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para proteger su información
                contra acceso no autorizado, alteración, divulgación o destrucción, incluyendo:
              </p>
              <ul>
                <li>Cifrado SSL/TLS para transmisión de datos</li>
                <li>Servidores seguros y protegidos</li>
                <li>Acceso restringido a datos personales</li>
                <li>Auditorías de seguridad regulares</li>
              </ul>

              <h2>7. Sus Derechos (Ley 25.326)</h2>
              <p>Usted tiene derecho a:</p>
              <ul>
                <li><strong>Acceso:</strong> Conocer qué datos tenemos sobre usted</li>
                <li><strong>Rectificación:</strong> Corregir datos inexactos</li>
                <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos</li>
                <li><strong>Oposición:</strong> Oponerse al procesamiento de sus datos</li>
                <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
              </ul>

              <h2>8. Retención de Datos</h2>
              <p>
                Conservamos su información personal solo durante el tiempo necesario para los fines
                para los que fue recopilada, o según lo requiera la ley. Los datos de newsletter se
                conservan hasta que solicite la baja.
              </p>

              <h2>9. Enlaces Externos</h2>
              <p>
                Nuestro sitio puede contener enlaces a sitios web de terceros. No somos responsables
                de las prácticas de privacidad de estos sitios. Le recomendamos leer sus políticas
                de privacidad antes de proporcionarles información.
              </p>

              <h2>10. Menores de Edad</h2>
              <p>
                Nuestro sitio no está dirigido a menores de 13 años. No recopilamos intencionalmente
                información de menores. Si descubrimos que hemos recopilado información de un menor,
                la eliminaremos inmediatamente.
              </p>

              <h2>11. Cambios a esta Política</h2>
              <p>
                Podemos actualizar esta política periódicamente. Los cambios serán publicados en esta
                página con la fecha de "última actualización" modificada. Le recomendamos revisar
                esta política regularmente.
              </p>

              <h2>12. Contacto</h2>
              <p>
                Para ejercer sus derechos o hacer consultas sobre privacidad:
                <br />
                Email: privacidad@politica-argentina.com
                <br />
                Teléfono: +54 11 5555-1234
                <br />
                Dirección: Av. Corrientes 1234, CABA, Argentina
              </p>

              <h2>13. Autoridad de Aplicación</h2>
              <p>
                La Agencia de Acceso a la Información Pública es la autoridad de aplicación de la
                Ley 25.326 en Argentina. Puede contactarlos en:
                <br />
                Web: <a href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noopener noreferrer">www.argentina.gob.ar/aaip</a>
              </p>

              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-zinc-950 rounded-lg border border-zinc-800 text-center">
                  <Lock className="w-10 h-10 text-red-600 mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Datos Seguros</h4>
                  <p className="text-sm text-zinc-400 mb-0">
                    Cifrado SSL/TLS en todas las comunicaciones
                  </p>
                </div>
                <div className="p-6 bg-zinc-950 rounded-lg border border-zinc-800 text-center">
                  <Shield className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Cumplimiento Legal</h4>
                  <p className="text-sm text-zinc-400 mb-0">
                    De acuerdo con la Ley 25.326
                  </p>
                </div>
                <div className="p-6 bg-zinc-950 rounded-lg border border-zinc-800 text-center">
                  <Eye className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Transparencia</h4>
                  <p className="text-sm text-zinc-400 mb-0">
                    Acceso total a tus datos cuando lo solicites
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

