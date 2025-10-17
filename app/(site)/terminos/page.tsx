import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Scale, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos y Condiciones | POLÍTICA ARGENTINA",
  description: "Términos y condiciones de uso del portal POLÍTICA ARGENTINA. Lee nuestras políticas y normas de uso.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="bg-gradient-to-r from-red-950/30 to-blue-950/30 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="w-16 h-16 mx-auto mb-6 text-red-600" />
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Términos y Condiciones
            </h1>
            <p className="text-xl text-zinc-300">
              Última actualización: Octubre 2025
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-12 prose prose-invert prose-lg max-w-none">
              <h2>1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar el sitio web de POLÍTICA ARGENTINA, usted acepta estar sujeto a estos
                términos y condiciones de uso, todas las leyes y regulaciones aplicables, y acepta que es
                responsable del cumplimiento de las leyes locales aplicables.
              </p>

              <h2>2. Uso del Sitio</h2>
              <p>
                El contenido de POLÍTICA ARGENTINA está destinado únicamente para fines informativos.
                Los usuarios pueden:
              </p>
              <ul>
                <li>Acceder y leer el contenido del sitio</li>
                <li>Compartir artículos en redes sociales</li>
                <li>Suscribirse al newsletter</li>
                <li>Comentar en los artículos (sujeto a moderación)</li>
              </ul>

              <h2>3. Propiedad Intelectual</h2>
              <p>
                Todo el contenido publicado en POLÍTICA ARGENTINA, incluyendo pero no limitado a textos,
                imágenes, gráficos, logos, y material audiovisual, está protegido por las leyes de propiedad
                intelectual de Argentina y tratados internacionales.
              </p>

              <h2>4. Uso Permitido</h2>
              <p>
                Los usuarios pueden reproducir artículos con fines educativos o informativos no comerciales,
                siempre que se cite adecuadamente la fuente y se incluya un enlace al artículo original.
              </p>

              <h2>5. Prohibiciones</h2>
              <p>Está prohibido:</p>
              <ul>
                <li>Publicar contenido ofensivo, difamatorio o ilegal</li>
                <li>Intentar acceder a áreas restringidas del sitio</li>
                <li>Realizar scraping automatizado sin autorización</li>
                <li>Suplantar la identidad de otros usuarios</li>
                <li>Distribuir malware o virus</li>
              </ul>

              <h2>6. Privacidad</h2>
              <p>
                El uso de datos personales está regulado por nuestra Política de Privacidad,
                la cual cumple con la Ley de Protección de Datos Personales de Argentina (Ley 25.326).
              </p>

              <h2>7. Contenido de Usuario</h2>
              <p>
                Los usuarios que publiquen comentarios o contenido en el sitio otorgan a POLÍTICA ARGENTINA
                una licencia no exclusiva, libre de regalías, perpetua y mundial para usar, modificar y
                distribuir dicho contenido.
              </p>

              <h2>8. Enlaces Externos</h2>
              <p>
                POLÍTICA ARGENTINA puede contener enlaces a sitios web de terceros. No nos hacemos
                responsables del contenido o prácticas de privacidad de estos sitios externos.
              </p>

              <h2>9. Limitación de Responsabilidad</h2>
              <p>
                POLÍTICA ARGENTINA se esfuerza por proporcionar información precisa y actualizada, pero
                no garantiza la exactitud, integridad o actualidad del contenido. El uso del sitio es
                bajo su propio riesgo.
              </p>

              <h2>10. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios
                entrarán en vigor inmediatamente después de su publicación en el sitio.
              </p>

              <h2>11. Ley Aplicable</h2>
              <p>
                Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa será
                resuelta en los tribunales competentes de la Ciudad Autónoma de Buenos Aires.
              </p>

              <h2>12. Contacto</h2>
              <p>
                Para preguntas sobre estos términos, puede contactarnos en:
                <br />
                Email: legal@politica-argentina.com
                <br />
                Teléfono: +54 11 5555-1234
              </p>

              <div className="mt-12 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="flex items-start gap-4">
                  <Scale className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Importante</h3>
                    <p className="text-zinc-400 mb-0">
                      Al continuar usando nuestro sitio, usted reconoce que ha leído y comprendido
                      estos términos y condiciones, y acepta estar sujeto a ellos.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

