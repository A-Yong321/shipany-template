'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';

interface MasonryItem {
  title: string;
  image: string;
  video?: string;
  url: string;
  badge?: string;
}

export function ExploreMasonry({ items }: { items: MasonryItem[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 过滤items
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
      {filteredItems.map((item, index) => (
        <Link
          key={index}
          href={item.url}
          className="block mb-4 break-inside-avoid"
        >
          <div className="relative group overflow-hidden rounded-lg bg-muted/20 border border-border hover:border-primary/50 transition-all">
            <Image
              src={item.image}
              alt={item.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform group-hover:scale-105"
            />
            {item.badge && (
              <div className={cn(
                "absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium",
                item.badge === 'HOT' && "bg-red-500 text-white",
                item.badge === 'NEW' && "bg-blue-500 text-white"
              )}>
                {item.badge}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium">
                {item.title}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
