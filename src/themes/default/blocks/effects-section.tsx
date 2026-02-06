'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Flame, Play } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { EffectCard, EffectItem } from './effect-card';

type TabData = {
  id: string;
  label: string;
  items: EffectItem[];
  viewMoreUrl?: string;
};

export function EffectsSection({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(section.tabs?.[0]?.id || 'video');

  return (
    <section
      id={section.id}
      className={cn('py-24 relative overflow-hidden', className)}
    >
      {/* Background Decor - Removed to support light/dark theme consistency */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" /> */}

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {section.description}
            </p>
          )}

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-12">
            {section.tabs?.map((tab: TabData) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {section.tabs
            ?.find((t: TabData) => t.id === activeTab)
            ?.items.map((item: EffectItem, index: number) => (
              <EffectCard 
                key={index} 
                item={item} 
                itemsLabel={section.items_label} 
                buttonText={section.button_text}
              />
            ))}
        </div>

        {/* View More Button */}
        {(() => {
          const currentTab = section.tabs?.find((t: TabData) => t.id === activeTab);
          if (currentTab?.viewMoreUrl) {
            return (
              <div className="flex justify-center mt-12">
                <Link
                  href={currentTab.viewMoreUrl}
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20"
                >
                  {section.view_more || 'View More'}
                </Link>
              </div>
            );
          }
          return null;
        })()}
      </div>
    </section>
  );
}
