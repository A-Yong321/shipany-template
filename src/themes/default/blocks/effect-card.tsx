'use client';

import { useState } from 'react';
import { Flame } from 'lucide-react';
import { Link } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { LazyImage, LazyVideo } from '@/shared/blocks/common';

export type EffectItem = {
  title: string;
  // 新数据结构 (from tools.ts)
  originalSrc?: string;
  effectSrc?: string;
  videoSrc?: string;
  // 旧数据结构 (向后兼容)
  image?: {
    src: string;
    alt: string;
  };
  beforeImage?: {
    src: string;
    alt: string;
  };
  video?: string;
  count?: string;
  badge?: 'HOT' | 'NEW';
  url?: string;
};

export function EffectCard({ 
  item, 
  itemsLabel, 
  buttonText 
}: { 
  item: EffectItem; 
  itemsLabel?: string; 
  buttonText?: string; 
}) {
  const [isHovered, setIsHovered] = useState(false);

  // 兼容新旧数据结构
  const originalImage = item.originalSrc || item.beforeImage?.src || item.image?.src;
  const effectImage = item.effectSrc || item.image?.src;
  const videoSrc = item.videoSrc || item.video;
  const hasVideo = !!videoSrc;
  const hasEffectImage = !!item.effectSrc || !!item.beforeImage;

  return (
    <Link
      href={item.url || '#'}
      prefetch={false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer block"
    >
      {/* 原图 - 始终显示 */}
      {originalImage && (
        <LazyImage
          src={originalImage}
          alt={item.title}
          fill
          className={cn(
            "transition-opacity duration-700",
            (isHovered && (hasVideo || hasEffectImage)) ? "opacity-0" : "opacity-100"
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

      )}

      {/* 效果图 - 仅用于照片特效(无视频时) */}
      {effectImage && !hasVideo && (
        <div className={cn("absolute inset-0 transition-opacity duration-700", isHovered ? "opacity-100" : "opacity-0")}>
           <LazyImage
             src={effectImage}
             alt={`${item.title} - 效果`}
             fill
             sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
           />
        </div>
      )}

      {/* 视频 - 仅用于视频特效 */}
      {hasVideo && (
        <div className={cn("absolute inset-0 transition-opacity duration-300", isHovered ? "opacity-100" : "opacity-0")}>
           <LazyVideo
             src={videoSrc!}
             autoPlayOnVisible={false}
             className="w-full h-full"
           />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {item.badge && (
            <span
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-bold text-white uppercase',
                item.badge === 'HOT' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-green-500'
              )}
            >
              {item.badge}
            </span>
          )}
          {item.count && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-xs font-medium text-white/90">
              <Flame size={12} className="text-orange-500 fill-orange-500" />
              {item.count}
            </span>
          )}
        </div>

        {/* Bottom Text & Button */}
        <div className="relative z-10 flex flex-col gap-2">
          <div className="transform transition-all duration-300 group-hover:-translate-y-1">
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight line-clamp-2">{item.title}</h3>
            {!buttonText && (
              <p className="text-xs text-white/60 font-medium uppercase tracking-wider mt-1 border-l-2 border-white/30 pl-2">
                {itemsLabel || 'Try Effect'}
              </p>
            )}
          </div>
          
          {buttonText && (
             <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <div className="bg-white text-black text-sm font-bold py-2 px-4 rounded-full text-center hover:bg-gray-100 transition-colors w-full">
                  {buttonText}
                </div>
             </div>
          )}
        </div>
      </div>
    </Link>
  );
}
