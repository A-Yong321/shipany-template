'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Upload, Sparkles, Play, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

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
}

/**
 * 工具内容区组件
 * 包含效果预览、示例选择、图片上传和生成按钮
 */
export function ToolContent({ toolName, examples, defaultPrompt = '', toolType = 'video', initialType, inputType = 'image' }: ToolContentProps & { inputType?: 'text' | 'image' }) {
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
      {/* 选中Type的效果预览区 - 参考图2的顶部预览 */}
      {selectedExample && (
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
              <video
                src={selectedExample.video}
                poster={selectedExample.image}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
                playsInline
              />
            ) : (
              <Image
                src={selectedExample.image}
                alt={selectedExample.category}
                fill
                className="object-cover"
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

      {/* Type选择器 - 参考图2的Type区域 */}
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
                  <Image
                    src={example.image}
                    alt={example.category}
                    fill
                    className="object-cover"
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

      {/* 根据 inputType 渲染不同的输入区域 */}
      {inputType === 'text' ? (
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Prompt</h2>
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to generate..."
              className="min-h-[100px] resize-none bg-muted/20 border-border focus:border-primary/50"
            />
            <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground">
              {prompt.length} chars
            </div>
          </div>
        </div>
      ) : (
        /* Image Upload Area */
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Image</h2>
          
          <div className="grid grid-cols-2 gap-2">
            {/* 左侧: 上传图片 */}
            <div className="relative aspect-[16/9] rounded-lg border-2 border-dashed border-border bg-muted/20 overflow-hidden group">
              <input
                id="image-upload-1"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 cursor-pointer opacity-0 z-10"
              />
              
              {uploadedImageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={uploadedImageUrl}
                    alt="Uploaded"
                    fill
                    className="object-cover"
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
                  <p className="mt-2 text-xs text-muted-foreground">
                    Click to upload an image
                  </p>
                </div>
              )}
            </div>

            {/* 右侧: 可选的第二张图片 */}
            <div className="relative aspect-[16/9] rounded-lg border-2 border-dashed border-border bg-muted/10 overflow-hidden group">
              <input
                id="image-upload-2"
                type="file"
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0 z-10"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                  <Upload className="h-4 w-4" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Click to upload an image
                </p>
                <span className="mt-0.5 text-[10px] text-muted-foreground/70">(Optional)</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Please upload two images share the same aspect ratio and feature only one person in each image. Or upload one image that contains two people.
          </p>
        </div>
      )}

      {/* Background Music Toggle */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card/50 px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Background Music</span>
          <span className="text-[10px] text-muted-foreground">(1)</span>
        </div>
        <div className="h-5 w-9 rounded-full bg-muted relative cursor-pointer">
          <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background shadow-sm transition-all" />
        </div>
      </div>

      {/* Credits and Create Button */}
      <div className="flex justify-between items-center pt-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Credits required:</span>
          <span className="text-[10px] text-muted-foreground">(1)</span>
        </div>
        <span className="text-sm font-medium">10 Credits</span>
      </div>

      <Button className="w-full gap-2 rounded-lg py-4">
        <Sparkles className="h-4 w-4" />
        Create
      </Button>
    </div>
  );
}
