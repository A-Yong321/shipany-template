import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getMetadata } from '@/shared/lib/seo';

import { ToolDetailLayout } from '@/themes/default/blocks/tool-detail-layout';
import { ToolContent } from '@/themes/default/blocks/tool-content';
import { Inspirations } from '@/themes/default/blocks/inspirations';
import { ToolIntro, ToolFeatures, HowToSection, FAQSection, MoreToolsSection, EffectsGridSection, type EffectsGridSectionProps } from '@/themes/default/blocks/tool-bottom-sections';
import { type EffectItem } from '@/themes/default/blocks/effect-card';
import { getToolConfig, tools } from '@/data/tools';

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
  
  // 将 toolConfig.items 转换为 examples 格式, 如果不存在则使用 JSON 中的示例
  let examples = toolConfig?.items.map((item, index) => ({
    category: item.title,
    prompt: `Generate ${item.title} effect`,
    image: item.effectSrc,
    video: item.videoSrc,
  })) || effectData.page.sections.tool?.data?.examples || [];

  // 对于通用的 image-to-image/video 页面，清空示例以隐藏 Type 选择器
  if (['image-to-image', 'image-to-video'].includes(slug)) {
    examples = [];
  }
  
  // 根据namespace或slug判断工具类型
  const toolType = (namespace.includes('video') || slug.includes('video')) ? 'video' : 'image';

  // 判断输入类型
  let inputType: 'text' | 'image' | 'image-text' = 'image';
  if (['text-to-image', 'text-to-video'].includes(slug)) {
    inputType = 'text';
  } else if (['image-to-image', 'image-to-video'].includes(slug)) {
    inputType = 'image-text';
  }

  // 构建底部特效网格数据 (适用于所有页面)
  const relatedTools = tools.filter(t => {
    // 匹配当前工具类型
    const matchesType = toolType === 'video' ? t.type === 'video' : t.type === 'photo';
    // 排除当前正在浏览的工具
    return matchesType && t.slug !== slug;
  });

  const effectsGridProps: EffectsGridSectionProps = {
    // 使用 JSON 中的标题或者默认标题
    title: sections.more_tools?.title || (toolType === 'video' ? "More Video Effects" : "More Photo Effects"),
    items: relatedTools.map(t => ({
      title: t.title,
      originalSrc: t.items[0]?.originalSrc,
      effectSrc: t.items[0]?.effectSrc,
      videoSrc: t.items[0]?.videoSrc,
      url: toolType === 'video' ? `/video-effects/${t.slug}` : `/photo-effects/${t.slug}`,
      badge: t.items[0]?.badge as any
    })),
    viewMoreUrl: toolType === 'video' ? '/video-effects' : '/photo-effects',
    viewMoreText: "View More"
  };
  
  // 构建底部内容
  const bottomContent = (
    <>
      {sections.intro && <ToolIntro {...sections.intro} />}
      {sections.features && <ToolFeatures items={sections.features.items} />}
      {sections.how_to && <HowToSection {...sections.how_to} />}
      <EffectsGridSection {...effectsGridProps} />
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

