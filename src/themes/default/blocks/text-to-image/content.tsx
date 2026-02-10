'use client';

import { useState } from 'react';
import { useSession } from '@/core/auth/client';
import { useAppContext } from '@/shared/contexts/app';
import { useTextToImage } from './context';
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
  const { data: session } = useSession();
  const { user } = useAppContext();
  const { startTask, isGenerating, setIsGenerating } = useTextToImage();
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('flux-dev');
  const [ratio, setRatio] = useState('1024x1024');
  const [quantity, setQuantity] = useState(1);
  const costCredits = quantity * 2; // Base cost 2 per image * quantity

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
          mediaType: 'image',
          model: model,
          prompt: prompt,
          scene: 'text-to-image',
          options: {
            size: ratio,
            count: quantity,
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

      // Use context to start tracking the task
      // The id here is our local AI task UUID, used for polling /api/ai/query
      const idToTrack = result.data?.id;
      if (idToTrack) {
        console.log('Starting task polling for ID:', idToTrack);
        startTask(idToTrack, prompt);
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

  const models = [
    { label: 'Flux Dev (Grok)', value: 'flux-dev' },
    { label: 'Dreamina', value: 'dreamina' },
    { label: 'Kling', value: 'kling' },
    { label: 'Lovart', value: 'lovart' },
    { label: 'Krea', value: 'krea' },
  ];

  const ratios = [
    { label: '1:1 (1024px)', value: '1024x1024' },
    { label: '9:16 (720x1280)', value: '720x1280' },
    { label: '16:9 (1280x720)', value: '1280x720' },
    { label: '4:3 (1024x768)', value: '1024x768' },
    { label: '3:4 (768x1024)', value: '768x1024' },
    { label: '3:2 (1024x682)', value: '1024x682' },
    { label: '2:3 (682x1024)', value: '682x1024' },
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
            placeholder="Describe the image you want to generate..."
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
      {session ? (
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || (user?.credits?.remainingCredits || 0) < costCredits}
          className="w-full gap-2 rounded-lg py-6 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin text-xl">◌</span>
              Generating...
            </>
          ) : (user?.credits?.remainingCredits || 0) < costCredits ? (
            <>
              Insufficient Credits
              <span className="ml-auto text-sm">Need {costCredits}</span>
            </>
          ) : (
            <>
              Generate
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
