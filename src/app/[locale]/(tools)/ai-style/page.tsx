import { redirect } from 'next/navigation';

export default async function AIStylePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Redirect to the default effect or specific page
  redirect(`/${locale}/video-effects/ai-kissing`);
}
