'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { tools, ToolType } from '@/data/tools-data';

export function ToolsPage({
  locale,
  initialType,
}: {
  locale: string;
  initialType?: string;
}) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<ToolType>(
    (initialType as ToolType) || (searchParams?.get('type') as ToolType) || 'video'
  );

  // 根据类型筛选工具
  const filteredTools = tools.filter((tool) => tool.type === activeTab);

  // 为每个工具类型选择一个代表性场景(第一个)
  const toolCards = filteredTools.map((tool) => ({
    ...tool,
    representativeItem: tool.items[0], // 选择第一个场景作为代表
  }));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              {locale === 'zh' ? '探索所有 AI 工具' : 'Explore All AI Tools'}
            </h1>
            <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">
              {locale === 'zh'
                ? '从我们全面的 AI 驱动视频和照片工具集合中选择'
                : 'Choose from our comprehensive collection of AI-powered video and photo tools'}
            </p>

            {/* Tabs */}
            <div className="flex justify-center mt-12">
              <div className="inline-flex items-center bg-zinc-900/80 backdrop-blur-sm p-1.5 rounded-full border border-zinc-800">
                <button
                  onClick={() => setActiveTab('video')}
                  className={cn(
                    'px-8 py-3 rounded-full text-base font-semibold transition-all duration-300',
                    activeTab === 'video'
                      ? 'bg-white text-black shadow-lg shadow-white/10'
                      : 'text-zinc-400 hover:text-white'
                  )}
                >
                  {locale === 'zh' ? '视频工具' : 'Video Tools'}
                </button>
                <button
                  onClick={() => setActiveTab('photo')}
                  className={cn(
                    'px-8 py-3 rounded-full text-base font-semibold transition-all duration-300',
                    activeTab === 'photo'
                      ? 'bg-white text-black shadow-lg shadow-white/10'
                      : 'text-zinc-400 hover:text-white'
                  )}
                >
                  {locale === 'zh' ? '图片工具' : 'Image Tools'}
                </button>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {toolCards.map((tool) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ToolCard({
  tool,
  locale,
}: {
  tool: any;
  locale: string;
}) {
  const item = tool.representativeItem;
  const detailUrl = tool.type === 'video' 
    ? `/video-effects/${tool.slug}` 
    : `/photo-effects/${tool.slug}`;

  return (
    <Link
      href={detailUrl}
      className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer block"
    >
      {/* 原图 */}
      <Image
        src={item.originalSrc}
        alt={tool.title}
        fill
        className="object-cover transition-opacity duration-700 group-hover:opacity-0"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />

      {/* 效果图或视频 */}
      {tool.type === 'video' && item.videoSrc ? (
        <video
          src={item.videoSrc}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          muted
          loop
          playsInline
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
      ) : item.effectSrc ? (
        <Image
          src={item.effectSrc}
          alt={`${tool.title} - Effect`}
          fill
          className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      ) : null}

      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {/* Badge */}
        {item.badge && (
          <div className="absolute top-4 left-4">
            <span
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-bold text-white uppercase',
                item.badge === 'HOT'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500'
                  : 'bg-green-500'
              )}
            >
              {item.badge}
            </span>
          </div>
        )}

        {/* Title */}
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2 relative z-10">
          <h3 className="text-xl font-bold text-white leading-tight">
            {tool.title}
          </h3>
          <p className="text-xs text-white/60 font-medium uppercase tracking-wider mt-2 border-l-2 border-white/30 pl-2">
            {tool.items.length} {locale === 'zh' ? '种效果' : 'Effects'}
          </p>
        </div>
      </div>
    </Link>
  );
}
