'use client';

import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Features({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('py-16 md:py-24', section.className, className)}
    >
      <div className={`container space-y-8 md:space-y-16`}>
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl text-center text-balance">
            <h2 className="text-foreground mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground mb-6 md:mb-12 lg:mb-16">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="relative mx-auto grid overflow-hidden rounded-2xl border bg-card/30 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-3">
            {section.items?.map((item, idx) => (
              <div 
                className="group relative space-y-3 p-8 transition-all hover:bg-black/5 dark:hover:bg-white/5 md:p-12" 
                key={idx}
              >
                <div className="flex items-center gap-3">
                  <div className="text-primary flex size-10 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                    <SmartIcon name={item.icon as string} size={20} />
                  </div>
                  <h3 className="text-foreground font-semibold tracking-tight">{item.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 h-8 w-8 bg-linear-to-bl from-primary/10 to-transparent transition-opacity opacity-0 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
