/**
 * Tools Configuration
 * 
 * Defines all available AI tools and their associated effects.
 * derived from public/img_video resources as of 2026-02-05.
 */

export type ToolType = 'video' | 'photo';

export interface ToolItem {
  title: string;
  originalSrc: string; // Path to *_1.png
  effectSrc: string;   // Path to *_2.png
  videoSrc?: string;   // Path to *.mp4 (optional)
  badge?: string;      // HOT, NEW, etc.
}

export interface Tool {
  slug: string;
  title: string; // Display title for the tool category
  type: ToolType;
  items: ToolItem[];
}

export const tools: Tool[] = [
  {
    slug: 'ai-kissing',
    title: 'AI Kissing',
    type: 'video',
    items: [
      {
        title: '正常接吻',
        originalSrc: '/img_video/imgs/AI-Kissing_正常接吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_正常接吻_2.png',
        videoSrc: '/img_video/videos/AiKissing_正常接吻.mp4',
        badge: 'HOT',
      },
      {
        title: '法式接吻',
        originalSrc: '/img_video/imgs/AI-Kissing_法式接吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_法式接吻_2.png',
        videoSrc: '/img_video/videos/AIKissing法式接吻.mp4',
        badge: 'HOT',
      },
      {
        title: '脸颊之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_脸颊之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_脸颊之吻_2.png',
        videoSrc: '/img_video/videos/脸颊之吻.mp4',
      },
      {
        title: '咬嘴唇之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_咬嘴唇之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_咬嘴唇之吻_2.png',
        videoSrc: '/img_video/videos/AiKissing_咬嘴接吻.mp4',
      },
      {
        title: '额头之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_额头之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_额头之吻_2.png',
      }
    ]
  },
  {
    slug: 'ai-muscle',
    title: 'AI Muscle',
    type: 'video',
    items: [
      {
        title: '肌肉展示',
        originalSrc: '/img_video/imgs/Muscle_肌肉展示_1.png',
        effectSrc: '/img_video/imgs/Muscle_肌肉展示_2.png',
        videoSrc: '/img_video/videos/Muscle_肌肉展示.mp4',
        badge: 'HOT',
      },
      {
        title: '360 肌肉展示',
        originalSrc: '/img_video/imgs/AI-360-Rotation_肌肉展示_1.png',
        effectSrc: '/img_video/imgs/AI-360-Rotation_肌肉展示_2.png',
        videoSrc: '/img_video/videos/AI 360 Rotation.mp4',
      }
    ]
  },
  {
    slug: 'ai-hug',
    title: 'AI Hug',
    type: 'video',
    items: [
      {
        title: '拥抱',
        originalSrc: '/img_video/imgs/Hug_拥抱_1.png',
        effectSrc: '/img_video/imgs/Hug_拥抱_2.png',
        videoSrc: '/img_video/videos/hug_拥抱.mp4',
        badge: 'HOT',
      },
      {
        title: '侧身依抱',
        originalSrc: '/img_video/imgs/Hug_侧身依抱_1.png',
        effectSrc: '/img_video/imgs/Hug_侧身依抱_2.png',
        videoSrc: '/img_video/videos/hug_侧身依抱.mp4',
      },
      {
        title: '公主抱',
        originalSrc: '/img_video/imgs/Hug_公主抱_1.png',
        effectSrc: '/img_video/imgs/Hug_公主抱_2.png',
        videoSrc: '/img_video/videos/hug_公主抱.mp4',
      },
      {
        title: '托举式抱',
        originalSrc: '/img_video/imgs/Hug_托举式抱_1.png',
        effectSrc: '/img_video/imgs/Hug_托举式抱_2.png',
        videoSrc: '/img_video/videos/hug_托举式抱.mp4',
      },
      {
        title: '背后环抱',
        originalSrc: '/img_video/imgs/Hug_背后环抱_1.png',
        effectSrc: '/img_video/imgs/Hug_背后环抱_2.png',
        videoSrc: '/img_video/videos/hug_背后环抱.mp4',
      }
    ]
  },
  {
    slug: 'ai-jiggle',
    title: 'AI Jiggle',
    type: 'video',
    items: [
      {
        title: '抖动身体',
        originalSrc: '/img_video/imgs/Jiggle_抖动身体_1.png',
        effectSrc: '/img_video/imgs/Jiggle_抖动身体_2.png',
        videoSrc: '/img_video/videos/jiggle_抖动身体.mp4',
      }
    ]
  },
  {
    slug: 'ai-pregnant-photo',
    title: 'Pregnant AI',
    type: 'photo', // 改为 photo 因为在 photo-effect-details.json 中
    items: [
      {
        title: '怀孕',
        originalSrc: '/img_video/imgs/Pregnant-AI_怀孕_1.png',
        effectSrc: '/img_video/imgs/Pregnant-AI_怀孕_2.png',
        videoSrc: '/img_video/videos/PregnantAI_怀孕.mp4',
      }
    ]
  },
  {
    slug: 'ai-fake-date-photo',
    title: 'AI Fake Date',
    type: 'photo', // 改为 photo 因为在 photo-effect-details.json 中
    items: [
      {
        title: '中国女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_中国女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_中国女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_中国女友.mp4',
      },
      {
        title: '俄罗斯女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_俄罗斯女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_俄罗斯女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_俄罗斯女友.mp4',
        badge: 'HOT',
      },
      {
        title: '印度女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_印度女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_印度女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_印度女友.mp4',
      },
      {
        title: '女友约会',
        originalSrc: '/img_video/imgs/AI-Fake-Date_女友约会_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_女友约会_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_女友约会.mp4',
      },
      {
        title: '日本女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_日本女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_日本女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_日本女友.mp4',
      },
      {
        title: '法国女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_法国女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_法国女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_法国女友.mp4',
      },
      {
        title: '美国女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_美国女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_美国女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_美国女友.mp4',
      }
    ]
  },
  {
    slug: 'ai-celebrity-selfie',
    title: 'Celebrity Selfie',
    type: 'photo',
    items: [
       {
        title: '名人合拍',
        originalSrc: '/img_video/imgs/AI-Selfie-with-Celebrities_名人合拍_1.png',
        effectSrc: '/img_video/imgs/AI-Selfie-with-Celebrities_名人合拍_2.png',
        videoSrc: '/img_video/videos/AISelfiewithCelebrities_名人合拍.mp4',
      }
    ]
  },
  {
    slug: 'ai-dance',
    title: 'AI Dance',
    type: 'video',
    items: [
      {
        title: '肚皮舞',
        originalSrc: '/img_video/imgs/AI-Dance-Generator_肚皮舞_1.png',
        effectSrc: '/img_video/imgs/AI-Dance-Generator_肚皮舞_2.png',
        videoSrc: '/img_video/videos/AIDanceGenerator_肚皮舞.mp4',
      }
    ]
  },
  {
    slug: 'ai-mimic',
    title: 'Mimic',
    type: 'video',
    items: [
      {
        title: '热辣钢管舞',
        originalSrc: '/img_video/imgs/模仿_热辣钢管舞_1.png',
        effectSrc: '/img_video/imgs/模仿_热辣钢管舞_2.png',
        videoSrc: '/img_video/videos/模仿_热辣钢管舞.mp4',
        badge: 'NEW',
      },
      {
        title: '扭臀舞',
        originalSrc: '/img_video/imgs/模仿_扭臀舞_1.png',
        effectSrc: '/img_video/imgs/模仿_扭臀舞_2.png',
        videoSrc: '/img_video/videos/模仿_扭臀舞.mp4',
      },
      {
        title: '电摇舞',
        originalSrc: '/img_video/imgs/模仿_电摇舞_1.png',
        effectSrc: '/img_video/imgs/模仿_电摇舞_2.png',
        videoSrc: '/img_video/videos/模仿_电摇舞.mp4',
      },
      {
        title: '香奈儿舞',
        originalSrc: '/img_video/imgs/模仿_香奈儿舞_1.png',
        effectSrc: '/img_video/imgs/模仿_香奈儿舞_2.png',
        videoSrc: '/img_video/videos/模仿_香奈儿舞.mp4',
      },
      {
        title: 'AI 站立一字马',
        originalSrc: '/img_video/imgs/模仿_AI站立一字马_1.png',
        effectSrc: '/img_video/imgs/模仿_AI站立一字马_2.png',
        videoSrc: '/img_video/videos/模仿_AI站立一字马.mp4',
      },
      {
        title: 'Reze 舞',
        originalSrc: '/img_video/imgs/模仿_Reze舞_1.png',
        effectSrc: '/img_video/imgs/模仿_Reze舞_2.png',
        videoSrc: '/img_video/videos/模仿_Reze舞.mp4',
      },
      {
        title: '叉腰扭臂',
        originalSrc: '/img_video/imgs/模仿_叉腰扭臂_1.png',
        effectSrc: '/img_video/imgs/模仿_叉腰扭臂_2.png',
        videoSrc: '/img_video/videos/模仿_叉腰扭臂.mp4',
      }
    ]
  },
  {
    slug: 'ai-visual-effects',
    title: 'Visual Effects',
    type: 'video',
    items: [
      {
        title: 'AI 爆炸效果',
        originalSrc: '/img_video/imgs/视觉效果_AI爆炸效果_1.png',
        effectSrc: '/img_video/imgs/视觉效果_AI爆炸效果_2.png',
        videoSrc: '/img_video/videos/视觉效果_AI爆炸效果.mp4',
      },
      {
        title: '史诗级爆炸漫步',
        originalSrc: '/img_video/imgs/视觉效果_史诗级爆炸漫步_1.png',
        effectSrc: '/img_video/imgs/视觉效果_史诗级爆炸漫步_2.png',
        videoSrc: '/img_video/videos/视觉效果_史诗级爆炸漫步.mp4',
      },
      {
        title: '海洋连衣裙',
        originalSrc: '/img_video/imgs/视觉效果_海洋连衣裙_1.png',
        effectSrc: '/img_video/imgs/视觉效果_海洋连衣裙_2.png',
        videoSrc: '/img_video/videos/视觉效果_海洋连衣裙.mp4',
      },
      {
        title: '穿越维度',
        originalSrc: '/img_video/imgs/视觉效果_穿越维度_1.png',
        effectSrc: '/img_video/imgs/视觉效果_穿越维度_2.png',
        videoSrc: '/img_video/videos/视觉效果_穿越维度.mp4',
      },
      {
        title: '进入嘴巴',
        originalSrc: '/img_video/imgs/视觉效果_进入嘴巴_1.png',
        effectSrc: '/img_video/imgs/视觉效果_进入嘴巴_2.png',
        videoSrc: '/img_video/videos/视觉效果_进入嘴巴.mp4',
      },
      {
        title: '改变直升机机库',
        originalSrc: '/img_video/imgs/视觉效果_改变直升机机库_1.png',
        effectSrc: '/img_video/imgs/视觉效果_改变直升机机库_2.png',
      }
    ]
  },
  {
    slug: 'ai-role-swap',
    title: 'Role Swap',
    type: 'video',
    items: [
      {
        title: 'AI 老虎拥抱',
        originalSrc: '/img_video/imgs/角色切换_AI老虎拥抱_1.png',
        effectSrc: '/img_video/imgs/角色切换_AI老虎拥抱_2.png',
        videoSrc: '/img_video/videos/角色切换_AI老虎拥抱.mp4',
      },
      {
        title: '雨中漫步',
        originalSrc: '/img_video/imgs/角色切换_雨中漫步_1.png',
        effectSrc: '/img_video/imgs/角色切换_雨中漫步_2.png',
        videoSrc: '/img_video/videos/角色切换_雨中漫步.mp4',
      },
      {
        title: '遇见未来的小孩',
        originalSrc: '/img_video/imgs/角色切换_遇见未来的小孩_1.png',
        effectSrc: '/img_video/imgs/角色切换_遇见未来的小孩_2.png',
        videoSrc: '/img_video/videos/角色切换_遇到未来小孩.mp4',
      },
      {
        title: '遇见老年的我',
        originalSrc: '/img_video/imgs/角色切换_遇见老年的我_1.png',
        effectSrc: '/img_video/imgs/角色切换_遇见老年的我_2.png',
        videoSrc: '/img_video/videos/角色切换_遇到老年的我.mp4',
      },
      {
        title: '坐上豪车',
        originalSrc: '/img_video/imgs/角色切换_坐上豪车_1.png',
        effectSrc: '/img_video/imgs/角色切换_坐上豪车_2.png',
        videoSrc: '/img_video/videos/角色切换_坐上豪车.mp4',
      },
      {
        title: '审讯室',
        originalSrc: '/img_video/imgs/角色切换_审讯室_1.png',
        effectSrc: '/img_video/imgs/角色切换_审讯室_2.png',
        videoSrc: '/img_video/videos/角色切换_审讯室.mp4',
      },
      {
        title: '尖叫',
        originalSrc: '/img_video/imgs/角色切换_尖叫_1.png',
        effectSrc: '/img_video/imgs/角色切换_尖叫_2.png',
        videoSrc: '/img_video/videos/角色切换_尖叫.mp4',
      },
      {
        title: '雨夜',
        originalSrc: '/img_video/imgs/角色切换_雨夜_1.png',
        effectSrc: '/img_video/imgs/角色切换_雨夜_2.png',
        videoSrc: '/img_video/videos/角色切换_雨夜.mp4',
      }
    ]
  },
  {
    slug: 'art-style',
    title: 'Art Style',
    type: 'photo',
    items: [
      {
        title: '冰雕',
        originalSrc: '/img_video/imgs/艺术_冰雕_1.png',
        effectSrc: '/img_video/imgs/艺术_冰雕_2.png',
      },
      {
        title: 'AI 局部留色',
        originalSrc: '/img_video/imgs/艺术_AI局部留色视频特效_1.png',
        effectSrc: '/img_video/imgs/艺术_AI局部留色视频特效_2.png',
      },
      {
        title: 'AI 御龙飞行',
        originalSrc: '/img_video/imgs/艺术_AI御龙飞行视频_1.png',
        effectSrc: '/img_video/imgs/艺术_AI御龙飞行视频_2.png',
      }
    ]
  },
  {
    slug: 'hug-generator',
    title: 'Hug Generator',
    type: 'photo',
    items: [
      {
        title: '拥抱',
        originalSrc: '/img_video/imgs/Hug_拥抱_1.png',
        effectSrc: '/img_video/imgs/Hug_拥抱_2.png',
        badge: 'HOT',
      },
      {
        title: '侧身依抱',
        originalSrc: '/img_video/imgs/Hug_侧身依抱_1.png',
        effectSrc: '/img_video/imgs/Hug_侧身依抱_2.png',
      },
      {
        title: '公主抱',
        originalSrc: '/img_video/imgs/Hug_公主抱_1.png',
        effectSrc: '/img_video/imgs/Hug_公主抱_2.png',
      },
      {
        title: '托举式抱',
        originalSrc: '/img_video/imgs/Hug_托举式抱_1.png',
        effectSrc: '/img_video/imgs/Hug_托举式抱_2.png',
      },
      {
        title: '背后环抱',
        originalSrc: '/img_video/imgs/Hug_背后环抱_1.png',
        effectSrc: '/img_video/imgs/Hug_背后环抱_2.png',
      }
    ]
  },
  {
    slug: 'ai-kissing-photo',
    title: 'AI Kissing Photo',
    type: 'photo',
    items: [
      {
        title: '正常接吻',
        originalSrc: '/img_video/imgs/AI-Kissing_正常接吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_正常接吻_2.png',
        badge: 'HOT',
      },
      {
        title: '法式接吻',
        originalSrc: '/img_video/imgs/AI-Kissing_法式接吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_法式接吻_2.png',
        badge: 'HOT',
      },
      {
        title: '脸颊之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_脸颊之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_脸颊之吻_2.png',
      },
      {
        title: '咬嘴唇之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_咬嘴唇之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_咬嘴唇之吻_2.png',
      },
      {
        title: '额头之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_额头之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_额头之吻_2.png',
      }
    ]
  },
  {
    slug: 'ai-muscle-photo',
    title: 'AI Muscle Photo',
    type: 'photo',
    items: [
      {
        title: '肌肉展示',
        originalSrc: '/img_video/imgs/Muscle_肌肉展示_1.png',
        effectSrc: '/img_video/imgs/Muscle_肌肉展示_2.png',
        badge: 'HOT',
      },
      {
        title: '360 肌肉展示',
        originalSrc: '/img_video/imgs/AI-360-Rotation_肌肉展示_1.png',
        effectSrc: '/img_video/imgs/AI-360-Rotation_肌肉展示_2.png',
      }
    ]
  },
  {
    slug: 'ai-visual-effects-photo',
    title: 'AI Visual Effects Photo',
    type: 'photo',
    items: [
      {
        title: 'AI 爆炸效果',
        originalSrc: '/img_video/imgs/视觉效果_AI爆炸效果_1.png',
        effectSrc: '/img_video/imgs/视觉效果_AI爆炸效果_2.png',
      },
      {
        title: '史诗级爆炸漫步',
        originalSrc: '/img_video/imgs/视觉效果_史诗级爆炸漫步_1.png',
        effectSrc: '/img_video/imgs/视觉效果_史诗级爆炸漫步_2.png',
      },
      {
        title: '海洋连衣裙',
        originalSrc: '/img_video/imgs/视觉效果_海洋连衣裙_1.png',
        effectSrc: '/img_video/imgs/视觉效果_海洋连衣裙_2.png',
      },
      {
        title: '穿越维度',
        originalSrc: '/img_video/imgs/视觉效果_穿越维度_1.png',
        effectSrc: '/img_video/imgs/视觉效果_穿越维度_2.png',
      },
      {
        title: '进入嘴巴',
        originalSrc: '/img_video/imgs/视觉效果_进入嘴巴_1.png',
        effectSrc: '/img_video/imgs/视觉效果_进入嘴巴_2.png',
      },
      {
        title: '改变直升机机库',
        originalSrc: '/img_video/imgs/视觉效果_改变直升机机库_1.png',
        effectSrc: '/img_video/imgs/视觉效果_改变直升机机库_2.png',
      }
    ]
  },
  {
    slug: 'ai-role-swap-photo',
    title: 'AI Role Swap Photo',
    type: 'photo',
    items: [
      {
        title: 'AI 老虎拥抱',
        originalSrc: '/img_video/imgs/角色切换_AI老虎拥抱_1.png',
        effectSrc: '/img_video/imgs/角色切换_AI老虎拥抱_2.png',
      },
      {
        title: '雨中漫步',
        originalSrc: '/img_video/imgs/角色切换_雨中漫步_1.png',
        effectSrc: '/img_video/imgs/角色切换_雨中漫步_2.png',
      },
      {
        title: '遇见未来的小孩',
        originalSrc: '/img_video/imgs/角色切换_遇见未来的小孩_1.png',
        effectSrc: '/img_video/imgs/角色切换_遇见未来的小孩_2.png',
      },
      {
        title: '遇见老年的我',
        originalSrc: '/img_video/imgs/角色切换_遇见老年的我_1.png',
        effectSrc: '/img_video/imgs/角色切换_遇见老年的我_2.png',
      },
      {
        title: '坐上豪车',
        originalSrc: '/img_video/imgs/角色切换_坐上豪车_1.png',
        effectSrc: '/img_video/imgs/角色切换_坐上豪车_2.png',
      },
      {
        title: '审讯室',
        originalSrc: '/img_video/imgs/角色切换_审讯室_1.png',
        effectSrc: '/img_video/imgs/角色切换_审讯室_2.png',
      },
      {
        title: '尖叫',
        originalSrc: '/img_video/imgs/角色切换_尖叫_1.png',
        effectSrc: '/img_video/imgs/角色切换_尖叫_2.png',
      },
      {
        title: '雨夜',
        originalSrc: '/img_video/imgs/角色切换_雨夜_1.png',
        effectSrc: '/img_video/imgs/角色切换_雨夜_2.png',
      }
    ]
  }
];

export function getToolConfig(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}
