'use client';

import { useState } from 'react';
import { Heart, Play } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { LazyImage, LazyVideo } from '@/shared/blocks/common';

interface InspirationItem {
  id: string;
  image: string;
  video?: string;
  author: string;
  avatar?: string;
  likes: number;
  platform?: 'tiktok' | 'instagram' | 'twitter';
}

interface InspirationsProps {
  items?: InspirationItem[];
  toolType?: 'video' | 'image';
}

const VIDEO_INSPIRATIONS: InspirationItem[] = [
  { id: '1', video: '/videos/AI_Kissing.mp4', image: '/imgs/cms/AI-Kissing_正常接吻_1.png', author: 'Anna', likes: 124, platform: 'tiktok' },
  { id: '2', video: '/videos/正常接吻.mp4', image: '/imgs/cms/AI-Kissing_正常接吻_2.png', author: 'Mike', likes: 89, platform: 'instagram' },
  { id: '3', image: '/imgs/cms/AI-Kissing_脸颊之吻_1.png', author: 'Sarah', likes: 256, platform: 'tiktok' },
  { id: '4', image: '/imgs/cms/AI-Kissing_脸颊之吻_2.png', author: 'John', likes: 45 },
  { id: '5', video: '/videos/扭臀舞.mp4', image: '/imgs/cms/Twerk_扭臀舞_1.png', author: 'Emily', likes: 567, platform: 'instagram' },
  { id: '6', video: '/videos/电摇舞.mp4', image: '/imgs/cms/Twerk_电摇舞_2.png', author: 'David', likes: 231, platform: 'tiktok' },
  { id: '7', video: '/videos/肌肉展示.mp4', image: '/imgs/cms/Muscle_肌肉展示_2.png', author: 'Chris', likes: 342, platform: 'instagram' },
  { id: '8', image: '/imgs/cms/Hug_拥抱_1.png', author: 'Lisa', likes: 198, platform: 'tiktok' },
  { id: '9', image: '/imgs/cms/Hug_拥抱_2.png', author: 'Tom', likes: 156 },
  { id: '10', video: '/videos/抖动身体.mp4', image: '/imgs/cms/Jiggle_抖动身体_1.png', author: 'Amy', likes: 423, platform: 'instagram' },
  { id: '11', video: '/videos/肚皮舞.mp4', image: '/imgs/cms/AI-Dance-Generator_肚皮舞_1.png', author: 'Kevin', likes: 287, platform: 'tiktok' },
  { id: '12', image: '/imgs/cms/Hug_公主抱_2.png', author: 'Sophie', likes: 178 },
];

const IMAGE_INSPIRATIONS: InspirationItem[] = [
  { id: '1', image: '/imgs/cms/AI-Fake-Date_美国女友_1.png', author: 'Luna', likes: 234, platform: 'instagram' },
  { id: '2', image: '/imgs/cms/AI-Fake-Date_美国女友_2.png', author: 'Ryan', likes: 156, platform: 'tiktok' },
  { id: '3', image: '/imgs/cms/AI-Fake-Date_俄罗斯女友_1.png', author: 'Mia', likes: 312 },
  { id: '4', image: '/imgs/cms/AI-Fake-Date_俄罗斯女友_2.png', author: 'Jack', likes: 89, platform: 'instagram' },
  { id: '5', image: '/imgs/cms/AI-Fake-Date_中国女友_1.png', author: 'Emma', likes: 421, platform: 'tiktok' },
  { id: '6', image: '/imgs/cms/AI-Fake-Date_中国女友_2.png', author: 'Noah', likes: 267, platform: 'instagram' },
  { id: '7', image: '/imgs/cms/Hug_侧身依抱_1.png', author: 'Olivia', likes: 178, platform: 'tiktok' },
  { id: '8', image: '/imgs/cms/Hug_侧身依抱_2.png', author: 'Liam', likes: 134 },
  { id: '9', image: '/imgs/cms/Pregnant-AI_怀孕_1.png', author: 'Ava', likes: 245, platform: 'instagram' },
  { id: '10', image: '/imgs/cms/Pregnant-AI_怀孕_2.png', author: 'Oliver', likes: 189, platform: 'tiktok' },
  { id: '11', image: '/imgs/cms/AI-Selfie-with-Celebrities_名人合拍_1.png', author: 'Isabella', likes: 567 },
  { id: '12', image: '/imgs/cms/AI-Selfie-with-Celebrities_名人合拍_2.png', author: 'William', likes: 398, platform: 'instagram' },
];

function InspirationCard({ item }: { item: InspirationItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative break-inside-avoid overflow-hidden rounded-xl bg-muted/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
       <div className="relative aspect-[3/4] w-full">
         <LazyImage
           src={item.image}
           alt={`Inspiration by ${item.author}`}
           fill
           className={cn("transition-transform duration-500 group-hover:scale-105", item.video && isHovered && "opacity-0")}
           sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
         />


         {item.video && (
           <div className={cn("absolute inset-0 transition-opacity duration-300", isHovered ? "opacity-100" : "opacity-0")}>
             <LazyVideo
               src={item.video}
               autoPlayOnVisible={false}
               className="w-full h-full"
             />
           </div>
         )}
         
         {item.video && !isHovered && (
           <div className="absolute top-2 left-2 rounded-full bg-black/40 p-1.5 backdrop-blur-sm">
             <Play className="w-3 h-3 text-white fill-white" />
           </div>
         )}
         
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
         
         {item.platform === 'tiktok' && (
            <div className="absolute top-2 right-2 rounded-full bg-black/20 p-1 backdrop-blur-sm">
               <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </div>
         )}
         {item.platform === 'instagram' && (
            <div className="absolute top-2 right-2 rounded-full bg-black/20 p-1 backdrop-blur-sm">
               <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
            </div>
         )}
         
         <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-xs font-medium truncate max-w-[80px]">@{item.author}</span>
           <div className="flex items-center gap-1 text-xs">
              <Heart className="w-3 h-3" /> {item.likes}
           </div>
         </div>
       </div>
    </div>
  );
}

export function Inspirations({ items = [], toolType = 'video' }: InspirationsProps) {
  const [activeTab, setActiveTab] = useState<'inspirations' | 'creations'>('inspirations');

  const defaultItems = toolType === 'video' ? VIDEO_INSPIRATIONS : IMAGE_INSPIRATIONS;
  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-4 border-b border-border/50 pb-4">
        <button
          onClick={() => setActiveTab('inspirations')}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
             activeTab === 'inspirations' 
             ? "bg-foreground text-background" 
             : "text-muted-foreground hover:bg-muted"
          )}
        >
          Inspirations
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pt-4 scrollbar-hide">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-3 pb-20">
          {displayItems.map((item) => (
             <InspirationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
