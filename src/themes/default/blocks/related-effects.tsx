'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface RelatedEffect {
  title: string;
  description: string;
  image: string;
  url: string;
  prompt?: string;
}

interface RelatedEffectsProps {
  /** 相关effects列表 */
  effects: RelatedEffect[];
  /** 点击effect时的回调,用于填入prompt */
  onEffectClick?: (prompt: string) => void;
}

/**
 * 相关Effects推荐组件
 * 显示相关的effects列表,点击可自动填入prompt
 */
export function RelatedEffects({ effects, onEffectClick }: RelatedEffectsProps) {
  const [hoveredEffect, setHoveredEffect] = useState<string | null>(null);

  const handleEffectClick = (effect: RelatedEffect) => {
    if (effect.prompt && onEffectClick) {
      onEffectClick(effect.prompt);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Related Effects</h2>
      
      <div className="space-y-3">
        {effects.map((effect, index) => (
          <Link
            key={index}
            href={effect.url}
            onClick={() => handleEffectClick(effect)}
            onMouseEnter={() => setHoveredEffect(effect.title)}
            onMouseLeave={() => setHoveredEffect(null)}
            className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-md"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={effect.image}
                alt={effect.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-1">
                  <h3 className="text-sm font-medium leading-tight group-hover:text-primary">
                    {effect.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {effect.description}
                  </p>
                </div>
                <ChevronRight
                  className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform ${
                    hoveredEffect === effect.title ? 'translate-x-1 text-primary' : ''
                  }`}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
