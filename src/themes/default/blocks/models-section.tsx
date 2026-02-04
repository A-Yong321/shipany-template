'use client';

import Image from 'next/image';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function ModelsSection({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('py-20 md:py-32 bg-black relative overflow-hidden', className)}
    >
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
             {section.title}
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
             {section.description}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
          {section.items?.map((item: any, index: number) => {
            // Determine styles based on card type (index 0 = Video, index 1 = Image)
            const isVideo = index === 0;
            const gradientClass = isVideo 
                ? "bg-gradient-to-br from-indigo-500/10 via-zinc-900 to-zinc-950"
                : "bg-gradient-to-br from-rose-500/10 via-zinc-900 to-zinc-950";
            
            const borderGlowClass = isVideo
                ? "group-hover:border-indigo-500/50"
                : "group-hover:border-rose-500/50";

            return (
            <div
              key={index}
              className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                  gradientClass,
                  borderGlowClass
              )}
            >
              {/* Internal decorative blur */}
              <div className={cn(
                  "absolute top-0 right-0 -mr-24 -mt-24 h-64 w-64 rounded-full blur-[80px] opacity-20 transition-opacity group-hover:opacity-40",
                  isVideo ? "bg-indigo-500" : "bg-rose-500"
              )} />

              <div className="relative z-10 p-8 md:p-10">
                <div className="mb-6 flex items-center gap-4">
                    <div className={cn("p-3 rounded-2xl bg-white/5 backdrop-blur-sm", isVideo ? "text-indigo-400" : "text-rose-400")}>
                        <SmartIcon name={item.icon} className="h-8 w-8" />
                    </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 tracking-wide">
                  {item.title}
                </h3>
                
                <p className="text-zinc-400 mb-8 leading-relaxed text-lg">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2.5 mb-12">
                    {item.tags?.map((tag: string, tagIndex: number) => (
                        <span 
                            key={tagIndex} 
                            className="bg-white/5 hover:bg-white/10 text-zinc-300 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border border-white/5 transition-colors cursor-default"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-auto space-y-10">
                    {/* Main Button */}
                    {item.button && (
                        <Link 
                            href={item.button.url}
                            className={cn(
                                "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
                                isVideo 
                                    ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20" 
                                    : "bg-rose-600 hover:bg-rose-500 shadow-rose-500/20"
                            )}
                        >
                            {item.button.title}
                        </Link>
                    )}

                    {/* Text Logos Fallback */}
                    <div className="border-t border-white/5 pt-8">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-90">
                            {/* Rendering fake logos as text since SVGs are missing */}
                            {(item.logos || []).map((logoPath: string, idx: number) => {
                                // Extract mock name from path (e.g. /imgs/logos/pollo.svg -> Pollo)
                                const name = logoPath.split('/').pop()?.replace('.svg', '').replace(/[-_]/g, ' ');
                                return (
                                    <span key={idx} className="text-sm font-bold uppercase tracking-wider text-white/40 group-hover:text-white/80 transition-colors">
                                        {name}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
