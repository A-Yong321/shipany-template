'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Faq({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section id={section.id} className={cn('py-16 md:py-24 bg-black text-white relative', className)}>
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {section.title}
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="w-full">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-4"
            >
              {section.items?.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={item.question || item.title || ''}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 hover:bg-zinc-900 transition-colors duration-200"
                >
                  <AccordionTrigger className="text-lg font-medium text-white hover:no-underline py-6">
                    {item.question || item.title || ''}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 text-base pb-6 leading-relaxed">
                     {item.answer || item.description || ''}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {section.tip && (
               <p
               className="text-zinc-500 mt-8 text-center text-sm"
               dangerouslySetInnerHTML={{ __html: section.tip || '' }}
             />
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
