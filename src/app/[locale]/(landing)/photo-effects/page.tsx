import { setRequestLocale } from 'next-intl/server';

import { getMetadata } from '@/shared/lib/seo';
import { EffectsPage } from '@/themes/default/pages/effects-page';

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

  return <EffectsPage locale={locale} initialType="photo" />;
}
