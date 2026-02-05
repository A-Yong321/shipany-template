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

export default function PhotoEffectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return <ToolDetailTemplate params={params} namespace="pages.photo-effect-details" />;
}
