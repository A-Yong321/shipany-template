'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlayOnVisible?: boolean;
  muted?: boolean;
  loop?: boolean;
}

/**
 * 视频懒加载组件
 * 核心逻辑：
 * 1. 使用 IntersectionObserver 监听可见性
 * 2. 可见时：根据 autoPlayOnVisible 随机延迟播放（降低同时加载压力）
 * 3. 悬停时：强制高清/立即播放逻辑在父组件处理或在此处增强
 */
export function LazyVideo({
  src,
  poster,
  className,
  autoPlayOnVisible = true,
  muted = true,
  loop = true,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          setShouldLoad(true); // 触碰可见区域才开始加载资源
          
          // 如果开启了可见即播放，添加随机延迟以平滑整体加载
          if (autoPlayOnVisible && videoRef.current) {
            const delay = Math.random() * 2000;
            const timer = setTimeout(() => {
              videoRef.current?.play().catch(() => {
                // 处理自动播放限制
              });
            }, delay);
            return () => clearTimeout(timer);
          }
        } else {
          setIsVisible(false);
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [autoPlayOnVisible]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      muted={muted}
      loop={loop}
      playsInline
      preload="none"
      className={cn("w-full h-full object-cover grayscale-[0.2] transition-all", isVisible && "grayscale-0", className)}
      onMouseEnter={(e) => {
        // 悬停时增强体验：如果由于随机延迟没播，点击或悬停立即激活
        e.currentTarget.play().catch(() => {});
      }}
    />
  );
}
