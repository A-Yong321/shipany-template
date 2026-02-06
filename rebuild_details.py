import json

# 定义翻译模板（之前版本中的内容） - 这次要更完整
VIDEO_DETAIL_TEMPLATES = {
    "ai-kissing": {
        "metadata": {"title": "AI 接吻视频生成器 - 在线创作热门接吻视频", "description": "将两张照片转换为真实的 AI 接吻视频。"},
        "page": {"title": "AI 接吻视频生成器", "sections": {"hero": {"title": "生成热门 AI 接吻视频"}, "faq": {"items": [
            {"question": "AI 接吻生成器免费吗？", "answer": "是的，我们 provide 免费试用。"}
        ]}}}
    },
    "ai-muscle": {
        "metadata": {"title": "AI 肌肉生成器 - 立即为您的照片添加肌肉", "description": "为您的照片添加专业的健美肌肉。"},
        "page": {"title": "AI 肌肉生成器", "sections": {"hero": {"title": "专业 AI 肌肉转换"}, "faq": {"items": []}}}
    },
     "muscle": {
        "metadata": {"title": "AI 肌肉生成器", "description": "为您的照片添加专业的健美肌肉。"},
        "page": {"title": "AI 肌肉生成器", "sections": {"hero": {"title": "专业 AI 肌肉转换"}}}
    },
    "ai-hug": {
        "metadata": {"title": "AI 拥抱生成器 - 温暖拥抱视频", "description": "用 AI 创建温馨的拥抱视频。"},
        "page": {"title": "AI 拥抱生成器", "sections": {"hero": {"title": "创建温暖拥抱视频"}, "faq": {"items": []}}}
    },
    "hug": {
         "metadata": {"title": "AI 拥抱生成器", "description": "用 AI 创建温馨的拥抱视频。"},
        "page": {"title": "AI 拥抱生成器", "sections": {"hero": {"title": "创建温暖拥抱视频"}}}
    },
    "ai-jiggle": {
        "metadata": {"title": "AI 抖动视频特效 - 有趣的身体运动", "description": "为您的视频添加有趣的抖动效果。"},
        "page": {"title": "AI 抖动视频特效", "sections": {"faq": {"items": []}}}
    },
    "jiggle": {
         "metadata": {"title": "AI 抖动特效", "description": "为您的视频添加有趣的抖动效果。"},
        "page": {"title": "AI 抖动视频特效"}
    },
    "ai-twerk": {
        "metadata": {"title": "AI 扭臀舞生成器 - 热门舞蹈动作", "description": "使用 AI 创建热门扭臀舞视频。"},
        "page": {"title": "AI 扭臀舞生成器", "sections": {"faq": {"items": []}}}
    },
    "twerk": {
        "metadata": {"title": "AI 扭臀舞生成器", "description": "使用 AI 创建热门扭臀舞视频。"},
        "page": {"title": "AI 扭臀舞生成器"}
    },
    "ai-dance": {
        "metadata": {"title": "AI 舞蹈生成器", "description": "使用 AI 创建热门舞蹈视频。"},
        "page": {"title": "AI 舞蹈生成器"}
    },
    "ai-fake-date": {
        "metadata": {"title": "AI 虚拟约会 - 与您的理想伴侣合影", "description": "使用 AI 创建真实的约会视频和照片。"},
        "page": {"title": "AI 虚拟约会"}
    },
    "mimic": {
        "metadata": {"title": "AI 动作模仿 - 复制任何舞蹈动作", "description": "使用 AI 让您的照片模仿任何热门舞蹈。"},
        "page": {"title": "AI 动作模仿"}
    },
    "visual-effects": {
        "metadata": {"title": "AI 视觉特效 - 震撼的视频转换", "description": "为您的照片添加电影级的 AI 视觉效果。"},
        "page": {"title": "AI 视觉特效"}
    },
    "role-swap": {
        "metadata": {"title": "角色扮演特效 - 转换您的身份", "description": "使用 AI 在不同角色之间切换。"},
        "page": {"title": "角色扮演特效"}
    },
    "pregnant-ai": {
        "metadata": {"title": "AI 怀孕特效 - 见证未来的时刻", "description": "使用 AI 生成逼真的怀孕照片和视频。"},
        "page": {"title": "AI 怀孕特效"}
    }
}

