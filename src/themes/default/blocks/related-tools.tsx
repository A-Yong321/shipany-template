'use client';

import { Link } from '@/core/i18n/navigation';
import { LazyImage } from '@/shared/blocks/common';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function RelatedTools({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'overflow-hidden py-16 md:py-24 bg-muted/30',
        section.className,
        className
      )}
    >
      <div className="container">
        <ScrollAnimation className="w-full mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              {section.title}
            </h2>
            {section.description && (
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                {section.description}
              </p>
            )}
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {section.items?.map((item, idx) => (
            <ScrollAnimation key={idx} delay={idx * 0.1}>
              <Link
                href={item.url || '#'}
                className="group relative block overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <LazyImage
                    src={item.image?.src || ''}
                    alt={item.title || ''}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                       {item.description}
                    </p>
                  )}
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
