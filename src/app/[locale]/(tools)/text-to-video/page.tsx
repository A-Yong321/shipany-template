import { setRequestLocale } from 'next-intl/server';
import { ToolDetailTemplate } from '@/themes/default/templates/ToolDetailTemplate';

export const revalidate = 3600;

export default function TextToVideoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const paramsWithSlug = params.then(p => ({ ...p, slug: 'text-to-video' }));
  return <ToolDetailTemplate params={paramsWithSlug} namespace="pages.tool-details" />;
}
