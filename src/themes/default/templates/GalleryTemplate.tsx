import { getTranslations } from 'next-intl/server';
import { ExploreLayout } from '@/themes/default/blocks/explore-layout';
import { GalleryGrid } from '@/themes/default/blocks/gallery-grid';
import { tools } from '@/data/tools';

export async function GalleryTemplate() {
  const t = await getTranslations('pages.gallery');
  
  // 使用现有effects作为占位数据
  const galleryItems = tools.flatMap(tool => 
    tool.items.map(item => ({
      id: `${tool.slug}-${item.title}`,
      title: item.title,
      image: item.effectSrc || item.originalSrc,
      type: tool.type, // 'video' or 'photo'
      isFavorite: Math.random() > 0.7, // 随机标记为收藏
      createdAt: new Date(),
    }))
  );
  
  return (
    <ExploreLayout>
      <div className="space-y-6">
        {/* 标题和Select Multiple按钮 */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <button className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium">
            {t('select_multiple')}
          </button>
        </div>
        
        {/* 标签页和网格 */}
        <GalleryGrid items={galleryItems} />
      </div>
    </ExploreLayout>
  );
}
