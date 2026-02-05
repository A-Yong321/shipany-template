import { ToolDetailTemplate } from '@/themes/default/templates/ToolDetailTemplate';

export const revalidate = 3600;

export default function TextToImagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Use a namespace that we will configure shortly, or map to a generic one
  // For now, let's assume we will add 'pages.tool-details.text-to-image' to json
  // But wait, the Template expects { slug: string } in params to fetch data.
  // The placeholder pages don't have [slug] in route.
  // So we need to mock the slug in params or modify Template.
  // Let's modify the Template to accept an optional override or just pass the slug manually.
  
  // Actually, simpler is to extend the props of Template.
  // But for now, let's just construct a params object that looks right.
  const paramsWithSlug = params.then(p => ({ ...p, slug: 'text-to-image' }));
  
  return <ToolDetailTemplate params={paramsWithSlug} namespace="pages.tool-details" />;
}
