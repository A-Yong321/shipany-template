'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, ChevronRight, ChevronDown, Plus, Minus } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/ui/accordion';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

// Types
export interface ToolIntroProps {
  title: string;
  description: string;
  images?: { src: string }[];
}

export interface FeatureItem {
  title: string;
  description: string;
  image: { src: string };
  reverse?: boolean;
  button?: { title: string; url: string };
}

export interface ToolFeaturesProps {
  items: FeatureItem[];
}

export interface StepItem {
  title: string;
  description: string;
}

export interface HowToSectionProps {
  title: string;
  description: string;
  video?: { src: string; poster?: string };
  steps: StepItem[];
  button?: { title: string; url: string };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}

export interface MoreToolItem {
  title: string;
  image: { src: string };
  url: string;
}

export interface MoreToolsSectionProps {
  title: string;
  items: MoreToolItem[];
  toolType?: 'video' | 'image';  // 工具类型
}

// Components

/**
 * 顶部介绍区：深色背景，居中标题，图片展示
 */
export function ToolIntro({ title, description, images }: ToolIntroProps) {
  return (
    <section className="bg-black py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-3xl font-bold md:text-5xl">{title}</h2>
        <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-400 md:text-xl">
          {description}
        </p>
        
        {images && images.length > 0 && (
          <div className="mt-12 flex justify-center gap-4 overflow-hidden">
             {images.map((img, idx) => (
               <div key={idx} className="relative h-48 w-80 flex-shrink-0 overflow-hidden rounded-xl border border-gray-800 md:h-64">
                 <Image 
                   src={img.src} 
                   alt={`Intro image ${idx}`} 
                   fill 
                   className="object-cover transition-transform duration-500 hover:scale-105" 
                 />
               </div>
             ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * 特性介绍区：左文右图/右文左图交替
 */
export function ToolFeatures({ items }: ToolFeaturesProps) {
  return (
    <div className="bg-black pb-20 text-white">
      {items.map((item, idx) => (
        <section key={idx} className="py-16">
          <div className="container mx-auto px-4">
            <div className={cn(
              "flex flex-col items-center gap-12 lg:flex-row",
              item.reverse && "lg:flex-row-reverse"
            )}>
              {/* Text Content */}
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold md:text-4xl leading-tight">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {item.description}
                </p>
                {item.button && (
                   <Button size="lg" className="mt-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-8 text-black hover:from-emerald-500 hover:to-cyan-500" asChild>
                     <Link href={item.button.url}>
                       {item.button.title}
                     </Link>
                   </Button>
                )}
              </div>
              
              {/* Image Content */}
              <div className="flex-1 w-full">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 shadow-2xl">
                   <Image 
                     src={item.image.src} 
                     alt={item.title} 
                     fill 
                     className="object-cover"
                   />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * How To 使用教程区
 */
export function HowToSection({ title, description, video, steps, button }: HowToSectionProps) {
  return (
    <section className="bg-black py-20 text-white border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Video / Visual */}
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl group">
             {video?.poster && (
               <Image 
                 src={video.poster} 
                 alt="How to tutorial" 
                 fill 
                 className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
               />
             )}
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg text-white">
                 <Play className="ml-1 fill-white" size={32} />
               </div>
             </div>
             {/* Note: Actual video player simplified to visual mock for now */}
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <div className="mb-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Step {idx + 1}
                </div>
                <h4 className="mb-2 text-xl font-bold text-gray-200">
                  {step.title}
                </h4>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        {button && (
          <div className="mt-16 text-center">
             <Button size="lg" className="h-14 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-12 text-lg font-semibold text-black hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300" asChild>
               <Link href={button.url}>
                 {button.title}
               </Link>
             </Button>
          </div>
        )}
      </div>
    </section>
  );
}

// 默认视频工具
const DEFAULT_VIDEO_TOOLS: MoreToolItem[] = [
  { title: 'AI Kissing', image: { src: '/imgs/cms/AI-Kissing_正常接吻_1.png' }, url: '/en/video-effects/ai-kissing' },
  { title: 'AI Hug', image: { src: '/imgs/cms/Hug_拥抱_1.png' }, url: '/en/video-effects/ai-hug' },
  { title: 'AI Twerk', image: { src: '/imgs/cms/Twerk_扭臀舞_1.png' }, url: '/en/video-effects/ai-twerk' },
  { title: 'AI Muscle', image: { src: '/imgs/cms/Muscle_肌肉展示_1.png' }, url: '/en/video-effects/ai-muscle' },
  { title: 'AI Jiggle', image: { src: '/imgs/cms/Jiggle_抖动身体_1.png' }, url: '/en/video-effects/ai-jiggle' },
  { title: 'AI Bikini', image: { src: '/imgs/cms/AI-Bikini-Generator_比基尼_1.png' }, url: '/en/video-effects/ai-bikini' },
  { title: 'AI Dance', image: { src: '/imgs/cms/AI-Dance-Generator_肚皮舞_1.png' }, url: '/en/video-effects/ai-dance' },
  { title: 'AI Sing', image: { src: '/imgs/cms/AI-Kissing_脸颊之吻_1.png' }, url: '/en/video-effects/ai-sing' },
];

// 默认图片工具
const DEFAULT_IMAGE_TOOLS: MoreToolItem[] = [
  { title: 'AI Fake Date', image: { src: '/imgs/cms/AI-Fake-Date_美国女友_1.png' }, url: '/en/photo-effects/ai-fake-date' },
  { title: 'Hug Generator', image: { src: '/imgs/cms/Hug_侧身依抱_1.png' }, url: '/en/photo-effects/hug-generator' },
  { title: 'Pregnant AI', image: { src: '/imgs/cms/Pregnant-AI_怀孕_1.png' }, url: '/en/photo-effects/pregnant-ai' },
  { title: 'Celebrity Selfie', image: { src: '/imgs/cms/AI-Selfie-with-Celebrities_名人合拍_1.png' }, url: '/en/photo-effects/ai-selfie-with-celebrities' },
  { title: 'Couple Goals', image: { src: '/imgs/cms/Hug_公主抱_1.png' }, url: '/en/photo-effects/couple-goals' },
  { title: 'Vacation Photo', image: { src: '/imgs/cms/AI-Fake-Date_俄罗斯女友_1.png' }, url: '/en/photo-effects/vacation-photo' },
  { title: 'Family Photo', image: { src: '/imgs/cms/AI-Fake-Date_中国女友_1.png' }, url: '/en/photo-effects/family-photo' },
  { title: 'Party Photo', image: { src: '/imgs/cms/Hug_飞扑拥抱_1.png' }, url: '/en/photo-effects/party-photo' },
];

/**
 * 更多工具推荐 (网格) - 显示至少两排
 */
export function MoreToolsSection({ title, items, toolType = 'video' }: MoreToolsSectionProps) {
  // 根据工具类型选择默认工具
  const defaultTools = toolType === 'video' ? DEFAULT_VIDEO_TOOLS : DEFAULT_IMAGE_TOOLS;
  // 如果传入items不足8个，用默认工具补齐
  const displayItems = items.length >= 8 ? items : [...items, ...defaultTools].slice(0, 8);

  return (
    <section className="bg-black py-20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">{title}</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayItems.map((item, idx) => (
            <Link key={idx} href={item.url} className="group block overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 transition-colors">
              <div className="relative aspect-[4/5] overflow-hidden border-b border-gray-800">
                <Image 
                  src={item.image.src} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-3">
                 <div className="text-sm font-medium text-gray-400 group-hover:text-emerald-400 transition-colors">
                   {item.title}
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * FAQ 区域
 */
export function FAQSection({ title, items }: FAQSectionProps) {
  return (
    <section className="bg-black py-20 text-white border-t border-white/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">{title}</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {items.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border border-gray-800 bg-gray-900/30 rounded-lg px-6 overflow-hidden data-[state=open]:bg-gray-900/80 transition-all">
              <AccordionTrigger className="text-left text-lg hover:no-underline py-6 [&>svg]:hidden">
                <div className="flex items-center justify-between w-full">
                  <span>{item.question}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-gray-400 text-base leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
