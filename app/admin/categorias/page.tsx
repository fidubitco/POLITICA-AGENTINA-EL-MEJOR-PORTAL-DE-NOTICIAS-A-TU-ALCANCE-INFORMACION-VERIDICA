'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, FolderOpen } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  count: number;
  description: string;
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Economía',
      slug: 'economia',
      color: 'green',
      count: 30,
      description: 'Noticias económicas, dólar, inflación y mercados',
    },
    {
      id: '2',
      name: 'Política',
      slug: 'politica',
      color: 'blue',
      count: 30,
      description: 'Actualidad política, gobierno y congreso',
    },
    {
      id: '3',
      name: 'Judicial',
      slug: 'judicial',
      color: 'red',
      count: 30,
      description: 'Noticias judiciales, causas y sentencias',
    },
    {
      id: '4',
      name: 'Internacional',
      slug: 'internacional',
      color: 'purple',
      count: 30,
      description: 'Noticias internacionales y relaciones exteriores',
    },
    {
      id: '5',
      name: 'Sociedad',
      slug: 'sociedad',
      color: 'orange',
      count: 30,
      description: 'Noticias de sociedad, educación y salud',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const colorOptions = [
    { value: 'blue', label: 'Azul', class: 'bg-blue-500' },
    { value: 'green', label: 'Verde', class: 'bg-green-500' },
    { value: 'red', label: 'Rojo', class: 'bg-red-500' },
    { value: 'purple', label: 'Púrpura', class: 'bg-purple-500' },
    { value: 'orange', label: 'Naranja', class: 'bg-orange-500' },
    { value: 'yellow', label: 'Amarillo', class: 'bg-yellow-500' },
    { value: 'pink', label: 'Rosa', class: 'bg-pink-500' },
    { value: 'indigo', label: 'Índigo', class: 'bg-indigo-500' },
  ];

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const getColorClass = (color: string) => {
    const classes: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    };
    return classes[color] || classes.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorías</h1>
          <p className="text-gray-600 mt-1">
            {categories.length} categorías en total
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Nueva Categoría</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${getColorClass(category.color)}`}>
                  <FolderOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">/{category.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setEditingCategory(category);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{category.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Noticias</span>
              <span className="text-lg font-bold text-gray-900">{category.count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal (placeholder) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  defaultValue={editingCategory?.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  defaultValue={editingCategory?.slug}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  defaultValue={editingCategory?.description}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`${color.class} h-10 rounded-lg hover:opacity-80 transition-opacity`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

