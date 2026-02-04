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
    title: 'Privacy Policy - 1photoai',
    description: 'Learn how 1photoai collects, uses, and protects your personal information.',
    canonicalUrl: '/privacy-policy',
  })({ params: Promise.resolve({ locale }) });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">{locale === 'zh' ? '隐私政策' : 'Privacy Policy'}</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '1. 信息收集' : '1. Information Collection'}</h2>
          <p>
            {locale === 'zh'
              ? '我们收集您在使用我们服务时提供的信息,包括您的姓名、电子邮件地址和使用数据。我们还可能收集您上传的图像和生成的内容。'
              : 'We collect information you provide when using our services, including your name, email address, and usage data. We may also collect images you upload and content you generate.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '2. 信息使用' : '2. Information Use'}</h2>
          <p>
            {locale === 'zh'
              ? '我们使用收集的信息来提供、维护和改进我们的服务,处理交易,并向您发送技术通知和支持消息。'
              : 'We use the collected information to provide, maintain, and improve our services, process transactions, and send you technical notices and support messages.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '3. 信息共享' : '3. Information Sharing'}</h2>
          <p>
            {locale === 'zh'
              ? '我们不会向第三方出售、交易或出租您的个人信息。我们可能会与服务提供商共享信息以帮助我们运营业务。'
              : 'We do not sell, trade, or rent your personal information to third parties. We may share information with service providers to help us operate our business.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '4. 数据安全' : '4. Data Security'}</h2>
          <p>
            {locale === 'zh'
              ? '我们实施适当的安全措施来保护您的个人信息免遭未经授权的访问、更改、披露或破坏。'
              : 'We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '5. Cookies' : '5. Cookies'}</h2>
          <p>
            {locale === 'zh'
              ? '我们使用cookies和类似技术来改善您的体验、分析使用情况并提供个性化内容。'
              : 'We use cookies and similar technologies to improve your experience, analyze usage, and provide personalized content.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '6. 您的权利' : '6. Your Rights'}</h2>
          <p>
            {locale === 'zh'
              ? '您有权访问、更正或删除您的个人信息。您也可以选择退出某些数据收集和使用。'
              : 'You have the right to access, correct, or delete your personal information. You may also opt out of certain data collection and use.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '7. 政策变更' : '7. Policy Changes'}</h2>
          <p>
            {locale === 'zh'
              ? '我们可能会不时更新本隐私政策。我们将通过在我们的网站上发布新的隐私政策来通知您任何更改。'
              : 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '8. 联系我们' : '8. Contact Us'}</h2>
          <p>
            {locale === 'zh'
              ? '如果您对本隐私政策有任何疑问,请通过support@1photoai.com与我们联系。'
              : 'If you have any questions about this Privacy Policy, please contact us at support@1photoai.com.'}
          </p>
        </section>

        <p className="text-sm text-muted-foreground mt-12">
          {locale === 'zh' ? '最后更新: 2024年2月' : 'Last updated: February 2024'}
        </p>
      </div>
    </div>
  );
}
