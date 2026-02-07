'use client';

import { Play } from 'lucide-react';

interface TextToVideoPreviewProps {
  video?: string;
  poster?: string;
  prompt?: string;
}

export function TextToVideoPreview({ 
  video = '/videos/AI_Kissing.mp4', // Default placeholder video
  poster = '/imgs/cms/AI-Kissing_正常接吻_1.png',
  prompt = 'Astronaut cat leaping on the moon'
}: TextToVideoPreviewProps) {
  return (
    <div className="flex h-full flex-col bg-background rounded-2xl overflow-hidden border border-border/50 shadow-sm relative group">
      <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-black/5">
        <div className="relative w-full h-full">
           <video
            src={video}
            poster={poster}
            className="w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
          />
           
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
           
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10 pointer-events-none">
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md max-w-[80%] leading-tight">
                {prompt}
              </h2>
           </div>

           <div className="absolute bottom-10 left-0 right-0 text-center z-10">
              <h3 className="text-lg font-semibold text-white mb-2">Create AI Videos from Text</h3>
              <p className="text-sm text-white/70">Enter a prompt and click Generate to create stunning videos</p>
           </div>
           
           {/* Play Icon Overlay (Optional visual cue) */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity">
              <div className="bg-black/40 rounded-full p-4 backdrop-blur-sm">
                <Play className="w-12 h-12 text-white fill-white" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
