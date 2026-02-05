import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getMetadata } from '@/shared/lib/seo';

import { ToolDetailLayout } from '@/themes/default/blocks/tool-detail-layout';
import { ToolContent } from '@/themes/default/blocks/tool-content';
import { Inspirations } from '@/themes/default/blocks/inspirations';
import { ToolIntro, ToolFeatures, HowToSection, FAQSection, MoreToolsSection } from '@/themes/default/blocks/tool-bottom-sections';
import { RelatedEffects } from '@/themes/default/blocks/related-effects'; // Keep redundant import if needed for types, but component is replaced

interface ToolDetailTemplateProps {
  params: Promise<{ locale: string; slug: string }>;
  namespace: string;
}

export async function ToolDetailTemplate({ params, namespace }: ToolDetailTemplateProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace });

  if (!t.has(slug)) {
    return notFound();
  }

  const effectData = t.raw(slug);
  const sections = effectData.page.sections;
  const toolData = sections.tool?.data;
  
  // Extract examples
  const examples = toolData?.examples || [];
  
  // Inspirations / Related Tools (Using existing field but mapping to new Inspirations component if suitable)
  // For now, let's look at what data we have. 
  // sections.related_tools matches the old structure. 
  // We can eventually map this to inspirations or just pass it through.
  // The user requested "User Creations", so we will use Inspirations component.
  // We'll pass empty array to use placeholders for now, or map related tools if images are compatible.
  
  // Construct Bottom Content
  const bottomContent = (
    <>
      {sections.intro && <ToolIntro {...sections.intro} />}
      {sections.features && <ToolFeatures items={sections.features.items} />}
      {sections.how_to && <HowToSection {...sections.how_to} />}
      {sections.more_tools && <MoreToolsSection {...sections.more_tools} />}
      {sections.faq && <FAQSection {...sections.faq} />}
    </>
  );

  // Placeholder default items for Inspirations if none mapped
  const defaultInspirations = [
    { id: '1', image: '/imgs/cms/AI-Kissing_正常接吻_1.png', author: 'Anna', likes: 124, platform: 'tiktok' },
    { id: '2', image: '/imgs/cms/AI-Kissing_正常接吻_2.png', author: 'Mike', likes: 89, platform: 'instagram' },
    { id: '3', image: '/imgs/cms/AI-Kissing_脸颊之吻_1.png', author: 'Sarah', likes: 256, platform: 'tiktok' },
    { id: '4', image: '/imgs/cms/AI-Kissing_脸颊之吻_2.png', author: 'John', likes: 45 },
    { id: '5', image: '/imgs/cms/Hug_拥抱_1.png', author: 'Emily', likes: 567, platform: 'instagram' },
    { id: '6', image: '/imgs/cms/Hug_拥抱_2.png', author: 'David', likes: 231 }
  ];

  return (
    <ToolDetailLayout
      relatedEffects={
        <Inspirations items={ defaultInspirations } /> // Pass default items to populate the grid
      }
      bottomContent={bottomContent}
    >
      <ToolContent
        toolName={effectData.page.title}
        examples={examples}
        defaultPrompt={examples[0]?.prompt || ''}
      />
    </ToolDetailLayout>
  );
}
