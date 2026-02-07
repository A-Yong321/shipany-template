import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getMetadata } from '@/shared/lib/seo';
import { AIStyleEffects } from '@/themes/default/blocks/ai-style-effects';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
  metadataKey: 'pages.ai-style.metadata',
  canonicalUrl: '/ai-style',
});

/**
 * AI Style页面
 * 展示所有photo和video effects的集合页面
 * 使用ToolDetailLayout布局,左侧导航栏+中间标签选择+右侧effects网格
 */
export default async function AIStylePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 加载AI Style数据
  const t = await getTranslations('pages.ai-style');
  
  const section = {
    title: t.raw('page.title') || 'AI Style',
    description: t.raw('page.description') || 'Explore all AI effects',
    photo_effects_key: 'pages.photo-effects',
    video_effects_key: 'pages.video-effects',
  };

  return <AIStyleEffects section={section} />;
}
