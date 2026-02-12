'use client';

import { Play, Download, Loader2 } from 'lucide-react';
import { useTextToVideo } from './context';

/**
 * 文生视频预览组件
 * 接入 TextToVideoContext 展示生成状态和结果
 * - 未生成时: 展示占位视频和提示
 * - 生成中: 展示 loading 覆盖层
 * - 生成完成: 播放生成的视频 + 下载按钮
 */
export function TextToVideoPreview() {
  const { generatedVideo, generatedPrompt, isGenerating, error } = useTextToVideo();

  /**
   * 处理视频下载
   * 通过 fetch 获取 blob 后触发本地下载
   */
  const handleDownload = async () => {
    if (!generatedVideo) return;
    try {
      const response = await fetch(generatedVideo);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="flex h-full flex-col bg-background rounded-2xl overflow-hidden border border-border/50 shadow-sm relative group">
      <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-black/5">
        {/* 生成中 - Loading 覆盖层 */}
        {isGenerating && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
            <p className="text-white text-lg font-semibold">Generating Video...</p>
            <p className="text-white/60 text-sm mt-2">This may take 1-3 minutes</p>
          </div>
        )}

        {/* 错误提示 */}
        {error && !isGenerating && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <p className="text-red-400 text-lg font-semibold">{error}</p>
            <p className="text-white/60 text-sm mt-2">Please try again</p>
          </div>
        )}

        {/* 生成完成 - 展示结果视频 */}
        {generatedVideo ? (
          <div className="relative w-full h-full">
            <video
              src={generatedVideo}
              className="w-full h-full object-contain bg-black"
              controls
              autoPlay
              loop
              playsInline
            />
            {/* 下载按钮 */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleDownload}
                className="bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-sm transition-colors"
                title="Download Video"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
            {/* Prompt 展示 */}
            {generatedPrompt && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
                <p className="text-white/80 text-sm line-clamp-2">{generatedPrompt}</p>
              </div>
            )}
          </div>
        ) : (
          /* 未生成 - 占位提示 */
          <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 bg-[#0A0F1D]">
            <div className="mb-6 p-5 rounded-2xl bg-white/5 border border-white/10">
              <Play className="w-10 h-10 text-white/90" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-3 tracking-wide">
              AI Video Preview
            </h3>
            <p className="text-sm text-white/40 max-w-[260px] leading-relaxed font-light">
              Enter prompt to generate video
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
