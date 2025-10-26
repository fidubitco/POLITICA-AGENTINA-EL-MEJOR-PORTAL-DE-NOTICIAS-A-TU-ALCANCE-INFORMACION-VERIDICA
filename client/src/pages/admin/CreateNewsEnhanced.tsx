import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BBCHeader } from '../../components/BBCHeader';
import { MegaSEO } from '../../components/MegaSEO';
import { PremiumButton, PremiumInput, PremiumBadge, PremiumCard } from '../../components/ui/premium';
import { 
  Save, 
  Eye, 
  Upload, 
  Image as ImageIcon,
  X,
  Check,
  AlertCircle,
  Sparkles,
  Wand2
} from 'lucide-react';
import { Link } from 'wouter';
import '../../styles/bbc-style.css';
import '../../styles/dashboard-premium.css';

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

export const CreateNewsEnhanced = () => {
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
  const [aiGenerating, setAiGenerating] = useState(false);

  const categories = ['Política', 'Economía', 'Sociedad', 'Internacional', 'Deportes', 'Cultura'];

  // Configuración de Quill
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, imageFile: file });
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

  const handleGenerateWithAI = async () => {
    if (!form.title) {
      alert('Por favor ingresa un título primero');
      return;
    }

    setAiGenerating(true);

    try {
      const response = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ topic: form.title }),
      });

      if (response.ok) {
        const data = await response.json();
        setForm({
          ...form,
          excerpt: data.excerpt || form.excerpt,
          content: data.content || form.content,
          category: data.category || form.category,
          tags: data.tags || form.tags,
        });
      } else {
        throw new Error('Error generando contenido');
      }
    } catch (error) {
      console.error('Error con IA:', error);
      alert('Error al generar contenido con IA');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleImproveContent = async () => {
    if (!form.content) {
      alert('No hay contenido para mejorar');
      return;
    }

    setAiGenerating(true);

    try {
      const response = await fetch('/api/ai/improve-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: form.content }),
      });

      if (response.ok) {
        const data = await response.json();
        setForm({ ...form, content: data.improved || form.content });
      } else {
        throw new Error('Error mejorando contenido');
      }
    } catch (error) {
      console.error('Error con IA:', error);
      alert('Error al mejorar contenido con IA');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSave = async () => {
    // Validación
    if (!form.title || !form.content) {
      alert('Por favor completa al menos el título y el contenido');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          category: form.category,
          image_url: form.imageUrl,
          tags: form.tags,
          is_breaking: form.isBreaking,
          is_featured: form.isFeatured,
          status: form.publishNow ? 'published' : 'draft',
          scheduled_at: form.scheduledDate || null,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          // Resetear formulario
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
      } else {
        throw new Error('Error guardando artículo');
      }
    } catch (error) {
      console.error('Error guardando:', error);
      alert('Error al guardar el artículo');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaSEO
        title="Crear Noticia - Admin"
        description="Panel de administración para crear nuevas noticias"
        noIndex={true}
      />

      <BBCHeader />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Crear Nueva Noticia</h1>
            <p className="text-gray-600">Completa el formulario para publicar una nueva noticia</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/dashboard">
              <PremiumButton variant="secondary">
                Volver al Dashboard
              </PremiumButton>
            </Link>
            <PremiumButton
              variant="ghost"
              icon={<Eye size={18} />}
              onClick={() => setPreview(!preview)}
            >
              {preview ? 'Editar' : 'Vista Previa'}
            </PremiumButton>
          </div>
        </div>

        {!preview ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulario Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Título */}
              <PremiumCard>
                <h2 className="text-xl font-bold mb-4">Información Principal</h2>
                
                <div className="space-y-4">
                  <PremiumInput
                    label="Título"
                    value={form.title}
                    onChange={(value) => setForm({ ...form, title: value })}
                    placeholder="Ingresa el título de la noticia"
                    required
                  />

                  <PremiumInput
                    label="Extracto"
                    value={form.excerpt}
                    onChange={(value) => setForm({ ...form, excerpt: value })}
                    placeholder="Breve resumen de la noticia"
                  />
                </div>
              </PremiumCard>

              {/* Contenido con Quill */}
              <PremiumCard>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Contenido</h2>
                  <div className="flex gap-2">
                    <PremiumButton
                      variant="secondary"
                      size="sm"
                      icon={<Sparkles size={16} />}
                      onClick={handleGenerateWithAI}
                      loading={aiGenerating}
                    >
                      Generar con IA
                    </PremiumButton>
                    <PremiumButton
                      variant="secondary"
                      size="sm"
                      icon={<Wand2 size={16} />}
                      onClick={handleImproveContent}
                      loading={aiGenerating}
                    >
                      Mejorar
                    </PremiumButton>
                  </div>
                </div>

                <ReactQuill
                  theme="snow"
                  value={form.content}
                  onChange={(value) => setForm({ ...form, content: value })}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Escribe el contenido de la noticia aquí..."
                  style={{ height: '400px', marginBottom: '50px' }}
                />
              </PremiumCard>

              {/* Imagen */}
              <PremiumCard>
                <h2 className="text-xl font-bold mb-4">Imagen Principal</h2>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition">
                        <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                        <p className="text-sm text-gray-600">Click para subir imagen</p>
                      </div>
                    </label>
                  </div>

                  <div className="text-center text-gray-500">o</div>

                  <PremiumInput
                    label="URL de Imagen"
                    value={form.imageUrl}
                    onChange={(value) => setForm({ ...form, imageUrl: value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />

                  {form.imageUrl && (
                    <div className="relative">
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setForm({ ...form, imageUrl: '', imageFile: null })}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </PremiumCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publicación */}
              <PremiumCard>
                <h3 className="font-bold mb-4">Publicación</h3>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.publishNow}
                      onChange={(e) => setForm({ ...form, publishNow: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>Publicar ahora</span>
                  </label>

                  {!form.publishNow && (
                    <PremiumInput
                      label="Programar para"
                      type="datetime-local"
                      value={form.scheduledDate}
                      onChange={(value) => setForm({ ...form, scheduledDate: value })}
                    />
                  )}

                  <PremiumButton
                    variant="primary"
                    fullWidth
                    icon={saving ? undefined : <Save size={18} />}
                    onClick={handleSave}
                    loading={saving}
                  >
                    {saving ? 'Guardando...' : saved ? 'Guardado!' : 'Guardar Noticia'}
                  </PremiumButton>

                  {saved && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Check size={16} />
                      <span>Noticia guardada exitosamente</span>
                    </div>
                  )}
                </div>
              </PremiumCard>

              {/* Categoría */}
              <PremiumCard>
                <h3 className="font-bold mb-4">Categoría</h3>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </PremiumCard>

              {/* Tags */}
              <PremiumCard>
                <h3 className="font-bold mb-4">Tags</h3>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Agregar tag"
                      className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    />
                    <PremiumButton variant="secondary" onClick={addTag}>
                      +
                    </PremiumButton>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {form.tags.map((tag) => (
                      <PremiumBadge key={tag} variant="info">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X size={14} />
                        </button>
                      </PremiumBadge>
                    ))}
                  </div>
                </div>
              </PremiumCard>

              {/* Opciones Especiales */}
              <PremiumCard>
                <h3 className="font-bold mb-4">Opciones Especiales</h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isBreaking}
                      onChange={(e) => setForm({ ...form, isBreaking: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>🚨 Última Hora</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>⭐ Destacada</span>
                  </label>
                </div>
              </PremiumCard>
            </div>
          </div>
        ) : (
          /* Vista Previa */
          <PremiumCard>
            <article className="prose prose-lg max-w-none">
              {form.isBreaking && (
                <PremiumBadge variant="error" pulse>
                  🚨 ÚLTIMA HORA
                </PremiumBadge>
              )}

              <h1>{form.title || 'Título de la noticia'}</h1>

              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt={form.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              )}

              <p className="lead text-xl text-gray-700">
                {form.excerpt || 'Extracto de la noticia'}
              </p>

              <div dangerouslySetInnerHTML={{ __html: form.content || '<p>Contenido de la noticia</p>' }} />

              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {form.tags.map((tag) => (
                    <PremiumBadge key={tag} variant="default">
                      {tag}
                    </PremiumBadge>
                  ))}
                </div>
              )}
            </article>
          </PremiumCard>
        )}
      </div>
    </div>
  );
};

