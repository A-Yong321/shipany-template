import { setRequestLocale } from 'next-intl/server';

import { getMetadata } from '@/shared/lib/seo';
import { ToolsPage } from '@/themes/default/pages/tools-page';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
  metadataKey: 'pages.tools.metadata',
  canonicalUrl: '/tools',
});

export default async function ToolsPageRoute({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { locale } = await params;
  const { type } = await searchParams;
  setRequestLocale(locale);

  return <ToolsPage locale={locale} initialType={type} />;
}
