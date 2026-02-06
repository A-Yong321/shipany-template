"""
更新首页的effects部分，使用resource_mapping.json中的真实资源
"""
import json

# 读取资源映射
with open("resource_mapping.json", "r", encoding="utf-8") as f:
    mapping = json.load(f)

# 读取现有的首页配置
with open("src/config/locale/messages/zh/pages/index.json", "r", encoding="utf-8") as f:
    zh_config = json.load(f)

with open("src/config/locale/messages/en/pages/index.json", "r", encoding="utf-8") as f:
    en_config = json.load(f)

# --- 视频特效选择逻辑 ---
video_items = []
# 遍历所有分类
for category, items in mapping["video_effects"].items():
    for item in items:
        if item.get("matched_photo"): # 必须有对应的原图
            video_items.append(item)

# 排序优先级关键词
VIDEO_PRIORITY = ["Kissing", "Muscle", "Dance", "Hug", "Pregnant", "Jiggle", "Twerk"]

def get_video_score(item):
    name = item["base_name"]
    score = 0
    for i, key in enumerate(VIDEO_PRIORITY):
        if key.lower() in name.lower():
            score = 100 - i # 越靠前分数越高
            break
    return score

# 按分数排序
video_items.sort(key=get_video_score, reverse=True)
video_picks_raw = video_items[:12] # 选前12个

# 构建视频显示列表
video_display = []
for item in video_picks_raw:
    name = item["base_name"]
    effect_id = name.lower().replace("_", "-").replace(" ", "-")
    
    badge = None
    if "Kiss" in name or "Muscle" in name:
        badge = "HOT"
    elif "Dance" in name:
        badge = "NEW"
    
    count = "50K"
    if badge == "HOT":
        count = "1M+"
        
    video_display.append({
        "title": name.split("_")[-1] if "_" in name else name,
        "image": {"src": item["matched_photo"]["original"], "alt": name},
        "video": item["video"],
        "badge": badge,
        "count": count,
        "url": f"/video-effects/{effect_id}"
    })

# --- 照片特效选择逻辑 ---
photo_items = []
for category, items in mapping["photo_effects"].items():
    for item in items:
        photo_items.append(item)

PHOTO_PRIORITY = ["Kissing", "Fake-Date", "Hug", "Pregnant", "Selfie", "Muscle", "360"]

def get_photo_score(item):
    name = item["base_name"]
    score = 0
    for i, key in enumerate(PHOTO_PRIORITY):
        if key.lower() in name.lower():
            score = 100 - i
            break
    return score

photo_items.sort(key=get_photo_score, reverse=True)
photo_picks_raw = photo_items[:12]

photo_display = []
for item in photo_picks_raw:
    name = item["base_name"]
    effect_id = name.lower().replace("_", "-").replace(" ", "-")
    
    badge = None
    if "Kiss" in name or "Date" in name or "Hug" in name:
        badge = "HOT"
        
    count = "80K"
    if badge == "HOT":
        count = "500K+"
        
    photo_display.append({
        "title": item["scene"],
        "beforeImage": {"src": item["original"], "alt": f"{item['scene']} 原图"},
        "image": {"src": item["effect"], "alt": item["scene"]},
        "badge": badge,
        "count": count,
        "url": f"/photo-effects/{effect_id}"
    })

# --- 更新中文配置 ---
zh_effects = zh_config["page"]["sections"]["effects"]
zh_effects["tabs"] = [
    {
        "id": "video",
        "label": "视频特效",
        "items": video_display
    },
    {
        "id": "photo",
        "label": "照片特效",
        "items": photo_display
    }
]
zh_effects["button_text"] = "立即使用"

# --- 更新英文配置 ---
TRANSLATIONS = {
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
    "AIFakeDate_印度女友": "Indian Girlfriend", # Add base_name fallback
    "AIFakeDate_女友约会": "Girlfriend Date",
    "AIFakeDate_日本女友": "Japanese Girlfriend",
    "AIFakeDate_法国女友": "French Girlfriend",
    "AIFakeDate_美国女友": "American Girlfriend",
    "AIKissing法式接吻": "French Kiss",
    "AISelfiewithCelebrities_名人合拍": "Celebrity Selfie",
    "AiKissing_咬嘴接吻": "Lip Bite Kiss",
    "AiKissing_正常接吻": "Normal Kiss",
    "PregnantAI_怀孕": "Pregnant",
}

def translate_items(items):
    new_items = []
    for item in items:
        new_item = item.copy()
        new_item["title"] = TRANSLATIONS.get(item["title"], item["title"]) # 尝试翻译标题
        
        # 尝试翻译base_name如果标题没翻译到 (针对视频)
        if new_item["title"] == item["title"]: # 没有改变
             # 尝试匹配 key parts
             for k, v in TRANSLATIONS.items():
                 if k in item["title"]:
                     new_item["title"] = v
                     break

        if "beforeImage" in new_item:
            new_item["beforeImage"] = new_item["beforeImage"].copy()
            new_item["beforeImage"]["alt"] = f"Before {new_item['title']}"
        if "image" in new_item:
            new_item["image"] = new_item["image"].copy()
            new_item["image"]["alt"] = new_item["title"]
        new_items.append(new_item)
    return new_items

en_effects = en_config["page"]["sections"]["effects"]
en_effects["tabs"] = [
    {
        "id": "video",
        "label": "Video Effects",
        "items": translate_items(video_display)
    },
    {
        "id": "photo",
        "label": "Photo Effects",
        "items": translate_items(photo_display)
    }
]
en_effects["button_text"] = "Use This Effect"

# 保存
with open("src/config/locale/messages/zh/pages/index.json", "w", encoding="utf-8") as f:
    json.dump(zh_config, f, ensure_ascii=False, indent=2)

with open("src/config/locale/messages/en/pages/index.json", "w", encoding="utf-8") as f:
    json.dump(en_config, f, ensure_ascii=False, indent=2)

print(f"Update Complete. Video: {len(video_display)}, Photo: {len(photo_display)}")
