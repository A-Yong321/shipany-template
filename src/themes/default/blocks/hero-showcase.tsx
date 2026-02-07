'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { Link } from '@/core/i18n/navigation';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';

interface ShowcaseItem {
  src: string;
  video?: string;
  effectSrc?: string;
  alt: string;
  url?: string;
}

export function HeroShowcase({ showcase }: { showcase: { items: ShowcaseItem[] } }) {
  if (!showcase?.items?.length) return null;

  // Duplicate items to ensure smooth infinite scroll even on wide screens
  // Increased duplication to 4x to ensure there's always enough content for the loop
  const items = [...showcase.items, ...showcase.items, ...showcase.items, ...showcase.items];

  return (
    <div className="w-full mt-4 md:mt-8 fade-in-up group/showcase relative overflow-hidden">
       {/* Gradient Masks for Fade/Blur Effect on Edges - Adjusted width for smaller scale */}
       <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
       <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />

       <Swiper
        spaceBetween={12}
        slidesPerView={'auto'}
        loop={true}
        speed={6000} // Slower speed for smoother observation
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        allowTouchMove={true} // Allow interaction
        loopAdditionalSlides={10}
        watchSlidesProgress={true}
        modules={[Autoplay]}
        className={cn(
          "w-full",
          "hero-marquee" // Add a specific class for targeting
        )}
      >
        <style jsx global>{`
          .hero-marquee .swiper-wrapper {
            transition-timing-function: linear !important;
          }
        `}</style>
         {items.map((item, idx) => (
           // Using index in key because we have duplicates
           <SwiperSlide key={`${idx}-${item.alt}`} className="!w-[100px] !h-[150px] md:!w-[140px] md:!h-[210px]">
             <ShowcaseCard item={item} />
           </SwiperSlide>
         ))}
       </Swiper>
    </div>
  );
}

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showEffect, setShowEffect] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-cycle effect: Original -> Effect -> Original ...
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const startCycle = () => {
        // Random usage to prevent all cards switching exactly at once
        const randomDelay = Math.random() * 2000;
        
        interval = setInterval(() => {
            if (!isHovering) {
                setShowEffect(prev => {
                    const nextState = !prev;
                    // Handle video play/pause based on next state
                    if (item.video && videoRef.current) {
                        if (nextState) {
                             videoRef.current.currentTime = 0;
                             videoRef.current.play().catch(() => {});
                        } else {
                            videoRef.current.pause();
                        }
                    }
                    return nextState;
                });
            }
        }, 4000 + randomDelay); // Cycle every ~4-6 seconds
    };

    startCycle();

    return () => clearInterval(interval);
  }, [isHovering, item.video]);

  // Handle hover state
  useEffect(() => {
      if (isHovering) {
          setShowEffect(true);
          if (item.video && videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play().catch(() => {});
          }
      } else {
          // When mouse leaves, we don't immediately force state, 
          // we let the interval loop handle it, or we could reset. 
          // Let's reset to original for a cleaner look when leaving.
          setShowEffect(false);
          if (item.video && videoRef.current) {
              videoRef.current.pause();
          }
      }
  }, [isHovering, item.video]);


  return (
    <Link
      href={item.url || '#'}
      className="relative w-full h-full rounded-xl overflow-hidden cursor-pointer group block bg-gray-900 border border-white/5 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-primary/20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Container for images/video */}
      <div className="absolute inset-0 w-full h-full">
         {/* Original Image */}
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className={cn("object-cover transition-opacity duration-700", showEffect ? "opacity-0" : "opacity-100")}
          sizes="(max-width: 768px) 140px, 200px"
        />
        
        {/* Video Preview or Effect Image */}
        {(item.video || item.effectSrc) && (
             <div className={cn("absolute inset-0 w-full h-full transition-opacity duration-700", showEffect ? "opacity-100" : "opacity-0")}>
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
      </div>

      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 z-10 flex flex-col justify-end">
          <h3 className="text-white font-medium text-sm md:text-base tracking-tight leading-snug drop-shadow-md line-clamp-2">
            {item.alt}
          </h3>
      </div>

      {/* Hover State Overlay */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all duration-300 pointer-events-none" />
    </Link>
  );
}
