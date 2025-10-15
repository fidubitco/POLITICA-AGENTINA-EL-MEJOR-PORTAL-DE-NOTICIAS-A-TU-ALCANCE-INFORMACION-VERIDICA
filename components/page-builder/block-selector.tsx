'use client';

import { Newspaper, Type, Image as ImageIcon, Grid3x3, Megaphone, Video, Quote, List } from 'lucide-react';

interface BlockSelectorProps {
  onSelectBlock: (blockType: string) => void;
}

const AVAILABLE_BLOCKS = [
  { type: 'hero', name: 'Hero', icon: Newspaper, description: 'Sección hero principal' },
  { type: 'text', name: 'Texto', icon: Type, description: 'Bloque de texto enriquecido' },
  { type: 'image', name: 'Imagen', icon: ImageIcon, description: 'Imagen con caption' },
  { type: 'grid', name: 'Grid', icon: Grid3x3, description: 'Grid de elementos' },
  { type: 'cta', name: 'CTA', icon: Megaphone, description: 'Llamado a la acción' },
  { type: 'video', name: 'Video', icon: Video, description: 'Embed de video' },
  { type: 'quote', name: 'Cita', icon: Quote, description: 'Bloque de cita' },
  { type: 'list', name: 'Lista', icon: List, description: 'Lista de items' },
];

export default function BlockSelector({ onSelectBlock }: BlockSelectorProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
        Añadir Bloque
      </h3>
      
      <div className="space-y-2">
        {AVAILABLE_BLOCKS.map((block) => {
          const Icon = block.icon;
          return (
            <button
              key={block.type}
              onClick={() => onSelectBlock(block.type)}
              className="w-full flex items-start gap-3 p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-left"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-700 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{block.name}</p>
                <p className="text-xs text-zinc-400 line-clamp-1">{block.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

