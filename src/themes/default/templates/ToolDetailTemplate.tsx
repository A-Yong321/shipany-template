import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getMetadata } from '@/shared/lib/seo';

import { ToolDetailLayout } from '@/themes/default/blocks/tool-detail-layout';
import { ToolContent } from '@/themes/default/blocks/tool-content';
import { Inspirations } from '@/themes/default/blocks/inspirations';
import { ToolIntro, ToolFeatures, HowToSection, FAQSection, MoreToolsSection } from '@/themes/default/blocks/tool-bottom-sections';
import { getToolConfig } from '@/data/tools';

interface ToolDetailTemplateProps {
  params: Promise<{ locale: string; slug: string }>;
  namespace: string;
  /** URL查询参数,用于传递特效类型 */
  searchParams?: Promise<{ type?: string }>;
}

/**
 * 工具详情页模板
 * 根据namespace区分视频工具和图片工具
 * 支持通过 searchParams 传入初始选中的特效类型
 * 从 tools.ts 加载工具的所有 effects
 */
export async function ToolDetailTemplate({ params, namespace, searchParams }: ToolDetailTemplateProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // 解析 searchParams 获取初始特效类型
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialType = resolvedSearchParams.type;

  const t = await getTranslations({ locale, namespace });

  if (!t.has(slug)) {
    return notFound();
  }

  const effectData = t.raw(slug);
  const sections = effectData.page.sections;
  
  // 从 tools.ts 获取工具配置
  const toolConfig = getToolConfig(slug);
  
  // 将 toolConfig.items 转换为 examples 格式
  const examples = toolConfig?.items.map((item, index) => ({
    category: item.title,
    prompt: `Generate ${item.title} effect`,
    image: item.effectSrc,
    video: item.videoSrc,
  })) || [];
  
  // 根据namespace判断工具类型
  const toolType = namespace.includes('video') ? 'video' : 'image';
  
  // 判断输入类型: text-to-image 和 text-to-video 使用文本输入
  const inputType = ['text-to-image', 'text-to-video'].includes(slug) ? 'text' : 'image';
  
  // 构建底部内容
  const bottomContent = (
    <>
      {sections.intro && <ToolIntro {...sections.intro} />}
      {sections.features && <ToolFeatures items={sections.features.items} />}
      {sections.how_to && <HowToSection {...sections.how_to} />}
      {sections.more_tools && <MoreToolsSection {...sections.more_tools} toolType={toolType} currentSlug={slug} />}
      {sections.faq && <FAQSection {...sections.faq} />}
    </>
  );

  return (
    <ToolDetailLayout
      relatedEffects={
        <Inspirations toolType={toolType} />
      }
      bottomContent={bottomContent}
    >
      <ToolContent
        toolName={effectData.page.title}
        examples={examples}
        defaultPrompt={examples[0]?.prompt || ''}
        toolType={toolType}
        initialType={initialType}
        inputType={inputType}
      />
    </ToolDetailLayout>
  );
}

