/**
 * Tools Configuration
 * 
 * Defines all available AI tools and their associated effects.
 * derived from public/img_video resources as of 2026-02-05.
 * Updated 2026-02-11: Added prompt data from prompt_match_report_v2.txt
 */

export type ToolType = 'video' | 'photo';

export interface ToolItem {
  title: string;
  originalSrc: string; // Path to *_1.png
  effectSrc: string;   // Path to *_2.png
  videoSrc?: string;   // Path to *.mp4 (optional)
  badge?: string;      // HOT, NEW, etc.
  prompt?: string;     // Default prompt for effect generation
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
        prompt: 'The couple in the painting turn their heads to look at each other, then kiss passionately, expressing the love between them.',
      },
      {
        title: '法式接吻',
        originalSrc: '/img_video/imgs/AI-Kissing_法式接吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_法式接吻_2.png',
        videoSrc: '/img_video/videos/AIKissing法式接吻.mp4',
        badge: 'HOT',
        prompt: '让图片中的2个人法式舌吻, 4k',
      },
      {
        title: '脸颊之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_脸颊之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_脸颊之吻_2.png',
        videoSrc: '/img_video/videos/脸颊之吻.mp4',
        prompt: '左边的人 亲吻 右边人的脸颊, 4k',
      },
      {
        title: '咬嘴唇之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_咬嘴唇之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_咬嘴唇之吻_2.png',
        videoSrc: '/img_video/videos/AiKissing_咬嘴接吻.mp4',
        prompt: '左边的人 咬住 右边人的下嘴唇 亲吻, 4k',
      },
      {
        title: '额头之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_额头之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_额头之吻_2.png',
        videoSrc: '/img_video/videos/额头之吻.mp4',
        prompt: '左边的人 亲吻 右边人的额头, 4k',
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
        prompt: 'The man takes off shirts, revealing a lean and muscular body. He raises his arms, showing off his his abs and biceps.',
      },
      {
        title: '360 肌肉展示',
        originalSrc: '/img_video/imgs/AI-360-Rotation_肌肉展示_1.png',
        effectSrc: '/img_video/imgs/AI-360-Rotation_肌肉展示_2.png',
        videoSrc: '/img_video/videos/AI 360 Rotation.mp4',
        prompt: 'The man takes off shirts, revealing a lean and muscular body. He raises his arms, showing off his his abs and biceps.',
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
        prompt: 'Make the two people hugging each other in the picture',
      },
      {
        title: '侧身依抱',
        originalSrc: '/img_video/imgs/Hug_侧身依抱_1.png',
        effectSrc: '/img_video/imgs/Hug_侧身依抱_2.png',
        videoSrc: '/img_video/videos/hug_侧身依抱.mp4',
        prompt: '侧身拥抱，男人搂着女人的肩膀，互相依靠，随意甜蜜，自然的姿势，半拥抱',
      },
      {
        title: '公主抱',
        originalSrc: '/img_video/imgs/Hug_公主抱_1.png',
        effectSrc: '/img_video/imgs/Hug_公主抱_2.png',
        videoSrc: '/img_video/videos/hug_公主抱.mp4',
        prompt: 'The man carries the woman in a princess carry.',
      },
      {
        title: '托举式抱',
        originalSrc: '/img_video/imgs/Hug_托举式抱_1.png',
        effectSrc: '/img_video/imgs/Hug_托举式抱_2.png',
        videoSrc: '/img_video/videos/hug_托举式抱.mp4',
        prompt: '把她举起来，高举拥抱，男人把女人举到空中，她的脚离地，强烈的眼神交流，浪漫的高潮，动感姿势，电影般的构图',
      },
      {
        title: '背后环抱',
        originalSrc: '/img_video/imgs/Hug_背后环抱_1.png',
        effectSrc: '/img_video/imgs/Hug_背后环抱_2.png',
        videoSrc: '/img_video/videos/hug_背后环抱.mp4',
        prompt: 'Affectionate back hug, man embracing woman from behind, chin resting on shoulder, hands interlaced over her waist, peaceful and protective atmosphere, soft lighting.',
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
        prompt: 'Chest bouncing, breasts moving up and down.',
      }
    ]
  },
  {
    slug: 'ai-pregnant-photo',
    title: 'Pregnant AI',
    type: 'photo',
    items: [
      {
        title: '怀孕',
        originalSrc: '/img_video/imgs/Pregnant-AI_怀孕_1.png',
        effectSrc: '/img_video/imgs/Pregnant-AI_怀孕_2.png',
        videoSrc: '/img_video/videos/PregnantAI_怀孕.mp4',
        prompt: 'Place hand on the belly, the belly gets bigger, becomes pregnant.',
      }
    ]
  },
  {
    slug: 'ai-fake-date-photo',
    title: 'AI Fake Date',
    type: 'photo',
    items: [
      {
        title: '中国女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_中国女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_中国女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_中国女友.mp4',
        prompt: '一位又酷又美的中国女友，黑长直发，穿着改良的新中式旗袍或黑色西装，她眼神坚定（很“帅气”的感觉），霸道地捧着他的脸亲吻',
      },
      {
        title: '俄罗斯女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_俄罗斯女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_俄罗斯女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_俄罗斯女友.mp4',
        badge: 'HOT',
        prompt: '一位高挑惊艳的俄罗斯女友，拥有精致的五官和冰蓝色的眼睛，穿着厚实的皮草大衣，她神情专注，给了他一个冰雪中温暖而强烈的吻',
      },
      {
        title: '印度女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_印度女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_印度女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_印度女友.mp4',
        prompt: '一位美丽的印度女友，穿着华丽的纱丽，佩戴着传统的金饰，眼神深邃。充满爱意地亲吻他的额头或嘴唇。色彩极其丰富',
      },
      {
        title: '女友约会',
        originalSrc: '/img_video/imgs/AI-Fake-Date_女友约会_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_女友约会_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_女友约会.mp4',
        prompt: 'A handsome girlfriend walks over to the man and kisses him.',
      },
      {
        title: '日本女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_日本女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_日本女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_日本女友.mp4',
        prompt: '一位可爱的日本女友，穿着时尚的高中制服（或日系宽松毛衣），在樱花飘落的街道上走向那个男人。她踮起脚尖，羞涩而温柔地亲吻了他的脸颊。光线柔和，空气感',
      },
      {
        title: '法国女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_法国女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_法国女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_法国女友.mp4',
        prompt: '一位拥有法式慵懒波浪卷发、涂着红唇的时髦法国女友，穿着米色风衣，深情且浪漫地亲吻了他',
      },
      {
        title: '美国女友',
        originalSrc: '/img_video/imgs/AI-Fake-Date_美国女友_1.png',
        effectSrc: '/img_video/imgs/AI-Fake-Date_美国女友_2.png',
        videoSrc: '/img_video/videos/AIFakeDate_美国女友.mp4',
        prompt: '一位身材健美、皮肤也是小麦色的美国女友，穿着牛仔短裤和白色背心，她带着灿烂的笑容，热情奔放地搂住他的脖子亲吻了他',
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
        prompt: 'Make the person in the image take a selfie with [celebrity name], both smiling and looking directly into the camera. The scene of the photo is in the [place]. POV perspective as if the viewer is holding the phone, but without showing the phone itself. Bright lighting, natural expressions.',
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
        prompt: 'Sexy belly dance.',
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
        prompt: '超现实的城市转型。画面中有一根银色的舞竿。她抓住杆子，做了一个有力的空中动作，在半空中做了一个完美的180度劈开。成百上千的美钞开始像雨一样从天上落在她身边。动态运动，地心引力的钢管舞，电影灯光，逼真的织物和货币物理',
      },
      {
        title: '扭臀舞',
        originalSrc: '/img_video/imgs/模仿_扭臀舞_1.png',
        effectSrc: '/img_video/imgs/模仿_扭臀舞_2.png',
        videoSrc: '/img_video/videos/模仿_扭臀舞.mp4',
        prompt: 'Tu.rn their back to the viewer and starts dancing with rhythmic hip movements. The hips bounce naturally in a twerking rhythm',
      },
      {
        title: '电摇舞',
        originalSrc: '/img_video/imgs/模仿_电摇舞_1.png',
        effectSrc: '/img_video/imgs/模仿_电摇舞_2.png',
        videoSrc: '/img_video/videos/模仿_电摇舞.mp4',
        prompt: 'Turns sideways and squats down to show hips, begins twerking. The hips bounce up and down rapidly.',
      },
      {
        title: '香奈儿舞',
        originalSrc: '/img_video/imgs/模仿_香奈儿舞_1.png',
        effectSrc: '/img_video/imgs/模仿_香奈儿舞_2.png',
        videoSrc: '/img_video/videos/模仿_香奈儿舞.mp4',
        prompt: '一个动态的舞蹈序列。舞者双脚并拢微侧站立，随后身体转向正对镜头，双臂自然向两侧平摊，手掌朝上，做出一个自信的“Voila”展示动作,舞者迅速收回双手，顺着腰腹部曲线下滑，同时双膝弯曲下蹲。身体呈现出一个由上至下的身体波浪（Body Roll），重心压低，胯部随之扭动，保持深蹲姿态，双腿张开，重心在左右脚间快速切换。双臂在胸前随节奏交替挥动，做出类似“切分音”的快速点手动作，身体随着节拍产生小幅度的震动（Pop）舞者从深蹲位顺畅站起，重心移至左腿，胯部向一侧顶出。她顺势抬起双手插入蓬松的卷发中，向后梳理头发，展现出一种慵懒而迷人的过渡感,身体跟随节奏轻微晃动，单手向镜头做一个随意的挥手动作，随后侧身展示侧面曲线，保持律动高能量，平滑的过渡，逼真的皮肤和织物物理，4k。',
      },
      {
        title: 'AI 站立一字马',
        originalSrc: '/img_video/imgs/模仿_AI站立一字马_1.png',
        effectSrc: '/img_video/imgs/模仿_AI站立一字马_2.png',
        videoSrc: '/img_video/videos/模仿_AI站立一字马.mp4',
        prompt: '一个高能运动序列。角色一开始是伸开双臂站着不动。突然，做了一个完美的垂直180度劈腿，一条腿伸直，另一条腿牢牢地站稳。身体保持完美的平衡。摄像机捕捉到了从站立到分裂的快速、平稳的过渡。逼真的肌肉张力，自然的织物折叠，流畅的动作，4k。',
      },
      {
        title: 'Reze 舞',
        originalSrc: '/img_video/imgs/模仿_Reze舞_1.png',
        effectSrc: '/img_video/imgs/模仿_Reze舞_2.png',
        videoSrc: '/img_video/videos/模仿_Reze舞.mp4',
        prompt: '舞者并拢双脚站立，左手高举过头顶并轻柔摆动，随后双臂回收至胸前形成圆弧状，身体随之轻微左右晃动。她迅速跳开双脚至宽站位，双臂随节拍交替上下摆动，肩膀配合手臂动作进行利落的震动（Pop），展现出极强的节奏点控制。舞者身体向右侧倾斜，左手划过额头，随后站直身体，右手指向镜头并做出一个“勾手”的挑逗动作，同时左腿向后轻微勾起，增加动态美感。她迅速转身侧对镜头，双手在胸前快速进行绕圈（Rolling）动作，随后顺着节拍向后方推手，眼神始终跟随手部动作后再转回镜头。舞者双臂向前推开，紧接着做一个快速的手部交叉动作，最后双手高举过头顶成 V 字型，并伴随一个轻盈的原地小跳收尾。',
      },
      {
        title: '叉腰扭臂',
        originalSrc: '/img_video/imgs/模仿_叉腰扭臂_1.png',
        effectSrc: '/img_video/imgs/模仿_叉腰扭臂_2.png',
        videoSrc: '/img_video/videos/模仿_叉腰扭臂.mp4',
        prompt: '主体充满自信地看着镜头，身体轻微摇晃。双手自然插在身体两侧，眼神坚定地直视镜头，表情冷静而迷人，她流畅地转为双手叉腰的姿势。摇晃着身体，凸显腰部线条，微微张开双唇，目光锁定镜头',
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
        prompt: '主体人物突然分解，分裂成成千上万的动态粒子和碎片。电影冲击波效应将粒子推向镜头，使屏幕上充满了飞散的碎片。最后消失在画面中，高保真粒子物理，高能运动，流体过渡，高速快门美学。',
      },
      {
        title: '史诗级爆炸漫步',
        originalSrc: '/img_video/imgs/视觉效果_史诗级爆炸漫步_1.png',
        effectSrc: '/img_video/imgs/视觉效果_史诗级爆炸漫步_2.png',
        videoSrc: '/img_video/videos/视觉效果_史诗级爆炸漫步.mp4',
        prompt: '一个电影般的动作序列，一个穿着白色西装的女人在鹅卵石街道上走向摄像机。【动作】：随着女人轻轻摆了一下右手，突然，背景中的一辆老式汽车爆炸，喷出巨大的橙色火焰和浓浓的黑烟。女人继续平静地走着，头也不回，保持着一种冷静的表情。[技术]：逼真的火焰和烟雾模拟，爆炸产生的明亮光线反射在女人的衣服和砖墙上。爆炸时相机轻微抖动的跟踪镜头。高对比度，高速快门效果，电影般的画质。',
      },
      {
        title: '海洋连衣裙',
        originalSrc: '/img_video/imgs/视觉效果_海洋连衣裙_1.png',
        effectSrc: '/img_video/imgs/视觉效果_海洋连衣裙_2.png',
        videoSrc: '/img_video/videos/视觉效果_海洋连衣裙.mp4',
        prompt: '慢动作在海浪中行走，浅蓝色的丝绸连衣裙在风中猛烈地摆动，裙摆与水花融合，波浪撞击腿部，电影般的慢动作，超现实的水物理。动态关键词：流动、飘动、飞溅、有节奏的波浪、优雅的步伐。',
      },
      {
        title: '穿越维度',
        originalSrc: '/img_video/imgs/视觉效果_穿越维度_1.png',
        effectSrc: '/img_video/imgs/视觉效果_穿越维度_2.png',
        videoSrc: '/img_video/videos/视觉效果_穿越维度.mp4',
        prompt: '一段电影般的视频，一名男子以缓慢而自信的步伐走向摄像机。摄像机保持在一个非常低的角度，聚焦在他的白色运动鞋和他随身携带的塑料袋上。[过渡/效果]：背景环境迅速变形，按照后面的高楼的形状轮廓变成有发光的紫色大楼形状，然后变成一个宇宙星云，有旋转的蓝色火焰和北极光。当宇宙在他身后崩塌和重组时，这个人保持稳定。高能量，无缝过渡，充满活力的霓虹色彩，合成波美学，4k，流畅的运动',
      },
      {
        title: '进入嘴巴',
        originalSrc: '/img_video/imgs/视觉效果_进入嘴巴_1.png',
        effectSrc: '/img_video/imgs/视觉效果_进入嘴巴_2.png',
        videoSrc: '/img_video/videos/视觉效果_进入嘴巴.mp4',
        prompt: '第一人视角，张开嘴巴视角进入到嘴巴的过程',
      },
      {
        title: '改变直升机机库',
        originalSrc: '/img_video/imgs/视觉效果_改变直升机机库_1.png',
        effectSrc: '/img_video/imgs/视觉效果_改变直升机机库_2.png',
        prompt: '高速电影动作镜头。一名女子被悬挂在一架飞行中的直升机上，一只手抓住起落架。她自信地飞吻并对着镜头挥手。镜头慢慢拉回镜头，展现了一座无边无际的欧洲城市的极端高度。她的长腰带和头发在高空的风中剧烈地飘动。逼真的物理效果，头发模拟，稳定的手持相机运动，高风险的时尚特技，生动的灯光，流畅自然的人体运动。',
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
        prompt: '电影场景。突然，一只巨大而威严的老虎从他身后站起来，从背后给了他一个温柔的拥抱。老虎把它的大头靠在那个人的肩上。这个人笑得很开心，抓住了老虎的爪子。老虎的皮毛和那个人的表情上有难以置信的细节。超现实和温暖的氛围，流畅的自然运动，4k，超现实的纹理。',
      },
      {
        title: '雨中漫步',
        originalSrc: '/img_video/imgs/角色切换_雨中漫步_1.png',
        effectSrc: '/img_video/imgs/角色切换_雨中漫步_2.png',
        videoSrc: '/img_video/videos/角色切换_雨中漫步.mp4',
        prompt: '电影慢动作视频。一个穿着黑色西装的人非常缓慢的走在倾盆大雨的夜晚。水从他的脸上和脖子流下来的细节非常清晰。高角度镜头，缓慢变焦，对准他的脸。强烈的青色蓝色背光创造发光雾的效果。在闪烁的街灯的映照下，雨点晶莹剔透。飘渺的，喜怒无常的，戏剧性的。4k，逼真的流体模拟。',
      },
      {
        title: '遇见未来的小孩',
        originalSrc: '/img_video/imgs/角色切换_遇见未来的小孩_1.png',
        effectSrc: '/img_video/imgs/角色切换_遇见未来的小孩_2.png',
        videoSrc: '/img_video/videos/角色切换_遇到未来小孩.mp4',
        prompt: '一个电影镜头，镜头移开，露出一个中国小女孩（5岁)，是女人的小孩子，样貌五官跟女人极度的相识，女孩穿着同样的衣服。女孩跑进相框，站在女人旁边。两人看着镜头，一起微笑。品格与服装一致性高，动作流畅，温馨氛围，4k。',
      },
      {
        title: '遇见老年的我',
        originalSrc: '/img_video/imgs/角色切换_遇见老年的我_1.png',
        effectSrc: '/img_video/imgs/角色切换_遇见老年的我_2.png',
        videoSrc: '/img_video/videos/角色切换_遇到老年的我.mp4',
        prompt: '电影镜头。当镜头移向左边时，这位有着优雅银发、穿着一模一样的衣服的老妇人走进了镜头。他们肩并肩站着，都看着镜头。在两个版本之间保持高度的字符一致性。无缝运动，超现实的时空旅行氛围，4k',
      },
      {
        title: '坐上豪车',
        originalSrc: '/img_video/imgs/角色切换_坐上豪车_1.png',
        effectSrc: '/img_video/imgs/角色切换_坐上豪车_2.png',
        videoSrc: '/img_video/videos/角色切换_坐上豪车.mp4',
        prompt: '电影序列。突然，一辆光滑的白色豪华敞篷跑车从面前出现。车门正好在她面前打开。这位女士不慌不忙地走进车里，坐了下来。流畅的镜头运动，逼真的物理效果，4k',
      },
      {
        title: '审讯室',
        originalSrc: '/img_video/imgs/角色切换_审讯室_1.png',
        effectSrc: '/img_video/imgs/角色切换_审讯室_2.png',
        videoSrc: '/img_video/videos/角色切换_审讯室.mp4',
        prompt: 'A dimly lit, cold interrogation room with concrete walls. The same man in the light blue sweater, now handcuffed, looking down with a somber expression. Behind him stand two DEA officers in black tactical gear. On the metal table in front of him are several smartphones, stacks of cash, and a laptop. Harsh fluorescent lighting, cinematic drama, intense atmosphere',
      },
      {
        title: '尖叫',
        originalSrc: '/img_video/imgs/角色切换_尖叫_1.png',
        effectSrc: '/img_video/imgs/角色切换_尖叫_2.png',
        videoSrc: '/img_video/videos/角色切换_尖叫.mp4',
        prompt: "A cinematic horror sequence. The man in the mirror closes his eyes for a second. Suddenly, the masked killer (Ghostface) behind him lunges forward, grabbing the man's throat and covering his mouth with a gloved hand. The camera rapidly zooms in on the man's face as his eyes widen in terror, struggling to breathe. Fast-paced action, intense suspense, jump scare, realistic movement, 4k, cinematic lighting",
      },
      {
        title: '雨夜',
        originalSrc: '/img_video/imgs/角色切换_雨夜_1.png',
        effectSrc: '/img_video/imgs/角色切换_雨夜_2.png',
        videoSrc: '/img_video/videos/角色切换_雨夜.mp4',
        prompt: '电影感转场，图中人物。灯光从柔和的室内光变为戏剧性的蓝色霓虹月光。她闭上眼睛，仰起头，雨水在皮肤上闪烁并顺着脸颊流下。高细节，忧郁氛围，慢动作，写实风格。',
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
        prompt: '人物保持大声呐喊并伸手的姿势，身体从脚部向上迅速发生“冰封”特效变换。身体从有机材质变为半透明、带有冰裂纹的蓝色冰雕材质，伴有冷气散发的烟雾效果。动作起始于现实人物的呐喊，在中段完成材质替换，人物姿态在变换过程中保持凝固或微颤。',
      },
      {
        title: 'AI 局部留色',
        originalSrc: '/img_video/imgs/艺术_AI局部留色视频特效_1.png',
        effectSrc: '/img_video/imgs/艺术_AI局部留色视频特效_2.png',
        prompt: '一个美丽的年轻女子站在繁忙的城市人行横道中央的电影全身镜头。选择性配色：女人是充满活力的自然色，而整个背景和其他行人都是不饱和的黑白。柔和的日光，浅景深，高对比度，专业的摄影风格。',
      },
      {
        title: 'AI 御龙飞行',
        originalSrc: '/img_video/imgs/艺术_AI御龙飞行视频_1.png',
        effectSrc: '/img_video/imgs/艺术_AI御龙飞行视频_2.png',
        prompt: '电影镜头，一个勇敢的年轻女孩（使用参考图1的面貌，保证生成的面部跟我所提供的面貌一样），一头长长的红色头发骑在一条巨大的深灰色龙的背上，中世纪骑士的服装，长长的飘逸的斗篷，龙呼吸着微弱的火花，在日落时翱翔在广阔的云海之上，一座雄伟的哥特式城堡矗立在山顶上，黄金时刻照明，史诗般的幻想氛围，8k分辨率，超现实，逼真。',
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
        prompt: 'Make the two people hugging each other in the picture',
      },
      {
        title: '侧身依抱',
        originalSrc: '/img_video/imgs/Hug_侧身依抱_1.png',
        effectSrc: '/img_video/imgs/Hug_侧身依抱_2.png',
        prompt: '侧身拥抱，男人搂着女人的肩膀，互相依靠，随意甜蜜，自然的姿势，半拥抱',
      },
      {
        title: '公主抱',
        originalSrc: '/img_video/imgs/Hug_公主抱_1.png',
        effectSrc: '/img_video/imgs/Hug_公主抱_2.png',
        prompt: 'The man carries the woman in a princess carry.',
      },
      {
        title: '托举式抱',
        originalSrc: '/img_video/imgs/Hug_托举式抱_1.png',
        effectSrc: '/img_video/imgs/Hug_托举式抱_2.png',
        prompt: '把她举起来，高举拥抱，男人把女人举到空中，她的脚离地，强烈的眼神交流，浪漫的高潮，动感姿势，电影般的构图',
      },
      {
        title: '背后环抱',
        originalSrc: '/img_video/imgs/Hug_背后环抱_1.png',
        effectSrc: '/img_video/imgs/Hug_背后环抱_2.png',
        prompt: 'Affectionate back hug, man embracing woman from behind, chin resting on shoulder, hands interlaced over her waist, peaceful and protective atmosphere, soft lighting.',
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
        prompt: 'The couple in the painting turn their heads to look at each other, then kiss passionately, expressing the love between them.',
      },
      {
        title: '法式接吻',
        originalSrc: '/img_video/imgs/AI-Kissing_法式接吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_法式接吻_2.png',
        badge: 'HOT',
        prompt: '让图片中的2个人法式舌吻, 4k',
      },
      {
        title: '脸颊之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_脸颊之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_脸颊之吻_2.png',
        prompt: '左边的人 亲吻 右边人的脸颊, 4k',
      },
      {
        title: '咬嘴唇之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_咬嘴唇之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_咬嘴唇之吻_2.png',
        prompt: '左边的人 咬住 右边人的下嘴唇 亲吻, 4k',
      },
      {
        title: '额头之吻',
        originalSrc: '/img_video/imgs/AI-Kissing_额头之吻_1.png',
        effectSrc: '/img_video/imgs/AI-Kissing_额头之吻_2.png',
        prompt: '左边的人 亲吻 右边人的额头, 4k',
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
        prompt: 'The man takes off shirts, revealing a lean and muscular body. He raises his arms, showing off his his abs and biceps.',
      },
      {
        title: '360 肌肉展示',
        originalSrc: '/img_video/imgs/AI-360-Rotation_肌肉展示_1.png',
        effectSrc: '/img_video/imgs/AI-360-Rotation_肌肉展示_2.png',
        prompt: 'The man takes off shirts, revealing a lean and muscular body. He raises his arms, showing off his his abs and biceps.',
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
        prompt: '主体人物突然分解，分裂成成千上万的动态粒子和碎片。电影冲击波效应将粒子推向镜头，使屏幕上充满了飞散的碎片。最后消失在画面中，高保真粒子物理，高能运动，流体过渡，高速快门美学。',
      },
      {
        title: '史诗级爆炸漫步',
        originalSrc: '/img_video/imgs/视觉效果_史诗级爆炸漫步_1.png',
        effectSrc: '/img_video/imgs/视觉效果_史诗级爆炸漫步_2.png',
        prompt: '一个电影般的动作序列，一个穿着白色西装的女人在鹅卵石街道上走向摄像机。【动作】：随着女人轻轻摆了一下右手，突然，背景中的一辆老式汽车爆炸，喷出巨大的橙色火焰和浓浓的黑烟。女人继续平静地走着，头也不回，保持着一种冷静的表情。[技术]：逼真的火焰和烟雾模拟，爆炸产生的明亮光线反射在女人的衣服和砖墙上。爆炸时相机轻微抖动的跟踪镜头。高对比度，高速快门效果，电影般的画质。',
      },
      {
        title: '海洋连衣裙',
        originalSrc: '/img_video/imgs/视觉效果_海洋连衣裙_1.png',
        effectSrc: '/img_video/imgs/视觉效果_海洋连衣裙_2.png',
        prompt: '慢动作在海浪中行走，浅蓝色的丝绸连衣裙在风中猛烈地摆动，裙摆与水花融合，波浪撞击腿部，电影般的慢动作，超现实的水物理。动态关键词：流动、飘动、飞溅、有节奏的波浪、优雅的步伐。',
      },
      {
        title: '穿越维度',
        originalSrc: '/img_video/imgs/视觉效果_穿越维度_1.png',
        effectSrc: '/img_video/imgs/视觉效果_穿越维度_2.png',
        prompt: '一段电影般的视频，一名男子以缓慢而自信的步伐走向摄像机。摄像机保持在一个非常低的角度，聚焦在他的白色运动鞋和他随身携带的塑料袋上。[过渡/效果]：背景环境迅速变形，按照后面的高楼的形状轮廓变成有发光的紫色大楼形状，然后变成一个宇宙星云，有旋转的蓝色火焰和北极光。当宇宙在他身后崩塌和重组时，这个人保持稳定。高能量，无缝过渡，充满活力的霓虹色彩，合成波美学，4k，流畅的运动',
      },
      {
        title: '进入嘴巴',
        originalSrc: '/img_video/imgs/视觉效果_进入嘴巴_1.png',
        effectSrc: '/img_video/imgs/视觉效果_进入嘴巴_2.png',
        prompt: '第一人视角，张开嘴巴视角进入到嘴巴的过程',
      },
      {
        title: '改变直升机机库',
        originalSrc: '/img_video/imgs/视觉效果_改变直升机机库_1.png',
        effectSrc: '/img_video/imgs/视觉效果_改变直升机机库_2.png',
        prompt: '高速电影动作镜头。一名女子被悬挂在一架飞行中的直升机上，一只手抓住起落架。她自信地飞吻并对着镜头挥手。镜头慢慢拉回镜头，展现了一座无边无际的欧洲城市的极端高度。她的长腰带和头发在高空的风中剧烈地飘动。逼真的物理效果，头发模拟，稳定的手持相机运动，高风险的时尚特技，生动的灯光，流畅自然的人体运动。',
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
        prompt: '电影场景。突然，一只巨大而威严的老虎从他身后站起来，从背后给了他一个温柔的拥抱。老虎把它的大头靠在那个人的肩上。这个人笑得很开心，抓住了老虎的爪子。老虎的皮毛和那个人的表情上有难以置信的细节。超现实和温暖的氛围，流畅的自然运动，4k，超现实的纹理。',
      },
      {
        title: '雨中漫步',
        originalSrc: '/img_video/imgs/角色切换_雨中漫步_1.png',
        effectSrc: '/img_video/imgs/角色切换_雨中漫步_2.png',
        prompt: '电影慢动作视频。一个穿着黑色西装的人非常缓慢的走在倾盆大雨的夜晚。水从他的脸上和脖子流下来的细节非常清晰。高角度镜头，缓慢变焦，对准他的脸。强烈的青色蓝色背光创造发光雾的效果。在闪烁的街灯的映照下，雨点晶莹剔透。飘渺的，喜怒无常的，戏剧性的。4k，逼真的流体模拟。',
      },
      {
        title: '遇见未来的小孩',
        originalSrc: '/img_video/imgs/角色切换_遇见未来的小孩_1.png',
        effectSrc: '/img_video/imgs/角色切换_遇见未来的小孩_2.png',
        prompt: '一个电影镜头，镜头移开，露出一个中国小女孩（5岁)，是女人的小孩子，样貌五官跟女人极度的相识，女孩穿着同样的衣服。女孩跑进相框，站在女人旁边。两人看着镜头，一起微笑。品格与服装一致性高，动作流畅，温馨氛围，4k。',
      },
      {
        title: '遇见老年的我',
        originalSrc: '/img_video/imgs/角色切换_遇见老年的我_1.png',
        effectSrc: '/img_video/imgs/角色切换_遇见老年的我_2.png',
        prompt: '电影镜头。当镜头移向左边时，这位有着优雅银发、穿着一模一样的衣服的老妇人走进了镜头。他们肩并肩站着，都看着镜头。在两个版本之间保持高度的字符一致性。无缝运动，超现实的时空旅行氛围，4k',
      },
      {
        title: '坐上豪车',
        originalSrc: '/img_video/imgs/角色切换_坐上豪车_1.png',
        effectSrc: '/img_video/imgs/角色切换_坐上豪车_2.png',
        prompt: '电影序列。突然，一辆光滑的白色豪华敞篷跑车从面前出现。车门正好在她面前打开。这位女士不慌不忙地走进车里，坐了下来。流畅的镜头运动，逼真的物理效果，4k',
      },
      {
        title: '审讯室',
        originalSrc: '/img_video/imgs/角色切换_审讯室_1.png',
        effectSrc: '/img_video/imgs/角色切换_审讯室_2.png',
        prompt: 'A dimly lit, cold interrogation room with concrete walls. The same man in the light blue sweater, now handcuffed, looking down with a somber expression. Behind him stand two DEA officers in black tactical gear. On the metal table in front of him are several smartphones, stacks of cash, and a laptop. Harsh fluorescent lighting, cinematic drama, intense atmosphere',
      },
      {
        title: '尖叫',
        originalSrc: '/img_video/imgs/角色切换_尖叫_1.png',
        effectSrc: '/img_video/imgs/角色切换_尖叫_2.png',
        prompt: "A cinematic horror sequence. The man in the mirror closes his eyes for a second. Suddenly, the masked killer (Ghostface) behind him lunges forward, grabbing the man's throat and covering his mouth with a gloved hand. The camera rapidly zooms in on the man's face as his eyes widen in terror, struggling to breathe. Fast-paced action, intense suspense, jump scare, realistic movement, 4k, cinematic lighting",
      },
      {
        title: '雨夜',
        originalSrc: '/img_video/imgs/角色切换_雨夜_1.png',
        effectSrc: '/img_video/imgs/角色切换_雨夜_2.png',
        prompt: '电影感转场，图中人物。灯光从柔和的室内光变为戏剧性的蓝色霓虹月光。她闭上眼睛，仰起头，雨水在皮肤上闪烁并顺着脸颊流下。高细节，忧郁氛围，慢动作，写实风格。',
      }
    ]
  }
];

export function getToolConfig(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}
