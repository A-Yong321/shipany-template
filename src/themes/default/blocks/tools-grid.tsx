'use client';

import { Link } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';
import Image from 'next/image';

interface ToolItem {
  title: string;
  url: string;
  image: string;
  hover_image?: string;
}

export function ToolsGrid({
  section,
  className,
}: {
  section: Section & {
    video_items?: ToolItem[];
    photo_items?: ToolItem[];
    view_more_url?: string;
  };
  className?: string;
}) {
  const { video_items = [], photo_items = [], view_more_url } = section;

  const ToolCard = ({ item }: { item: ToolItem }) => (
    <Link
      href={item.url || '#'}
      className="group relative flex flex-col aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
    >
      {/* Original Image (Visible by default) */}
      <div className="absolute inset-0 z-0 transition-opacity duration-500 group-hover:opacity-0">
         <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

       {/* Hover Image (Visible on hover) */}
      <div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
         <Image
          src={item.hover_image || item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Overlay & Title */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12">
        <h3 className="text-sm font-semibold text-white/90 group-hover:text-white">
          {item.title}
        </h3>
      </div>
    </Link>
  );

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

        <div className="space-y-8 md:space-y-12">
          {/* Video Tools Row */}
          {video_items.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {video_items.map((item, index) => (
                  <ToolCard key={`video-${index}`} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Photo Tools Row */}
           {photo_items.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {photo_items.map((item, index) => (
                  <ToolCard key={`photo-${index}`} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View More Button */}
        {view_more_url && (
            <div className="mt-12 md:mt-16 flex justify-center">
                <Link
                    href={view_more_url}
                    className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
                >
                    View More
                </Link>
            </div>
        )}
      </div>
    </section>
  );
}
