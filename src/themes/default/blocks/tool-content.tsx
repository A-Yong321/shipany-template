'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useSession } from '@/core/auth/client';
import { useAppContext } from '@/shared/contexts/app';
import { useToolContent } from './tool-content-context';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Upload, Sparkles, Play, ChevronRight, ZoomIn, Settings, ChevronLeft } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Link } from '@/core/i18n/navigation';
import { LazyImage, LazyVideo } from '@/shared/blocks/common';


interface Example {
  category: string;
  prompt: string;
  image: string;
  video?: string;  // 可选的视频路径
}

interface ToolContentProps {
  /** 工具名称 */
  toolName: string;
  /** 示例列表 */
  examples: Example[];
  /** 默认prompt */
  defaultPrompt?: string;
  /** 工具类型: video 或 image */
  toolType?: 'video' | 'image';
  /** 初始选中的特效类型（从URL参数传入） */
  initialType?: string;
  /** 输入类型: text, image, 或 image-text */
  inputType?: 'text' | 'image' | 'image-text';
  /** 是否显示Ratio选择器 */
  showRatioSelector?: boolean;
  /** 是否显示Quantity选择器 */
  showQuantitySelector?: boolean;
  /** 返回按钮的链接地址 */
  backHref?: string;
  /** 是否显示Duration滑块 */
  showDurationSelector?: boolean;
  /** 是否显示Resolution选择器 */
  showResolutionSelector?: boolean;
  /** Prompt输入框占位符 */
  promptPlaceholder?: string;
  /** Prompt最大字符数 */
  promptMaxLength?: number;
  /** Generate按钮文字 */
  generateButtonText?: string;
  /** 所需Credits数量 */
  creditsRequired?: number;
  /** 工具的 slug 标识，用于确定 API 调用参数 */
  toolSlug?: string;
  /** 可选模型列表 */
  models?: { label: string; value: string }[];
}

/**
 * 工具内容区组件
 * 包含效果预览、示例选择、图片上传和生成按钮
 */
