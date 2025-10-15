'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Plus, Save, Eye, Sparkles } from 'lucide-react';
import BlockSelector from './block-selector';
import SortableBlock from './sortable-block';
import BlockEditor from './block-editor';

interface Block {
  id: string;
  type: string;
  content: any;
  styles?: any;
}

interface PageBuilderProps {
  initialBlocks?: Block[];
  onSave?: (blocks: Block[]) => void;
  onPreview?: () => void;
}

export default function PageBuilder({
  initialBlocks = [],
  onSave,
  onPreview,
}: PageBuilderProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addBlock = (blockType: string) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type: blockType,
      content: getDefaultContent(blockType),
      styles: {},
    };
    setBlocks([...blocks, newBlock]);
    setShowBlockSelector(false);
    setSelectedBlock(newBlock.id);
  };

  const updateBlock = (blockId: string, updates: Partial<Block>) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ));
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    if (selectedBlock === blockId) {
      setSelectedBlock(null);
    }
  };

  const duplicateBlock = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      const newBlock = {
        ...block,
        id: `block-${Date.now()}`,
      };
      const index = blocks.findIndex(b => b.id === blockId);
      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, newBlock);
      setBlocks(newBlocks);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(blocks);
    }
  };

  const generateWithAI = async () => {
    setIsGeneratingWithAI(true);
    try {
      const response = await fetch('/api/ai/generate-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: 'Crear una página moderna para portal de noticias',
          existingBlocks: blocks.length 
        }),
      });
      
      const data = await response.json();
      if (data.blocks) {
        setBlocks(data.blocks);
      }
    } catch (error) {
      console.error('Error generating with AI:', error);
    } finally {
      setIsGeneratingWithAI(false);
    }
  };

  const selectedBlockData = blocks.find(b => b.id === selectedBlock);

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Toolbar */}
      <div className="w-16 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowBlockSelector(!showBlockSelector)}
          className="text-zinc-400 hover:text-white"
        >
          <Plus className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={generateWithAI}
          disabled={isGeneratingWithAI}
          className="text-zinc-400 hover:text-white"
        >
          <Sparkles className={`w-5 h-5 ${isGeneratingWithAI ? 'animate-spin' : ''}`} />
        </Button>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="icon"
          onClick={onPreview}
          className="text-zinc-400 hover:text-white"
        >
          <Eye className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          className="text-blue-400 hover:text-blue-300"
        >
          <Save className="w-5 h-5" />
        </Button>
      </div>

      {/* Block Selector Sidebar */}
      {showBlockSelector && (
        <div className="w-64 bg-zinc-900 border-r border-zinc-800 overflow-y-auto">
          <BlockSelector onSelectBlock={addBlock} />
        </div>
      )}

      {/* Canvas */}
      <div className="flex-1 overflow-y-auto p-8 bg-zinc-950">
        <div className="max-w-6xl mx-auto bg-white min-h-screen shadow-2xl">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map(b => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-zinc-400">
                  <div className="text-center">
                    <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No hay bloques</p>
                    <p className="text-sm">Haz clic en + para añadir un bloque</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={generateWithAI}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generar con IA
                    </Button>
                  </div>
                </div>
              ) : (
                blocks.map((block) => (
                  <SortableBlock
                    key={block.id}
                    block={block}
                    isSelected={selectedBlock === block.id}
                    onSelect={() => setSelectedBlock(block.id)}
                    onDelete={() => deleteBlock(block.id)}
                    onDuplicate={() => duplicateBlock(block.id)}
                  />
                ))
              )}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Properties Panel */}
      {selectedBlockData && (
        <div className="w-80 bg-zinc-900 border-l border-zinc-800 overflow-y-auto">
          <BlockEditor
            block={selectedBlockData}
            onUpdate={(updates) => updateBlock(selectedBlockData.id, updates)}
            onClose={() => setSelectedBlock(null)}
          />
        </div>
      )}
    </div>
  );
}

function getDefaultContent(blockType: string): any {
  const defaults: Record<string, any> = {
    hero: {
      title: 'Título Principal',
      subtitle: 'Subtítulo descriptivo',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200',
      cta: 'Comenzar',
    },
    text: {
      content: '<p>Escribe tu contenido aquí...</p>',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
      alt: 'Imagen',
      caption: '',
    },
    grid: {
      columns: 3,
      items: [
        { title: 'Item 1', description: 'Descripción', icon: '📰' },
        { title: 'Item 2', description: 'Descripción', icon: '✨' },
        { title: 'Item 3', description: 'Descripción', icon: '🚀' },
      ],
    },
    cta: {
      title: 'Llamado a la Acción',
      description: 'Descripción convincente',
      buttonText: 'Acción',
      buttonUrl: '#',
    },
  };

  return defaults[blockType] || {};
}

