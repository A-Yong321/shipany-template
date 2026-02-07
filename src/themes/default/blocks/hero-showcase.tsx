'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { Play } from 'lucide-react';
import { Link } from '@/core/i18n/navigation';

interface ShowcaseItem {
  src: string;
  video?: string;
  effectSrc?: string;
  alt: string;
  url?: string;
}

export function HeroShowcase({ showcase }: { showcase: { items: ShowcaseItem[] } }) {
  if (!showcase?.items?.length) return null;

  // Duplicate items to create seamless loop
  const items = [...showcase.items, ...showcase.items];

  return (
    <div className="w-full overflow-hidden mt-12 md:mt-20 fade-in-up group/showcase">
       <div className="flex gap-4 md:gap-6 w-max animate-scroll hover:[animation-play-state:paused] px-4">
         {items.map((item, idx) => (
           <ShowcaseCard key={`${idx}-${item.alt}`} item={item} />
         ))}
       </div>
    </div>
  );
}

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showEffect, setShowEffect] = useState(false);

  // Auto-cycle effect
  useEffect(() => {
    const cycle = () => {
       setShowEffect(true);
       if (item.video && videoRef.current) {
           videoRef.current.currentTime = 0;
           videoRef.current.play().catch(() => {});
           // Video duration or fixed time?
           // For simplicity, cycle every 4s: 2s original, 2s effect? 
           // Better: Effect plays for N seconds then back.
       }
       
       setTimeout(() => {
           setShowEffect(false);
           if (item.video && videoRef.current) {
               videoRef.current.pause();
           }
       }, 3000); // Show effect for 3s
    };

    // Initial delay then loop
    const interval = setInterval(cycle, 6000 + Math.random() * 2000); // Random offset
    setTimeout(cycle, 1000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [item.video]);


  return (
    <Link
      href={item.url || '#'}
      className="relative shrink-0 w-[140px] h-[200px] md:w-[180px] md:h-[260px] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group shadow-lg transition-transform hover:scale-105 border border-white/10 bg-zinc-900 block"
    >
      {/* Original Image */}
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className={cn("object-cover transition-opacity duration-700", showEffect ? "opacity-0" : "opacity-100")}
        sizes="(max-width: 768px) 140px, 180px"
      />
      
      {/* Effect Video or Image */}
      {(item.video || item.effectSrc) && (
         <div className={cn("absolute inset-0 transition-opacity duration-700", showEffect ? "opacity-100" : "opacity-0")}>
            {item.video ? (
                <video
                ref={videoRef}
                src={item.video}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                />
            ) : (
                item.effectSrc && (
                    <Image 
                        src={item.effectSrc} 
                        alt={item.alt + " Effect"} 
                        fill 
                        className="object-cover" 
                    />
                )
            )}
         </div>
      )}

      {/* Play Icon/Overlay - Show on hover */}
      <div className={cn("absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300")}>
         <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
         </div>
      </div>
    </Link>
  );
}
