'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Image, Video, Sparkles } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

/**
 * 工具侧边导航栏组件
 * 用于工具详情页的左侧导航
 */
export function ToolSidebar() {
  const pathname = usePathname();

  // 定义导航项类型
  type NavItem = {
    title: string;
    href: string;
    icon?: any;
    description?: string;
    badge?: number | string;
    isActive?: (path: string) => boolean;
  };

  // 导航项配置
  const navItems: NavItem[] = [
    {
      title: '首页',
      icon: Home,
      href: '/',
      description: '返回首页',
    },
    {
      title: '发现',
      icon: Compass,
      href: '/#effects', // Modified: link to effects section
      description: '浏览所有特效',
    },
  ];

  // AI IMAGE分类
  const aiImageItems: NavItem[] = [
    {
      title: 'AI 风格',
      href: '/text-to-image', // Redirect 'AI Style' to text-to-image for now, or create the page
      icon: Sparkles,
      badge: 437,
      isActive: (path: string) => path === '/ai-style' || path === '/text-to-image' || path.includes('/video-effects') || path.includes('/photo-effects'),
    },
    {
      title: '文生图',
      href: '/text-to-image',
    },
    {
      title: '图生图',
      href: '/image-to-image',
    },
  ];

  // AI VIDEO分类
  const aiVideoItems: NavItem[] = [
    {
      title: '文生视频',
      href: '/text-to-video',
    },
    {
      title: '图生视频',
      href: '/image-to-video',
    },
  ];

  const renderNavItem = (item: any) => {
    const isActive = item.isActive ? item.isActive(pathname) : pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          'flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
          'hover:bg-muted hover:text-foreground',
          isActive
            ? 'bg-muted text-foreground font-medium'
            : 'text-muted-foreground'
        )}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-4 w-4" />}
          <span className={cn(!Icon && "pl-7")}>{item.title}</span>
        </div>
        {item.badge && (
          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <nav className="flex h-full flex-col px-4 py-8">
      {/* 顶部导航区 */}
      <div className="space-y-8">
        {/* 主导航项 */}
        <div className="space-y-2">
          {navItems.map((item) => {
             const isActive = pathname === item.href;
             const Icon = item.icon;
             return (
               <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200',
                  'hover:bg-muted hover:text-foreground hover:scale-105',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground/80'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
             );
          })}
        </div>

        {/* AI IMAGE分类 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-4">
             <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">AI IMAGE</span>
          </div>
          <div className="space-y-1">
            {aiImageItems.map((item) => {
              const isActive = item.isActive ? item.isActive(pathname) : pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-4 py-3 text-base transition-all duration-200',
                    'hover:bg-muted hover:text-foreground hover:pl-5',
                    isActive
                      ? 'bg-muted text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground/80'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="h-5 w-5" />}
                    <span className={cn(!Icon && "pl-8")}>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* AI VIDEO分类 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-4">
            <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">AI VIDEO</span>
          </div>
          <div className="space-y-1">
            {aiVideoItems.map((item) => {
              const isActive = item.isActive ? item.isActive(pathname) : pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-4 py-3 text-base transition-all duration-200',
                    'hover:bg-muted hover:text-foreground hover:pl-5',
                    isActive
                      ? 'bg-muted text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground/80'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="h-5 w-5" />}
                    <span className={cn(!Icon && "pl-8")}>{item.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部区域 - 占满剩余空间 */}
      <div className="mt-auto pt-8 border-t border-border/40">
        <Link
          href="/gallery"
          className={cn(
            'flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200',
            'hover:bg-muted hover:text-foreground hover:scale-105 text-muted-foreground/80'
          )}
        >
          <Image className="h-5 w-5" />
          <span>画廊</span>
        </Link>
      </div>
    </nav>
  );
}
