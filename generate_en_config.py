"""
生成英文版的photo-effects和video-effects配置
"""
import json

# 读取中文配置
with open("src/config/locale/messages/zh/pages/photo-effects.json", "r", encoding="utf-8") as f:
    zh_photo = json.load(f)

with open("src/config/locale/messages/zh/pages/video-effects.json", "r", encoding="utf-8") as f:
    zh_video = json.load(f)

# 翻译映射
TRANSLATIONS = {
    # 分类标签
    "全部": "All",
    "AI 接吻": "AI Kissing",
    "AI 虚拟约会": "AI Fake Date",
    "拥抱": "Hug",
    "名人合拍": "Celebrity Selfie",
    "肌肉": "Muscle",
    "360度旋转": "360 Rotation",
    "抖动特效": "Jiggle",
    "AI 怀孕": "AI Pregnant",
    "舞蹈生成": "AI Dance",
    "动作模仿": "Imitate",
    "艺术风格": "Art Style",
    "视觉特效": "Visual Effects",
    "角色扮演": "Role Play",
    "其他": "Other",
    
    "健身": "Fitness",
    "浪漫": "Romance",
    "社交": "Social",
    "趣味": "Fun",
    "舞蹈": "Dancing",
    "艺术": "Art",
    "视觉效果": "Visual Effects",
    "角色扮演": "Role Play",
    
    # 场景名称
    "肌肉展示": "Muscle Showcase",
    "咬嘴唇之吻": "Lip Bite Kiss",
    "正常接吻": "Normal Kiss",
    "法式接吻": "French Kiss",
    "脸颊之吻": "Cheek Kiss",
    "额头之吻": "Forehead Kiss",
    "中国女友": "Chinese Girlfriend",
    "俄罗斯女友": "Russian Girlfriend",
    "印度女友": "Indian Girlfriend",
    "女友约会": "Girlfriend Date",
    "日本女友": "Japanese Girlfriend",
    "法国女友": "French Girlfriend",
    "美国女友": "American Girlfriend",
    "名人合拍": "Celebrity Selfie",
    "侧身依抱": "Side Hug",
    "公主抱": "Princess Hug",
    "托举式抱": "Lift Hug",
    "拥抱": "Hug",
    "背后环抱": "Back Hug",
    "抖动身体": "Body Jiggle",
    "怀孕": "Pregnant",
    "肚皮舞": "Belly Dance",
    "AI站立一字马": "AI Standing Split",
    "Reze舞": "Reze Dance",
    "叉腰扭臂": "Waist Twist",
    "扭臀舞": "Twerk Dance",
    "热辣钢管舞": "Pole Dance",
    "电摇舞": "Electric Dance",
    "香奈儿舞": "Chanel Dance",
    "AI局部留色视频特效": "AI Color Splash",
    "AI御龙飞行视频": "AI Dragon Flight",
    "冰雕": "Ice Sculpture",
    "AI爆炸效果": "AI Explosion",
    "史诗级爆炸漫步": "Epic Explosion Walk",
    "改变直升机机库": "Helicopter Hangar",
    "海洋连衣裙": "Ocean Dress",
    "穿越维度": "Dimension Travel",
    "进入嘴巴": "Into Mouth",
    "AI老虎拥抱": "AI Tiger Hug",
    "坐上豪车": "Luxury Car",
    "审讯室": "Interrogation Room",
    "尖叫": "Scream",
    "遇见未来的小孩": "Meet Future Kid",
    "遇见老年的我": "Meet Old Me",
    "雨中漫步": "Rain Walk",
    "雨夜": "Rainy Night",
    
    # FAQ Translation
    "常见问题": "FAQ",
    "可以从静态图片生成视频吗？": "Can I generate videos from static images?",
    "是的，我们的 Image-to-Video 技术专为让静态照片栩栩如生而设计。": "Yes, our Image-to-Video technology is specifically designed to bring static photos to life.",
    "生成视频需要多长时间？": "How long does it take to generate a video?",
    "通常在 1-2 分钟内完成。": "It typically takes 1-2 minutes.",
    "生成的效果自然吗？": "Are the generated effects natural?",
    "是的，我们使用最先进的 AI 模型，确保生成的效果既逼真又自然，保留原始照片的特征。": "Yes, we use state-of-the-art AI models to ensure realistic and natural results that preserve original features.",
    "处理需要多长时间？": "How long does the processing take?",
    "大多数效果在 10-30 秒内生成完毕。": "Most effects are generated within 10-30 seconds."
}

def translate_text(text):
    """翻译文本"""
    return TRANSLATIONS.get(text, text)

