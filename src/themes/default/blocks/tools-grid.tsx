'use client';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';
import Image from 'next/image';

export function ToolsGrid({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('py-16 md:py-24 bg-black', section.className, className)}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white text-balance">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto text-balance">
              {section.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {section.items?.map((item: any, index: number) => (
            <Link
              key={index}
              href={item.url || '#'}
              className="group relative flex flex-col items-center p-6 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="mb-4 relative w-12 h-12 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform duration-300 z-20">
                {item.icon && <SmartIcon name={item.icon} className="w-6 h-6" />}
              </div>
              <h3 className="text-sm font-medium text-zinc-200 text-center group-hover:text-white transition-colors z-20 relative">
                {item.title}
              </h3>
              
              {/* Hover Effect: Show Result Image (hover_image) or Default Image with full opacity */}
              {item.image && (
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                    {/* Gradient Overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />
                    <Image 
                        src={item.hover_image || item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover" 
                    />
                 </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
