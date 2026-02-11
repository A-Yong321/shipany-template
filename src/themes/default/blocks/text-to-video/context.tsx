'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * TextToVideo 上下文类型定义
 * 管理文生视频的生成状态、轮询和结果展示
 */
interface TextToVideoContextType {
  generatedVideo?: string;
  generatedPrompt?: string;
  isGenerating: boolean;
  error: string | null;
  setIsGenerating: (generating: boolean) => void;
  startTask: (taskId: string, prompt: string, platform?: string) => void;
}

const TextToVideoContext = createContext<TextToVideoContextType | undefined>(undefined);

/**
 * TextToVideo Provider 组件
 * 严格参照 text-to-image/context.tsx 的轮询逻辑实现
 * 轮询 /api/ai/query 接口查询任务状态，成功后提取视频 URL
 */
export function TextToVideoProvider({ children }: { children: React.ReactNode }) {
  const [generatedVideo, setGeneratedVideo] = useState<string | undefined>(undefined);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 轮询任务状态
   * 与 text-to-image 完全一致的轮询逻辑
   * 每3秒查询一次，失败时5秒重试
   */
  const pollTaskStatus = useCallback(async (taskId: string, platform?: string) => {
    let isStopped = false;
    const checkStatus = async () => {
      if (isStopped) return;
      try {
        const response = await fetch('/api/ai/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId, platform })
        });
        if (!response.ok) throw new Error('Query failed');
        
        const res = await response.json();
        const data = res.data;
        
        // 成功状态判断 - 与 text-to-image 保持一致
        if (data.status === 'succeeded' || data.status === 'completed' || data.status === 'SUCCESS' || data.status === 'success') {
          console.log('[TextToVideo] Task succeeded, parsing result:', data);
          let result = data.taskResult;
          if (typeof result === 'string' && result) {
            try {
              result = JSON.parse(result);
              // Handle double-serialized JSON if necessary
              if (typeof result === 'string') {
                result = JSON.parse(result);
              }
            } catch (e) {
              console.error('[TextToVideo] Failed to parse taskResult string:', e);
            }
          }
          
          let info = data.taskInfo;
          if (typeof info === 'string' && info) {
            try {
              info = JSON.parse(info);
              if (typeof info === 'string') {
                info = JSON.parse(info);
              }
            } catch (e) {
              console.error('[TextToVideo] Failed to parse taskInfo string:', e);
            }
          }
          
          console.log('[TextToVideo] Parsed result:', result, 'info:', info);

          // 提取视频 URL - 按照接口文档 response.data.videoUrl
          // 优先从 taskInfo (我们自己构造的标准化信息) 提取
          const videoUrl = info?.videos?.[0]?.url ||
                           result?.response?.data?.videoUrl ||
                           result?.response?.data?.videoUrls?.[0] ||
                           result?.videoUrl ||
                           result?.videoUrls?.[0] ||
                           result?.data?.videoUrl; // Some providers might wrap in data
          
          if (videoUrl) {
            console.log('[TextToVideo] Found video URL:', videoUrl);
            setGeneratedVideo(videoUrl);
            setIsGenerating(false);
            isStopped = true;
            return;
          } else {
            console.warn('[TextToVideo] Task succeeded but no video URL found.');
          }
        } else if (data.status === 'failed' || data.status === 'FAILED') {
          // 失败状态
          console.error('[TextToVideo] Task failed:', data);
          setError('Video generation failed. Please try again.');
          setIsGenerating(false);
          isStopped = true;
          return;
        }
        
        // 未完成则继续轮询
        if (!isStopped) {
          setTimeout(checkStatus, 3000);
        }
      } catch (err) {
        console.error('Poll error:', err);
        // 网络异常时延迟重试
        if (!isStopped) {
          setTimeout(checkStatus, 5000);
        }
      }
    };

    checkStatus();
    return () => { isStopped = true; };
  }, []);

  /**
   * 启动任务轮询
   * 由 content.tsx 在成功创建生成任务后调用
   */
  const startTask = (taskId: string, prompt: string, platform?: string) => {
    setIsGenerating(true);
    setError(null);
    setGeneratedPrompt(prompt);
    pollTaskStatus(taskId, platform);
  };

  return (
    <TextToVideoContext.Provider value={{ generatedVideo, generatedPrompt, isGenerating, error, setIsGenerating, startTask }}>
      {children}
    </TextToVideoContext.Provider>
  );
}

/**
 * 获取 TextToVideo 上下文的 Hook
 * 必须在 TextToVideoProvider 内部使用
 */
export const useTextToVideo = () => {
  const context = useContext(TextToVideoContext);
  if (context === undefined) {
    throw new Error('useTextToVideo must be used within a TextToVideoProvider');
  }
  return context;
};