export function ToolContent({ 
  toolName, 
  examples, 
  defaultPrompt = '', 
  toolType = 'video', 
  initialType, 
  inputType = 'image',
  showRatioSelector = false,
  showQuantitySelector = false,
  showDurationSelector = false,
  showResolutionSelector = false,
  backHref = '/ai-style',
  promptPlaceholder = 'Describe what you want to change...',
  promptMaxLength = 1200,
  generateButtonText = 'Generate',
  creditsRequired = 4,
  toolSlug = '',
  models = []
}: ToolContentProps) {
  // API 对接所需 hooks
  const { data: session } = useSession();
  const { user } = useAppContext();
  const { startGenerate, isGenerating } = useToolContent();
  // 根据 initialType 查找匹配的示例，用于从首页点击特效卡片后预选
  const initialExample = useMemo(() => {
    if (initialType) {
      const found = examples.find(e => e.category.toLowerCase() === initialType.toLowerCase());
      return found || examples[0];
    }
    return examples[0];
  }, [examples, initialType]);

  const [prompt, setPrompt] = useState(initialExample?.prompt || defaultPrompt);
  const [selectedExample, setSelectedExample] = useState<Example | null>(initialExample || null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [ratio, setRatio] = useState<string>('1:1');
  const [quantity, setQuantity] = useState<number>(1);
  const [duration, setDuration] = useState<number>(5);
  const [resolution, setResolution] = useState<string>('1080p');
  // Default to first model if available, otherwise fallback based on tool type
  const [model, setModel] = useState<string>(
    models.length > 0 ? models[0].value : (toolType === 'video' ? 'kling-v1' : 'flux-dev')
  );

  // 选择示例时自动填入prompt
  const handleExampleClick = (example: Example) => {
    setSelectedExample(example);
    setPrompt(example.prompt);
  };

  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      // 创建预览URL
      const url = URL.createObjectURL(file);
      setUploadedImageUrl(url);
    }
  };

  // 清除上传的图片
  const clearUploadedImage = () => {
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }
    setUploadedImage(null);
    setUploadedImageUrl(null);
  };

  return (
    <div className="space-y-3">
      {/* 页面标题和返回按钮 */}
      <div className="flex items-center gap-2 -mx-1 mb-2">
        <Link href={backHref} className="p-1 hover:bg-muted rounded-md transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold">{toolName}</h1>
      </div>

      {/* 选中Type的效果预览区 - 仅当有示例时显示 */}
      {selectedExample && examples.length > 0 && (
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border">
          {/* Hot标签 */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded">Hot</span>
          </div>
          
          {/* Change按钮 */}
          <div className="absolute top-3 right-3 z-10">
            <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white/80 bg-black/30 backdrop-blur-sm rounded hover:bg-black/50 transition-colors">
              Change <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* 预览区 */}
          <div className="relative aspect-[4/3] w-full">
            {toolType === 'video' && selectedExample.video ? (
              <LazyVideo
                src={selectedExample.video}
                poster={selectedExample.image}
                className="w-full h-full"
                autoPlayOnVisible={true}
              />
            ) : (
              <LazyImage
                src={selectedExample.image}
                alt={selectedExample.category}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, (max-width: 1440px) 60vw, 800px"
              />

            )}

            
            {/* 渐变遮罩和标题 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl font-bold text-white">{toolName}</h2>
            </div>

            {/* 放大按钮 */}
            <button className="absolute bottom-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white/80 hover:bg-black/50 transition-colors">
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Type选择器 - 仅当有示例时显示 */}
      {examples.length > 0 && (
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Type</h2>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/20">
            {examples.map((example, index) => {
               const isSelected = selectedExample === example;
               return (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className={cn(
                    "group relative shrink-0 flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition-all",
                    isSelected ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  {/* Hot标签 */}
                  {index === 0 && (
                    <div className="absolute -top-1 -left-1 z-10">
                      <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded">Hot</span>
                    </div>
                  )}
                  
                  <div className={cn(
                    "relative h-12 w-12 overflow-hidden rounded-md border-2 transition-all",
                    isSelected ? "border-primary ring-2 ring-primary/20" : "border-transparent group-hover:border-primary/50"
                  )}>
                    <LazyImage
                      src={example.image}
                      alt={example.category}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />

                  </div>
                  <span className={cn(
                     "text-[10px] font-medium truncate max-w-[60px]",
                     isSelected ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {example.category}
                  </span>
                </button>
               );
            })}
          </div>
        </div>
      )}

      {/* Model Selection - Render if models props provided */}
      {models.length > 0 && (
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Model</h2>
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
      )}

      {/* 根据 inputType 渲染不同的输入区域 */}
      {['text', 'image-text'].includes(inputType || 'image') && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Prompt</h2>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="h-3 w-3" />
              {showDurationSelector ? 'Enhance' : 'Optimize'}
            </button>
          </div>
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={promptPlaceholder}
              className="min-h-[100px] resize-none bg-muted/20 border-border focus:border-primary/50"
              maxLength={promptMaxLength}
            />
            <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground">
              {prompt.length}/{promptMaxLength}
            </div>
          </div>
        </div>
      )}

      {['image', 'image-text'].includes(inputType || 'image') && (
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Upload Image</h2>
          
          {/* 单个上传图片区域 */}
          <div className="relative aspect-[16/9] rounded-lg border-2 border-dashed border-border bg-muted/20 overflow-hidden group">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 cursor-pointer opacity-0 z-10"
            />
            
            {uploadedImageUrl ? (
              <div className="relative w-full h-full">
                <LazyImage
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />

                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); clearUploadedImage(); }} 
                  className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-destructive hover:text-white transition-colors z-20"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <div className="rounded-full bg-muted p-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Upload className="h-5 w-5" />
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">
                  Click or drag image here
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Supports JPG, PNG, WEBP
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Duration滑块选择器 */}
      {showDurationSelector && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Duration</h2>
            <span className="text-sm font-medium">{duration}s</span>
          </div>
          <input
            type="range"
            min="5"
            max="10"
            step="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-600 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-blue-500 [&::-moz-range-thumb]:to-purple-600 [&::-moz-range-thumb]:border-0"
          />
        </div>
      )}

      {/* Resolution选择器 */}
      {showResolutionSelector && (
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Resolution</h2>
          <div className="grid grid-cols-2 gap-2">
            {['720p', '1080p'].map((r) => (
              <button
                key={r}
                onClick={() => setResolution(r)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  resolution === r
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ratio选择器 */}
      {showRatioSelector && (
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Ratio</h2>
          <div className="grid grid-cols-4 gap-2">
            {['1:1', '3:4', '4:3', '16:9'].map((r) => (
              <button
                key={r}
                onClick={() => setRatio(r)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  ratio === r
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity选择器 */}
      {showQuantitySelector && (
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quantity</h2>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((q) => (
              <button
                key={q}
                onClick={() => setQuantity(q)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  quantity === q
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Generate按钮 - 带积分检查和登录检查 */}
      {session ? (
        <Button 
          onClick={async () => {
            // 检查是否需要上传图片
            if (['image', 'image-text'].includes(inputType || 'image') && !uploadedImage) {
              alert('Please upload an image first');
              return;
            }
            // 对于纯文本输入类型，检查是否有 prompt
            if ((inputType === 'text' || toolSlug === 'image-to-video') && !prompt.trim()) {
              alert('Please enter a prompt');
              return;
            }
            // 确定 scene 和 action 参数
            const isVideoOutput = toolType === 'video';
            const scene = isVideoOutput ? 'image-to-video' : 'image-to-image';
            const action = isVideoOutput ? 'image2video' : 'generate';
            const mediaType = isVideoOutput ? 'video' : 'image';
            
            await startGenerate({
              imageFile: uploadedImage!,
              prompt: prompt || defaultPrompt,
              mediaType,
              scene,
              model: model, // Pass selected model
              options: {
                action,
                ...(showRatioSelector && { aspect_ratio: ratio }),
                ...(showDurationSelector && { duration }),
                ...(showQuantitySelector && { count: quantity }),
              }
            });
          }}
          disabled={isGenerating || (user?.credits?.remainingCredits || 0) < creditsRequired}
          className="w-full gap-2 rounded-lg py-6 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin text-xl">&#9676;</span>
              Generating...
            </>
          ) : (user?.credits?.remainingCredits || 0) < creditsRequired ? (
            <>
              Insufficient Credits
              <span className="ml-auto text-sm">Need {creditsRequired}</span>
            </>
          ) : (
            <>
              {generateButtonText}
              <span className="ml-auto text-sm">-{creditsRequired} Credits</span>
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
