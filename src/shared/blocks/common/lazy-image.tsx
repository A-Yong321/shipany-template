'use client';

import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

export function LazyImage({
  src,
  alt,
  className,
  width,
  height,
  placeholderSrc,
  title,
  fill,
  priority,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholderSrc?: string;
  title?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}>
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        title={title}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes={sizes}
        className={cn(
          "object-cover transition-all duration-300",
          !priority && "animate-in fade-in duration-500"
        )}
      />
    </div>
  );
}
