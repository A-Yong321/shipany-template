'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

type CreationItem = {
  image: {
    src: string;
    alt: string;
  };
  type?: 'video' | 'image';
  user?: string;
  aspectRatio?: string; // e.g. "aspect-[3/4]"
};

type TabData = {
  id: string;
  label: string;
};

// Mock sub-filters correctly
const subFilters = [
  "Art Gallery", "POLLO 2.5", "AI MV", "Playful", "WAN", "SORA 2", "Passion", "Commercial", "Nature", "Character"
];

export function CreationsSection({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(section.tabs?.[0]?.id || 'all');

  return (
    <section
      id={section.id}
      className={cn('py-24 bg-black text-white relative', className)}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center space-y-8 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {section.title}
          </h2>
          
          {/* Main Tabs */}
          <div className="flex justify-center flex-wrap gap-2">
            <div className="inline-flex items-center flex-wrap justify-center gap-1 bg-zinc-900/50 p-1.5 rounded-full border border-zinc-800">
              {section.tabs?.map((tab: TabData) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeTab === tab.id
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub Filters */}
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500">
            {subFilters.map((filter, index) => (
              <button key={index} className="hover:text-white transition-colors">
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {section.items?.map((item: any, index: number) => (
            <div
              key={index}
              className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={500}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* User Info / Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.type === 'video' && (
                       <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50">
                        <Play size={20} className="fill-white text-white ml-1" />
                       </div>
                  )}
              </div>
              
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <p className="text-xs text-white/90 font-medium">1PhotoAI</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
