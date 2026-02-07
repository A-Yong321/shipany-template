import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getMetadata } from '@/shared/lib/seo';
import { AIStyleEffects } from '@/themes/default/blocks/ai-style-effects';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
  metadataKey: 'pages.photo-effects.metadata',
  canonicalUrl: '/photo-effects',
});

export default async function PhotoEffectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 加载AI Style数据
  const t = await getTranslations('pages.photo-effects');
  
  const section = {
    title: t.raw('page.title') || 'AI Photo Effects',
    description: t.raw('page.description') || 'Explore all AI photo effects',
    photo_effects_key: 'pages.photo-effects',
    video_effects_key: 'pages.video-effects',
  };

  return <AIStyleEffects section={section} defaultTab="photo" layout="top-nav" />;
}
