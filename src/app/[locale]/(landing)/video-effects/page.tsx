import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getMetadata } from '@/shared/lib/seo';
import { AIStyleEffects } from '@/themes/default/blocks/ai-style-effects';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
  metadataKey: 'pages.video-effects.metadata',
  canonicalUrl: '/video-effects',
});

export default async function VideoEffectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 加载AI Style数据
  const t = await getTranslations('pages.video-effects');
  
  const section = {
    title: t.raw('page.title') || 'AI Video Effects',
    description: t.raw('page.description') || 'Explore all AI video effects',
    photo_effects_key: 'pages.photo-effects',
    video_effects_key: 'pages.video-effects',
  };

  return <AIStyleEffects section={section} defaultTab="video" layout="top-nav" />;
}
