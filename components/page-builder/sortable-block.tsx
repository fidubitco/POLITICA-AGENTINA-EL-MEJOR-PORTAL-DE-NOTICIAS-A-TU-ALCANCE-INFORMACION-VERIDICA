'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Copy } from 'lucide-react';

interface SortableBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export default function SortableBlock({
  block,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`
        relative group
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${isDragging ? 'z-50' : ''}
      `}
    >
      {/* Drag Handle & Actions */}
      <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex flex-col gap-1">
          <button
            {...attributes}
            {...listeners}
            className="p-2 bg-zinc-800 rounded hover:bg-zinc-700 cursor-move"
          >
            <GripVertical className="w-4 h-4 text-zinc-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="p-2 bg-zinc-800 rounded hover:bg-zinc-700"
          >
            <Copy className="w-4 h-4 text-zinc-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 bg-zinc-800 rounded hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Block Content Preview */}
      <div className="p-4 border-2 border-transparent group-hover:border-blue-400 transition-colors">
        {renderBlockPreview(block)}
      </div>
    </div>
  );
}

function renderBlockPreview(block: { type: string; content: any }) {
  switch (block.type) {
    case 'hero':
      return (
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold mb-2">{block.content.title}</h1>
            <p className="text-xl">{block.content.subtitle}</p>
          </div>
        </div>
      );
    
    case 'text':
      return (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: block.content.content }} />
      );
    
    case 'image':
      return (
        <div className="text-center">
          <img
            src={block.content.url}
            alt={block.content.alt}
            className="max-w-full h-auto rounded-lg"
          />
          {block.content.caption && (
            <p className="text-sm text-zinc-600 mt-2">{block.content.caption}</p>
          )}
        </div>
      );
    
    case 'grid':
      return (
        <div className={`grid grid-cols-${block.content.columns} gap-4`}>
          {block.content.items.map((item: any, i: number) => (
            <div key={i} className="p-4 bg-zinc-50 rounded-lg text-center">
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-600">{item.description}</p>
            </div>
          ))}
        </div>
      );
    
    case 'cta':
      return (
        <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-2">{block.content.title}</h2>
          <p className="text-lg mb-4">{block.content.description}</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
            {block.content.buttonText}
          </button>
        </div>
      );
    
    default:
      return (
        <div className="p-4 bg-zinc-100 rounded text-center text-zinc-500">
          Bloque: {block.type}
        </div>
      );
  }
}

