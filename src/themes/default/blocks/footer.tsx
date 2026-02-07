import { Link } from '@/core/i18n/navigation';
import {
  BrandLogo,
  LocaleSelector,
  ThemeToggler,
} from '@/shared/blocks/common';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { NavItem } from '@/shared/types/blocks/common';
import { Footer as FooterType } from '@/shared/types/blocks/landing';

export function Footer({ footer }: { footer: FooterType }) {
  return (
    <footer
      id={footer.id}
      className={`py-12 sm:py-16 ${footer.className || ''} overflow-x-hidden border-t bg-background`}
      style={{
        borderTopColor: 'rgba(255,255,255,0.05)',
      }}
    >
      <div className="container space-y-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-24">
          {/* Left Column: Brand & Description */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <SmartIcon name="RiCompassesLine" className="w-6 h-6 text-primary" />
             <span className="font-semibold text-lg">{footer.brand?.title || "1 photo"}</span>
            </div>
            
            {footer.brand?.description ? (
              <p
                className="text-muted-foreground text-sm leading-relaxed max-w-sm"
                dangerouslySetInnerHTML={{ __html: footer.brand.description }}
              />
            ) : null}
          </div>

          {/* Right Column: Navigation */}
          <div className="md:col-span-7 flex flex-wrap justify-between md:justify-end gap-16 md:gap-32">
             {footer.nav?.items.map((item, idx) => (
              <div key={idx} className="space-y-6">
                <span className="block font-medium text-foreground">
                  {item.title}
                </span>

                <div className="flex flex-col gap-4">
                  {item.children?.map((subItem, iidx) => (
                    <Link
                      key={iidx}
                      href={subItem.url || ''}
                      target={subItem.target || ''}
                      className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                    >
                      {subItem.title || ''}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Separator / Bottom Actions */}
        <div className="flex justify-end gap-4">
            {footer.show_theme !== false ? <ThemeToggler type="toggle" /> : null}
            {footer.show_locale !== false ? (
                <LocaleSelector type="button" />
            ) : null}
        </div>

        {/* Footer Bottom: Copyright, Policies, Social */}
         <div
          className="h-px w-full bg-border opacity-25"
        />

        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 pt-2">
            {/* Copyright */}
            <div className="text-muted-foreground text-xs font-medium">
               {footer.copyright && <span dangerouslySetInnerHTML={{ __html: footer.copyright }}></span>} 
            </div>

            {/* Right Side: Policies & Social */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {footer.agreement ? (
                    <div className="flex gap-8">
                    {footer.agreement?.items.map((item: NavItem, index: number) => (
                        <Link
                        key={index}
                        href={item.url || ''}
                        target={item.target || ''}
                        className="text-muted-foreground hover:text-primary text-xs font-medium transition-colors underline decoration-muted-foreground/50 hover:decoration-primary"
                        >
                        {item.title || ''}
                        </Link>
                    ))}
                    </div>
                ) : null}

                {footer.social ? (
                    <div className="flex items-center gap-6">
                    {footer.social?.items.map((item: NavItem, index) => (
                        <Link
                        key={index}
                        href={item.url || ''}
                        target={item.target || ''}
                        className="text-muted-foreground hover:text-white transition-colors"
                        aria-label={item.title || 'Social media link'}
                        >
                        {item.icon && (
                            <SmartIcon name={item.icon as string} size={18} />
                        )}
                        </Link>
                    ))}
                    </div>
                ) : null}
            </div>
        </div>
      </div>
    </footer>
  );
}
