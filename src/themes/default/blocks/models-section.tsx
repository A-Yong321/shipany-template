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
      className={cn('py-16 md:py-24 bg-gradient-to-b from-black to-zinc-950', className)}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
            {section.title}
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
          {section.items?.map((item: any, index: number) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-8 transition-all hover:border-zinc-700"
            >
              {/* Background Glow Effect - Optional */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[200px] w-[200px] rounded-full bg-pink-500/10 blur-[80px]" />

              <div className="relative z-10">
                <div className="mb-6 flex">
                    <SmartIcon name={item.icon} className="h-10 w-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {item.tags?.map((tag: string, tagIndex: number) => (
                        <span 
                            key={tagIndex} 
                            className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium border border-zinc-700/50"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
              </div>

              <div className="relative z-10 mt-auto space-y-8">
                 {/* Main Button */}
                 {item.button && (
                     <Link 
                        href={item.button.url}
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white"
                     >
                        {item.button.title}
                     </Link>
                 )}

                 {/* Logos grid */}
                 <div className="border-t border-zinc-800 pt-6">
                    <div className="flex items-center gap-6 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                        {item.logos?.map((logo: string, logoIndex: number) => (
                            <div key={logoIndex} className="relative h-6 w-auto flex py-1">
                                <Image 
                                    src={logo} 
                                    alt="Model Logo" 
                                    width={80} 
                                    height={24} 
                                    className="object-contain h-full w-auto" 
                                />
                            </div>
                        ))}
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
