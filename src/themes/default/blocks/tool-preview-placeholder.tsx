'use client';

import { Video, Download, Loader2, ImageIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useToolContent } from './tool-content-context';

/**
 * 工具预览占位组件
 * 改为客户端组件，接入 ToolContentContext 展示生成结果
 * - 未生成时: 展示优雅的占位提示
 * - 生成中: 展示 loading 覆盖层
 * - 生成完成: 展示图片/视频结果 + 下载按钮
 */
export function ToolPreviewPlaceholder({ className }: { className?: string }) {
  const { generatedResult, resultType, isGenerating, error } = useToolContent();

  /**
   * 处理结果下载
   * 通过 fetch 获取 blob 后触发本地下载
   */
  const handleDownload = async () => {
    if (!generatedResult) return;
    try {
      const response = await fetch(generatedResult);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = resultType === 'video' ? 'mp4' : 'png';
      a.download = `generated-${resultType}-${Date.now()}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className={cn(
      "relative w-full h-full rounded-3xl overflow-hidden bg-[#0A0F1D] border border-white/5 flex flex-col items-center justify-center min-h-[500px]",
      className
    )}>
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1629] to-[#0A0F1D]" />

      {/* 生成中 - Loading 覆盖层 */}
      {isGenerating && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
          <p className="text-white text-lg font-semibold">Generating...</p>
          <p className="text-white/60 text-sm mt-2">This may take a moment</p>
        </div>
      )}

      {/* 错误提示 */}
      {error && !isGenerating && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <p className="text-red-400 text-lg font-semibold">{error}</p>
          <p className="text-white/60 text-sm mt-2">Please try again</p>
        </div>
      )}

      {/* 生成完成 - 展示结果 */}
      {generatedResult ? (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {resultType === 'video' ? (
            <video
              src={generatedResult}
              className="w-full h-full object-contain"
              controls
              autoPlay
              loop
              playsInline
            />
          ) : (
            <img
              src={generatedResult}
              alt="Generated result"
              className="w-full h-full object-contain"
            />
          )}
          {/* 下载按钮 */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleDownload}
              className="bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-sm transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* 未生成 - 占位提示 */
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <div className="mb-6 p-5 rounded-2xl bg-white/5 border border-white/10">
            <Video className="w-10 h-10 text-white/90" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-3 tracking-wide">
            AI Generation Preview
          </h3>
          <p className="text-sm text-white/40 max-w-[260px] leading-relaxed font-light">
            Upload an image and click Generate to see the result here
          </p>
        </div>
      )}
    </div>
  );
}
