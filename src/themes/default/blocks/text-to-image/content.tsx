'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { ChevronLeft, Settings } from 'lucide-react';
import { Link } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';

interface TextToImageContentProps {
  toolName?: string;
  backHref?: string;
}

export function TextToImageContent({
  toolName = 'Text to Image',
  backHref = '/ai-style'
}: TextToImageContentProps) {
  const [prompt, setPrompt] = useState('');
  const [ratio, setRatio] = useState('1:1');
  const [quantity, setQuantity] = useState(1);

  const ratios = [
    { label: '1:1', value: '1:1' },
    { label: '9:16', value: '9:16' },
    { label: '16:9', value: '16:9' },
    { label: '4:3', value: '4:3' },
    { label: '3:4', value: '3:4' },
    { label: '3:2', value: '3:2' },
    { label: '2:3', value: '2:3' },
  ];

  return (
    <div className="space-y-6">
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
            placeholder="Describe the image you want to generate..."
            className="min-h-[140px] resize-none bg-muted/20 border-border focus:border-primary/50 text-sm p-4 rounded-xl"
            maxLength={1200}
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {prompt.length}/1200 characters
          </div>
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

      {/* Quantity Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">Quantity</label>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setQuantity(num)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                quantity === num
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button 
        className="w-full gap-2 rounded-lg py-6 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-[0.98] transition-all"
      >
        Generate
        <span className="ml-auto text-sm">-4 Credits</span>
      </Button>
    </div>
  );
}
