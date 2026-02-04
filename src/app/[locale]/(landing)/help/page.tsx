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
    title: 'Help Center - 1photoai',
    description: 'Get help and support for using 1photoai platform. Find guides, tutorials, and contact support.',
    canonicalUrl: '/help',
  })({ params: Promise.resolve({ locale }) });
}

export default async function HelpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{locale === 'zh' ? '帮助中心' : 'Help Center'}</h1>
        <p className="text-xl text-muted-foreground">
          {locale === 'zh' 
            ? '我们随时为您提供帮助。浏览我们的资源或联系支持团队。'
            : 'We\'re here to help. Browse our resources or contact our support team.'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="border rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '常见问题' : 'Popular Topics'}</h2>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-primary hover:underline">
                {locale === 'zh' ? '如何开始使用1photoai?' : 'How to get started with 1photoai?'}
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                {locale === 'zh' ? '如何使用AI视频效果?' : 'How to use AI video effects?'}
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                {locale === 'zh' ? '定价和订阅计划' : 'Pricing and subscription plans'}
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                {locale === 'zh' ? 'API集成指南' : 'API integration guide'}
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                {locale === 'zh' ? '账户和计费问题' : 'Account and billing issues'}
              </a>
            </li>
          </ul>
        </div>

        <div className="border rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '联系支持' : 'Contact Support'}</h2>
          <p className="mb-4 text-muted-foreground">
            {locale === 'zh'
              ? '找不到您需要的答案?我们的支持团队随时准备帮助您。'
              : 'Can\'t find what you\'re looking for? Our support team is ready to help.'}
          </p>
          <div className="space-y-3">
            <div>
              <p className="font-semibold">{locale === 'zh' ? '电子邮件' : 'Email'}</p>
              <a href="mailto:support@1photoai.com" className="text-primary hover:underline">
                support@1photoai.com
              </a>
            </div>
            <div>
              <p className="font-semibold">{locale === 'zh' ? '响应时间' : 'Response Time'}</p>
              <p className="text-muted-foreground">
                {locale === 'zh' ? '通常在24小时内' : 'Usually within 24 hours'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 border rounded-lg">
          <div className="text-4xl mb-3">📚</div>
          <h3 className="font-semibold mb-2">{locale === 'zh' ? '文档' : 'Documentation'}</h3>
          <p className="text-sm text-muted-foreground">
            {locale === 'zh' ? '详细的使用指南和API文档' : 'Detailed guides and API documentation'}
          </p>
        </div>

        <div className="text-center p-6 border rounded-lg">
          <div className="text-4xl mb-3">🎥</div>
          <h3 className="font-semibold mb-2">{locale === 'zh' ? '视频教程' : 'Video Tutorials'}</h3>
          <p className="text-sm text-muted-foreground">
            {locale === 'zh' ? '逐步视频指南和演示' : 'Step-by-step video guides and demos'}
          </p>
        </div>

        <div className="text-center p-6 border rounded-lg">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="font-semibold mb-2">{locale === 'zh' ? '社区' : 'Community'}</h3>
          <p className="text-sm text-muted-foreground">
            {locale === 'zh' ? '加入我们的Discord社区' : 'Join our Discord community'}
          </p>
        </div>
      </div>
    </div>
  );
}
