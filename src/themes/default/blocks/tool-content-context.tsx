'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * ToolContent 通用上下文类型定义
 * 适用于 image-to-image、image-to-video 和 effects 页面
 * 管理图片上传、API 生成请求和任务轮询
 */
interface ToolContentContextType {
  // 生成结果
  generatedResult?: string;
  resultType: 'image' | 'video';
  // 生成状态
  isGenerating: boolean;
  error: string | null;
  // 操作方法
  startGenerate: (params: GenerateParams) => Promise<void>;
  resetResult: () => void;
}

/**
 * 生成请求参数
 * 支持图生图和图生视频的所有参数组合
 */
interface GenerateParams {
  imageFile: File;
  prompt: string;
  mediaType: 'image' | 'video';
  scene: string;
  model?: string;
  options?: {
    action?: string;
    aspect_ratio?: string;
    duration?: number;
    resolution?: string;
    count?: number;
    [key: string]: any;
  };
}

const ToolContentContext = createContext<ToolContentContextType | undefined>(undefined);

/**
 * 通用工具 Provider 组件
 * 流程: 上传图片 → 发送生成请求 → 轮询结果
 * 参照 text-to-image/context.tsx 的轮询逻辑
 */
export function ToolContentProvider({ children }: { children: React.ReactNode }) {
  const [generatedResult, setGeneratedResult] = useState<string | undefined>(undefined);
  const [resultType, setResultType] = useState<'image' | 'video'>('image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 轮询任务状态
   * 与 text-to-image/context.tsx 完全一致的逻辑
   * 每3秒查询一次，失败时5秒重试
   */
  const pollTaskStatus = useCallback(async (taskId: string, mediaType: 'image' | 'video', platform?: string) => {
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

        // LOG: 详细记录第三方 API 查询结果
        console.log('[ToolContent] Poll Query Response:', JSON.stringify(data, null, 2));

        if (!data) { /* No data received, continue polling or handle as error */ } // This line was added based on the instruction's `if (!data) {成功状态判断`
        // 成功状态判断
        if (data.status === 'succeeded' || data.status === 'completed' || data.status === 'SUCCESS' || data.status === 'success') {
          let result = data.taskResult;
          if (typeof result === 'string' && result) {
            try {
              result = JSON.parse(result);
              if (typeof result === 'string') {
                result = JSON.parse(result);
              }
            } catch (e) { /* ignore */ }
          }
          let info = data.taskInfo;
          if (typeof info === 'string' && info) {
            try {
              info = JSON.parse(info);
              if (typeof info === 'string') {
                info = JSON.parse(info);
              }
            } catch (e) { /* ignore */ }
          }

          let resultUrl: string | undefined;
          if (mediaType === 'video') {
            // 提取视频 URL
            resultUrl = info?.videos?.[0]?.url ||
                        result?.response?.data?.videoUrl ||
                        result?.response?.data?.videoUrls?.[0] ||
                        result?.videoUrl;
          } else {
            // 提取图片 URL
            resultUrl = info?.images?.[0]?.url ||
                        result?.response?.data?.imageUrls?.[0] ||
                        result?.imageUrl ||
                        result?.imageUrls?.[0];
          }

          if (resultUrl) {
            setGeneratedResult(resultUrl);
            setIsGenerating(false);
            isStopped = true;
            return;
          }
        } else if (data.status === 'failed' || data.status === 'FAILED') {
          setError('Generation failed. Please try again.');
          setIsGenerating(false);
          isStopped = true;
          return;
        }

        // 未完成继续轮询
        if (!isStopped) {
          setTimeout(checkStatus, 3000);
        }
      } catch (err) {
        console.error('Poll error:', err);
        if (!isStopped) {
          setTimeout(checkStatus, 5000);
        }
      }
    };
    checkStatus();
    return () => { isStopped = true; };
  }, []);

  /**
   * 执行完整的生成流程
   * 步骤1: 上传图片到 /api/storage/upload-image
   * 步骤2: POST /api/ai/generate 发送生成请求
   * 步骤3: 启动轮询任务状态
   */
  const startGenerate = useCallback(async (params: GenerateParams) => {
    setIsGenerating(true);
    setError(null);
    setResultType(params.mediaType);

    try {
      // 步骤1: 上传图片
      const formData = new FormData();
      // Standardize on 'file' as per documentation
      formData.append('file', params.imageFile);
      const uploadRes = await fetch('/api/storage/upload-image', {
        method: 'POST',
        body: formData
      });
      if (!uploadRes.ok) {
        const errData = await uploadRes.json().catch(() => ({}));
        throw new Error(errData.error || 'Image upload failed');
      }
      const uploadData = await uploadRes.json();
      // 从上传响应中提取图片 URL
      // API 返回: { code: 0, data: [{ url: string, key: string }] }
      const imageUrl = uploadData.data?.[0]?.url;
      if (!imageUrl) {
        throw new Error('Failed to get uploaded image URL');
      }
      console.log('Uploaded image URL:', imageUrl);

      // 步骤2: 发送生成请求
      const generateBody = {
        provider: 'aistudio',
        mediaType: params.mediaType,
        model: params.model, // Use users selected model directly
        prompt: params.prompt,
        scene: params.scene,
        options: {
          ...params.options,
          image_url: imageUrl,
        }
      };
      console.log('Generate request body:', generateBody);

      const genRes = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generateBody)
      });
      const genData = await genRes.json();
      console.log('Generate API result:', genData);

      if (!genRes.ok) {
        if (genData.error?.includes('no auth')) {
          window.location.href = '/sign-in';
          return;
        }
        throw new Error(genData.error || 'Failed to generate');
      }
      if (genData.code !== 0) {
        throw new Error(genData.message || 'Generation failed');
      }

      // 步骤3: 启动轮询
      const idToTrack = genData.data?.id;

      if (idToTrack) {
        // Use the model passed from params, or fallback to defaults if not provided
        const effectiveModel = params.model || (params.mediaType === 'video' ? 'kling-v1' : 'flux-dev');
        let platform = effectiveModel;
        
        // Map model to platform for polling
        if (effectiveModel.includes('flux')) {
          platform = 'grok';
        } else if (effectiveModel.includes('kling')) {
          platform = 'kling';
        } else if (effectiveModel.includes('suno')) {
            platform = 'suno';
        } else if (effectiveModel.includes('hailuo')) {
            platform = 'hailuo';
        } else if (effectiveModel.includes('dreamina')) {
            platform = 'dreamina';
        } else if (effectiveModel.includes('higgsfield')) {
            platform = 'higgsfield';
        } else if (effectiveModel.includes('heygen')) {
            platform = 'heygen';
        }

        console.log('Starting task polling for ID:', idToTrack, 'Platform:', platform, 'Model:', effectiveModel);
        pollTaskStatus(idToTrack, params.mediaType, platform);
      } else {
        throw new Error('Task created but no id was returned.');
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err.message || 'Generation failed');
      setIsGenerating(false);
    }
  }, [pollTaskStatus]);

  /**
   * 重置结果状态
   * 用于用户重新开始生成
   */
  const resetResult = useCallback(() => {
    setGeneratedResult(undefined);
    setError(null);
  }, []);

  return (
    <ToolContentContext.Provider value={{ generatedResult, resultType, isGenerating, error, startGenerate, resetResult }}>
      {children}
    </ToolContentContext.Provider>
  );
}

/**
 * 获取 ToolContent 上下文的 Hook
 * 必须在 ToolContentProvider 内部使用
 */
export const useToolContent = () => {
  const context = useContext(ToolContentContext);
  if (context === undefined) {
    throw new Error('useToolContent must be used within a ToolContentProvider');
  }
  return context;
};
