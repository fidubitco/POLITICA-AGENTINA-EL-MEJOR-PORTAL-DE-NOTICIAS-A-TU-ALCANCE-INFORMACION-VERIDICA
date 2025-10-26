import { useState } from 'react';
import { BBCHeader } from '../../components/BBCHeader';
import { MegaSEO } from '../../components/MegaSEO';
import { 
  Save, 
  Eye, 
  Upload, 
  Image as ImageIcon,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { Link } from 'wouter';
import '../../styles/bbc-style.css';

interface NewsForm {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  imageFile: File | null;
  tags: string[];
  isBreaking: boolean;
  isFeatured: boolean;
  publishNow: boolean;
  scheduledDate: string;
}

export const CreateNews = () => {
  const [form, setForm] = useState<NewsForm>({
    title: '',
    excerpt: '',
    content: '',
    category: 'Política',
    author: '',
    imageUrl: '',
    imageFile: null,
    tags: [],
    isBreaking: false,
    isFeatured: false,
    publishNow: true,
    scheduledDate: '',
  });

  const [tagInput, setTagInput] = useState('');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const categories = ['Política', 'Economía', 'Sociedad', 'Internacional', 'Deportes', 'Cultura'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, imageFile: file });
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter(t => t !== tag) });
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simular guardado (aquí iría la llamada a la API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaving(false);
    setSaved(true);
    
    // Resetear formulario después de 2 segundos
    setTimeout(() => {
      setSaved(false);
      setForm({
        title: '',
        excerpt: '',
        content: '',
        category: 'Política',
        author: '',
        imageUrl: '',
        imageFile: null,
        tags: [],
        isBreaking: false,
        isFeatured: false,
        publishNow: true,
        scheduledDate: '',
      });
    }, 2000);
  };

  const isFormValid = () => {
    return form.title && form.excerpt && form.content && form.author && form.imageUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaSEO
        title="Crear Noticia - Panel de Control"
        description="Sistema para crear y publicar noticias en el portal"
        url="https://politicaargentina.com/admin/crear-noticia"
      />
      <BBCHeader />

      <div className="container-bbc py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Crear Nueva Noticia</h1>
              <p className="text-gray-600">Completa el formulario para publicar una nueva noticia</p>
            </div>
            <Link href="/admin/dashboard">
              <a className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                ← Volver al Dashboard
              </a>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Título de la Noticia *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ej: Gobierno anuncia nuevas medidas económicas"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb1919] focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{form.title.length}/150 caracteres</p>
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Resumen/Extracto *
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Breve resumen de la noticia (máximo 250 caracteres)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb1919] focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{form.excerpt.length}/250 caracteres</p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Contenido Completo *
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Escribe el contenido completo de la noticia aquí..."
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb1919] focus:border-transparent font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">{form.content.length} caracteres</p>
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Imagen Principal *
              </label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                    <Upload size={20} />
                    <span>Subir Imagen</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-gray-600">o</span>
                  <input
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="URL de imagen"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb1919] focus:border-transparent"
                  />
                </div>
                {form.imageUrl && (
                  <div className="relative">
                    <img 
                      src={form.imageUrl} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setForm({ ...form, imageUrl: '', imageFile: null })}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Etiquetas (Tags)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Agregar etiqueta"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb1919] focus:border-transparent"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-[#bb1919] text-white rounded-lg hover:bg-[#990000] transition"
                >
                  Agregar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-600 transition"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Options */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Opciones de Publicación</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb1919] focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Autor *
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Nombre del autor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb1919] focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isBreaking}
                      onChange={(e) => setForm({ ...form, isBreaking: e.target.checked })}
                      className="w-4 h-4 text-[#bb1919] focus:ring-[#bb1919]"
                    />
                    <span className="text-sm font-medium text-gray-700">Noticia de Última Hora</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-[#bb1919] focus:ring-[#bb1919]"
                    />
                    <span className="text-sm font-medium text-gray-700">Noticia Destacada</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.publishNow}
                      onChange={(e) => setForm({ ...form, publishNow: e.target.checked })}
                      className="w-4 h-4 text-[#bb1919] focus:ring-[#bb1919]"
                    />
                    <span className="text-sm font-medium text-gray-700">Publicar Ahora</span>
                  </label>
                </div>

                {!form.publishNow && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Programar Publicación
                    </label>
                    <input
                      type="datetime-local"
                      value={form.scheduledDate}
                      onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb1919] focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
              <button
                onClick={handleSave}
                disabled={!isFormValid() || saving}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${
                  isFormValid() && !saving
                    ? 'bg-[#bb1919] text-white hover:bg-[#990000]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Guardando...
                  </>
                ) : saved ? (
                  <>
                    <Check size={20} />
                    ¡Guardado!
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Publicar Noticia
                  </>
                )}
              </button>

              <button
                onClick={() => setPreview(!preview)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                <Eye size={20} />
                {preview ? 'Ocultar' : 'Vista Previa'}
              </button>

              {!isFormValid() && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    Completa todos los campos obligatorios (*) para publicar
                  </p>
                </div>
              )}
            </div>

            {/* Preview */}
            {preview && form.title && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-gray-900 mb-4">Vista Previa</h3>
                <div className="space-y-3">
                  {form.imageUrl && (
                    <img 
                      src={form.imageUrl} 
                      alt={form.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <div className="inline-block px-3 py-1 bg-[#bb1919] text-white text-xs font-bold rounded">
                    {form.category}
                  </div>
                  <h4 className="font-bold text-lg text-[#1a1a1a]">{form.title}</h4>
                  <p className="text-sm text-gray-600">{form.excerpt}</p>
                  <div className="text-xs text-gray-500">Por {form.author || 'Autor'}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
