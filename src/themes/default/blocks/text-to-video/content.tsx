'use client';

import { useState } from 'react';
import { useSession } from '@/core/auth/client';
import { useAppContext } from '@/shared/contexts/app';
import { useTextToVideo } from './context';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { ChevronLeft, Settings } from 'lucide-react';
import { Link } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';

interface TextToVideoContentProps {
  toolName?: string;
  backHref?: string;
}

/**
 * 文生视频内容区组件
 * 严格参照 text-to-image/content.tsx 的 API 调用模式
 * 发送请求: POST /api/ai/generate
 * 参数: provider=aistudio, mediaType=video, scene=text-to-video, action=text2video
 */
export function TextToVideoContent({
  toolName = 'Text to Video',
  backHref = '/ai-style'
}: TextToVideoContentProps) {
  const { data: session } = useSession();
  const { user } = useAppContext();
  const { startTask, isGenerating, setIsGenerating } = useTextToVideo();
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('kling-v1');
  const [ratio, setRatio] = useState('16:9');
  const [duration, setDuration] = useState(5);
  const costCredits = 6; // text-to-video 固定消耗6积分

  /**
   * 处理生成请求
   * 严格按照接口文档发送参数:
   * - action: text2video (视频文生固定值)
   * - aspect_ratio: 宽高比
   * - duration: 视频时长(秒)
   */
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'aistudio',
          mediaType: 'video',
          model: model,
          prompt: prompt,
          scene: 'text-to-video',
          options: {
            action: 'text2video',
            aspect_ratio: ratio,
            duration: duration,
          }
        }),
      });

      const result = await response.json();
      console.log('Generate API result:', result);

      if (!response.ok) {
        if (result.error?.includes('no auth')) {
          window.location.href = '/sign-in';
          return;
        }
        throw new Error(result.error || 'Failed to generate');
      }

      if (result.code !== 0) {
        throw new Error(result.message || 'Generation failed');
      }

      // 使用 context 启动轮询 - id 是本地 AI task UUID
      const idToTrack = result.data?.id;
      if (idToTrack) {
        const platform = model.includes('kling') ? 'kling' : model;
        console.log('Starting task polling for ID:', idToTrack, 'Platform:', platform);
        startTask(idToTrack, prompt, platform);
      } else {
        console.error('No id found in response data:', result.data);
        setIsGenerating(false);
        throw new Error('Task creation succeeded but no id was returned.');
      }
    } catch (error: any) {
      console.error('Generation error:', error);
      setIsGenerating(false);
      alert(error.message);
    }
  };

  // 视频生成支持的模型
  const models = [
    { label: 'Kling V1', value: 'kling-v1' },
    { label: 'Dreamina', value: 'dreamina' },
    { label: 'Hailuo', value: 'hailuo' },
    { label: 'Krea', value: 'krea' },
  ];

  // 宽高比选项
  const ratios = [
    { label: '16:9', value: '16:9' },
    { label: '9:16', value: '9:16' },
    { label: '1:1', value: '1:1' },
    { label: '4:3', value: '4:3' },
    { label: '3:4', value: '3:4' },
    { label: '3:2', value: '3:2' },
    { label: '2:3', value: '2:3' }
  ];

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Link href={backHref} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">{toolName}</h1>
      </div>

      {/* Prompt Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">Prompt</label>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="h-3 w-3" />
            Optimize
          </button>
        </div>
        <div className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the video you want to generate..."
            className="min-h-[140px] resize-none bg-muted/20 border-border focus:border-primary/50 text-sm p-4 rounded-xl"
            maxLength={1200}
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {prompt.length}/1200 characters
          </div>
        </div>
      </div>

      {/* Model Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">Model</label>
        <div className="grid grid-cols-2 gap-2">
          {models.map((m) => (
            <button
              key={m.value}
              onClick={() => setModel(m.value)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                model === m.value
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ratio Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">Ratio</label>
        <div className="grid grid-cols-4 gap-2">
          {ratios.map((r) => (
            <button
              key={r.value}
              onClick={() => setRatio(r.value)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                ratio === r.value
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Duration Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">Duration</label>
        <div className="grid grid-cols-2 gap-2">
          {[5, 10].map((sec) => (
            <button
              key={sec}
              onClick={() => setDuration(sec)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                duration === sec
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {sec}s
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button - 与 text-to-image 完全一致的积分检查和登录逻辑 */}
      {session ? (
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || (user?.credits?.remainingCredits || 0) < costCredits}
          className="w-full gap-2 rounded-lg py-6 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin text-xl">&#9676;</span>
              Generating...
            </>
          ) : (user?.credits?.remainingCredits || 0) < costCredits ? (
            <>
              Insufficient Credits
              <span className="ml-auto text-sm">Need {costCredits}</span>
            </>
          ) : (
            <>
              Generate Video
              <span className="ml-auto text-sm">-{costCredits} Credits</span>
            </>
          )}
        </Button>
      ) : (
        <Button 
          onClick={() => window.location.href = '/sign-in'}
          className="w-full gap-2 rounded-lg py-6 text-base font-semibold bg-gray-800 hover:bg-gray-700 transition-all"
        >
          Sign in to Generate
        </Button>
      )}
    </div>
  );
}
