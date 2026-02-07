import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { ExploreTemplate } from '@/themes/default/templates/ExploreTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.explore' });
  
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <ExploreTemplate />;
}
