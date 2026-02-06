'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Plus, Clock, Monitor, Smartphone, MoreHorizontal, ArrowUp, Sparkles, Wind, Box } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

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

        {/* Input Interface Container - Only show if enabled */}
        {section.show_input !== false && (
        <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl p-2 md:p-3 shadow-2xl ring-1 ring-black/5 dark:ring-white/5 mx-auto max-w-4xl text-left">
            
            {/* Tool Tabs */}
            <div className="flex flex-wrap gap-2 mb-3 px-1">
                {section.tools?.map((tool: any) => (
                    <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                            activeTool === tool.id 
                                ? "bg-white dark:bg-zinc-800 text-foreground shadow-lg ring-1 ring-black/5 dark:ring-white/10" 
                                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-zinc-800/50"
                        )}
                    >
                        <SmartIcon name={tool.icon} size={18} className={activeTool === tool.id ? "text-primary" : ""} />
                        {tool.label}
                    </button>
                ))}
            </div>

            {/* Input Area */}
            <div className="bg-black/5 dark:bg-zinc-800/50 rounded-2xl p-4 md:p-5 relative group focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                
                {/* Text Area */}
                <textarea 
                    placeholder={section.input_placeholder || "Describe your creation..."}
                    className="w-full bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground resize-none min-h-[80px] md:min-h-[100px]"
                />

                {/* Bottom Controls */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4">
                    
                    {/* Left: Upload Button */}
                    <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/5 dark:bg-zinc-700/50 text-muted-foreground hover:bg-black/10 dark:hover:bg-zinc-700 hover:text-foreground transition-colors">
                        <Plus size={24} />
                    </button>

                    {/* Right: Settings & Generate */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        
                        {/* Settings Pills (Mock) */}
                        <div className="flex items-center gap-2 mr-auto md:mr-0">
                             <div className="hidden md:flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 text-xs text-muted-foreground hover:text-foreground">
                                    <Clock size={12} /> 5s
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 text-xs text-muted-foreground hover:text-foreground">
                                    <Monitor size={12} /> 480p
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 text-xs text-muted-foreground hover:text-foreground">
                                    <Smartphone size={12} /> 16:9
                                </button>
                            </div>
                            <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-black/5 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 text-muted-foreground hover:text-foreground md:hidden">
                                <MoreHorizontal size={16} />
                            </button>
                             <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-black/5 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 text-muted-foreground hover:text-foreground">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>

                         {/* Divider */}
                         <div className="h-6 w-px bg-black/10 dark:bg-white/10 hidden md:block" />

                        {/* Generate Button */}
                        <div className="flex items-center gap-3 ml-auto">
                             <div className="w-2 h-2 rounded-full border border-muted-foreground hidden md:block" />
                             <button className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-all shadow-lg shadow-primary/25">
                                <ArrowUp size={24} />
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}

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
    </section>
  );
}

