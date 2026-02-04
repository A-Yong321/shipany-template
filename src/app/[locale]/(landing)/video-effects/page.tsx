import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { getMetadata } from '@/shared/lib/seo';
import { DynamicPage } from '@/shared/types/blocks/landing';

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

  // load video effects data
  const t = await getTranslations('pages.video-effects');

  // build page sections
  const page: DynamicPage = {
    title: t.raw('page.title'),
    sections: t.raw('page.sections'),
    show_sections: t.raw('page.show_sections'),
  };

  // load page component
  const Page = await getThemePage('dynamic-page');

  return <Page locale={locale} page={page} />;
}
