'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Eye, Share2, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function NoticiaCorrupcionJudicialCordoba() {
  const noticia = {
    id: 'jud-breaking-1',
    title: 'La corrupción judicial en Córdoba: una trama de poder, impunidad y narcotráfico',
    subtitle: 'Fiscal Companys bajo la lupa: denuncias de extorsión, vínculos con el narcotráfico y protección política en Villa María',
    category: 'Judicial',
    categorySlug: 'judicial',
    imageUrl: '/images/casa-rosada-2.jpg',
    author: 'Redacción Política Argentina',
    publishedAt: new Date(Date.now() - 30 * 60 * 1000),
    views: 89500,
    isBreaking: true,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breaking News Bar */}
      <div className="bg-red-600 text-white py-2 animate-pulse">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="px-2 py-1 bg-white text-red-600 rounded">ÚLTIMA HORA</span>
            <span>Corrupción judicial en Córdoba: fiscal investigada por vínculos con narcotráfico</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-3xl font-serif font-bold text-gray-900">
            Política Argentina
          </Link>
        </div>
        <nav className="border-t border-gray-200">
          <div className="container mx-auto px-4">
            <ul className="flex items-center gap-6 py-3 overflow-x-auto">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Inicio</Link></li>
              <li><Link href="/politica" className="text-gray-600 hover:text-gray-900">Política</Link></li>
              <li><Link href="/economia" className="text-gray-600 hover:text-gray-900">Economía</Link></li>
              <li><Link href="/judicial" className="text-red-600 font-semibold">Judicial</Link></li>
              <li><Link href="/internacional" className="text-gray-600 hover:text-gray-900">Internacional</Link></li>
              <li><Link href="/sociedad" className="text-gray-600 hover:text-gray-900">Sociedad</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Inicio</Link>
          <span>/</span>
          <Link href="/judicial" className="hover:text-gray-900">Judicial</Link>
          <span>/</span>
          <span className="text-gray-900">Corrupción judicial en Córdoba</span>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            Judicial
          </span>
          {noticia.isBreaking && (
            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-600 text-white animate-pulse">
              ÚLTIMA HORA
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
          {noticia.title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {noticia.subtitle}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{noticia.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDistanceToNow(noticia.publishedAt, { addSuffix: true, locale: es })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{noticia.views.toLocaleString()} vistas</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <Image
            src={noticia.imageUrl}
            alt={noticia.title}
            width={1200}
            height={675}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-700 mb-6">
            <strong>Villa María (Córdoba, Argentina)</strong> – El sistema judicial de Córdoba enfrenta un severo escrutinio tras una serie de resoluciones de la fiscal Companys que han encendido las alarmas dentro y fuera de la provincia.
          </p>

          <p>
            Según abogados y fuentes consultadas, la magistrada recurre de manera habitual a la <strong>prisión preventiva de imputados</strong>, incluso en casos donde la solidez probatoria de las acusaciones es puesta en duda. Lo que resulta más llamativo para los observadores es el <strong>sólido respaldo político y judicial</strong> del que goza, el cual le ha permitido mantener su posición a pesar de las múltiples denuncias por presuntas irregularidades en su trayectoria.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">El padrino político</h2>
          
          <p>
            Detrás de la <strong>fiscal Companys</strong> se encuentra <strong>Eduardo Accastello</strong>, actual intendente de Villa María y una pieza clave en la estructura del peronismo cordobés, debido a su capacidad para movilizar votos. Según las fuentes consultadas, Accastello le debe su permanencia política a Companys, quien habría logrado <strong>archivar tres causas en su contra</strong> y mantener una cuarta "dormida", tras ser designada de manera irregular como Fiscal del Segundo Turno en la misma ciudad.
          </p>

          <p>
            Este respaldo político explicaría, en parte, la actitud de la fiscal, quien —según testigos— se atreve a <strong>desafiar e increpar a sus superiores</strong> dentro del Ministerio Público Fiscal y Camaristas. Sin embargo, su red de apoyos comienza a resquebrajarse: el presidente del <strong>Superior Tribunal de Córdoba</strong> habría decidido distanciarse, poniendo fin a una relación extramatrimonial que mantenía con ella.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Las causas que persiguen a Accastello</h2>
          
          <p>
            Accastello no solo cuenta con la protección de Companys en Villa María. En Buenos Aires, el <strong>juez federal Julián Ercolini</strong> lo investiga en tres causas por <strong>sobreprecios en obra pública</strong> relacionadas con el manejo de fondos nacionales a través del ente ENINDER.
          </p>

          <p>
            Para "dormir" estas causas en Capital Federal, Accastello contaba con la ayuda de un importante operador del sector de Bingos y Casinos, así como con el presidente de la Cámara Federal de Córdoba, el <strong>Dr. Sánchez Torres</strong>, quien también habría gestionado el ascenso de Companys a jueza federal. Dicho intento se vio frustrado tras una denuncia por <strong>malos tratos y corrupción</strong> presentada por una exsecretaria penal de la Cámara y por la propia esposa de Sánchez Torres.
          </p>

          <p>
            A estas causas se suma una investigación federal en Córdoba por el hallazgo de una <strong>caja de seguridad con 280.000 dólares</strong> en la empresa CBI, fondos que Accastello no pudo justificar. El fiscal a cargo de la causa, el fiscal Semestral —con competencia electoral—, mantiene el caso dormido.
          </p>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 my-8">
            <h3 className="text-xl font-bold text-red-900 mb-3">Extorsión y abuso de autoridad</h3>
            
            <p className="text-gray-800 mb-4">
              El viernes 3 de octubre de 2025, la fiscal Companys ordenó la <strong>detención del empresario ferretero Jorge Daniel</strong>, supuestamente por el delito de "encubrimiento" de su hijo, a quien busca por presunta vinculación con una "mesa de dinero".
            </p>

            <p className="text-gray-800 mb-4">
              Expertos consultados señalan que <strong>no existe figura de encubrimiento entre padre e hijo</strong>, y advierten la configuración de los delitos de <strong>abuso de autoridad y prevaricato</strong>.
            </p>

            <p className="text-gray-800 font-semibold">
              Fuentes cercanas al caso revelan que, a través de abogados vinculados a la estructura criminal de Companys, se estaría solicitando al empresario el pago de <strong className="text-red-600">200.000 dólares</strong> para resolver su situación. La detención se habría realizado un viernes con la intención de presionarlo durante el fin de semana.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Narcotráfico y penetración institucional</h2>
          
          <p>
            Uno de los temas más graves es la <strong>influencia del narcotráfico en las instituciones</strong>. Según las investigaciones, el manejo de drogas dentro del <strong>Servicio Penitenciario de Villa María</strong> estaría controlado por dos personas: la fiscal Companys y el <strong>juez de ejecución penal Arturo Ferreyra</strong>.
          </p>

          <p>
            Este último reemplazó a la jueza Dottori —quien se apartó del caso "Generación ZOE" debido a las presiones de Companys—, y hoy es señalado como <strong>socio de la fiscal en el manejo de ingresos ilegales</strong> de droga, celulares y alcohol al Penal Número 5 de Villa María.
          </p>

          <p>
            El presunto <strong>capo narcotraficante de la zona</strong> sería <strong>Natalio Graglia</strong>, exintendente de Villanueva y actual funcionario provincial, quien se reúne frecuentemente con Companys y coordinaría la distribución de droga proveniente de Perú y Bolivia.
          </p>

          <p>
            Entre los abogados que operan dentro del servicio penitenciario como "soldados" de Companys y Ferreyra, se menciona a <strong>Javier Marcos, Tati Rodríguez, Sebastián Elías y Florencia Botero</strong>. Marcos habría forzado al abogado Saavedra a declarar en la Causa de Generación ZOE, en un juicio abreviado bajo presión, para que se le otorgara la libertad, a pesar de que este nunca había estado en Villa María.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Un fiscal íntegro, acosado</h2>
          
          <p>
            En medio de este panorama, destaca la figura del <strong>fiscal Enrique Gaviria</strong>, conocido por su independencia. Sin embargo, los sectores corruptos del poder judicial y político lo hostigan permanentemente.
          </p>

          <p>
            Un ejemplo fue su investigación sobre el <strong>ingreso de drogas, celulares y alcohol al servicio penitenciario</strong>, que terminó con la detención de varios implicados, pero cuyos autores recuperaron la libertad tras una cuestionada decisión de un juez de control.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cultura de impunidad</h2>
          
          <p>
            El <strong>poder judicial de Córdoba</strong> aparece hoy profundamente contaminado. Quienes no forman parte de estas redes ilegales operan bajo el temor a represalias. Mientras, medios locales como el "Diario de Villa María" y el portal "Villa María Ya" —dirigido por <strong>Alexis Rivero</strong> y su socio, ahora ambos aliados de Companys— brindan cobertura favorable a la fiscal. Su socio es a su vez testaferro de Accastello.
          </p>

          <p>
            Accastello, consciente de que la caída de Companys podría reabrir todas sus causas, se prepara para enfrentar una nueva y grave denuncia en el <strong>fuero Penal Económico</strong>.
          </p>

          <p className="text-xl font-bold text-gray-900 mt-6">
            La noche se cierne sobre un sistema que parece haber convertido la impunidad en moneda de cambio.
          </p>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Etiquetas:</h3>
          <div className="flex flex-wrap gap-2">
            {['Córdoba', 'Fiscal Companys', 'Eduardo Accastello', 'Narcotráfico', 'Corrupción Judicial', 'Villa María', 'Última Hora'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-900">Compartir:</span>
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-12">
          <Link
            href="/judicial"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a Judicial</span>
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Política Argentina. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

