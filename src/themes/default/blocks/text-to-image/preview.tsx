'use client';

import { useTextToImage } from './context';


interface TextToImagePreviewProps {
  image?: string;
  prompt?: string;
  isLoading?: boolean;
}

export function TextToImagePreview({ 
  image: propImage, 
  prompt: propPrompt,
  isLoading: propIsLoading = false
}: TextToImagePreviewProps) {
  const { generatedImage, generatedPrompt, isGenerating, error } = useTextToImage();

  // Prefer context data if available (real-time results)
  const displayImage = generatedImage || propImage;
  const displayPrompt = generatedPrompt || propPrompt;

  const handleDownload = async () => {
    if (!displayImage) return;
    try {
      const response = await fetch(displayImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      // Fallback: open in new tab if fetch fails due to CORS
      window.open(displayImage, '_blank');
    }
  };

  const isLoading = isGenerating || propIsLoading;

  return (
    <div className="flex h-full flex-col bg-background rounded-2xl overflow-hidden border border-border/50 shadow-sm">
      <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-black/5">
        <div className="relative w-full h-full">
           {displayImage ? (
             <img
              src={displayImage}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-contain" // Native img to bypass SSRF private IP check
            />
           ) : null}
           
           {isLoading && (
             <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20">
               <div className="flex flex-col items-center gap-3">
                 <span className="animate-spin text-4xl text-white">◌</span>
                 <span className="text-white font-medium">AI is generating...</span>
               </div>
             </div>
           )}
           
           {/* Download Button - only show when generatedImage is present and not loading */}
           {generatedImage && !isLoading && (
             <button 
              onClick={handleDownload}
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all z-30 font-medium text-sm"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
               Download
             </button>
           )}
           
           {/* Placeholder Layout (Legacy 'no result' state replaced) */}
           {!displayImage && !isLoading && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[#0A0F1D]">
                <div className="mb-6 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/90"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-3 tracking-wide">
                  AI Image Preview
                </h3>
                <p className="text-sm text-white/40 max-w-[260px] leading-relaxed font-light">
                  Enter prompt to generate image
                </p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
