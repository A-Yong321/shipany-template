import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ToolSidebar } from './tool-sidebar';
import { cn } from '@/shared/lib/utils';

interface ToolDetailLayoutProps {
  children: ReactNode;
  relatedEffects?: ReactNode;
  bottomContent?: ReactNode;
}

export function ToolDetailLayout({
  children,
  relatedEffects,
  bottomContent,
}: ToolDetailLayoutProps) {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Top Section: Dashboard (Sidebar + Tool + Inspirations) */}
      <div className="flex min-h-[calc(100vh-64px)] border-b border-border">
        {/* Left Sidebar - Only for this top section */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 border-r border-border bg-card/30">
          <div className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-6">
             <ToolSidebar />
          </div>
        </aside>

        {/* Middle Content - Compact Tool Interface */}
        <main className="shrink-0 w-full max-w-[560px] border-r border-border/50 bg-background">
          <div className="p-6 xl:p-8">
            {children}
          </div>
        </main>

        {/* Right Sidebar - Flexible Inspirations Area */}
        {relatedEffects && (
          <aside className="hidden xl:flex flex-1 flex-col bg-muted/5 p-6 h-[calc(100vh-64px)] overflow-y-auto">
             {relatedEffects}
          </aside>
        )}
      </div>

      {/* Bottom Content - Marketing Sections (Full Width) */}
      {bottomContent && (
        <div className="w-full bg-background">
          {bottomContent}
        </div>
      )}
    </div>
  );
}
