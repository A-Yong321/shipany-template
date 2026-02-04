'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, Monitor, Smartphone, Volume2, Wand2, Play, Image as ImageIcon, CheckCircle2, MoreHorizontal, Settings, Clock, Maximize2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

const RATIOS = [
  { id: '1:1', label: '1:1', icon: <div className="w-4 h-4 border-2 border-current rounded-sm" /> },
  { id: '16:9', label: '16:9', icon: <div className="w-6 h-3.5 border-2 border-current rounded-sm" /> },
  { id: '9:16', label: '9:16', icon: <div className="w-3.5 h-6 border-2 border-current rounded-sm" /> },
  { id: '4:3', label: '4:3', icon: <div className="w-5 h-4 border-2 border-current rounded-sm" /> },
];

const DURATIONS = [
  { id: '5s', label: '5s' },
  { id: '10s', label: '10s' },
];

const RESOLUTIONS = [
  { id: '720p', label: '720p' },
  { id: '1080p', label: '1080p' },
];

export function VideoTool({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [prompt, setPrompt] = useState('');
  const [activeRatio, setActiveRatio] = useState('16:9');
  const [activeDuration, setActiveDuration] = useState('5s');
  const [activeResolution, setActiveResolution] = useState('720p');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Mock data handling
  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const fillExample = (text: string) => {
    setPrompt(text);
  };

  return (
    <section id={section.id} className={cn("py-12 md:py-20 bg-black/5 dark:bg-zinc-900/30", className)}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Panel: Settings & Input */}
          <div className="flex-1 bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              <span>AI Video Generator</span>
            </h2>

            {/* Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Upload Image (Optional)</label>
              <div 
                className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-2xl p-8 transition-colors hover:border-primary/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer flex flex-col items-center justify-center gap-3 text-center"
                onClick={() => setUploadedImage('https://placehold.co/600x400/png')}
              >
                {uploadedImage ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden">
                    <Image src={uploadedImage} alt="Uploaded" fill className="object-cover" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setUploadedImage(null); }}
                      className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                    >
                      <PlusRotateIcon />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the video you want to generate..."
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
              />
            </div>

            {/* Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Aspect Ratio */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Aspect Ratio</label>
                <div className="grid grid-cols-4 gap-2">
                  {RATIOS.map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => setActiveRatio(ratio.id)}
                      className={cn(
                        "flex flex-col items-center justify-center gap-1 p-2 rounded-lg border text-xs transition-all",
                        activeRatio === ratio.id
                          ? "border-primary bg-primary/5 text-primary font-medium"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 text-muted-foreground"
                      )}
                    >
                      {ratio.icon}
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

               {/* Duration & Resolution */}
               <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Duration</label>
                    <div className="flex gap-2">
                      {DURATIONS.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => setActiveDuration(d.id)}
                          className={cn(
                            "flex-1 px-3 py-2 rounded-lg border text-sm transition-all",
                            activeDuration === d.id
                              ? "border-primary bg-primary/5 text-primary font-medium"
                              : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 text-muted-foreground"
                          )}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>
                   <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Resolution</label>
                     <div className="flex gap-2">
                       {RESOLUTIONS.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setActiveResolution(r.id)}
                          className={cn(
                            "flex-1 px-3 py-2 rounded-lg border text-sm transition-all",
                            activeResolution === r.id
                              ? "border-primary bg-primary/5 text-primary font-medium"
                              : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 text-muted-foreground"
                          )}
                        >
                          {r.label}
                        </button>
                      ))}
                     </div>
                   </div>
               </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isGenerating ? (
                 <>
                   <span className="animate-spin text-xl">◌</span> Generating...
                 </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Generate Video
                </>
              )}
            </button>
          </div>

          {/* Right Panel: Preview & Inspiration */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Preview Window */}
            <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 aspect-video relative group">
                {/* Placeholder / Empty State */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-1" />
                    </div>
                    <p className="font-medium">Preview Area</p>
                </div>

                 {/* Grid Overlay for tech feel */}
                 <div className="absolute inset-0 bg-[url('/imgs/grid.png')] opacity-10 pointer-events-none" />
            </div>

            {/* Example Prompts */}
             {section.data?.examples && (
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800 flex-1 flex flex-col">
                 <h3 className="font-bold mb-4 flex items-center gap-2">
                    <SparklesIcon /> Inspiration
                 </h3>
                 <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-2 custom-scrollbar flex-1 content-start">
                    {(section.data.examples as any[]).map((example, idx) => (
                        <div 
                            key={idx}
                            onClick={() => fillExample(example.prompt)}
                            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-all"
                        >
                            {example.image ? (
                                <Image 
                                    src={example.image} 
                                    alt={example.category} 
                                    fill 
                                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                            ) : (
                                <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-muted-foreground">
                                    <ImageIcon className="w-8 h-8 opacity-50" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs font-bold text-white mb-0.5">{example.category}</span>
                                <p className="text-[10px] text-zinc-300 line-clamp-2 leading-tight">
                                    {example.prompt}
                                </p>
                            </div>
                        </div>
                    ))}
                 </div>
                </div>
             )}

          </div>
        </div>
      </div>
    </section>
  );
}

const PlusRotateIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7.5L11 7.5" stroke="currentColor" strokeLinecap="square" transform="rotate(45 7.5 7.5)"/><path d="M7.5 4L7.5 11" stroke="currentColor" strokeLinecap="square" transform="rotate(45 7.5 7.5)"/></svg>
)

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
)
