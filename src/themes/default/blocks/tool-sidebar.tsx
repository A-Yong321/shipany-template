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

  // 导航项配置
  const navItems = [
    {
      title: 'Home',
      icon: Home,
      href: '/',
      description: 'Back to homepage',
    },
    {
      title: 'Explore',
      icon: Compass,
      href: '/#effects', // Modified: link to effects section
      description: 'Browse all effects',
    },
  ];

  // AI IMAGE分类
  const aiImageItems = [
    {
      title: 'AI Style',
      href: '/text-to-image', // Redirect 'AI Style' to text-to-image for now, or create the page
      icon: Sparkles,
      badge: 437,
      isActive: (path: string) => path === '/ai-style' || path === '/text-to-image' || path.includes('/video-effects') || path.includes('/photo-effects'),
    },
    {
      title: 'Text to Image',
      href: '/text-to-image',
    },
    {
      title: 'Image to Image',
      href: '/image-to-image',
    },
  ];

  // AI VIDEO分类
  const aiVideoItems = [
    {
      title: 'Text to Video',
      href: '/text-to-video',
    },
    {
      title: 'Image to Video',
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
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm">
      <nav className="flex h-full flex-col gap-6 p-6">
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
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  'hover:bg-muted hover:text-foreground',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
             );
          })}
        </div>

        {/* 分隔线 */}
        <div className="border-t border-border" />

        {/* AI IMAGE分类 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3">
             <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI IMAGE</span>
          </div>
          <div className="space-y-1">
            {aiImageItems.map(renderNavItem)}
          </div>
        </div>

        {/* AI VIDEO分类 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI VIDEO</span>
          </div>
          <div className="space-y-1">
            {aiVideoItems.map(renderNavItem)}
          </div>
        </div>
      </nav>
    </aside>
  );
}
