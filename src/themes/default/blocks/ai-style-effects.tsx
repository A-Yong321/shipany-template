'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ToolDetailLayout } from './tool-detail-layout';
import Link from 'next/link';
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
}

export function AIStyleEffects({ section }: AIStyleEffectsProps) {
  const [activeMainTab, setActiveMainTab] = useState<'photo' | 'video'>('photo');
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
  const howToData = t.raw('page.sections.how_to');
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

  // 主内容区域 - 显示搜索框、大标签和分类标签
  const mainContent = (
    <div className="space-y-6">
      {/* 搜索框 */}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ui.searchPlaceholder')}
            className="w-full px-4 py-3 pl-11 pr-10 rounded-xl bg-secondary/50 border border-border/50 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-foreground placeholder:text-muted-foreground"
          />
          {/* 搜索图标 */}
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {/* 清空按钮 */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary/80 transition-colors"
            >
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 一级标签 - 大按钮样式 */}
      <div className="flex gap-4">
        <button
          onClick={() => handleMainTabChange('photo')}
          className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-sm ${
            activeMainTab === 'photo'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/50'
              : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary/70'
          }`}
        >
          Photo
        </button>
        <button
          onClick={() => handleMainTabChange('video')}
          className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-sm ${
            activeMainTab === 'video'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/50'
              : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary/70'
          }`}
        >
          Video
        </button>
      </div>

      {/* 二级分类标签 - 自动换行 */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleCategoryChange(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === tab.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-secondary/60 text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 当前分类信息 */}
      <div className="pt-2">
        <p className="text-sm text-muted-foreground">
          {t('ui.effectsCount', { count: currentEffects.length })}
        </p>
      </div>
    </div>
  );

  // 右侧Effects网格
  const effectsGrid = (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">
        {tabs.find(tab => tab.id === activeCategory)?.label || '全部特效'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        {currentEffects.map((effect) => (
          <Link
            key={effect.id}
            href={getEncodedUrl(effect.url)}
            className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
          >
            {/* 效果图片或视频 */}
            <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-muted to-muted/50">
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
                  {/* Photo Effects: Hover Comparison */}
                  {/* Default Image (Result) */}
                  <img
                    src={effect.image.src}
                    alt={effect.image.alt}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${effect.beforeImage ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
                    loading="lazy"
                  />
                  
                  {/* Before Image (Original) - Shown on Hover */}
                  {effect.beforeImage && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                         <img
                            src={effect.beforeImage.src}
                            alt={effect.beforeImage.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                         />
                         <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                            Original
                         </div>
                    </div>
                  )}

                  {/* Result Label - Shown by default */}
                  {effect.beforeImage && (
                     <div className="absolute top-2 left-2 bg-blue-600/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-300">
                        Result
                     </div>
                  )}
                </>
              )}
              
              {/* HOT标签 - 右上角 */}
              {effect.badge && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg z-10">
                  {effect.badge}
                </div>
              )}

              {/* 播放按钮覆盖层 - 只在视频或非悬停对比图片时显示增强交互感 */}
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${effect.beforeImage ? 'hidden' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* 效果信息 */}
            <div className="p-3 bg-card relative z-20">
              <h3 className="font-semibold text-sm mb-1 group-hover:text-blue-500 transition-colors line-clamp-1">
                {effect.title}
              </h3>
              <p className="text-muted-foreground text-xs flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
                {t('ui.usageCount', { count: effect.count })}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* 空状态 */}
      {currentEffects.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">
            {searchQuery ? '🔍' : '🎨'}
          </div>
          <p className="text-muted-foreground">
            {searchQuery ? t('ui.noResultsFound', { query: searchQuery }) : t('ui.noEffects')}
          </p>
        </div>
      )}
    </div>
  );

  const bottomContent = (
    <>
        {howToData && <HowToSection {...howToData} />}
        {faqData && <FAQSection {...faqData} />}
    </>
  );

  return (
    <ToolDetailLayout
      relatedEffects={effectsGrid}
      bottomContent={bottomContent}
    >
      {mainContent}
    </ToolDetailLayout>
  );
}
