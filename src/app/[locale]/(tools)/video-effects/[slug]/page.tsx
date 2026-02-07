import { ToolDetailTemplate } from '@/themes/default/templates/ToolDetailTemplate';
import { getMetadata } from '@/shared/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  try {
    const t = await getTranslations({ locale, namespace: `pages.video-effect-details.${slug}` });
    
    if (!t.has('metadata')) return {};

    return await getMetadata({
      metadataKey: `pages.video-effect-details.${slug}.metadata`,
      canonicalUrl: `/video-effects/${slug}`,
    })({ params: Promise.resolve({ locale }) });
  } catch (error) {
    return {};
  }
}

/**
 * 视频特效详情页
 * 接收 searchParams 实现从首页点击特效卡片后预选对应类型
 */
export default function VideoEffectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <ToolDetailTemplate 
      params={params} 
      namespace="pages.video-effect-details"
      searchParams={searchParams}
    />
  );
}

