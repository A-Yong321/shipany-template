import { getTranslations } from 'next-intl/server';
import { ExploreLayout } from '@/themes/default/blocks/explore-layout';
import { ExploreMasonry } from '@/themes/default/blocks/explore-masonry';
import { tools } from '@/data/tools';

export async function ExploreTemplate() {
  const t = await getTranslations('pages.explore');
  
  // 收集所有effects
  const allEffects = tools.flatMap(tool => 
    tool.items.map(item => ({
      title: item.title,
      image: item.effectSrc || item.originalSrc,
      video: item.videoSrc,
      url: tool.type === 'video' 
        ? `/video-effects/${tool.slug}?type=${encodeURIComponent(item.title)}`
        : `/photo-effects/${tool.slug}?type=${encodeURIComponent(item.title)}`,
      badge: item.badge,
    }))
  );
  
  return (
    <ExploreLayout>
      <div className="space-y-6">
        {/* 标题区域 */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
          
          {/* 搜索框 */}
          <div className="relative w-80">
            <input
              type="text"
              placeholder={t('search_placeholder')}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        
        {/* 瀑布流布局 */}
        <ExploreMasonry items={allEffects} />
      </div>
    </ExploreLayout>
  );
}