def translate_config(zh_config, is_video=False):
    """翻译配置"""
    en_config = json.loads(json.dumps(zh_config))  # 深拷贝
    
    # 翻译tabs
    for tab in en_config["page"]["sections"]["effects"]["tabs"]:
        tab["label"] = translate_text(tab["label"])
        
        # 翻译items
        for item in tab["items"]:
            item["title"] = translate_text(item["title"])
            
            # 更新alt文本
            if "beforeImage" in item:
                item["beforeImage"]["alt"] = f"Before {item['title']}"
            if "image" in item:
                item["image"]["alt"] = item["title"]
    
    # 翻译FAQ
    if "faq" in en_config["page"]["sections"]:
        en_config["page"]["sections"]["faq"]["title"] = translate_text(en_config["page"]["sections"]["faq"]["title"])
        for item in en_config["page"]["sections"]["faq"]["items"]:
            item["question"] = translate_text(item["question"])
            item["answer"] = translate_text(item["answer"])

    # 更新元数据和描述（保持英文）
    if is_video:
        en_config["metadata"]["title"] = "Viral AI Video Effects - AI Kissing, Muscle, Hug & More"
        en_config["metadata"]["description"] = "Explore 100+ viral AI video effects. Transform your photos into AI kissing videos, add AI muscles, generate AI hugs, and more popular visual effects."
        en_config["page"]["title"] = "Viral AI Video Effects"
        en_config["page"]["sections"]["hero"]["title"] = "Viral AI Video Effects"
        en_config["page"]["sections"]["hero"]["description"] = "Transform your photos with viral AI video effects like AI kissing, AI muscle, AI hug, and more."
        en_config["page"]["sections"]["effects"]["title"] = "Explore All Video Effects"
        en_config["page"]["sections"]["effects"]["description"] = "Choose from our wide range of viral AI video effects to bring your photos to life."
        en_config["page"]["sections"]["effects"]["items_label"] = "Natural Mess"
        en_config["page"]["sections"]["effects"]["button_text"] = "Use This Effect"
        en_config["page"]["sections"]["cta"]["title"] = "Unleash Your Creativity"
        en_config["page"]["sections"]["cta"]["description"] = "Transform any photo into a viral masterpiece with just one click."
        en_config["page"]["sections"]["cta"]["buttons"][0]["title"] = "Start Creating Now"
    else:
        en_config["metadata"]["title"] = "Viral AI Photo Effects - AI Hug, Pregnant, Celebrity Selfie & More"
        en_config["metadata"]["description"] = "Discover cinematic AI photo effects. Create AI hugs, pregnant AI photos, selfies with celebrities, and character rotations instantly."
        en_config["page"]["title"] = "Viral AI Photo Effects"
        en_config["page"]["sections"]["hero"]["title"] = "Viral AI Photo Effects"
        en_config["page"]["sections"]["hero"]["description"] = "Bring your photos to life with professional AI photo effects. From AI hugs to celebrity selfies, create stunning visual content in seconds."
        en_config["page"]["sections"]["effects"]["title"] = "Explore All Photo Effects"
        en_config["page"]["sections"]["effects"]["description"] = "Choose from our wide range of professional AI photo effects."
        en_config["page"]["sections"]["effects"]["items_label"] = "Natural Mess"
        en_config["page"]["sections"]["effects"]["button_text"] = "Use This Effect"
        en_config["page"]["sections"]["cta"]["title"] = "Ready to Transform Your Photos?"
        en_config["page"]["sections"]["cta"]["description"] = "Choose an effect and see the magic happen instantly."
        en_config["page"]["sections"]["cta"]["buttons"][0]["title"] = "Try All Effects"
    
    return en_config

# 生成英文配置
print("生成英文照片特效配置...")
en_photo = translate_config(zh_photo, is_video=False)
with open("src/config/locale/messages/en/pages/photo-effects.json", "w", encoding="utf-8") as f:
    json.dump(en_photo, f, ensure_ascii=False, indent=2)
print(f"✓ 已保存 photo-effects.json (英文) - {len(en_photo['page']['sections']['effects']['tabs'])} 个分类")

print("\n生成英文视频特效配置...")
en_video = translate_config(zh_video, is_video=True)
with open("src/config/locale/messages/en/pages/video-effects.json", "w", encoding="utf-8") as f:
    json.dump(en_video, f, ensure_ascii=False, indent=2)
print(f"✓ 已保存 video-effects.json (英文) - {len(en_video['page']['sections']['effects']['tabs'])} 个分类")

print("\n完成！")
