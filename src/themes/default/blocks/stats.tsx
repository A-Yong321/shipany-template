'use client';

import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';
import { Star } from 'lucide-react';

export function Stats({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('py-16 md:py-24 bg-zinc-950', section.className, className)}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16 space-y-4">
           {section.title && (
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 text-balance">
              {section.title}
            </h2>
           )}
           {/* 5 Stars */}
           <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {section.items?.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 relative"
            >
              <div className="absolute -top-4 left-8 text-6xl text-purple-500/20 font-serif">"</div>
              <p className="text-lg text-zinc-300 mb-6 relative z-10 italic">
                {item.quote}
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {item.user.charAt(0)}
                 </div>
                 <div>
                    <div className="font-semibold text-white">{item.user}</div>
                    <div className="text-sm text-zinc-500">{item.role}</div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
