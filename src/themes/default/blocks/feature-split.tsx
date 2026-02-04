'use client';

import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function FeatureSplit({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('py-24 bg-black overflow-hidden', className)}
    >
      <div className="container px-4 md:px-6 mx-auto space-y-32">
        {section.items?.map((item: any, index: number) => {
          // Determine layout direction based on 'reverse' property or index
          const isReversed = item.reverse ?? index % 2 !== 0;

          return (
            <div
              key={index}
              className={cn(
                'flex flex-col lg:flex-row items-center gap-12 lg:gap-24',
                isReversed ? 'lg:flex-row-reverse' : ''
              )}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xl text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Sub-items List */}
                {item.sub_items && (
                  <div className="space-y-6">
                    {item.sub_items.map((subItem: any, subIndex: number) => (
                      <div key={subIndex} className="flex gap-4">
                        <div className="shrink-0 mt-1">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/20 text-pink-500">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">
                            {subItem.title}
                          </h4>
                          <p className="text-zinc-500 text-sm">
                            {subItem.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                {item.button && (
                  <div className="pt-4">
                    <Link
                      href={item.button.url}
                      className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-4 text-base font-medium transition-all hover:bg-zinc-200 hover:gap-3"
                    >
                      {item.button.title}
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                )}
              </div>

              {/* Image Content */}
              <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
                <div className="relative aspect-square md:aspect-[4/3] w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                    {/* Placeholder for the image if not provided or broken */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-zinc-700">
                        {item.image?.src ? (
                            (item.image.src.endsWith('.mp4') || item.image.src.endsWith('.webm') || item.image.type === 'video') ? (
                                <video
                                    src={item.image.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <Image
                                    src={item.image.src}
                                    alt={item.image.alt || item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            )
                        ) : (
                            <span className="text-lg">Image Preview</span>
                        )}
                    </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
