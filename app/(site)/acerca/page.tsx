import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, TrendingUp, Globe, Shield } from "lucide-react";
import OptimizedImage from "@/components/optimized-image";

export const metadata: Metadata = {
  title: "Acerca de Nosotros | POLÍTICA ARGENTINA",
  description: "Conoce más sobre POLÍTICA ARGENTINA, el portal de noticias líder en Argentina. Nuestra misión, visión y valores.",
};

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "5M+", label: "Lectores mensuales" },
    { icon: TrendingUp, value: "1000+", label: "Artículos publicados" },
    { icon: Globe, value: "80", label: "Idiomas disponibles" },
    { icon: Award, value: "#1", label: "Portal de noticias" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Integridad",
      description: "Nos comprometemos a informar con veracidad y transparencia, verificando cada fuente."
    },
    {
      icon: Target,
      title: "Precisión",
      description: "Nuestro equipo de periodistas expertos garantiza información precisa y contextualizada."
    },
    {
      icon: Users,
      title: "Inclusión",
      description: "Damos voz a todas las perspectivas y promovemos un diálogo constructivo."
    },
    {
      icon: TrendingUp,
      title: "Innovación",
      description: "Utilizamos tecnología de punta para ofrecer la mejor experiencia de lectura."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-950/30 to-blue-950/30 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Acerca de POLÍTICA ARGENTINA
            </h1>
            <p className="text-xl text-zinc-300 leading-relaxed">
              El portal de noticias más completo y confiable de Argentina. Información verificada,
              análisis profundo y cobertura en tiempo real de los acontecimientos que mueven al país.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800 text-center">
              <CardContent className="p-8">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-10">
              <h2 className="text-3xl font-bold mb-6 text-red-400">Nuestra Misión</h2>
              <p className="text-zinc-300 leading-relaxed text-lg">
                Informar con responsabilidad, precisión y contexto sobre los acontecimientos políticos,
                económicos y sociales de Argentina y el mundo. Ser el medio de referencia para millones
                de argentinos que buscan información confiable y análisis de calidad.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-10">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Nuestra Visión</h2>
              <p className="text-zinc-300 leading-relaxed text-lg">
                Convertirnos en el portal de noticias digital más influyente de América Latina,
                reconocido por su excelencia periodística, innovación tecnológica y compromiso
                con la verdad. Expandir nuestra cobertura a nivel internacional manteniendo
                nuestras raíces argentinas.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Nuestros Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-zinc-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Nuestro Equipo</h2>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: "María González", role: "Directora Editorial", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80&fit=crop" },
                  { name: "Juan Pérez", role: "Editor Jefe", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&q=80&fit=crop" },
                  { name: "Ana Rodríguez", role: "Directora de Tecnología", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&q=80&fit=crop" },
                ].map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <OptimizedImage
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-zinc-400">{member.role}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-zinc-400 mt-12">
                + 50 periodistas, editores y profesionales dedicados a traerte las mejores noticias
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technology Section */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-12">Tecnología de Vanguardia</h2>
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Innovación Constante</h3>
                  <p className="text-zinc-300 leading-relaxed mb-6">
                    Utilizamos inteligencia artificial, machine learning y las últimas tecnologías web
                    para ofrecer una experiencia de lectura incomparable. Nuestro sitio está optimizado
                    para velocidad, accesibilidad y SEO.
                  </p>
                  <ul className="space-y-3 text-zinc-400">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full" />
                      Next.js 15 para máxima performance
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full" />
                      IA Generativa para contenido de calidad
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full" />
                      Traducción automática a 80 idiomas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full" />
                      Infraestructura cloud escalable
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&q=80&fit=crop"
                    alt="Technology"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

