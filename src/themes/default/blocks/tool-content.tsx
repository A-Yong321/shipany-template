'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Upload, Sparkles } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Example {
  category: string;
  prompt: string;
  image: string;
}

interface ToolContentProps {
  /** 工具名称 */
  toolName: string;
  /** 示例列表 */
  examples: Example[];
  /** 默认prompt */
  defaultPrompt?: string;
}

/**
 * 工具内容区组件
 * 包含示例展示、prompt输入、图片上传和生成按钮
 */
export function ToolContent({ toolName, examples, defaultPrompt = '' }: ToolContentProps) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [selectedExample, setSelectedExample] = useState<Example | null>(examples[0] || null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  // 选择示例时自动填入prompt
  const handleExampleClick = (example: Example) => {
    setSelectedExample(example);
    setPrompt(example.prompt);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedImage(file);
  };

  return (
    <div className="space-y-6">
      {/* 工具列表头 (Type Selector) - 紧凑设计 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
           <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Type</h2>
           {/* <span className="text-xs text-primary cursor-pointer hover:underline">View All</span> */}
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/20">
          {examples.slice(0, 5).map((example, index) => {
             const isSelected = selectedExample === example || (!selectedExample && index === 0);
             return (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className={cn(
                  "group relative shrink-0 w-24 flex flex-col items-center gap-2 rounded-lg p-1 transition-all",
                  isSelected ? "bg-muted" : "hover:bg-muted/50"
                )}
              >
                <div className={cn(
                  "relative h-16 w-16 overflow-hidden rounded-md border-2 transition-all",
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
                   "text-xs font-medium truncate max-w-full",
                   isSelected ? "text-foreground" : "text-muted-foreground"
                )}>
                  {example.category}
                </span>
              </button>
             );
          })}
        </div>
      </div>

      {/* 主操作区 (Image Upload + Prompt) - 深色卡片 */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
         {/* Upload / Preview Area */}
         <div className="grid gap-px bg-border p-px sm:grid-cols-2">
            {/* Left: Input/Upload */}
            <div className="relative aspect-[3/4] bg-muted/10 p-6 flex flex-col items-center justify-center text-center group">
               <input
                 id="image-upload"
                 type="file"
                 accept="image/*"
                 onChange={handleImageUpload}
                 className="absolute inset-0 cursor-pointer opacity-0 z-10"
               />
               
               {uploadedImage ? (
                 <div className="relative w-full h-full">
                    {/* Placeholder for uploaded image preview if we implemented URL.createObjectURL */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-lg border border-dashed border-primary/50">
                       <span className="text-sm font-medium text-primary break-all p-4">{uploadedImage.name}</span>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); setUploadedImage(null); }} className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-full hover:bg-destructive hover:text-white transition-colors z-20">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                 </div>
               ) : (
                 <>
                    <div className="mb-4 rounded-full bg-muted p-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Upload className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-semibold">Upload Image</h3>
                    <p className="mt-1 text-xs text-muted-foreground max-w-[140px]">
                      Drag & drop or click to upload
                    </p>
                 </>
               )}
            </div>

            {/* Right: Generating Placeholder / Result */}
            <div className="relative aspect-[3/4] bg-muted/30 flex flex-col items-center justify-center text-center border-t sm:border-t-0 sm:border-l border-border">
               <div className="rounded-full bg-muted p-4 opacity-50">
                  <Sparkles className="h-6 w-6" />
               </div>
               <p className="mt-3 text-xs text-muted-foreground">Generated image will appear here</p>
            </div>
         </div>

         {/* Prompt Area */}
         <div className="border-t border-border p-4 bg-background/50">
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                className="min-h-[100px] resize-none border-0 bg-transparent focus-visible:ring-0 p-0 text-sm placeholder:text-muted-foreground/70"
              />
              <div className="flex justify-between items-center mt-2 border-t border-border/50 pt-3">
                 <span className="text-xs text-muted-foreground">Credits required: 10</span>
                 <Button size="sm" className="gap-2 rounded-full px-6">
                    <Sparkles className="h-4 w-4" />
                    Create
                 </Button>
              </div>
            </div>
         </div>
      </div>
      
      {/* Background Music Toggle (Optional) */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-3">
         <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Background Music</span>
            <span className="text-xs text-muted-foreground">(Optional)</span>
         </div>
         <div className="h-5 w-9 rounded-full bg-muted relative cursor-pointer">
            <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background shadow-sm transition-all" />
         </div>
      </div>
    </div>
  );
}
