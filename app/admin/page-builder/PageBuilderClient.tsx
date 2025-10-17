"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Layout,
  Type,
  Image as ImageIcon,
  Quote,
  Megaphone,
  BarChart,
  Grid3x3,
  Plus,
  Settings,
  Eye,
  Save,
  Trash2,
  GripVertical,
  Check,
} from "lucide-react";

// Block Types
type BlockType = "hero" | "text" | "image" | "quote" | "cta" | "stats" | "grid";

interface Block {
  id: string;
  type: BlockType;
  data: Record<string, any>;
}

// Block Templates
const blockTemplates: Record<BlockType, { icon: any; label: string; color: string; defaultData: any }> = {
  hero: {
    icon: Layout,
    label: "Hero",
    color: "from-purple-600 to-pink-600",
    defaultData: {
      title: "Título Principal",
      subtitle: "Subtítulo descriptivo",
      buttonText: "Llamado a la Acción",
      buttonLink: "#",
    },
  },
  text: {
    icon: Type,
    label: "Texto",
    color: "from-blue-600 to-cyan-600",
    defaultData: {
      content: "Escribe tu contenido aquí...",
      alignment: "left",
    },
  },
  image: {
    icon: ImageIcon,
    label: "Imagen",
    color: "from-green-600 to-emerald-600",
    defaultData: {
      url: "https://via.placeholder.com/1200x600",
      alt: "Descripción de la imagen",
      caption: "",
    },
  },
  quote: {
    icon: Quote,
    label: "Cita",
    color: "from-yellow-600 to-orange-600",
    defaultData: {
      text: "Una cita inspiradora...",
      author: "Autor",
      role: "Cargo",
    },
  },
  cta: {
    icon: Megaphone,
    label: "CTA",
    color: "from-red-600 to-rose-600",
    defaultData: {
      title: "¡No te lo pierdas!",
      description: "Descripción del llamado a la acción",
      buttonText: "Comenzar",
      buttonLink: "#",
    },
  },
  stats: {
    icon: BarChart,
    label: "Estadísticas",
    color: "from-indigo-600 to-purple-600",
    defaultData: {
      stats: [
        { label: "Usuarios", value: "10,000+" },
        { label: "Artículos", value: "500+" },
        { label: "Categorías", value: "20+" },
      ],
    },
  },
  grid: {
    icon: Grid3x3,
    label: "Grid 3 Columnas",
    color: "from-teal-600 to-cyan-600",
    defaultData: {
      items: [
        { title: "Columna 1", content: "Contenido 1" },
        { title: "Columna 2", content: "Contenido 2" },
        { title: "Columna 3", content: "Contenido 3" },
      ],
    },
  },
};

