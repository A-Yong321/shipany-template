'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Flame, Play } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

type EffectItem = {
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

type TabData = {
  id: string;
  label: string;
  items: EffectItem[];
};

export function EffectsSection({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(section.tabs?.[0]?.id || 'video');

  return (
    <section
      id={section.id}
      className={cn('py-24 bg-black text-white relative overflow-hidden', className)}
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">
              {section.description}
            </p>
          )}

          {/* Tabs */}
          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center bg-zinc-900/80 backdrop-blur-sm p-1.5 rounded-full border border-zinc-800">
              {section.tabs?.map((tab: TabData) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-8 py-3 rounded-full text-base font-semibold transition-all duration-300',
                    activeTab === tab.id
                      ? 'bg-white text-black shadow-lg shadow-white/10'
                      : 'text-zinc-400 hover:text-white'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {section.tabs
            ?.find((t: TabData) => t.id === activeTab)
            ?.items.map((item: EffectItem, index: number) => (
              <EffectCard key={index} item={item} itemsLabel={section.items_label} />
            ))}
        </div>
      </div>
    </section>
  );
}

function EffectCard({ item, itemsLabel }: { item: EffectItem; itemsLabel?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 兼容新旧数据结构
  const originalImage = item.originalSrc || item.beforeImage?.src || item.image?.src;
  const effectImage = item.effectSrc || item.image?.src;
  const videoSrc = item.videoSrc || item.video;
  const hasVideo = !!videoSrc;
  const hasEffectImage = !!item.effectSrc || !!item.beforeImage;

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay restriction if needed
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Optional: Reset to start
      // videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      href={item.url || '#'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer block"
    >
      {/* 原图 - 始终显示 */}
      {originalImage && (
        <Image
          src={originalImage}
          alt={item.title}
          fill
          className={cn(
            "object-cover transition-opacity duration-700",
            hasVideo || hasEffectImage ? "group-hover:opacity-0" : "group-hover:scale-110"
          )}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
      )}

      {/* 效果图 - 仅用于照片特效(无视频时) */}
      {effectImage && !hasVideo && (
        <Image
          src={effectImage}
          alt={`${item.title} - 效果`}
          fill
          className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
      )}

      {/* 视频 - 仅用于视频特效 */}
      {hasVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          muted
          loop
          playsInline
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
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

        {/* Bottom Text */}
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2 relative z-10">
          <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
          <p className="text-xs text-white/60 font-medium uppercase tracking-wider mt-2 border-l-2 border-white/30 pl-2">
            {itemsLabel || 'Natural mess'}
          </p>
        </div>
      </div>
    </Link>
  );
}
