import { ReactNode } from 'react';

import { getThemeBlock } from '@/core/theme';
import {
  Footer as FooterType,
  Header as HeaderType,
} from '@/shared/types/blocks/landing';

export default async function LandingLayout({
  children,
  header,
  footer,
}: {
  children: ReactNode;
  header: HeaderType;
  footer: FooterType;
}) {
  const Header = await getThemeBlock('header');
  const Footer = await getThemeBlock('footer');

  return (
    <div className="h-screen w-screen">
      <Header header={header} />
      {children}
      <Footer footer={footer} />
    </div>
  );
}

// NOTE: The `children` prop passed to LandingLayout (from `page.tsx`) contains the `DynamicPage` component which iterates over sections.
// Ideally, we should check `src/themes/default/pages/dynamic-page.tsx` (the `Page` component) to see how it renders blocks.
// `landing.tsx` is just the layout (header + footer), the content is in `children`.
// So I need to verify where the block rendering logic resides. It's likely in `dynamic-page.tsx` or similar.
