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
    title: 'Terms of Service - 1photoai',
    description: 'Read our terms of service to understand the rules and regulations for using 1photoai platform.',
    canonicalUrl: '/terms-of-service',
  })({ params: Promise.resolve({ locale }) });
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">{locale === 'zh' ? '服务条款' : 'Terms of Service'}</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '1. 接受条款' : '1. Acceptance of Terms'}</h2>
          <p>
            {locale === 'zh' 
              ? '欢迎使用1photoai。通过访问或使用我们的服务,您同意受这些服务条款的约束。如果您不同意这些条款,请不要使用我们的服务。'
              : 'Welcome to 1photoai. By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '2. 服务描述' : '2. Service Description'}</h2>
          <p>
            {locale === 'zh'
              ? '1photoai提供AI驱动的图像和视频生成服务。我们保留随时修改、暂停或终止服务的权利,恕不另行通知。'
              : '1photoai provides AI-powered image and video generation services. We reserve the right to modify, suspend, or discontinue the service at any time without notice.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '3. 用户责任' : '3. User Responsibilities'}</h2>
          <p>
            {locale === 'zh'
              ? '您同意不将我们的服务用于任何非法或未经授权的目的。您必须遵守所有适用的法律法规。'
              : 'You agree not to use our services for any illegal or unauthorized purpose. You must comply with all applicable laws and regulations.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '4. 知识产权' : '4. Intellectual Property'}</h2>
          <p>
            {locale === 'zh'
              ? '您使用我们的服务生成的内容归您所有。但是,您授予1photoai使用、修改和展示您的内容以改进我们服务的许可。'
              : 'You own the content you generate using our services. However, you grant 1photoai a license to use, modify, and display your content to improve our services.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '5. 免责声明' : '5. Disclaimer'}</h2>
          <p>
            {locale === 'zh'
              ? '我们的服务按"原样"提供,不提供任何明示或暗示的保证。我们不保证服务将不间断或无错误。'
              : 'Our services are provided "as is" without any warranties, express or implied. We do not guarantee that the service will be uninterrupted or error-free.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '6. 责任限制' : '6. Limitation of Liability'}</h2>
          <p>
            {locale === 'zh'
              ? '1photoai对因使用或无法使用我们的服务而产生的任何直接、间接、偶然或后果性损害不承担责任。'
              : '1photoai shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'zh' ? '7. 联系我们' : '7. Contact Us'}</h2>
          <p>
            {locale === 'zh'
              ? '如果您对这些服务条款有任何疑问,请通过support@1photoai.com与我们联系。'
              : 'If you have any questions about these Terms of Service, please contact us at support@1photoai.com.'}
          </p>
        </section>

        <p className="text-sm text-muted-foreground mt-12">
          {locale === 'zh' ? '最后更新: 2024年2月' : 'Last updated: February 2024'}
        </p>
      </div>
    </div>
  );
}