# 显式映射各种前缀到标准 Slug (对齐 tools.ts 和详情页规范)
# 这里的逻辑必须与 generate_effects_config.py 严格一致
CATEGORY_TO_SLUG = {
    "AI-Kissing": "ai-kissing",
    "AiKissing": "ai-kissing",
    "AI-Dance-Generator": "ai-dance",
    "AIDanceGenerator": "ai-dance",
    "Dancing": "ai-dance",
    "Muscle": "ai-muscle",
    "Hug": "ai-hug",
    "Jiggle": "ai-jiggle",
    "Twerk": "ai-twerk",
    "AIFakeDate": "ai-fake-date",
    "AI-Fake-Date": "ai-fake-date",
    "Pregnant-AI": "pregnant-ai",
    "PregnantAI": "pregnant-ai",
    "AI-Selfie-with-Celebrities": "celebrity-selfie",
    "AISelfiewithCelebrities": "celebrity-selfie",
    "模仿": "mimic",
    "视觉效果": "visual-effects",
    "角色切换": "role-swap",
    "AI-360-Rotation": "ai-muscle"
}

def get_standard_slug(base_name):
    # 提取前缀并清理 (仅限视频逻辑)
    prefix = base_name.split("_")[0]
    return CATEGORY_TO_SLUG.get(prefix, prefix.lower().replace(" ", "-").strip("-"))

# 针对 Photo 详情页的特殊后缀规范 (必须与 generate_effects_config.py 严格一致)
PHOTO_SLUG_OVERRIDES = {
    "ai-kissing": "ai-kissing-photo",
    "ai-muscle": "ai-muscle-photo",
    "ai-hug": "hug-generator",
    "visual-effects": "visual-effects-photo",
    "role-swap": "role-swap-photo",
    "ai-360-rotation": "character-360"
}

def get_standard_slug(base_name, is_video=True):
    prefix = base_name.split("_")[0]
    slug = CATEGORY_TO_SLUG.get(prefix, prefix.lower().replace(" ", "-").strip("-"))
    if not is_video:
        return PHOTO_SLUG_OVERRIDES.get(slug, slug)
    return slug

def rebuild_details():
    with open("resource_mapping.json", "r", encoding="utf-8") as f:
        mapping = json.load(f)

    # --- 1. 处理视频特效详情 (Video) ---
    new_video_details = {}
    for cat_name, items in mapping.get("video_effects", {}).items():
        standard_slug = get_standard_slug(cat_name, is_video=True)
        template = VIDEO_DETAIL_TEMPLATES.get(standard_slug) or VIDEO_DETAIL_TEMPLATES.get(cat_name.lower())
        
        if template and standard_slug not in new_video_details:
            detail_item = json.loads(json.dumps(template))
            if items:
                item = items[0]
                scene_name = item["matched_photo"]["scene"] if item.get("matched_photo") else item["base_name"].split("_")[-1]
                if "title" not in detail_item["page"] or detail_item["page"]["title"] == "AI 舞蹈生成器":
                    detail_item["page"]["title"] = f"{scene_name}特效 - 1PhotoAI"
            new_video_details[standard_slug] = detail_item

    # 补全模板项
    for slug, template in VIDEO_DETAIL_TEMPLATES.items():
        if slug not in new_video_details: new_video_details[slug] = template

    with open("src/config/locale/messages/zh/pages/video-effect-details.json", "w", encoding="utf-8") as f:
        json.dump(new_video_details, f, ensure_ascii=False, indent=2)
    print(f"✓ 重建 video-effect-details.json (共 {len(new_video_details)} 条)")


    # --- 2. 处理照片特效详情 (Photo) ---
    # 先读取现有的照片翻译，避免覆盖手工精修内容
    try:
        with open("src/config/locale/messages/zh/pages/photo-effect-details.json", "r", encoding="utf-8") as f:
            new_photo_details = json.load(f)
    except:
        new_photo_details = {}

    for cat_name, items in mapping.get("photo_effects", {}).items():
        standard_slug = get_standard_slug(cat_name, is_video=False)
        
        # 如果已经存在该 Key，我们尽量保留原样，只做必要的同步或补全
        if standard_slug not in new_photo_details:
             # 尝试找个近似的模板 (比如从视频模板拿元数据)
             base_slug = get_standard_slug(cat_name, is_video=True)
             template = VIDEO_DETAIL_TEMPLATES.get(base_slug)
             
             if template:
                 detail_item = json.loads(json.dumps(template))
                 detail_item["page"]["title"] = f"AI {cat_name} 照片预览"
                 new_photo_details[standard_slug] = detail_item

    with open("src/config/locale/messages/zh/pages/photo-effect-details.json", "w", encoding="utf-8") as f:
        json.dump(new_photo_details, f, ensure_ascii=False, indent=2)
    print(f"✓ 更新 photo-effect-details.json (共 {len(new_photo_details)} 条)")

if __name__ == "__main__":
    rebuild_details()