// Sortable Block Component
function SortableBlock({
  block,
  onEdit,
  onDelete,
}: {
  block: Block;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const template = blockTemplates[block.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all"
    >
      <div className="flex items-start gap-4">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center`}>
              <template.icon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm">{template.label}</span>
          </div>

          {/* Block Preview */}
          <div className="text-sm text-zinc-400">
            {block.type === "hero" && <p>{block.data.title}</p>}
            {block.type === "text" && <p className="line-clamp-2">{block.data.content}</p>}
            {block.type === "image" && <p>{block.data.alt}</p>}
            {block.type === "quote" && <p>"{block.data.text}"</p>}
            {block.type === "cta" && <p>{block.data.title}</p>}
            {block.type === "stats" && <p>{block.data.stats.length} estadísticas</p>}
            {block.type === "grid" && <p>{block.data.items.length} columnas</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            title="Editar"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-900/20 text-red-400 rounded-lg transition-colors"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Block Renderer for Preview
function BlockRenderer({ block }: { block: Block }) {
  const { type, data } = block;

  switch (type) {
    case "hero":
      return (
        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-900/30 rounded-2xl p-12 text-center">
          <h1 className="text-5xl font-black mb-4">{data.title}</h1>
          <p className="text-xl text-zinc-400 mb-8">{data.subtitle}</p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold">
            {data.buttonText}
          </button>
        </div>
      );

    case "text":
      return (
        <div className={`prose prose-invert max-w-none text-${data.alignment}`}>
          <p className="text-zinc-300 leading-relaxed">{data.content}</p>
        </div>
      );

    case "image":
      return (
        <div>
          <img src={data.url} alt={data.alt} className="w-full rounded-xl" />
          {data.caption && <p className="text-sm text-zinc-500 mt-2 text-center">{data.caption}</p>}
        </div>
      );

    case "quote":
      return (
        <div className="border-l-4 border-yellow-600 pl-6 py-4 bg-yellow-900/10 rounded-r-xl">
          <p className="text-xl italic mb-4">"{data.text}"</p>
          <div className="text-sm text-zinc-400">
            <p className="font-bold">{data.author}</p>
            <p>{data.role}</p>
          </div>
        </div>
      );

    case "cta":
      return (
        <div className="bg-gradient-to-br from-red-900/20 to-rose-900/20 border border-red-900/30 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-black mb-3">{data.title}</h2>
          <p className="text-zinc-400 mb-6">{data.description}</p>
          <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg font-bold">
            {data.buttonText}
          </button>
        </div>
      );

    case "stats":
      return (
        <div className="grid grid-cols-3 gap-6">
          {data.stats.map((stat: any, index: number) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
              <p className="text-3xl font-black mb-2">{stat.value}</p>
              <p className="text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      );

    case "grid":
      return (
        <div className="grid grid-cols-3 gap-6">
          {data.items.map((item: any, index: number) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.content}</p>
            </div>
          ))}
        </div>
      );

    default:
      return <div>Unknown block type</div>;
  }
}

export default function PageBuilderClient() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [pageName, setPageName] = useState("Nueva Página");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      data: { ...blockTemplates[type].defaultData },
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const updateBlock = (id: string, newData: any) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, data: newData } : b)));
    setEditingBlock(null);
  };

  const savePage = () => {
    const pageData = {
      name: pageName,
      blocks,
      createdAt: new Date().toISOString(),
    };
    console.log("Saving page:", pageData);
    // TODO: Save to database via API
    alert("Página guardada exitosamente!");
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Left Sidebar - Block Library */}
      <div className="col-span-3">
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 h-full">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle className="flex items-center gap-3 text-lg">
              <Plus className="w-5 h-5 text-blue-500" />
              Bloques
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {(Object.entries(blockTemplates) as [BlockType, typeof blockTemplates[BlockType]][]).map(
              ([type, template]) => (
                <button
                  key={type}
                  onClick={() => addBlock(type)}
                  className="w-full flex items-center gap-3 p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <template.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-sm">{template.label}</span>
                </button>
              )
            )}
          </CardContent>
        </Card>
      </div>

      {/* Center - Canvas */}
      <div className="col-span-6 overflow-y-auto">
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 h-full">
          <CardHeader className="border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                className="text-lg font-bold bg-transparent border-none outline-none focus:text-blue-400"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="border-zinc-700"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? "Editor" : "Preview"}
                </Button>
                <Button size="sm" onClick={savePage} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {blocks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Layout className="w-16 h-16 text-zinc-700 mb-4" />
                <h3 className="text-lg font-bold mb-2">Canvas Vacío</h3>
                <p className="text-zinc-500">
                  Arrastra bloques desde la izquierda para comenzar a construir tu página
                </p>
              </div>
            )}

            {!showPreview ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4">
                    {blocks.map((block) => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        onEdit={() => setEditingBlock(block)}
                        onDelete={() => deleteBlock(block.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="space-y-8">
                {blocks.map((block) => (
                  <div key={block.id}>
                    <BlockRenderer block={block} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar - Properties */}
      <div className="col-span-3">
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 h-full">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle className="flex items-center gap-3 text-lg">
              <Settings className="w-5 h-5 text-purple-500" />
              Propiedades
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {!editingBlock ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Settings className="w-12 h-12 text-zinc-700 mb-3" />
                <p className="text-sm text-zinc-500">
                  Selecciona un bloque para editar sus propiedades
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                      blockTemplates[editingBlock.type].color
                    } flex items-center justify-center`}
                  >
                    {(() => {
                      const Icon = blockTemplates[editingBlock.type].icon;
                      return <Icon className="w-5 h-5 text-white" />;
                    })()}
                  </div>
                  <span className="font-bold">{blockTemplates[editingBlock.type].label}</span>
                </div>

                {/* Dynamic form based on block type */}
                {editingBlock.type === "hero" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-zinc-400">Título</label>
                      <input
                        type="text"
                        value={editingBlock.data.title}
                        onChange={(e) =>
                          setEditingBlock({ ...editingBlock, data: { ...editingBlock.data, title: e.target.value } })
                        }
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-zinc-400">Subtítulo</label>
                      <input
                        type="text"
                        value={editingBlock.data.subtitle}
                        onChange={(e) =>
                          setEditingBlock({
                            ...editingBlock,
                            data: { ...editingBlock.data, subtitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                )}

                {editingBlock.type === "text" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-zinc-400">Contenido</label>
                      <textarea
                        value={editingBlock.data.content}
                        onChange={(e) =>
                          setEditingBlock({ ...editingBlock, data: { ...editingBlock.data, content: e.target.value } })
                        }
                        rows={6}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => updateBlock(editingBlock.id, editingBlock.data)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Aplicar Cambios
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
