import { ToolDetailTemplate } from '@/themes/default/templates/ToolDetailTemplate';

export const revalidate = 3600;

export default function ImageToVideoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const paramsWithSlug = params.then(p => ({ ...p, slug: 'image-to-video' }));
  return <ToolDetailTemplate params={paramsWithSlug} namespace="pages.tool-details" />;
}
