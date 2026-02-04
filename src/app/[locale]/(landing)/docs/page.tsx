import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getMetadata } from '@/shared/lib/seo';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return await getMetadata({
    title: 'Documentation - 1photoai',
    description: 'Learn how to use 1photoai platform with our comprehensive documentation and guides.',
    canonicalUrl: '/docs',
  })({ params: Promise.resolve({ locale }) });
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">{locale === 'zh' ? '文档中心' : 'Documentation'}</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-3">{locale === 'zh' ? '快速开始' : 'Getting Started'}</h3>
          <p className="text-muted-foreground mb-4">
            {locale === 'zh' 
              ? '了解如何开始使用1photoai创建惊艳的AI生成内容。'
              : 'Learn how to get started with 1photoai to create stunning AI-generated content.'}
          </p>
        </div>

        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-3">{locale === 'zh' ? 'API参考' : 'API Reference'}</h3>
          <p className="text-muted-foreground mb-4">
            {locale === 'zh'
              ? '探索我们的API文档,将AI功能集成到您的应用程序中。'
              : 'Explore our API documentation to integrate AI capabilities into your applications.'}
          </p>
        </div>

        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-3">{locale === 'zh' ? '视频教程' : 'Video Tutorials'}</h3>
          <p className="text-muted-foreground mb-4">
            {locale === 'zh'
              ? '观看视频教程,学习如何使用各种AI效果和工具。'
              : 'Watch video tutorials to learn how to use various AI effects and tools.'}
          </p>
        </div>

        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-3">{locale === 'zh' ? '最佳实践' : 'Best Practices'}</h3>
          <p className="text-muted-foreground mb-4">
            {locale === 'zh'
              ? '了解创建高质量AI生成内容的最佳实践和技巧。'
              : 'Learn best practices and tips for creating high-quality AI-generated content.'}
          </p>
        </div>

        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-3">{locale === 'zh' ? '常见问题' : 'FAQ'}</h3>
          <p className="text-muted-foreground mb-4">
            {locale === 'zh'
              ? '查找关于1photoai平台的常见问题解答。'
              : 'Find answers to frequently asked questions about the 1photoai platform.'}
          </p>
        </div>

        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-3">{locale === 'zh' ? '故障排除' : 'Troubleshooting'}</h3>
          <p className="text-muted-foreground mb-4">
            {locale === 'zh'
              ? '解决使用平台时可能遇到的常见问题。'
              : 'Resolve common issues you might encounter while using the platform.'}
          </p>
        </div>
      </div>
    </div>
  );
}
