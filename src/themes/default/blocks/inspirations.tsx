'use client';

import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { useState } from 'react';
import { Heart, Share2, MoreHorizontal } from 'lucide-react';

interface InspirationItem {
  id: string;
  image: string;
  author: string;
  avatar?: string;
  likes: number;
  platform?: 'tiktok' | 'instagram' | 'twitter';
}

interface InspirationsProps {
  items: InspirationItem[];
}

export function Inspirations({ items = [] }: InspirationsProps) {
  const [activeTab, setActiveTab] = useState<'inspirations' | 'creations'>('inspirations');

  // Placeholder items if none provided
  const displayItems = items.length > 0 ? items : [
    { id: '1', image: '/imgs/cms/AI-Kissing_正常接吻_1.png', author: 'Anna', likes: 124, platform: 'tiktok' },
    { id: '2', image: '/imgs/cms/AI-Kissing_正常接吻_2.png', author: 'Mike', likes: 89, platform: 'instagram' },
    { id: '3', image: '/imgs/cms/AI-Kissing_脸颊之吻_1.png', author: 'Sarah', likes: 256, platform: 'tiktok' },
    { id: '4', image: '/imgs/cms/AI-Kissing_脸颊之吻_2.png', author: 'John', likes: 45 },
    { id: '5', image: '/imgs/cms/Hug_拥抱_1.png', author: 'Emily', likes: 567, platform: 'instagram' },
  ];

  return (
    <div className="flex h-full flex-col">
       <div className="flex items-center gap-4 border-b border-border/50 pb-4">
        <button
          onClick={() => setActiveTab('inspirations')}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
             activeTab === 'inspirations' 
             ? "bg-foreground text-background" 
             : "text-muted-foreground hover:bg-muted"
          )}
        >
          Inspirations
        </button>
        {/* <button
          onClick={() => setActiveTab('creations')}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
             activeTab === 'creations'
             ? "bg-foreground text-background"
             : "text-muted-foreground hover:bg-muted"
          )}
        >
          My Creations
        </button> */}
      </div>

      <div className="flex-1 overflow-y-auto pt-6 scrollbar-hide">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-20">
          {displayItems.map((item, i) => (
             <div key={i} className="group relative break-inside-avoid overflow-hidden rounded-xl bg-muted/30">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={item.image}
                    alt={`Inspiration by ${item.author}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Platform Icon */}
                  {item.platform === 'tiktok' && (
                     <div className="absolute top-2 left-2 rounded-full bg-black/20 p-1 backdrop-blur-sm">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                     </div>
                  )}
                  
                  {/* Stats */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-medium truncate max-w-[80px]">@{item.author}</span>
                    <div className="flex items-center gap-1 text-xs">
                       <Heart className="w-3 h-3" /> {item.likes}
                    </div>
                  </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
