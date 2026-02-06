import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ToolDetailTemplate } from '@/themes/default/templates/ToolDetailTemplate';

import { getMetadata } from '@/shared/lib/seo';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  try {
    const t = await getTranslations({ locale, namespace: `pages.photo-effect-details.${slug}` });
    
    if (!t.has('metadata')) return {};

    return await getMetadata({
      metadataKey: `pages.photo-effect-details.${slug}.metadata`,
      canonicalUrl: `/photo-effects/${slug}`,
    })({ params: Promise.resolve({ locale }) });
  } catch (error) {
    return {};
  }
}

/**
 * 图片特效详情页
 * 接收 searchParams 实现从首页点击特效卡片后预选对应类型
 */
export default function PhotoEffectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <ToolDetailTemplate 
      params={params} 
      namespace="pages.photo-effect-details"
      searchParams={searchParams}
    />
  );
}

