import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { GalleryTemplate } from '@/themes/default/templates/GalleryTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.gallery' });
  
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <GalleryTemplate />;
}
