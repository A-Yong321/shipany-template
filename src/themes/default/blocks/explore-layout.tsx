import React, { ReactNode } from 'react';
import { ToolSidebar } from './tool-sidebar';

interface ExploreLayoutProps {
  children: ReactNode;
}

/**
 * Explore页面专用布局
 * 左侧导航栏 + 右侧全宽内容区域
 */
export function ExploreLayout({ children }: ExploreLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* 左侧导航栏 */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 border-r border-border bg-card/30">
          <div className="sticky top-0 h-screen overflow-y-auto py-6">
            <ToolSidebar />
          </div>
        </aside>

        {/* 右侧全宽内容区域 - 用于显示瀑布流图片 */}
        <main className="flex-1 bg-background overflow-y-auto">
          <div className="p-6 xl:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
