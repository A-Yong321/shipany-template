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

interface ExploreMasonryProps {
  items: MasonryItem[];
  searchPlaceholder?: string;
}

export function ExploreMasonry({ items, searchPlaceholder = "Search..." }: ExploreMasonryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 过滤items
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative max-w-md w-full ml-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {filteredItems.map((item, index) => (
          <Link
            key={`${index}-${item.title}`}
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
              {item.video && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                  </div>
              )}
              {item.badge && (
                <div className={cn(
                  "absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium z-10",
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
      
      {filteredItems.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
              No effects found matching "{searchQuery}"
          </div>
      )}
    </div>
  );
}
