'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ToolSidebar } from './tool-sidebar';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { HowToSection, FAQSection } from './tool-bottom-sections';

interface Effect {
  id: string;
  title: string;
  beforeImage?: { src: string; alt: string };
  image: { src: string; alt: string };
  video?: string;
  badge?: string | null;
  count: string;
  url: string;
}

interface Tab {
  id: string;
  label: string;
  items: Effect[];
}

interface AIStyleEffectsProps {
  section: {
    title: string;
    description: string;
    photo_effects_key?: string;
    video_effects_key?: string;
  };
  defaultTab?: 'photo' | 'video';
  layout?: 'sidebar' | 'top-nav';
}

export function AIStyleEffects({ 
  section,
  defaultTab = 'photo',
  layout = 'sidebar'
}: AIStyleEffectsProps) {
  const [activeMainTab, setActiveMainTab] = useState<'photo' | 'video'>(defaultTab);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 加载photo和video effects数据
  const photoEffectsT = useTranslations('pages.photo-effects');
  const videoEffectsT = useTranslations('pages.video-effects');
  const t = useTranslations('pages.ai-style');

  // 获取当前激活的effects数据
  const currentEffectsT = activeMainTab === 'photo' ? photoEffectsT : videoEffectsT;
  const tabs: Tab[] = currentEffectsT.raw('page.sections.effects.tabs') || [];

  // 获取 How To 和 FAQ 数据
  const howToData = currentEffectsT.raw('page.sections.how_to') || t.raw('page.sections.how_to');
  const faqData = t.raw('page.sections.faq');

  // 获取当前分类的effects并应用搜索过滤
  const allCategoryEffects = tabs.find(tab => tab.id === activeCategory)?.items || [];
  const currentEffects = searchQuery
    ? allCategoryEffects.filter(effect =>
        effect.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allCategoryEffects;

  // 处理主标签切换
  const handleMainTabChange = (tab: 'photo' | 'video') => {
    setActiveMainTab(tab);
    setActiveCategory('all'); // 重置为"全部"
    setSearchQuery(''); // 清空搜索
  };

  // 处理分类切换
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchQuery(''); // 清空搜索
  };

  // 辅助函数：处理 URL 编码
  const getEncodedUrl = (url: string) => {
    try {
      const [path, query] = url.split('?');
      if (!query) return url;
      
      const params = new URLSearchParams(query);
      const type = params.get('type');
      if (type) {
        // 重新编码 type 参数
        params.set('type', type); // URLSearchParams 会自动编码
        return `${path}?${params.toString()}`;
      }
      return url;
    } catch (e) {
      return url;
    }
  };



  // Main Layout Structure
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar - Desktop (Only if layout is 'sidebar') */}
      {layout === 'sidebar' && (
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 border-r border-border bg-card/30">
          <div className="sticky top-0 h-screen overflow-y-auto py-6">
            <ToolSidebar />
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <div className={cn(
          "container mx-auto space-y-8",
          layout === 'sidebar' ? "p-6 lg:p-10 max-w-[1600px]" : "pt-32 px-6 lg:px-10 max-w-7xl"
        )}>
          
          {/* Header Section */}
          {layout === 'top-nav' ? (
            // Top Nav Layout Header
            <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                  {section.title}
                </h1>
                <p className="text-xl text-muted-foreground font-medium">
                  {section.description}
                </p>
              </div>

              {/* Main Tabs (Photo/Video) - Centered */}
              <div className="flex p-1.5 bg-secondary/50 backdrop-blur-sm rounded-full border border-border/50">
                <button
                  onClick={() => handleMainTabChange('video')}
                  className={cn(
                    "px-8 py-3 rounded-full font-bold text-lg transition-all duration-300",
                    activeMainTab === 'video'
                      ? "bg-background text-foreground shadow-lg scale-105"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Video Effects
                </button>
                <button
                  onClick={() => handleMainTabChange('photo')}
                  className={cn(
                    "px-8 py-3 rounded-full font-bold text-lg transition-all duration-300",
                    activeMainTab === 'photo'
                      ? "bg-background text-foreground shadow-lg scale-105"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Photo Effects
                </button>
              </div>
            </div>
          ) : (
            // Sidebar Layout Header
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-border/40 pb-6">
              <h1 className="text-3xl font-bold">{section.title}</h1>
              {/* Search is handled below for top-nav, but sidebar has it here usually. 
                  Let's unify search placement or keep sidebar's here if preferred. 
                  For now keeping sidebar search here as per previous code. */}
               <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('ui.searchPlaceholder')}
                  className="w-full px-4 py-2.5 pl-10 pr-10 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-secondary/80 transition-colors"
                  >
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Filters & Content Area */}
          <div className="flex flex-col gap-6">
            
            {/* Category Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Categories - Left Aligned */}
              <div className="flex flex-wrap gap-2">
                 {/* Special "All" Tab style if needed, or just map all */}
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleCategoryChange(tab.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                      activeCategory === tab.id
                        ? "bg-foreground text-background border-foreground shadow-md"
                        : "bg-background text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

               {/* Search for Top-Nav Layout (placed on the right of categories line) */}
               {layout === 'top-nav' && (
                  <div className="relative w-full md:w-64 shrink-0">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('ui.searchPlaceholder')}
                      className="w-full px-4 py-2 pl-9 rounded-full bg-secondary/30 border border-border/50 focus:border-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all text-sm"
                    />
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
               )}
            </div>

            {/* Results Grid */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                 <h2 className="text-lg font-semibold flex items-center gap-2">
                    {activeCategory === 'all' ? 'All Effects' : tabs.find(t => t.id === activeCategory)?.label}
                    <span className="text-sm font-normal text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">
                      {currentEffects.length}
                    </span>
                 </h2>
               </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {currentEffects.map((effect) => (
                    <Link
                      key={effect.id}
                      href={getEncodedUrl(effect.url)}
                      className="group relative bg-card rounded-2xl overflow-hidden border border-border/40 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 block h-full flex flex-col"
                    >
                      {/* Image/Video Aspect Ratio Container */}
                      <div className="aspect-[3/4] relative overflow-hidden bg-muted/30">
                        {effect.video ? (
                          <video
                            src={effect.video}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                        ) : (
                          <>
                            {/* Default Image */}
                            <img
                              src={effect.image.src}
                              alt={effect.image.alt}
                              className={`w-full h-full object-cover transition-opacity duration-500 ${effect.beforeImage ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
                              loading="lazy"
                            />
                            
                            {/* Before Image (Hover) */}
                            {effect.beforeImage && (
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                   <img
                                      src={effect.beforeImage.src}
                                      alt={effect.beforeImage.alt}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                   />
                                   <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
                                      Original
                                   </div>
                              </div>
                            )}
                          </>
                        )}
                        
                        {/* Badge */}
                        {effect.badge && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg z-10 uppercase tracking-wide">
                            {effect.badge}
                          </div>
                        )}
                      </div>

                      {/* Effect Info */}
                      <div className="p-4 bg-card border-t border-border/40 flex-1 flex flex-col justify-between">
                        <h3 className="font-bold text-base mb-2 group-hover:text-blue-500 transition-colors line-clamp-1">
                          {effect.title}
                        </h3>
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <p className="text-muted-foreground text-xs flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {/* Simple format number */}
                            <span>{effect.count}</span>
                          </p>
                          <span className="text-xs font-semibold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                            Try Now →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
            </div>

            {/* Bottom Sections */}
            <div className="mt-12 space-y-12">
               {howToData && <HowToSection {...howToData} />}
               {faqData && <FAQSection {...faqData} />}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}


