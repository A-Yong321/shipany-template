import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { getMetadata } from '@/shared/lib/seo';
import { DynamicPage } from '@/shared/types/blocks/landing';

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

export default async function VideoEffectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // load video effect details data
  const t = await getTranslations({ locale, namespace: `pages.video-effect-details` });

  if (!t.has(slug)) {
    return notFound();
  }

  const effectData = t.raw(slug);

  // build page sections
  const page: DynamicPage = {
    title: effectData.page.title,
    sections: effectData.page.sections,
    show_sections: Object.keys(effectData.page.sections),
  };

  // load page component
  const Page = await getThemePage('dynamic-page');

  return <Page locale={locale} page={page} />;
}
