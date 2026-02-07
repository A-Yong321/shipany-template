import { Video } from 'lucide-react';
import { cn } from '@/shared/lib/utils';



import { getTranslations } from 'next-intl/server';

export async function ToolPreviewPlaceholder({ className }: { className?: string }) {
  const t = await getTranslations('common');

  return (
    <div className={cn(
      "relative w-full h-full rounded-3xl overflow-hidden bg-[#0A0F1D] border border-white/5 flex flex-col items-center justify-center",
      className
    )}>
      {/* Background with slight gradient (optional, keeping for depth but clean) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1629] to-[#0A0F1D]" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        
        {/* Icon Container - Simplified */}
        <div className="mb-6 p-5 rounded-2xl bg-white/5 border border-white/10">
           <Video className="w-10 h-10 text-white/90" strokeWidth={1.5} />
        </div>

        {/* Main Title */}
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-3 tracking-wide">
            {t('tool_preview_placeholder.title')}
          </h3>
          <p className="text-sm text-white/40 max-w-[260px] leading-relaxed font-light">
            {t('tool_preview_placeholder.description')}
          </p>

      </div>
    </div>
  );
}
