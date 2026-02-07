'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Plus, Clock, Monitor, Smartphone, MoreHorizontal, ArrowUp, Sparkles, Wind, Box } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';
import { HeroShowcase } from './hero-showcase';

export function Hero({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [activeTool, setActiveTool] = useState(section.tools?.[0]?.id || 'video');

  const highlightText = section.highlight_text ?? '';
  let texts = null;
  if (highlightText) {
    texts = section.title?.split(highlightText, 2);
  }

  return (
    <section
      id={section.id}
      className={cn(
        `pt-20 pb-8 md:pt-32 md:pb-12 overflow-visible`, // Reduced top padding to bring content closer to nav
        section.className,
        className
      )}
    >
      {/* Background Image / Gradient */}
      {section.background_image?.src && (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
           {/* Darker overlay for better text contrast */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/90 via-background/80 to-background" />
          <Image
            src={section.background_image.src}
            alt={section.background_image.alt || ''}
            className="object-cover opacity-20 dark:opacity-50"
            fill
            loading="lazy"
            sizes="100vw"
            quality={70}
            unoptimized={section.background_image.src.startsWith('http')}
          />
        </div>
      )}

      {/* Announcement Pill */}
      {section.announcement && (
        <div className="flex justify-center mb-8">
            <Link
            href={section.announcement.url || ''}
            target={section.announcement.target || '_self'}
            className="hover:scale-105 active:scale-95 group flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 px-4 py-1.5 transition-all duration-300 backdrop-blur-sm"
            >
            <span className="text-xl">🎉</span>
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-medium text-sm">
                {section.announcement.title}
            </span>
            </Link>
        </div>
      )}

      <div className="relative mx-auto max-w-5xl px-4 text-center z-20">
        
        {/* Main Title */}
        <h1 className="text-foreground text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-12 drop-shadow-sm">
            {section.title || "Your One-Stop AI Creation Platform"}
        </h1>



        {/* Examples / Prompts */}
        {/* Examples / Prompts */}
         {section.examples && (
            <div className="flex flex-wrap justify-center gap-3 mt-6">
                {(section.examples as any[]).map((example, idx) => (
                    <button 
                        key={idx}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-zinc-800/40 border border-black/5 dark:border-white/5 text-sm text-muted-foreground hover:bg-white/60 dark:hover:bg-zinc-800 hover:text-foreground hover:border-black/10 dark:hover:border-white/10 transition-all"
                    >
                        <span>{example.emoji}</span>
                        <span>{example.text}</span>
                    </button>
                ))}
            </div>
        )}

      </div>
      
      {/* Hero Showcase */}
      {section.showcase && <HeroShowcase showcase={section.showcase} />}

    </section>
  );
}

