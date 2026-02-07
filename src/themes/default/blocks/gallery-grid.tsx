'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  type: 'video' | 'photo';
  isFavorite: boolean;
  createdAt: Date;
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const t = useTranslations('pages.gallery.tabs');
  const [selectedTab, setSelectedTab] = useState<'all' | 'images' | 'videos' | 'favorites'>('all');
  
  // 根据标签页筛选
  const filteredItems = items.filter(item => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'images') return item.type === 'photo';
    if (selectedTab === 'videos') return item.type === 'video';
    if (selectedTab === 'favorites') return item.isFavorite;
    return true;
  });
  
  const tabs = [
    { key: 'all' as const, label: t('all_creations') },
    { key: 'images' as const, label: t('images') },
    { key: 'videos' as const, label: t('videos') },
    { key: 'favorites' as const, label: t('favorites') },
  ];
  
  return (
    <div className="space-y-6">
      {/* 标签页 */}
      <div className="flex gap-6 border-b border-border">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={cn(
              "px-1 py-3 transition-colors relative",
              selectedTab === tab.key
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {selectedTab === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
      
      {/* 图片网格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-lg bg-muted/20 border border-border hover:border-primary/50 transition-all aspect-[3/4] cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {item.type === 'video' && (
              <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium">
                VIDEO
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium truncate">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
