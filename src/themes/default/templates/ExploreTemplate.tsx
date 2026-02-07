import { getTranslations } from 'next-intl/server';
import { ExploreLayout } from '@/themes/default/blocks/explore-layout';
import { ExploreMasonry } from '@/themes/default/blocks/explore-masonry';

interface EffectItem {
  title: string;
  image: { src: string; alt: string } | string;
  video?: string;
  url: string;
  badge?: string;
}

interface Tab {
  items: any[];
}

export async function ExploreTemplate() {
  const t = await getTranslations('pages.explore');
  const tPhoto = await getTranslations('pages.photo-effects');
  const tVideo = await getTranslations('pages.video-effects');
  
  // Helper to extract items from tabs
  const extractItems = (tabs: any[]) => {
    return tabs.flatMap((tab: any) => tab.items || []);
  };

  // Get raw data
  const photoTabs = tPhoto.raw('page.sections.effects.tabs') as any[];
  const videoTabs = tVideo.raw('page.sections.effects.tabs') as any[];

  const photoItems = extractItems(photoTabs).map((item: any) => ({
    title: item.title,
    image: item.image?.src || item.src, // Handle potentially different structures
    video: null,
    url: item.url,
    badge: item.badge,
  }));

  const videoItems = extractItems(videoTabs).map((item: any) => ({
    title: item.title,
    image: item.image?.src || item.src,
    video: item.video,
    url: item.url,
    badge: item.badge,
  }));

  const allEffects = [...videoItems, ...photoItems].filter(item => item.image && item.url);
  
  return (
    <ExploreLayout>
      <div className="space-y-6">
        {/* Title Area */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>
        
        {/* Masonry Layout with Search (Search moved inside) */}
        <ExploreMasonry 
          items={allEffects} 
          searchPlaceholder={t('search_placeholder')}
        />
      </div>
    </ExploreLayout>
  );
}
