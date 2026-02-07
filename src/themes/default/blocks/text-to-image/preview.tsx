'use client';

import Image from 'next/image';


interface TextToImagePreviewProps {
  image?: string;
  prompt?: string;
}

export function TextToImagePreview({ 
  image = '/imgs/cms/AI-Kissing_正常接吻_1.png', // Default placeholder
  prompt = 'Astronaut cat leaping on the moon'
}: TextToImagePreviewProps) {
  return (
    <div className="flex h-full flex-col bg-background rounded-2xl overflow-hidden border border-border/50 shadow-sm">
      <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-black/5">
        <div className="relative w-full h-full">
           <Image
            src={image}
            alt="Preview"
            fill
            className="object-cover"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
           
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10 pointer-events-none">
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md max-w-[80%] leading-tight">
                {prompt}
              </h2>
           </div>

           <div className="absolute bottom-10 left-0 right-0 text-center z-10">
              <h3 className="text-lg font-semibold text-white mb-2">Create AI Images from Text</h3>
              <p className="text-sm text-white/70">Enter a prompt and click Generate to create stunning images</p>
           </div>
        </div>
      </div>
    </div>
  );
}
